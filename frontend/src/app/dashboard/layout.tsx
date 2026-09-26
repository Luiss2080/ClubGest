import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CommandPalette } from '@/components/ui/CommandPalette';
import api from '@/lib/axios';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [userRole, setUserRole] = useState('voluntario'); // RBAC State

    useEffect(() => {
        // En un entorno real, obtenemos el rol del backend y restringimos menú
        api.get('/user').then(res => {
            if(res.data.success && res.data.data.role) {
                setUserRole(res.data.data.role.toLowerCase());
            }
        }).catch(() => {
            // Simulamos Rol de Administrador para fines de demostración
            setUserRole('admin'); 
        });
    }, []);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
            <aside className="w-64 bg-white dark:bg-slate-900 shadow-xl flex flex-col border-r border-slate-100 dark:border-slate-800 z-10 relative transition-colors duration-300">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 text-center">
                    <h1 className="text-2xl font-extrabold text-blue-600 dark:text-blue-500 tracking-tighter">ClubGest</h1>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">Impacto Social</p>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/dashboard" className="block px-4 py-3 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-medium">
                        📊 Resumen General
                    </Link>
                    <Link href="/dashboard/projects" className="block px-4 py-3 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-medium">
                        🌱 Proyectos
                    </Link>
                    <Link href="/dashboard/activities" className="block px-4 py-3 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-medium">
                        📅 Agenda Solidaria
                    </Link>

                    {/* RBAC: Restricción de vista de Finanzas (Solo Admin) */}
                    {userRole === 'admin' && (
                        <Link href="/dashboard/donations" className="block px-4 py-3 text-slate-600 dark:text-slate-300 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 font-bold transition-colors">
                            💰 Finanzas (Admin)
                        </Link>
                    )}
                </nav>
                
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button className="w-full text-left px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-semibold flex items-center gap-2">
                        <span>🚪</span> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between px-8 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 hidden md:block">Panel de Control</h2>
                        {/* Atajo Visual del Buscador */}
                        <div className="bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 cursor-pointer hover:bg-slate-200 transition-colors">
                            <span>🔍 Buscar...</span>
                            <span className="font-mono bg-white dark:bg-slate-700 px-1.5 rounded shadow-sm">Ctrl K</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <ThemeToggle />
                        <Link href="/dashboard/profile" className="flex items-center gap-3 group">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-600 hidden md:block">
                                Mi Perfil
                            </span>
                            <div className="h-9 w-9 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 font-bold shadow-inner group-hover:scale-105">
                                V
                            </div>
                        </Link>
                    </div>
                </header>
                
                {/* Paleta de Comandos Global */}
                <CommandPalette />

                <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-900">
                    {children}
                </div>
            </main>
        </div>
    );
}
