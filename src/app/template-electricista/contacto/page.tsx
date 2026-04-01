'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, images, blogPosts, contact } from '../data';

export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', servicio: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="px-6 py-16 md:py-24 relative overflow-hidden bg-[#f6f3f2]">
        {/* Blueprint dots */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #d0c6ab 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.15,
          }}
        />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          <div className="md:col-span-7">
            <span className="inline-block py-1 px-3 bg-[#705d00] text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Precision Engineering
            </span>
            <h1
              className="font-extrabold tracking-[-0.03em] text-[#1c1b1b] mb-6 uppercase"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: '1.1' }}
            >
              Soporte Técnico <br />
              <span className="text-[#705d00]">&amp; Seguridad</span>
            </h1>
            <p className="text-[#5f5e5e] max-w-lg mb-8 leading-relaxed">
              Soluciones industriales y residenciales con estándares de seguridad certificados. Disponibilidad 24/7 para emergencias eléctricas y mantenimiento preventivo.
            </p>
          </div>
          <div className="md:col-span-5 h-full min-h-[400px]">
            <div className="w-full h-full bg-zinc-900 overflow-hidden shadow-2xl relative" style={{ minHeight: '400px' }}>
              <img
                src={images.circuitPanel}
                alt="Panel eléctrico industrial"
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700 absolute inset-0"
              />
              <div className="absolute bottom-0 right-0 bg-[#ffd700] p-6">
                <span className="block text-[#705e00] font-black text-4xl leading-none">24/7</span>
                <span className="block text-[#705e00] font-bold uppercase text-xs tracking-widest mt-1">Ready Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT MAIN ─── */}
      <section className="py-24 px-6 bg-[#fcf9f8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Left — info + map */}
            <div className="flex-1 space-y-12">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Nuestra Ubicación</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#705d00] text-3xl">location_on</span>
                    <div>
                      <p className="font-bold text-lg leading-tight">Volt Precision Electrical HQ</p>
                      <p className="text-[#5f5e5e]">{business.address}</p>
                      <p className="text-[#5f5e5e]">{business.city}, {business.country} {business.zip}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#705d00] text-3xl">phone_in_talk</span>
                    <div>
                      <p className="font-bold text-lg leading-tight">Contacto Directo</p>
                      <a href={`tel:${business.phoneIntl}`} className="text-[#5f5e5e] hover:text-[#705d00] transition-colors">
                        {business.phone}
                      </a>
                      <p className="text-[#5f5e5e]">{business.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full aspect-video bg-[#e5e2e1] relative overflow-hidden group">
                <img
                  src={images.contactMap}
                  alt="Mapa Madrid"
                  className="w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-[#705d00]/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined text-[#705d00] text-5xl drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="flex-1 bg-[#f6f3f2] p-8 md:p-12 shadow-sm border-l-4 border-[#705d00]">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Solicitud de Servicio</h3>

              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#ffd700] flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-[#705e00] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-3">Solicitud Enviada</h4>
                  <p className="text-[#5f5e5e] leading-relaxed">
                    Nuestro equipo técnico se pondrá en contacto en menos de 24 horas para confirmar su intervención.
                  </p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {[
                    { name: 'nombre', label: 'Nombre Completo', type: 'text', placeholder: 'Ej. Juan Pérez' },
                    { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'juan@empresa.com' },
                  ].map((field) => (
                    <div key={field.name} className="group">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5f5e5e] mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={(formData as Record<string, string>)[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full bg-transparent border-0 border-b-2 border-[#d0c6ab] focus:ring-0 focus:border-[#705d00] px-0 py-2 transition-all outline-none text-sm"
                      />
                    </div>
                  ))}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5f5e5e] mb-1">
                      Tipo de Servicio
                    </label>
                    <select
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      className="w-full bg-transparent border-0 border-b-2 border-[#d0c6ab] focus:ring-0 focus:border-[#705d00] px-0 py-2 transition-all outline-none appearance-none text-sm cursor-pointer"
                    >
                      <option value="">Seleccionar...</option>
                      {contact.serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5f5e5e] mb-1">
                      Mensaje o Especificaciones
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describa brevemente su necesidad técnica..."
                      className="w-full bg-transparent border-0 border-b-2 border-[#d0c6ab] focus:ring-0 focus:border-[#705d00] px-0 py-2 transition-all outline-none resize-none text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#ffd700] text-[#705e00] py-4 font-black uppercase tracking-widest text-sm hover:bg-[#e9c400] transition-colors flex items-center justify-center gap-2"
                  >
                    Enviar Solicitud <span className="material-symbols-outlined text-lg">bolt</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section className="py-24 px-6 bg-[#f6f3f2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#705d00] font-bold text-xs uppercase tracking-[0.3em]">Knowledge Base</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter mt-2">Technical Blog</h2>
            </div>
            <a className="hidden md:block text-sm font-bold uppercase border-b-2 border-[#705d00] pb-1 hover:text-[#705d00] transition-colors" href="#">
              Ver todos los artículos
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured article */}
            <article className="md:col-span-2 bg-white flex flex-col md:flex-row group cursor-pointer overflow-hidden">
              <div className="md:w-1/2 overflow-hidden h-64 md:h-full">
                <img
                  src={images.blogFeatured}
                  alt="Seguridad eléctrica"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#705d00] uppercase tracking-widest">Seguridad</span>
                  <h3 className="text-2xl font-black mt-4 leading-tight group-hover:text-[#705d00] transition-colors">
                    5 CONSEJOS DE SEGURIDAD ELÉCTRICA PARA TU HOGAR
                  </h3>
                  <p className="text-[#5f5e5e] mt-4 text-sm leading-relaxed">
                    Protege tu infraestructura y a tu familia con estas comprobaciones preventivas esenciales recomendadas por ingenieros certificados.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>8 Min Lectura</span>
                  <span className="material-symbols-outlined text-[#705d00] group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </div>
            </article>

            {/* Dark article */}
            <article className="bg-zinc-900 text-white p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'radial-gradient(circle, #d0c6ab 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-[#ffd700] uppercase tracking-widest">Eficiencia</span>
                <h3 className="text-2xl font-black mt-6 leading-tight">CÓMO AHORRAR EN TU FACTURA DE LUZ</h3>
                <p className="text-zinc-400 mt-4 text-sm">Análisis técnico de optimización de carga y nuevos sistemas de iluminación LED industrial.</p>
              </div>
              <div className="mt-12 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 relative z-10">
                <span>12 Min Lectura</span>
                <span className="material-symbols-outlined text-[#ffd700]">trending_down</span>
              </div>
            </article>

            {/* White article */}
            <article className="bg-white p-8 flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-xl transition-shadow">
              <div>
                <span className="text-[10px] font-bold text-[#705d00] uppercase tracking-widest">Normativa</span>
                <h3 className="text-xl font-black mt-6 leading-tight">GUÍA COMPLETA DE REGLAMENTACIÓN 2024</h3>
                <p className="text-[#5f5e5e] mt-4 text-sm">Resumen de los cambios legislativos en instalaciones de baja tensión y certificaciones REBT.</p>
              </div>
              <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <span>15 Min Lectura</span>
                <span className="material-symbols-outlined text-[#705d00] group-hover:translate-x-2 transition-transform">article</span>
              </div>
            </article>

            {/* Yellow article */}
            <article className="bg-[#ffd700] p-8 flex flex-col justify-between group cursor-pointer">
              <div>
                <span className="text-[10px] font-bold text-[#705e00] uppercase tracking-widest">Tecnología</span>
                <h3 className="text-xl font-black mt-6 leading-tight text-[#705e00]">PANEL SOLAR VS RED TRADICIONAL</h3>
                <p className="text-[#705e00]/80 mt-4 text-sm">¿Es rentable la transición al autoconsumo en naves industriales este año?</p>
              </div>
              <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#705e00]/60">
                <span>10 Min Lectura</span>
                <span className="material-symbols-outlined text-[#705e00]">solar_power</span>
              </div>
            </article>

            {/* Last article */}
            <article className="bg-white p-8 flex flex-col justify-between group cursor-pointer shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-[#705d00] uppercase tracking-widest">Mantenimiento</span>
                <h3 className="text-xl font-black mt-6 leading-tight">TERMOGRAFÍA: PREVENCIÓN DE INCENDIOS</h3>
                <p className="text-[#5f5e5e] mt-4 text-sm">Cómo el escaneo térmico puede detectar fallos invisibles antes de que ocurran.</p>
              </div>
              <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <span>6 Min Lectura</span>
                <span className="material-symbols-outlined text-[#705d00] group-hover:translate-x-2 transition-transform">thermostat</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── SERVICE INTEGRITY BAR ─── */}
      <div className="w-full bg-[#f0eded] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap">Service Integrity</span>
            <div className="h-4 flex-grow bg-[#e5e2e1] relative">
              <div className="absolute inset-0 w-[94%] bg-[#705d00]" />
            </div>
            <span className="font-black text-xl italic">94%</span>
          </div>
        </div>
      </div>
    </>
  );
}
