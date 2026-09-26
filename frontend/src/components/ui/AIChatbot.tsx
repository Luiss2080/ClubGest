'use client';
import React, { useState } from 'react';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente de Inteligencia Artificial de ClubGest 🤖. ¿En qué puedo ayudarte hoy? (ej. ¿Cómo donar?, ¿Cuáles son los proyectos?)", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if(!input.trim()) return;
    
    // Agregamos mensaje del usuario
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    
    // Simulamos respuesta de IA
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Gracias por tu interés. En este momento estoy operando en modo Demo, pero pronto podré procesar donaciones directamente desde el chat usando Stripe. ¡Mantente atento!", isBot: true }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-80 h-96 mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 font-bold flex justify-between items-center shadow-md z-10">
            <span className="flex items-center gap-2"><span>💬</span> Soporte IA</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-slate-200 text-2xl leading-none">&times;</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-800/50 flex flex-col">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-xl text-sm max-w-[85%] shadow-sm ${
                msg.isBot 
                  ? 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 self-start rounded-tl-sm' 
                  : 'bg-blue-600 text-white self-end ml-auto rounded-tr-sm'
              }`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu duda..." 
              className="flex-1 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200" 
            />
            <button type="submit" className="bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700 transition-colors">Enviar</button>
          </form>
        </div>
      )}
      
      {/* Botón Flotante */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-slate-800 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl shadow-slate-400/50 hover:scale-110 hover:bg-blue-600 transition-all duration-300"
      >
        {isOpen ? '✕' : '🤖'}
      </button>
    </div>
  );
}
