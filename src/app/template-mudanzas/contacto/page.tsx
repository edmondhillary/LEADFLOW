'use client';

import { useState } from 'react';
import { business, contacto, images } from '../data';

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: string;
  mensaje: string;
};

const initialForm: FormState = {
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  fecha: '',
  mensaje: '',
};

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-mudanzas';
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    color: '#191c1d',
    backgroundColor: '#f8f9fa',
    border: '1px solid rgba(0,32,70,0.14)',
    borderRadius: '10px',
    padding: '13px 16px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#44474e',
    display: 'block',
    marginBottom: '6px',
    letterSpacing: '0.02em',
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa' }}>

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="max-w-xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ backgroundColor: '#edeeef' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#ef8300' }}
            />
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                color: '#44474e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {contacto.badge}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#191c1d',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              marginBottom: '18px',
            }}
          >
            {contacto.title}
          </h1>
          <p style={{ fontSize: '16px', color: '#44474e', lineHeight: 1.7 }}>
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* ── MAIN GRID ────────────────────────────────────────────── */}
      <section className="pb-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT — Office info */}
          <div>
            {/* Office details */}
            <div className="flex flex-col gap-6 mb-10">
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,32,70,0.06)' }}
              >
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#191c1d',
                    marginBottom: '14px',
                  }}
                >
                  Office Location
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#f3f4f5' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#002046" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#191c1d' }}>Dirección</p>
                      <p style={{ fontSize: '13px', color: '#44474e', marginTop: '2px' }}>{business.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#f3f4f5' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#002046" aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#191c1d' }}>Teléfono</p>
                      <a
                        href={`tel:${business.phoneIntl}`}
                        style={{ fontSize: '13px', color: '#002046', textDecoration: 'none', marginTop: '2px', display: 'block' }}
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#f3f4f5' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#002046" aria-hidden="true">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#191c1d' }}>Email</p>
                      <a
                        href={`mailto:${business.email}`}
                        style={{ fontSize: '13px', color: '#002046', textDecoration: 'none', marginTop: '2px', display: 'block' }}
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#f3f4f5' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#002046" aria-hidden="true">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#191c1d' }}>Horario</p>
                      <p style={{ fontSize: '13px', color: '#44474e', marginTop: '2px' }}>{contacto.schedule}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map image */}
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,32,70,0.08)' }}>
              <img
                src={images.contactMap}
                alt="Kinetic Editorial Moving location in San Francisco"
                className="w-full object-cover"
                style={{ height: '260px' }}
              />
            </div>

            {/* Insurance trust badge */}
            <div
              className="mt-6 rounded-2xl p-5 flex items-center gap-4"
              style={{ backgroundColor: '#002046' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#87a0cd" aria-hidden="true">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Fully Insured &amp; Licensed
                </p>
                <p style={{ fontSize: '12px', color: '#87a0cd', marginTop: '2px' }}>
                  {contacto.insurance} &middot; California PUC Licensed
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Quote form */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 8px 40px rgba(0,32,70,0.08)' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#002046' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#191c1d',
                    letterSpacing: '-0.02em',
                    marginBottom: '12px',
                  }}
                >
                  Request received!
                </h2>
                <p style={{ fontSize: '15px', color: '#44474e', lineHeight: 1.7, marginBottom: '28px' }}>
                  Thank you, {form.nombre || 'there'}. A move coordinator will contact you within {contacto.responseTime} with your free quote.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialForm); }}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#002046',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(0,32,70,0.25)',
                    borderRadius: '10px',
                    padding: '10px 24px',
                    cursor: 'pointer',
                  }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#191c1d',
                      letterSpacing: '-0.02em',
                      marginBottom: '6px',
                    }}
                  >
                    {contacto.formTitle}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#44474e' }}>
                    {contacto.formSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" style={labelStyle}>Full Name *</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      style={inputStyle}
                    />
                  </div>

                  {/* Email + Telefono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" style={labelStyle}>Teléfono</label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={form.telefono}
                        onChange={handleChange}
                        placeholder="+1 555 000 0000"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Tipo de servicio */}
                  <div>
                    <label htmlFor="servicio" style={labelStyle}>Service Type *</label>
                    <select
                      id="servicio"
                      name="servicio"
                      required
                      value={form.servicio}
                      onChange={handleChange}
                      style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none' }}
                    >
                      <option value="" disabled>Select a service</option>
                      {contacto.serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fecha deseada */}
                  <div>
                    <label htmlFor="fecha" style={labelStyle}>Desired Move Date</label>
                    <input
                      id="fecha"
                      name="fecha"
                      type="date"
                      value={form.fecha}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="mensaje" style={labelStyle}>Tell us about your move</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      value={form.mensaje}
                      onChange={handleChange}
                      placeholder="Origin and destination addresses, number of rooms, special items, any other details..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="hover:opacity-90 transition-opacity"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      backgroundColor: '#552b00',
                      color: '#ffffff',
                      padding: '15px 0',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    Request Free Quote
                  </button>

                  <p style={{ fontSize: '11px', color: '#44474e', textAlign: 'center' }}>
                    No commitment required. We respond within {contacto.responseTime}.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
