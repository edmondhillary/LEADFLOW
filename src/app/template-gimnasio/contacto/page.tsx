'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contacto, images, business } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-gimnasio';
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', plan: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ nombre: '', email: '', telefono: '', plan: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12" style={{ fontFamily: "'Manrope', sans-serif", background: 'linear-gradient(135deg, #0e0e0e, #000)' }}>
      {/* Background blurs */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(235,0,0,0.06)', filter: 'blur(120px)' }} />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(219,162,255,0.03)', filter: 'blur(120px)' }} />

      {/* Brand */}
      <div className="mb-10 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', color: '#eb0000', letterSpacing: '-0.05em' }}>
          {business.name}
        </h1>
        <div className="w-12 h-1 mx-auto mt-2" style={{ backgroundColor: '#eb0000' }} />
      </div>

      {/* Form Container */}
      <div className="w-full max-w-xl relative z-10">
        <div className="p-8 md:p-12" style={{ backgroundColor: '#191919', borderLeft: '4px solid #eb0000', boxShadow: '0 0 80px rgba(235,0,0,0.1)' }}>
          <header className="mb-8">
            <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {contacto.title} <span style={{ color: '#eb0000' }}>{contacto.titleAccent}</span>
            </h2>
            <p style={{ color: '#ababab', fontSize: '14px' }}>{contacto.subtitle}</p>
          </header>

          {submitted && (
            <div className="mb-6 p-4 text-center text-sm font-bold" style={{ backgroundColor: '#25d366', color: '#000' }}>
              Inscripción enviada. Te contactaremos pronto.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase block mb-2" style={{ color: '#ff8e7d', letterSpacing: '0.1em' }}>Nombre Completo</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="EJ. MARCO RIVERA" className="w-full p-4 text-sm font-bold" style={{ backgroundColor: '#262626', border: 'none', color: '#fff', outline: 'none', letterSpacing: '-0.01em' }} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase block mb-2" style={{ color: '#ff8e7d', letterSpacing: '0.1em' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="tu@email.com" autoComplete="email" className="w-full p-4 text-sm font-bold" style={{ backgroundColor: '#262626', border: 'none', color: '#fff', outline: 'none' }} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase block mb-2" style={{ color: '#ff8e7d', letterSpacing: '0.1em' }}>Teléfono</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+34 000 000 000" autoComplete="tel" className="w-full p-4 text-sm font-bold" style={{ backgroundColor: '#262626', border: 'none', color: '#fff', outline: 'none' }} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase block mb-2" style={{ color: '#ff8e7d', letterSpacing: '0.1em' }}>Plan de Entrenamiento</label>
              <div className="relative">
                <select name="plan" value={formData.plan} onChange={handleChange} required className="w-full p-4 text-sm font-bold appearance-none cursor-pointer" style={{ backgroundColor: '#262626', border: 'none', color: '#fff', outline: 'none' }}>
                  <option value="">Seleccionar plan...</option>
                  {contacto.serviceOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-symbols-outlined" style={{ color: '#eb0000' }}>expand_more</span>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button type="submit" className="group relative w-full overflow-hidden py-5 px-8 flex items-center justify-center gap-3 active:scale-95 transition-all" style={{ backgroundColor: '#eb0000' }}>
                <span className="relative z-10 text-lg font-black" style={{ fontFamily: "'Epilogue', sans-serif", color: '#000', letterSpacing: '0.05em' }}>
                  CONFIRMAR INSCRIPCIÓN
                </span>
                <span className="material-symbols-outlined relative z-10" style={{ color: '#000', fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </button>
            </div>
          </form>

          {/* Trust */}
          <div className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderTop: '1px solid rgba(72,72,72,0.2)' }}>
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#262626', border: '2px solid #191919', color: '#ababab' }}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black" style={{ backgroundColor: '#eb0000', border: '2px solid #191919', color: '#000' }}>
                +500
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm font-bold italic">MÁS DE 500 SOCIOS</p>
              <p className="text-xs uppercase" style={{ color: '#ababab', letterSpacing: '0.1em' }}>YA ENTRENAN CON NOSOTROS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info cards below */}
      <div className="w-full max-w-xl relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6" style={{ backgroundColor: '#191919' }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined" style={{ color: '#eb0000' }}>schedule</span>
            <span className="text-xs font-bold uppercase" style={{ letterSpacing: '0.1em' }}>Horario</span>
          </div>
          <p className="text-lg font-black" style={{ fontFamily: "'Epilogue', sans-serif" }}>{contacto.schedule}</p>
        </div>
        <div className="p-6" style={{ backgroundColor: '#191919' }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined" style={{ color: '#eb0000' }}>location_on</span>
            <span className="text-xs font-bold uppercase" style={{ letterSpacing: '0.1em' }}>Ubicación</span>
          </div>
          <p className="text-sm font-bold">{business.address}</p>
          <p className="text-sm" style={{ color: '#757575' }}>{business.postalCode} {business.city}</p>
        </div>
      </div>

      <Link href={`${baseHref}`} className="mt-8 flex items-center gap-2 transition-colors hover:text-[#eb0000]" style={{ color: '#ababab', textDecoration: 'none' }}>
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span className="text-xs font-bold uppercase" style={{ letterSpacing: '0.1em' }}>Volver al inicio</span>
      </Link>
    </main>
  );
}
