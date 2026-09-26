'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', { email, password });
      
      if (response.data.success) {
        // Guardamos el token emitido por Laravel Sanctum
        localStorage.setItem('auth_token', response.data.data.token);
        // Redirigimos al Dashboard
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error de conexión. Revisa tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 transition-all duration-300">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">ClubGest</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Acceso Seguro</p>
        </div>

        {/* Desplegable interactivo para Credenciales de Prueba (Ahorro de espacio visual) */}
        <details className="mb-6 group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden cursor-pointer select-none shadow-sm hover:shadow-md transition-shadow">
          <summary className="font-semibold text-sm text-slate-700 p-4 hover:bg-slate-100 transition-colors flex justify-between items-center list-none [&::-webkit-details-marker]:hidden outline-none focus:ring-2 focus:ring-blue-500 inset-0">
            <span className="flex items-center gap-2"><span>🔑</span> Ver Credenciales de Prueba</span>
            <span className="group-open:rotate-180 transition-transform text-slate-400 text-xs">▼</span>
          </summary>
          <div className="p-4 border-t border-slate-200 text-xs text-slate-600 bg-white space-y-3 animate-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
              <div><span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mr-2 bg-slate-200 px-2 py-0.5 rounded">Admin</span> admin@clubgest.org</div>
              <code className="bg-slate-200 px-2 py-1 rounded text-slate-700 font-mono font-bold tracking-widest">password</code>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-blue-50 border border-blue-100 hover:border-blue-300 transition-colors">
              <div><span className="font-bold text-blue-700 uppercase tracking-wider text-[10px] mr-2 bg-blue-200 px-2 py-0.5 rounded">Voluntario</span> voluntario@clubgest.org</div>
              <code className="bg-blue-200 px-2 py-1 rounded text-blue-800 font-mono font-bold tracking-widest">password</code>
            </div>
          </div>
        </details>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-semibold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="voluntario@clubgest.org" 
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="••••••••" 
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Validando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </main>
  );
}
