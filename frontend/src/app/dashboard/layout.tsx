import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Sidebar Lateral - Diseño Premium */}
            <aside className="w-64 bg-white shadow-xl flex flex-col border-r border-slate-100 z-10 relative">
                <div className="p-6 border-b border-slate-100 text-center">
                    <h1 className="text-2xl font-extrabold text-blue-600 tracking-tighter">ClubGest</h1>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">Impacto Social</p>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/dashboard" className="block px-4 py-3 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                        📊 Resumen General
                    </Link>
                    <Link href="/dashboard/projects" className="block px-4 py-3 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                        🌱 Proyectos
                    </Link>
                    <Link href="/dashboard/activities" className="block px-4 py-3 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                        📅 Agenda Solidaria
                    </Link>
                    <Link href="/dashboard/donations" className="block px-4 py-3 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                        💰 Donaciones
                    </Link>
                </nav>
                
                <div className="p-4 border-t border-slate-100">
                    <button className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-semibold flex items-center gap-2">
                        <span>🚪</span> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Área Central de Contenido */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header Superior Dinámico */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-700">Panel de Control</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-500">voluntario@clubgest.org</span>
                        <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shadow-inner">
                            V
                        </div>
                    </div>
                </header>
                
                {/* Contenido (Vistas inyectadas) */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
