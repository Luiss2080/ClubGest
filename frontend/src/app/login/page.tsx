import React from 'react';

export const metadata = {
  title: 'Iniciar Sesión | ClubGest',
  description: 'Accede al panel de gestión de ClubGest',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 transition-all duration-300">
      
      {/* Contenedor Principal (Glassmorphism & Shadows) */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">ClubGest</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Panel de Impacto Social y Donaciones</p>
        </div>

        {/* Formulario */}
        <form className="space-y-6">
          
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="voluntario@clubgest.org" 
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">
              Contraseña
            </label>
            <input 
              type="password" 
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="••••••••" 
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-sm text-slate-600">
                Recordarme
              </label>
            </div>
            <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all active:scale-95 shadow-md shadow-blue-500/30"
          >
            Iniciar Sesión
          </button>

        </form>
      </div>
    </main>
  );
}
