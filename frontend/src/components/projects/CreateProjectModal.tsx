import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import api from '@/lib/axios';
import { Project } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (project: Project) => void;
}

export function CreateProjectModal({ isOpen, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/projects', { 
        title, 
        target_budget: budget 
      });
      
      if (res.data.success) {
        onSuccess(res.data.data); // Actualizamos la lista padre
        onClose(); // Cerramos modal
        setTitle(''); // Limpiamos formulario
        setBudget('');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ocurrió un error al guardar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Proyecto Solidario">
      {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Título del Proyecto</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
            placeholder="Ej. Construcción de Comedor"
            className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Presupuesto Meta ($ USD)</label>
          <input 
            type="number" 
            step="0.01" 
            value={budget} 
            onChange={e => setBudget(e.target.value)} 
            required 
            placeholder="5000.00"
            className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
          />
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all disabled:opacity-50">
            {loading ? 'Guardando...' : 'Crear Proyecto'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
