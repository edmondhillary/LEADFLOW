'use client';

import { useState } from 'react';
import { contacto, business, images } from '../data';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    personas: '',
    fecha: '',
    servicio: '',
    mensaje: '',
  });
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
      <section className="py-24 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] border border-[#735C00]/30 px-5 py-2 inline-block mb-8">
            {contacto.badge}
          </span>
          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-bold text-[#1B1D0E] leading-none tracking-tight"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {contacto.title}
            <span className="block italic text-[#735C00]"> en The Culinary Editorial</span>
          </h1>
          <p className="text-[#444748] text-lg mt-6 max-w-2xl leading-relaxed">
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTACT ─── */}
      <section className="py-20 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left — Form + Image (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-8">
              {/* Form card */}
              <div className="bg-[#FFFFFF] p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <span className="material-symbols-outlined text-[#735C00] text-5xl block mb-4">check_circle</span>
                    <h3
                      className="text-2xl font-bold text-[#1B1D0E] mb-3"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      Reserva Recibida
                    </h3>
                    <p className="text-[#444748] text-sm leading-relaxed">
                      Hemos recibido su solicitud. Nos pondremos en contacto en menos de 24 horas para confirmar su reserva.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[0.15em] uppercase text-[#747878]">Nombre completo</label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Julian Vance"
                          className="bg-transparent border-b border-[#747878]/30 focus:border-[#1B1D0E] py-3 text-[#1B1D0E] placeholder-[#C4C7C7] text-sm outline-none transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[0.15em] uppercase text-[#747878]">Correo electronico</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="nombre@correo.com"
                          className="bg-transparent border-b border-[#747878]/30 focus:border-[#1B1D0E] py-3 text-[#1B1D0E] placeholder-[#C4C7C7] text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[0.15em] uppercase text-[#747878]">Telefono</label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="+34 600 000 000"
                          className="bg-transparent border-b border-[#747878]/30 focus:border-[#1B1D0E] py-3 text-[#1B1D0E] placeholder-[#C4C7C7] text-sm outline-none transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[0.15em] uppercase text-[#747878]">Numero de personas</label>
                        <input
                          type="number"
                          name="personas"
                          value={formData.personas}
                          onChange={handleChange}
                          placeholder="2"
                          min="1"
                          className="bg-transparent border-b border-[#747878]/30 focus:border-[#1B1D0E] py-3 text-[#1B1D0E] placeholder-[#C4C7C7] text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[0.15em] uppercase text-[#747878]">Fecha preferida</label>
                        <input
                          type="date"
                          name="fecha"
                          value={formData.fecha}
                          onChange={handleChange}
                          className="bg-transparent border-b border-[#747878]/30 focus:border-[#1B1D0E] py-3 text-[#1B1D0E] text-sm outline-none transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-[0.15em] uppercase text-[#747878]">Tipo de reserva</label>
                        <select
                          name="servicio"
                          value={formData.servicio}
                          onChange={handleChange}
                          className="bg-transparent border-b border-[#747878]/30 focus:border-[#1B1D0E] py-3 text-[#1B1D0E] text-sm outline-none transition-colors cursor-pointer"
                        >
                          <option value="">Seleccionar...</option>
                          {contacto.serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs tracking-[0.15em] uppercase text-[#747878]">Mensaje o peticion especial</label>
                      <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Alergias, ocasiones especiales, preferencias de mesa..."
                        className="bg-transparent border-b border-[#747878]/30 focus:border-[#1B1D0E] py-3 text-[#1B1D0E] placeholder-[#C4C7C7] text-sm outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#3C0610] text-white uppercase tracking-[0.15em] text-sm font-bold px-8 py-4 hover:bg-[#2d0409] transition-colors w-fit"
                    >
                      ENVIAR SOLICITUD
                    </button>
                  </form>
                )}
              </div>

              {/* Atmospheric image with gold CTA */}
              <div className="relative overflow-hidden aspect-[16/7]">
                <img
                  src={images.tableSetting}
                  alt="Ambiente de sala"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(27,29,14,0.7) 0%, rgba(27,29,14,0.2) 100%)' }}
                />
                <div className="absolute inset-0 flex items-center px-10">
                  <div>
                    <p
                      className="text-white text-2xl font-bold italic mb-6"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      Una experiencia para recordar
                    </p>
                    <a
                      href={`https://wa.me/${business.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#FED65B] text-[#745C00] uppercase tracking-[0.15em] text-sm font-bold px-8 py-4 hover:bg-[#f5cb4a] transition-colors"
                    >
                      RESERVAR AHORA
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Info (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-10">
              {/* Address */}
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#735C00] mb-3">Direccion</p>
                <p
                  className="text-3xl font-bold text-[#1B1D0E] leading-tight"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {business.address},<br />
                  {business.postalCode} {business.city}
                </p>
              </div>

              {/* Hours table */}
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#735C00] mb-4">Horario</p>
                <div className="flex flex-col gap-0">
                  {[
                    { day: 'Lunes', hours: 'Cerrado' },
                    { day: 'Martes — Sabado', hours: '13:30 — 16:00 / 20:30 — 23:30' },
                    { day: 'Domingo', hours: '13:30 — 16:30' },
                  ].map((row, i) => (
                    <div
                      key={row.day}
                      className={`flex justify-between py-3 ${i < 2 ? 'border-b border-[#C4C7C7]/40' : ''}`}
                    >
                      <span className="text-sm text-[#1B1D0E] font-medium">{row.day}</span>
                      <span className="text-sm text-[#444748]">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#735C00] mb-3">Telefono</p>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="text-2xl font-bold text-[#1B1D0E] hover:text-[#735C00] transition-colors"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {business.phone}
                </a>
              </div>

              {/* Map image */}
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={images.contactMap}
                  alt="Mapa ubicacion The Culinary Editorial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL ─── */}
      <section className="py-24 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Social links */}
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] block mb-8">Siguenos</span>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Instagram', handle: '@culinaryeditorial', href: '#' },
                  { label: 'TikTok', handle: '@culinaryeditorial', href: '#' },
                  { label: 'Facebook', handle: 'The Culinary Editorial', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center justify-between py-4 border-b border-[#C4C7C7]/40 group hover:border-[#735C00] transition-colors"
                  >
                    <div>
                      <p
                        className="text-xl font-bold text-[#1B1D0E] group-hover:text-[#735C00] transition-colors"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      >
                        {social.label}
                      </p>
                      <p className="text-xs text-[#747878] mt-1">{social.handle}</p>
                    </div>
                    <span className="material-symbols-outlined text-[#C4C7C7] group-hover:text-[#735C00] transition-colors">
                      arrow_outward
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* 2-col image grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images.dish1}
                  alt="Galeria The Culinary Editorial"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden mt-8">
                <img
                  src={images.dish4}
                  alt="Galeria The Culinary Editorial"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
