'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';

// Interfaces TypeScript para tipado estricto
interface Project {
  id: number;
  title: string;
  target_budget: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Efecto que llama a nuestra API de Laravel (ProjectController@index)
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Listado de Proyectos</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm">
          + Nuevo Proyecto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-medium">Cargando proyectos desde el servidor...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium">No hay proyectos registrados.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">ID</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Título</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Presupuesto Meta</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-500">#{project.id}</td>
                  <td className="p-4 text-sm font-bold text-slate-800">{project.title}</td>
                  <td className="p-4 text-sm font-medium text-emerald-600">${project.target_budget}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      project.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
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
