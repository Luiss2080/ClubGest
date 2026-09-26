import React from 'react';
import { Modal } from '@/components/ui/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exportar Reporte Financiero">
      <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Selecciona el formato deseado para descargar el registro histórico de donaciones. El documento incluirá trazabilidad fiscal y sellos de auditoría de la ONG.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Botón Excel */}
          <button 
            onClick={() => { alert('Generando Excel...'); onClose(); }}
            className="flex flex-col items-center justify-center p-6 border-2 border-emerald-100 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-2xl hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:scale-[1.02] transition-all shadow-sm group"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">📊</span>
            <span className="font-bold">Hoja de Cálculo</span>
            <span className="text-xs opacity-70 mt-1">Formato .xlsx</span>
          </button>
          
          {/* Botón PDF */}
          <button 
            onClick={() => { alert('Generando PDF...'); onClose(); }}
            className="flex flex-col items-center justify-center p-6 border-2 border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/40 hover:scale-[1.02] transition-all shadow-sm group"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">📄</span>
            <span className="font-bold">Reporte Oficial</span>
            <span className="text-xs opacity-70 mt-1">Formato .pdf</span>
          </button>
        </div>

        <button 
          onClick={onClose} 
          className="w-full mt-2 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium"
        >
          Cancelar Operación
        </button>
      </div>
    </Modal>
  );
}
