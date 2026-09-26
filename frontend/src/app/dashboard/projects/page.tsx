'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Project } from '@/types';
import { CreateProjectModal } from '@/components/projects/CreateProjectModal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  // Actualiza el estado reactivo sin recargar la página cuando el Modal guarda un registro
  const handleProjectCreated = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  // Filtrado reactivo en tiempo real
  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Cabecera / Sección */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Directorio de Proyectos</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Gestiona las causas solidarias activas</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/30 flex items-center gap-2"
        >
          <span>➕</span> Nuevo Proyecto
        </button>
      </div>

      {/* Barra de Búsqueda Interactiva */}
      <div className="relative w-full md:w-1/2 lg:w-1/3">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">🔍</span>
        <input 
          type="text" 
          placeholder="Buscar proyecto por nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 transition-all shadow-sm"
        />
      </div>

      {/* Inyección del Componente Modular Modal */}
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleProjectCreated} 
      />

      {/* Sección: Tabla */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-medium animate-pulse">Cargando proyectos...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium">No hay proyectos registrados aún. Abre un nuevo proyecto.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Título de la Causa</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Presupuesto Meta</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-bold text-slate-800">{project.title}</td>
                  <td className="p-4 text-sm font-medium text-emerald-600">${project.target_budget} USD</td>
                  <td className="p-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                      project.status === 'active' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      project.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {project.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
