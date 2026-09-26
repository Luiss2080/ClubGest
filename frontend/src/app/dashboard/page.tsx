import React from 'react';

export const metadata = {
    title: 'Dashboard | ClubGest'
};

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Análisis Operativo</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Monitoreo de ingresos e impacto social.</p>
            </header>
            
            {/* Gráfico Reactivo de Barras (CSS Puro / Visualización de Datos) */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Flujo de Recaudación (Q3 2026)</h3>
                    <select className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-1 outline-none text-slate-600 dark:text-slate-300">
                        <option>Últimos 6 meses</option>
                        <option>Este año</option>
                    </select>
                </div>
                
                {/* Gráfico de Barras Creado con Tailwind (Sin dependencias externas) */}
                <div className="h-64 w-full flex items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 relative">
                    {/* Grid lines */}
                    <div className="absolute w-full border-t border-dashed border-slate-200 dark:border-slate-700 top-0"></div>
                    <div className="absolute w-full border-t border-dashed border-slate-200 dark:border-slate-700 top-1/2"></div>

                    {/* Barras de datos */}
                    <div className="w-1/6 bg-gradient-to-t from-blue-600 to-blue-400 h-[40%] rounded-t-md hover:opacity-80 transition-opacity relative group cursor-pointer">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$4.2k</div>
                    </div>
                    <div className="w-1/6 bg-gradient-to-t from-blue-600 to-blue-400 h-[60%] rounded-t-md hover:opacity-80 transition-opacity relative group cursor-pointer">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$6.5k</div>
                    </div>
                    <div className="w-1/6 bg-gradient-to-t from-blue-600 to-blue-400 h-[35%] rounded-t-md hover:opacity-80 transition-opacity relative group cursor-pointer">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$3.8k</div>
                    </div>
                    <div className="w-1/6 bg-gradient-to-t from-teal-500 to-teal-300 h-[85%] rounded-t-md hover:opacity-80 transition-opacity relative group cursor-pointer">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-teal-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">$9.1k</div>
                    </div>
                    <div className="w-1/6 bg-gradient-to-t from-blue-600 to-blue-400 h-[50%] rounded-t-md hover:opacity-80 transition-opacity relative group cursor-pointer">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$5.0k</div>
                    </div>
                    <div className="w-1/6 bg-gradient-to-t from-blue-600 to-blue-400 h-[70%] rounded-t-md hover:opacity-80 transition-opacity relative group cursor-pointer">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$7.4k</div>
                    </div>
                </div>
                
                {/* Eje X (Meses) */}
                <div className="flex justify-between w-full mt-4 text-xs font-bold text-slate-400 dark:text-slate-500">
                    <span className="w-1/6 text-center">ABR</span>
                    <span className="w-1/6 text-center">MAY</span>
                    <span className="w-1/6 text-center">JUN</span>
                    <span className="w-1/6 text-center text-teal-600 dark:text-teal-400">JUL</span>
                    <span className="w-1/6 text-center">AGO</span>
                    <span className="w-1/6 text-center">SEP</span>
                </div>
            </div>

            {/* Integration Pasarela de Pagos (Mockup UI) */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-xl flex items-center justify-between text-white overflow-hidden relative">
                <div className="absolute -right-10 top-0 text-9xl opacity-5">💳</div>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">Integración con Stripe Activa</h3>
                    <p className="text-slate-400 mt-1 max-w-lg text-sm">La pasarela de pagos está configurada en modo test. Las donaciones realizadas a través de la Landing Page entrarán directamente al flujo financiero.</p>
                </div>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform z-10 shadow-lg">
                    Ver API Keys
                </button>
            </div>
        </div>
    );
}
