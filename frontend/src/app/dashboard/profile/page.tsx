'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';

interface UserProfile {
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hacemos ping al backend (ruta protegida /api/user que programamos en Fase 2)
        api.get('/user').then(res => {
            if (res.data.success) {
                setUser(res.data.data);
            }
        }).catch(err => {
            console.error("Error cargando perfil", err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Mi Perfil Solidario</h1>
            
            {loading ? (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 animate-pulse h-64"></div>
            ) : (
                <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                    
                    {/* Fondo geométrico abstracto para dar toque premium */}
                    <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 rounded-bl-[100px] pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                        {/* Avatar Premium */}
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-teal-400 rounded-full flex items-center justify-center text-5xl text-white font-black shadow-lg shadow-blue-500/30">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        
                        {/* Datos del Usuario */}
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{user?.name || 'Usuario Prueba'}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg mt-1">{user?.email || 'voluntario@clubgest.org'}</p>
                            
                            <div className="mt-4 inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200 dark:border-blue-800">
                                {user?.role || 'Voluntario Activo'}
                            </div>
                        </div>
                    </div>

                    {/* Ajustes Rápidos */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700/50 relative z-10">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6">Ajustes de la Cuenta</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 p-5 rounded-2xl font-medium text-left transition-colors flex justify-between items-center border border-slate-100 dark:border-slate-700 group">
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">🔒</span> Cambiar Contraseña
                                </span>
                                <span className="text-slate-400 group-hover:text-blue-500 transition-colors">→</span>
                            </button>
                            
                            <button className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 p-5 rounded-2xl font-medium text-left transition-colors flex justify-between items-center border border-slate-100 dark:border-slate-700 group">
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">🔔</span> Notificaciones
                                </span>
                                <span className="text-slate-400 group-hover:text-blue-500 transition-colors">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
