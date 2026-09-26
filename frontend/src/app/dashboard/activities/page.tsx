'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Activity } from '@/types';

export default function ActivitiesPage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/activities')
           .then(res => setActivities(res.data.data))
           .catch(console.error)
           .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Header Limpio y Elegante */}
            <header className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                {/* Elemento Decorativo Geométrico */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full z-0 transition-transform duration-700 group-hover:scale-110"></div>
                
                <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Agenda Solidaria</h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Cronograma de eventos y jornadas de impacto social.</p>
                </div>
                
                <button className="relative z-10 bg-teal-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-teal-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300">
                    📅 Agendar Nueva Actividad
                </button>
            </header>

            {/* Timeline UI (Línea de Tiempo Vertical Premium) */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
                <h3 className="text-xl font-extrabold text-slate-800 mb-10">Próximos Eventos</h3>
                
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="relative border-l-2 border-slate-100 ml-4 space-y-12 pb-4">
                        
                        {/* Placeholder 1 - Simulación de Timeline interactiva */}
                        <div className="relative pl-8 group cursor-pointer">
                            {/* Punto en la línea de tiempo */}
                            <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-teal-400 group-hover:scale-150 transition-transform duration-300 shadow-sm"></div>
                            
                            {/* Tarjeta del evento */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:bg-teal-50 group-hover:border-teal-100 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
                                <span className="inline-block text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-100 px-3 py-1 rounded-full mb-3 shadow-sm">
                                    En 3 días
                                </span>
                                <h3 className="text-xl font-bold text-slate-800">Jornada de Reforestación Urbana</h3>
                                <div className="flex items-center gap-4 mt-3 text-slate-500 font-medium text-sm">
                                    <span className="flex items-center gap-1">📍 Parque Central Central</span>
                                    <span className="flex items-center gap-1">⏰ 09:00 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder 2 - Simulación de evento futuro */}
                        <div className="relative pl-8 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                            <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-blue-400 group-hover:scale-150 transition-transform duration-300 shadow-sm"></div>
                            
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300 group-hover:shadow-md relative overflow-hidden">
                                <span className="inline-block text-blue-700 font-bold text-xs uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full mb-3">
                                    Recaudación
                                </span>
                                <h3 className="text-xl font-bold text-slate-800">Cena Benéfica Anual</h3>
                                <div className="flex items-center gap-4 mt-3 text-slate-500 font-medium text-sm">
                                    <span className="flex items-center gap-1">📍 Salón Principal Hotel Royal</span>
                                    <span className="flex items-center gap-1">⏰ 15 de Nov, 20:00 PM</span>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
