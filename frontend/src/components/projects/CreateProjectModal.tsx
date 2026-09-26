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
  const [image, setImage] = useState<File | null>(null); // Nuevo estado para la imagen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // PASO 4: Para enviar archivos (imágenes) al backend, ya no podemos usar JSON estricto.
      // Necesitamos usar la API nativa de JavaScript "FormData".
      const formData = new FormData();
      formData.append('title', title);
      formData.append('target_budget', budget);
      
      // Si el voluntario seleccionó una imagen, la empaquetamos
      if (image) {
        formData.append('image', image);
      }

      // Le decimos explícitamente a Axios que estamos enviando un formulario multipart (binario)
      const res = await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (res.data.success) {
        onSuccess(res.data.data); // Actualizamos la lista padre
        onClose(); // Cerramos modal
        
        // Limpiamos formulario
        setTitle(''); 
        setBudget('');
        setImage(null);
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
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 dark:text-slate-200" 
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
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 dark:text-slate-200" 
          />
        </div>

        {/* Input de Subida de Archivos */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Imagen de Portada (Opcional)</label>
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp"
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }} 
            className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
          />
          <p className="text-xs text-slate-400 mt-1">Soporta JPG, PNG y WebP (Máx. 2MB)</p>
        </div>
        
        <div className="pt-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
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
