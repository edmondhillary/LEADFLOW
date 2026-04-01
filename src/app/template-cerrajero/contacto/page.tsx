'use client';

import { useState } from 'react';
import { business, contacto, images } from '../data';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', servicio: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle = {
    backgroundColor: '#2a2a2a',
    color: '#e5e2e1',
    fontSize: '14px',
    border: '1px solid #4d4732',
    borderRadius: '8px',
    padding: '14px 16px',
    width: '100%',
    outline: 'none',
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 600,
    color: '#d0c6ab',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="bg-[#131313] py-24"
        style={{ background: 'radial-gradient(circle at top right, rgba(255,215,0,0.08) 0%, transparent 60%), #131313' }}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-2 mb-8">
            <span className="animate-pulse w-2 h-2 bg-[#ffd700] rounded-full" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{contacto.badge}</span>
          </div>
          <h1
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, background: 'linear-gradient(to right, #fff6df, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {contacto.title}
          </h1>
          <div className="h-1 w-20 bg-[#ffd700] mx-auto my-8" />
          <p className="max-w-xl mx-auto" style={{ fontSize: '17px', color: '#d0c6ab', lineHeight: 1.8 }}>
            {contacto.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${business.phoneIntl}`}
              className="inline-flex items-center gap-3 rounded-lg px-10 py-5 transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '16px', fontWeight: 800, textDecoration: 'none', letterSpacing: '-0.01em' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.12-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
              {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section className="bg-[#0e0e0e] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Left: info cards + map */}
            <div className="flex flex-col gap-6">
              {/* Phone card */}
              <div className="rounded-2xl bg-[#1c1b1b] p-6 flex items-start gap-5" style={{ border: '1px solid #2a2a2a' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255,215,0,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.12-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Teléfono 24h</p>
                  <a href={`tel:${business.phoneIntl}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 800, color: '#ffd700', textDecoration: 'none', letterSpacing: '-0.03em' }}>
                    {business.phone}
                  </a>
                  <p className="mt-1" style={{ fontSize: '12px', color: '#d0c6ab' }}>{contacto.schedule}</p>
                </div>
              </div>

              {/* Email card */}
              <div className="rounded-2xl bg-[#1c1b1b] p-6 flex items-start gap-5" style={{ border: '1px solid #2a2a2a' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255,215,0,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Email</p>
                  <a href={`mailto:${business.email}`} style={{ fontSize: '16px', color: '#e5e2e1', textDecoration: 'none' }}>{business.email}</a>
                </div>
              </div>

              {/* Address card */}
              <div className="rounded-2xl bg-[#1c1b1b] p-6 flex items-start gap-5" style={{ border: '1px solid #2a2a2a' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255,215,0,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Dirección</p>
                  <p style={{ fontSize: '15px', color: '#e5e2e1', lineHeight: 1.5 }}>{business.address}</p>
                </div>
              </div>

              {/* Response time card */}
              <div className="rounded-2xl p-6 flex items-center gap-5" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,215,0,0.03))', border: '1px solid rgba(255,215,0,0.2)' }}>
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>Tiempo de Respuesta</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 800, color: '#ffd700', letterSpacing: '-0.03em', lineHeight: 1 }}>{contacto.responseTime}</p>
                </div>
              </div>

              {/* Map image */}
              <div className="rounded-2xl overflow-hidden aspect-video mt-2">
                <img
                  src={images.contactMap}
                  alt="Madrid map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-[1.5rem] bg-[#1c1b1b] p-8 md:p-10" style={{ border: '1px solid #2a2a2a' }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                {contacto.formTitle}
              </h2>
              <p style={{ fontSize: '14px', color: '#d0c6ab', marginBottom: '32px' }}>{contacto.formSubtitle}</p>

              {submitted ? (
                <div className="text-center py-16">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'rgba(255,215,0,0.1)', boxShadow: '0 0 40px rgba(255,215,0,0.15)' }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffd700">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.03em' }}>
                    Solicitud Enviada
                  </h3>
                  <p className="mt-3" style={{ fontSize: '15px', color: '#d0c6ab', lineHeight: 1.7 }}>
                    Nos pondremos en contacto contigo en menos de {contacto.responseTime}.
                  </p>
                  <p className="mt-4" style={{ fontSize: '13px', color: '#d0c6ab' }}>
                    Para urgencias llama directamente:{' '}
                    <a href={`tel:${business.phoneIntl}`} style={{ color: '#ffd700', textDecoration: 'none', fontWeight: 700 }}>{business.phone}</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="nombre" style={labelStyle}>Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                      style={inputStyle}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="telefono" style={labelStyle}>Teléfono</label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={form.telefono}
                        onChange={handleChange}
                        required
                        placeholder="600 000 000"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicio" style={labelStyle}>Tipo de Servicio</label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={form.servicio}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="">Seleccionar servicio...</option>
                      {contacto.serviceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" style={labelStyle}>Mensaje</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={form.mensaje}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe la situacion o el servicio que necesitas..."
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg py-4 mt-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer' }}
                  >
                    Enviar Solicitud
                  </button>

                  <p className="text-center" style={{ fontSize: '11px', color: '#d0c6ab' }}>
                    Para urgencias, llame directamente:{' '}
                    <a href={`tel:${business.phoneIntl}`} style={{ color: '#ffd700', textDecoration: 'none', fontWeight: 700 }}>{business.phone}</a>
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
