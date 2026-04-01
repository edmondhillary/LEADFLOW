'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contacto, images, business } from '../data';

export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', tipo: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ nombre: '', email: '', telefono: '', tipo: '', mensaje: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Hero */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#635e57', display: 'block', marginBottom: '16px' }}>{contacto.badge}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Demos forma a tu <br /><span style={{ fontStyle: 'italic' }}>visión.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p className="text-base md:text-lg max-w-sm" style={{ color: '#5a615c', lineHeight: 1.7 }}>{contacto.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Form + Details */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          {/* Form */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-20" style={{ backgroundColor: '#f3f4f0' }}>
            <h2 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>Solicitar Proyecto</h2>

            {submitted && (
              <div className="mb-8 p-4 text-center text-sm" style={{ backgroundColor: '#25d366', color: 'white' }}>
                Gracias. Tu solicitud ha sido enviada. Un arquitecto te contactará pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', display: 'block', marginBottom: '8px' }}>Nombre</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Tu nombre completo" className="w-full py-3 text-sm" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(118,124,119,0.2)', outline: 'none', color: '#2e3430' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', display: 'block', marginBottom: '8px' }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@ejemplo.com" autoComplete="email" className="w-full py-3 text-sm" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(118,124,119,0.2)', outline: 'none', color: '#2e3430' }} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', display: 'block', marginBottom: '8px' }}>Teléfono</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+34 000 000 000" autoComplete="tel" className="w-full py-3 text-sm" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(118,124,119,0.2)', outline: 'none', color: '#2e3430' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', display: 'block', marginBottom: '8px' }}>Tipo de Proyecto</label>
                  <select name="tipo" value={formData.tipo} onChange={handleChange} required className="w-full py-3 text-sm appearance-none" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(118,124,119,0.2)', outline: 'none', color: '#2e3430' }}>
                    <option value="">Seleccionar...</option>
                    {contacto.serviceOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', display: 'block', marginBottom: '8px' }}>Mensaje</label>
                <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows={4} placeholder="Describe brevemente tu proyecto..." className="w-full py-3 text-sm resize-none" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(118,124,119,0.2)', outline: 'none', color: '#2e3430' }} />
              </div>
              <div className="pt-4">
                <button type="submit" className="group flex items-center gap-3 transition-all active:scale-[0.98]" style={{ backgroundColor: '#5f5e5e', color: '#faf7f6', padding: '16px 40px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer' }}>
                  Enviar Solicitud
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            <div>
              <h3 className="text-xl md:text-2xl mb-6" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>Datos del Estudio</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1" style={{ color: '#635e57' }}>location_on</span>
                  <div>
                    <p className="text-sm" style={{ color: '#2e3430' }}>{business.address}</p>
                    <p className="text-sm" style={{ color: '#5a615c' }}>{business.postalCode} {business.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1" style={{ color: '#635e57' }}>mail</span>
                  <p className="text-sm" style={{ color: '#2e3430' }}>{business.email}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1" style={{ color: '#635e57' }}>call</span>
                  <p className="text-sm" style={{ color: '#2e3430' }}>{business.phone}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full overflow-hidden" style={{ height: '350px', backgroundColor: '#ecefea' }}>
              <img src={images.contactMap} alt="Ubicación" className="w-full h-full object-cover grayscale opacity-80 hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Ready card */}
            <div className="p-8 md:p-10" style={{ backgroundColor: '#f3f4f0' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#635e57', display: 'block', marginBottom: '12px' }}>Primeros Pasos</span>
              <h4 className="text-xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', color: '#2e3430' }}>Horarios de Atención</h4>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#5a615c' }}>Horario:</span>
                  <span style={{ color: '#2e3430', fontWeight: 500 }}>{contacto.schedule}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#5a615c' }}>Tiempo de Respuesta:</span>
                  <span style={{ color: '#2e3430', fontWeight: 500 }}>{contacto.responseTime}</span>
                </div>
              </div>
              <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-fit pb-1 transition-colors" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#2e3430', borderBottom: '2px solid #5f5e5e', textDecoration: 'none' }}>
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[images.contactGallery1, images.contactGallery2, images.contactGallery3].map((img, i) => (
            <div key={i} className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <img src={img} alt={`Proyecto ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" style={{ marginTop: i === 1 ? '24px' : 0 }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
