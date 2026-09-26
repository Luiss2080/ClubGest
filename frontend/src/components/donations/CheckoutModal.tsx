'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import api from '@/lib/axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: Props) {
  // Estado local para los campos de pago
  const [amount, setAmount] = useState('25');
  const [project, setProject] = useState('Fondo General Solidario');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lógica transaccional paso a paso
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Hacemos ping al endpoint /donations/checkout de nuestro backend
      const res = await api.post('/donations/checkout', {
        amount: parseFloat(amount),
        project_name: project
      });

      if (res.data.success && res.data.checkout_url) {
        // 2. Stripe genera la URL; procedemos a redirigir al usuario (cierre de ciclo)
        window.location.href = res.data.checkout_url;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al conectar con los servidores financieros.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Donación Segura (Stripe)">
      <div className="space-y-6">
        
        {/* Manejo de errores de servidor visual */}
        {error && <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
        
        <form onSubmit={handleCheckout} className="space-y-5">
          
          {/* Selección de Causa */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">¿A qué causa deseas apoyar?</label>
            <select 
              value={project} 
              onChange={e => setProject(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-slate-700 font-medium outline-none focus:ring-2 focus:ring-[#635BFF] transition-all"
            >
              <option value="Fondo General Solidario">Fondo General (Recomendado)</option>
              <option value="Construcción de Comedor Infantil">Construcción de Comedor Infantil</option>
              <option value="Jornada de Reforestación Urbana">Jornada de Reforestación Urbana</option>
            </select>
          </div>
          
          {/* Selector de Monto Inteligente */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Monto del Aporte (USD)</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[15, 25, 50].map(val => (
                <button 
                  type="button" 
                  key={val} 
                  onClick={() => setAmount(val.toString())} 
                  className={`py-3 rounded-xl font-bold border transition-all ${
                    amount === val.toString() 
                      ? 'bg-[#635BFF]/10 text-[#635BFF] border-[#635BFF] shadow-sm' 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
            
            {/* Monto personalizado */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input 
                type="number" 
                min="5" 
                step="1" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                required 
                className="w-full bg-white border border-slate-200 pl-8 p-3.5 rounded-xl text-slate-700 font-bold outline-none focus:ring-2 focus:ring-[#635BFF] transition-all" 
                placeholder="Otra cantidad (Mínimo $5)" 
              />
            </div>
          </div>
          
          {/* Botón Oficial Stripe (Color corporativo Blurple) */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#635BFF] text-white p-4 rounded-xl font-extrabold text-lg hover:bg-[#4B45D6] transition-all shadow-xl shadow-indigo-500/20 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
             {loading ? 'Estableciendo conexión segura...' : `Pagar $${amount} con Stripe`}
          </button>
          
          {/* Sello de Confianza */}
          <div className="text-center text-xs text-slate-400 mt-4 flex flex-col items-center justify-center gap-1">
            <span className="flex items-center gap-1 font-semibold uppercase tracking-widest text-[10px]">
              🔒 Transacción Encriptada
            </span>
            <p>Los pagos son procesados por Stripe. La ONG no almacena los datos de tu tarjeta.</p>
          </div>
        </form>
      </div>
    </Modal>
  );
}
