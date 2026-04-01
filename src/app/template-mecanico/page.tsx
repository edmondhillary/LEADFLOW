'use client';

import Link from 'next/link';
import { useState } from 'react';
import { business, images, stats, homeServices, techSpecs } from './data';

export default function MecanicoHome() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    vehiculo: '',
    problema: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen bg-[#121416] flex items-center overflow-hidden"
      >
        {/* Machined texture overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #333537 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Dark image bg */}
        <img
          src={images.heroBg}
          alt="Taller mecánico Industrial Authority"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(18,20,22,0.95) 0%, rgba(18,20,22,0.70) 60%, rgba(18,20,22,0.85) 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: headline */}
            <div className="flex flex-col gap-6">
              <span
                className="inline-block text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-5 py-2 w-fit"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Urgencias 24h — Madrid
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter text-[#e2e2e5]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow: '0 0 20px rgba(255, 181, 153, 0.3)',
                }}
              >
                TALLER
                <span className="block text-[#ff5f00]">MECÁNICO</span>
                <span className="block">EN</span>
                <span className="block text-[#ffb599]">MADRID</span>
                <span className="block text-[#e2e2e5] text-4xl md:text-5xl">URGENCIAS</span>
              </h1>
              <p className="text-[#c4c6cc] text-base md:text-lg leading-relaxed max-w-md">
                Diagnóstico de precisión, reparación certificada y mantenimiento preventivo. Respuesta en 15 minutos, garantía total en cada trabajo.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="text-[#531a00] font-black uppercase tracking-widest px-8 py-4 text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}
                >
                  LLAMAR AHORA
                </a>
                <Link
                  href="/template-mecanico/servicios"
                  className="border border-[#ffb599]/40 text-[#ffb599] uppercase tracking-[0.15em] text-sm font-bold px-8 py-4 hover:border-[#ff5f00] hover:text-[#ff5f00] transition-colors duration-200"
                >
                  VER SERVICIOS
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#5b4137]/20">
                {stats.map((stat) => (
                  <div key={stat.value} className="flex flex-col gap-1">
                    <span
                      className="text-2xl font-black text-[#ff5f00] leading-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-xs text-[#c4c6cc]/70 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image with orange icon box */}
            <div className="relative hidden md:block">
              <div className="aspect-[4/5] overflow-hidden grayscale">
                <img
                  src={images.mechanicHands}
                  alt="Mecánico trabajando"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Orange icon box */}
              <div
                className="absolute -bottom-6 -left-6 w-28 h-28 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#531a00" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              {/* Live indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#121416]/80 px-3 py-2 border border-[#5b4137]/30">
                <span className="w-2 h-2 bg-[#ff5f00] animate-pulse" style={{ borderRadius: 0 }} />
                <span className="text-xs text-[#ffb599] uppercase tracking-widest font-bold">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bounce arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb599" strokeWidth="1.5" opacity="0.6">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section className="py-32 bg-[#1a1c1e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-4">
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-4 py-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Servicios de Alta Intensidad
            </span>
          </div>
          <div className="flex items-baseline gap-6 mb-16">
            <span
              className="text-7xl font-black text-[#282a2c] leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              01
            </span>
            <h2
              className="text-3xl md:text-5xl font-black uppercase text-[#e2e2e5] leading-tight tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              LO QUE
              <span className="text-[#ff5f00]"> HACEMOS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeServices.map((service) => (
              <div
                key={service.title}
                className="group relative bg-[#1e2022] p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Orange left-border strip */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00] transition-all duration-300 group-hover:w-1.5" />

                <div className="text-4xl pl-2">{service.icon}</div>
                <h3
                  className="text-xl font-black uppercase tracking-tight text-[#e2e2e5] pl-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-[#c4c6cc] text-sm leading-relaxed pl-2">{service.desc}</p>
                <ul className="flex flex-col gap-2 pl-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#c4c6cc]">
                      <span className="w-1.5 h-1.5 bg-[#ff5f00] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/template-mecanico/servicios"
              className="inline-block border border-[#ffb599]/40 text-[#ffb599] uppercase tracking-[0.15em] text-sm font-bold px-10 py-4 hover:bg-[#ffb599]/10 transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              VER TODOS LOS SERVICIOS
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EMERGENCY CTA BANNER ─── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}
      >
        {/* Machined texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #531a00 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter text-[#531a00] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ¿VARADO EN LA
            <span className="block">CARRETERA?</span>
          </h2>
          <p className="text-[#531a00]/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Nuestro equipo de respuesta rápida está disponible 24 horas. Enviamos asistencia en menos de 15 minutos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${business.phoneIntl}`}
              className="bg-[#121416] text-[#ffb599] uppercase tracking-[0.15em] text-sm font-black px-10 py-4 hover:bg-[#1a1c1e] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              LLAMAR AHORA: {business.phone}
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#531a00] text-[#531a00] uppercase tracking-[0.15em] text-sm font-black px-10 py-4 hover:bg-[#531a00] hover:text-[#ffb599] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              WHATSAPP URGENTE
            </a>
          </div>
        </div>
      </section>

      {/* ─── TRUST / TECH SPECS ─── */}
      <section className="py-32 bg-[#121416]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: workshop image with LIVE indicator */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={images.workshopInterior}
                  alt="Taller Industrial Authority"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              {/* Orange strip */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00]" />
              {/* LIVE badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#121416]/90 px-4 py-2 border border-[#5b4137]/40">
                <span className="w-2 h-2 bg-[#ff5f00] animate-pulse" style={{ borderRadius: 0 }} />
                <span
                  className="text-xs text-[#ffb599] uppercase tracking-widest font-black"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  OPERATIVO 24H
                </span>
              </div>
              {/* Bottom text */}
              <div className="mt-4">
                <p
                  className="text-xs text-[#c4c6cc]/50 uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Autoridad Técnica
                </p>
                <p className="text-sm text-[#c4c6cc]/80 mt-1">
                  Certificación ASE Master — Nivel máximo de cualificación técnica automotriz reconocido internacionalmente.
                </p>
              </div>
            </div>

            {/* Right: tech specs 2x2 grid */}
            <div className="flex flex-col gap-6">
              <div>
                <span
                  className="text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-4 py-2 inline-block mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Especificaciones Técnicas
                </span>
                <h2
                  className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter text-[#e2e2e5]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  PRECISIÓN
                  <span className="block text-[#ff5f00]">INDUSTRIAL</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {techSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-[#1e2022] p-6 border-b-2 border-[#ff5f00]"
                  >
                    <p
                      className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {spec.label}
                    </p>
                    <p
                      className="text-lg font-black text-[#ffb599] uppercase tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[#c4c6cc]/70 text-sm leading-relaxed">
                Más de 15 años de experiencia en reparación mecánica de alta precisión. Software de diagnóstico AUTOLOGIC 2.0, compatible con más de 150 marcas y modelos europeos y asiáticos.
              </p>
              <Link
                href="/template-mecanico/nosotros"
                className="inline-flex items-center gap-2 text-[#ffb599] text-sm tracking-[0.1em] uppercase font-bold hover:gap-4 transition-all duration-200"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Conocer el taller
                <span className="w-6 h-px bg-[#ff5f00] inline-block align-middle" />
                &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT FORM ─── */}
      <section className="py-32 bg-[#1a1c1e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left: info */}
            <div className="flex flex-col gap-8">
              <div>
                <span
                  className="text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-4 py-2 inline-block mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Contacto de Urgencia
                </span>
                <h2
                  className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter text-[#e2e2e5]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  SOLICITAR
                  <span className="block text-[#ff5f00]">ASISTENCIA</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#1e2022] p-5 border-l-4 border-[#ff5f00]">
                  <p
                    className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Dirección
                  </p>
                  <p className="text-sm text-[#e2e2e5]">{business.address}</p>
                  <p className="text-sm text-[#e2e2e5]">{business.postalCode} {business.city}</p>
                </div>
                <div className="bg-[#1e2022] p-5 border-l-4 border-[#ff5f00]">
                  <p
                    className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Teléfono 24H
                  </p>
                  <a href={`tel:${business.phoneIntl}`} className="text-sm text-[#ffb599] font-bold">
                    {business.phone}
                  </a>
                </div>
                <div className="bg-[#1e2022] p-5 border-l-4 border-[#ff5f00]">
                  <p
                    className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Email
                  </p>
                  <a href={`mailto:${business.email}`} className="text-sm text-[#c4c6cc]">
                    {business.email}
                  </a>
                </div>
              </div>
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={images.contactMap}
                  alt="Ubicación Industrial Authority Madrid"
                  className="w-full h-full object-cover grayscale opacity-60"
                />
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-[#1e2022] p-8 border-t-4 border-[#ff5f00]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
                  <div className="w-16 h-16 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#531a00" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-black uppercase text-[#e2e2e5]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    SOLICITUD RECIBIDA
                  </h3>
                  <p className="text-[#c4c6cc] text-sm leading-relaxed">
                    Nos pondremos en contacto en menos de 15 minutos.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3
                    className="text-xl font-black uppercase text-[#e2e2e5] mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    DATOS DE URGENCIA
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="nombre"
                      className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="bg-[#282a2c] border border-[#5b4137]/30 text-[#e2e2e5] px-4 py-3 text-sm outline-none focus:border-[#ff5f00] transition-colors placeholder-[#c4c6cc]/30"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="telefono"
                      className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Teléfono *
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="bg-[#282a2c] border border-[#5b4137]/30 text-[#e2e2e5] px-4 py-3 text-sm outline-none focus:border-[#ff5f00] transition-colors placeholder-[#c4c6cc]/30"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="vehiculo"
                      className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Vehículo
                    </label>
                    <input
                      id="vehiculo"
                      type="text"
                      value={formData.vehiculo}
                      onChange={(e) => setFormData({ ...formData, vehiculo: e.target.value })}
                      className="bg-[#282a2c] border border-[#5b4137]/30 text-[#e2e2e5] px-4 py-3 text-sm outline-none focus:border-[#ff5f00] transition-colors placeholder-[#c4c6cc]/30"
                      placeholder="Marca, modelo, año"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="problema"
                      className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Descripción del problema *
                    </label>
                    <textarea
                      id="problema"
                      required
                      rows={4}
                      value={formData.problema}
                      onChange={(e) => setFormData({ ...formData, problema: e.target.value })}
                      className="bg-[#282a2c] border border-[#5b4137]/30 text-[#e2e2e5] px-4 py-3 text-sm outline-none focus:border-[#ff5f00] transition-colors placeholder-[#c4c6cc]/30 resize-none"
                      placeholder="Describe la avería o problema que has detectado"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-[#531a00] font-black uppercase tracking-widest py-4 text-sm transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)', fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    ENVIAR SOLICITUD
                  </button>
                  <p className="text-xs text-[#c4c6cc]/40 text-center">
                    Respuesta garantizada en menos de 15 minutos
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
