import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/**
 * Componente Reutilizable de Modal con efecto Glassmorphism y animaciones.
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 font-bold text-2xl leading-none transition-colors">
            &times;
          </button>
        </div>
        
        {/* Contenido Inyectado */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
