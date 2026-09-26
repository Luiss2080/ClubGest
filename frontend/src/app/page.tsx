import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'ClubGest Solidario | Transparencia e Impacto Social',
  description: 'Únete a nuestra comunidad solidaria. Descubre nuestros proyectos, la agenda de actividades y realiza donaciones transparentes para transformar realidades.',
  keywords: 'ONG, Donaciones, Impacto Social, Voluntariado, Transparencia'
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200 font-sans">
      
      {/* Navbar: Efecto Glassmorphism Premium */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-400 rounded-lg shadow-inner"></div>
            <span className="text-2xl font-black text-slate-800 tracking-tighter">ClubGest</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#proyectos" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Proyectos</Link>
            <Link href="#impacto" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Nuestro Impacto</Link>
            {/* CTA hacia el Dashboard protegido que programamos en pasos anteriores */}
            <Link href="/login" className="text-sm font-extrabold text-blue-600 px-6 py-2.5 rounded-full border-2 border-blue-100 hover:bg-blue-50 transition-all active:scale-95">
              Acceso Voluntarios
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section: Tipografía Moderna y Gradientes */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center">
        {/* Gradiente decorativo de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-in slide-in-from-bottom-8 duration-700">
          
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700 text-xs font-bold tracking-wide uppercase">
            100% de Transparencia Financiera
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Solidaridad que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Transforma</span> Realidades.
          </h1>
          
          <p className="mt-8 text-lg lg:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Plataforma tecnológica diseñada para gestionar causas sociales. Visualiza exactamente dónde y cómo se invierte cada centavo de tus aportes en tiempo real.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#dona-ahora" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 hover:bg-blue-700 transition-all duration-300">
              Quiero Donar
            </Link>
            <Link href="#proyectos" className="bg-white text-slate-700 font-bold px-8 py-4 rounded-full shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 transition-all duration-300">
              Ver Causas Activas
            </Link>
          </div>
        </div>
      </section>

      {/* Micro-sección de Social Proof (Logos de Patrocinadores) */}
      <section className="border-y border-slate-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Empresas que confían en nosotros</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="text-2xl font-black text-slate-800">TechCorp</span>
             <span className="text-2xl font-black text-slate-800">InnovaSocial</span>
             <span className="text-2xl font-black text-slate-800">GlobalFund</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}
