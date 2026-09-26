import React from 'react';

export const metadata = {
    title: 'Dashboard | ClubGest'
};

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hola de nuevo, Voluntario</h1>
                <p className="text-slate-500 mt-1">Aquí tienes el resumen del impacto social de este mes.</p>
            </header>
            
            {/* Tarjetas de Resumen (Widgets estilo Premium) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <div className="relative z-10">
                        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Donaciones Recibidas</h3>
                        <p className="text-4xl font-black text-blue-600 mt-3">$12,450</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <div className="relative z-10">
                        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Próximas Actividades</h3>
                        <p className="text-4xl font-black text-teal-600 mt-3">5</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <div className="relative z-10">
                        <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Proyectos Activos</h3>
                        <p className="text-4xl font-black text-purple-600 mt-3">3</p>
                    </div>
                </div>
            </div>

            {/* Listado Placeholder */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Actividades Recientes</h3>
                <div className="h-48 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                    <p className="text-slate-400 font-medium">Aquí se montará la tabla reactiva llamando a `/api/activities`</p>
                </div>
            </div>
        </div>
    );
}
