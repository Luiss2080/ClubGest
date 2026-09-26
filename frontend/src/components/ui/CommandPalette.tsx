'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Atajo de teclado global: Ctrl + K o Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Fondo Clickable para cerrar */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 slide-in-from-top-10 duration-200">
        
        {/* Input Principal de Búsqueda */}
        <div className="flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <span className="text-slate-400 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar proyectos, voluntarios, actividades..." 
            className="w-full bg-transparent p-5 outline-none text-slate-800 dark:text-slate-200 font-medium text-lg placeholder:text-slate-400"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded font-mono font-bold hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>
        
        {/* Resultados Sugeridos */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.length > 1 ? (
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">Acciones Rápidas</div>
                <Link href="/dashboard/projects" onClick={() => setIsOpen(false)} className="block p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium">
                  Ir a Crear un Nuevo Proyecto Solidario
                </Link>
                <Link href="/dashboard/donations" onClick={() => setIsOpen(false)} className="block p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors mt-2 font-medium">
                  Exportar Reporte Financiero (CSV/PDF)
                </Link>
              </div>
              
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">Búsqueda en Base de Datos</div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">🔎</div>
                  Buscar registros que coincidan con "<span className="font-bold">{query}</span>"
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-12 flex flex-col items-center gap-3">
              <span className="text-4xl opacity-50">🧭</span>
              <p>Empieza a escribir para buscar en todo el sistema.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
