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

  // Actualiza el estado reactivo sin recargar la página cuando el Modal guarda un registro
  const handleProjectCreated = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Cabecera / Sección */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Directorio de Proyectos</h1>
            <p className="text-slate-500 text-sm">Gestiona las causas solidarias activas</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/30 flex items-center gap-2"
        >
          <span>➕</span> Nuevo Proyecto
        </button>
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
