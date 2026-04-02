'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contacto, images, business } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-pintor';
  const [formData, setFormData] = useState({ nombre: '', telefono: '', servicio: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ nombre: '', telefono: '', servicio: '', mensaje: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* Hero */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-16 md:mb-24 pt-4 md:pt-8">
        <div className="flex flex-col md:flex-row items-end gap-8">
          <div className="flex-1">
            <span className="uppercase tracking-widest text-xs text-[#5a6061] mb-4 block" style={{ fontFamily: "'Manrope', sans-serif" }}>{contacto.badge}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#3d6565] leading-none tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {contacto.title}
            </h1>
          </div>
          <div className="hidden md:block w-1/3 h-64 rounded-lg overflow-hidden relative shadow-2xl">
            <img src={images.contactPainter} alt="Pintor profesional" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#3d6565]/10 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
        {/* Form */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 rounded-xl shadow-sm relative overflow-hidden">
          <h2 className="text-2xl font-bold text-[#2d3435] mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>Cuéntanos tu proyecto</h2>

          {submitted && (
            <div className="mb-6 p-4 rounded-lg text-center text-sm font-medium" style={{ backgroundColor: '#25d366', color: 'white' }}>
              Solicitud enviada. Te contactaremos pronto.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#5a6061] block mb-1">Nombre Completo</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ej. Juan Pérez" className="w-full bg-transparent py-2 text-[#2d3435] px-0 placeholder:text-[#adb3b4]/50 focus:outline-none" style={{ borderBottom: '2px solid rgba(173,179,180,0.15)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#5a6061] block mb-1">Teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+34 000 000 000" autoComplete="tel" className="w-full bg-transparent py-2 text-[#2d3435] px-0 placeholder:text-[#adb3b4]/50 focus:outline-none" style={{ borderBottom: '2px solid rgba(173,179,180,0.15)' }} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-[#5a6061] block mb-1">Servicio Necesitado</label>
                <select name="servicio" value={formData.servicio} onChange={handleChange} required className="w-full bg-transparent py-2 text-[#2d3435] px-0 appearance-none focus:outline-none" style={{ borderBottom: '2px solid rgba(173,179,180,0.15)' }}>
                  <option value="">Seleccionar...</option>
                  {contacto.serviceOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[#5a6061] block mb-1">Tu Mensaje</label>
              <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows={4} placeholder="Describe brevemente el espacio y las dimensiones..." className="w-full bg-transparent py-2 text-[#2d3435] px-0 placeholder:text-[#adb3b4]/50 resize-none focus:outline-none" style={{ borderBottom: '2px solid rgba(173,179,180,0.15)' }} />
            </div>
            <button type="submit" className="w-full md:w-auto px-12 py-4 text-[#d9fffe] rounded-md font-bold tracking-wide transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 duration-300" style={{ background: 'linear-gradient(135deg, #3d6565, #315959)' }}>
              Enviar Solicitud
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-5 space-y-8">
          {/* WhatsApp Card */}
          <div className="bg-[#c0ebea] p-8 rounded-xl flex flex-col items-center text-center space-y-4">
            <span className="material-symbols-outlined text-4xl text-[#305858]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            <h3 className="text-xl font-bold text-[#305858]" style={{ fontFamily: "'Manrope', sans-serif" }}>Prefiere WhatsApp?</h3>
            <p className="text-[#305858]/80 text-sm max-w-xs">Obtén una respuesta rápida enviándonos fotos de tu espacio directamente.</p>
            <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-[#305858] text-[#c0ebea] px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity text-sm" style={{ textDecoration: 'none' }}>
              Contactar por WhatsApp
            </a>
          </div>

          {/* Contact Details */}
          <div className="bg-[#f2f4f4] p-8 rounded-xl space-y-6">
            <h3 className="text-lg font-bold text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>Nuestros Datos</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#757c7d]">location_on</span>
                <div>
                  <p className="font-semibold text-[#2d3435]">Estudio Central</p>
                  <p className="text-[#5a6061] text-sm">{business.address}, {business.postalCode} {business.city}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#757c7d]">mail</span>
                <div>
                  <p className="font-semibold text-[#2d3435]">Correo</p>
                  <p className="text-[#5a6061] text-sm">{business.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#757c7d]">call</span>
                <div>
                  <p className="font-semibold text-[#2d3435]">Teléfono</p>
                  <p className="text-[#5a6061] text-sm">{business.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#757c7d]">schedule</span>
                <div>
                  <p className="font-semibold text-[#2d3435]">Horario</p>
                  <p className="text-[#5a6061] text-sm">{contacto.schedule}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Color Swatch */}
          <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow" style={{ border: '1px solid rgba(173,179,180,0.1)' }}>
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#3d6565] shadow-inner" />
              <div>
                <p className="font-bold text-sm text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>Color Destacado: Mineral Spruce</p>
                <p className="text-xs text-[#5a6061]">Hover para ver detalles técnicos</p>
              </div>
            </div>
            <div className="mt-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderTop: '1px solid rgba(173,179,180,0.1)' }}>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#5a6061] block uppercase tracking-tighter">Textura</span>
                  <span className="font-semibold text-[#2d3435]">Satinado Mate</span>
                </div>
                <div>
                  <span className="text-[#5a6061] block uppercase tracking-tighter">LRV (Reflectancia)</span>
                  <span className="font-semibold text-[#2d3435]">12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-16">
        <div className="h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm grayscale opacity-80 hover:grayscale-0 transition-all duration-700">
          <img src={images.contactMap} alt="Service area map" className="w-full h-full object-cover" />
        </div>
      </section>
    </main>
  );
}
