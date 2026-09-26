'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Donation } from '@/types';
import { ExportModal } from '@/components/donations/ExportModal';

export default function DonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    useEffect(() => {
        api.get('/donations')
           .then(res => setDonations(res.data.data))
           .catch(console.error)
           .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Modal de Exportación Inyectado */}
            <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />

            {/* Header Dinámico con Animaciones CSS puras */}
            <header className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 rounded-[2rem] text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute left-10 -bottom-20 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl animate-pulse-slow"></div>
                
                <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                    <h1 className="text-4xl font-black tracking-tight group-hover:scale-[1.02] transition-transform duration-500">
                        Finanzas y Donaciones
                    </h1>
                    <p className="text-blue-100 mt-2 font-medium text-lg">Control absoluto y transparente de ingresos solidarios.</p>
                </div>
                
                <div className="relative z-10 flex gap-4">
                    <button 
                        onClick={() => setIsExportModalOpen(true)}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300"
                    >
                        📥 Exportar
                    </button>
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform duration-300 shadow-xl">
                        + Registrar Ingreso
                    </button>
                </div>
            </header>
            
            {/* Widgets Estadísticos (Glassmorphism) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="glass-card p-8 rounded-[2rem] hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">💰</div>
                        <h3 className="text-slate-500 font-bold uppercase text-sm tracking-widest">Recaudación Histórica</h3>
                    </div>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
                        $45,800.00
                    </p>
                </div>
                
                <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-slate-500 font-bold mb-4 uppercase text-sm tracking-widest">Meta Anual 2026</h3>
                    <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden relative shadow-inner">
                        <div className="absolute bg-gradient-to-r from-teal-400 to-blue-500 h-full rounded-full w-[65%] animate-pulse-slow"></div>
                    </div>
                    <p className="text-right text-sm font-bold text-slate-400 mt-3">65% completado ($65,000 / $100,000)</p>
                </div>

            </div>

            {/* Listado de Donaciones Recientes */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-extrabold text-slate-800 mb-6">Transacciones Recientes</h3>
                
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Ejemplo de Fila de tabla estilizada moderna (Cards horizontales en lugar de tabla clásica) */}
                        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">T</div>
                                <div>
                                    <p className="font-bold text-slate-800">TechCorp Solidario</p>
                                    <p className="text-xs font-medium text-slate-400">Aportó al Proyecto: Construcción de Comedor</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-emerald-600 text-lg">+$1,500.50</p>
                                <p className="text-xs text-slate-400 font-medium">Hace 2 horas</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
