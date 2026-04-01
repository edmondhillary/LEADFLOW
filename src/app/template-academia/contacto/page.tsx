'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { contacto, business, images } from '../data';

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    curso: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa', color: '#191c1d' }}>

      {/* Header */}
      <section className="w-full py-20 md:py-24" style={{ background: 'linear-gradient(to right, #001944, #002c6e)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#6b95f3', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>{contacto.badge}</p>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1.05, marginBottom: '18px' }}>
            {contacto.title}
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left — Contact Info + Map */}
            <div>
              {/* Contact Info Cards */}
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { label: 'Telefono', value: business.phone, icon: 'tel', href: `tel:${business.phoneIntl}` },
                  { label: 'Email', value: business.email, icon: 'mail', href: `mailto:${business.email}` },
                  { label: 'Direccion', value: `${business.address}, ${business.postalCode} ${business.city}`, icon: 'map', href: '#' },
                  { label: 'Horario', value: contacto.schedule, icon: 'clock', href: '#' },
                ].map(item => (
                  <a key={item.label} href={item.href} className="rounded-2xl p-5 flex items-start gap-4 transition-all hover:shadow-md" style={{ backgroundColor: '#ffffff', textDecoration: 'none', boxShadow: '0 4px 16px rgba(25,28,29,0.04)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d9e2ff' }}>
                      {item.icon === 'tel' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#001944" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>}
                      {item.icon === 'mail' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#001944" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
                      {item.icon === 'map' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#001944" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                      {item.icon === 'clock' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#001944" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: '#454652', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{item.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#191c1d' }}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map Image */}
              <div className="rounded-[2rem] overflow-hidden relative" style={{ height: '260px' }}>
                <Image src={images.contactMap} alt="Ubicacion Scholarly Academy" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl px-5 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 24px rgba(25,28,29,0.12)' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#001944', fontFamily: "'Manrope', sans-serif" }}>{business.name}</p>
                    <p style={{ fontSize: '11px', color: '#454652' }}>{business.address}</p>
                  </div>
                </div>
              </div>

              {/* Consultation Booking */}
              <div className="mt-6 rounded-[2rem] p-7" style={{ background: 'linear-gradient(to right, #001944, #002c6e)' }}>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                  Sesion de orientacion gratuita
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '18px' }}>
                  Reserva una videollamada de 30 minutos con un asesor academico. Sin compromiso, sin coste.
                </p>
                <a href={`https://wa.me/${business.whatsapp}?text=Hola!%20Me%20gustaria%20reservar%20una%20sesion%20de%20orientacion.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '13px', fontWeight: 700, padding: '12px 24px', textDecoration: 'none' }}>
                  Reservar por WhatsApp
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div className="rounded-[2rem] p-8 md:p-10" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#acf4a4' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0c5216" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '26px', fontWeight: 800, color: '#191c1d', letterSpacing: '-0.03em' }}>
                    Mensaje recibido
                  </h3>
                  <p style={{ fontSize: '15px', color: '#454652', lineHeight: 1.75, maxWidth: '340px' }}>
                    Un asesor academico se pondra en contacto contigo en menos de {contacto.responseTime}.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="rounded-xl px-6 py-3 transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #001944, #002c6e)', color: '#ffffff', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, color: '#191c1d', letterSpacing: '-0.03em', marginBottom: '6px' }}>
                    {contacto.formTitle}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#454652', lineHeight: 1.65, marginBottom: '28px' }}>
                    {contacto.formSubtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Nombre */}
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full rounded-xl px-4 py-3.5 outline-none transition-all"
                        style={{ backgroundColor: '#f3f4f5', border: '1.5px solid #e7e8e9', fontSize: '14px', color: '#191c1d', fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>

                    {/* Email + Telefono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          className="w-full rounded-xl px-4 py-3.5 outline-none transition-all"
                          style={{ backgroundColor: '#f3f4f5', border: '1.5px solid #e7e8e9', fontSize: '14px', color: '#191c1d', fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                          Telefono
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          placeholder="+34 600 000 000"
                          className="w-full rounded-xl px-4 py-3.5 outline-none transition-all"
                          style={{ backgroundColor: '#f3f4f5', border: '1.5px solid #e7e8e9', fontSize: '14px', color: '#191c1d', fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>
                    </div>

                    {/* Curso de interes */}
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                        Curso de interes *
                      </label>
                      <select
                        name="curso"
                        required
                        value={form.curso}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3.5 outline-none transition-all appearance-none"
                        style={{ backgroundColor: '#f3f4f5', border: '1.5px solid #e7e8e9', fontSize: '14px', color: form.curso ? '#191c1d' : '#454652', fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">Selecciona un curso</option>
                        {contacto.courseOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                        Mensaje
                      </label>
                      <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        placeholder="Cuentanos sobre tus objetivos o cualquier pregunta que tengas..."
                        rows={4}
                        className="w-full rounded-xl px-4 py-3.5 outline-none transition-all resize-none"
                        style={{ backgroundColor: '#f3f4f5', border: '1.5px solid #e7e8e9', fontSize: '14px', color: '#191c1d', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}
                      />
                    </div>

                    <button type="submit" className="w-full rounded-xl py-4 transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '15px', fontWeight: 700, fontFamily: "'Manrope', sans-serif" }}>
                      Solicitar informacion
                    </button>

                    <p style={{ fontSize: '11px', color: '#454652', textAlign: 'center', lineHeight: 1.6 }}>
                      Al enviar aceptas nuestra{' '}
                      <Link href="#" style={{ color: '#001944', textDecoration: 'underline' }}>Politica de Privacidad</Link>.
                      Respuesta garantizada en {contacto.responseTime}.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
