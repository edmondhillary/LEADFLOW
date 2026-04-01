'use client';

import { useState } from 'react';
import Image from 'next/image';
import { business, contacto, images } from '../data';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    clase: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #c6c8bb',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    color: '#1b1c19',
    outline: 'none',
    fontFamily: "'Manrope', sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    color: '#45483f',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
  };

  return (
    <>
      {/* Header */}
      <section className="w-full pt-20 pb-16 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          <span
            className="inline-block mb-5 px-4 py-2 rounded-full"
            style={{ backgroundColor: '#dae8be', color: '#566342', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            {contacto.badge}
          </span>
          <h1
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#1b1c19',
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: '700px',
            }}
          >
            {contacto.title.split(' ').slice(0, -1).join(' ')}{' '}
            <em style={{ fontStyle: 'italic', color: '#566342' }}>
              {contacto.title.split(' ').slice(-1)[0]}
            </em>
          </h1>
          <p className="mt-5 max-w-lg" style={{ fontSize: '16px', color: '#45483f', lineHeight: 1.7 }}>
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="w-full pb-24 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left — Studio Info */}
          <div>
            {/* Studio details */}
            <div className="mb-10 p-8" style={{ backgroundColor: '#f5f3ee', borderRadius: '16px' }}>
              <h3
                style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px', fontWeight: 700, color: '#1b1c19', marginBottom: '20px' }}
              >
                Studio Details
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-start">
                  <span style={{ color: '#566342', fontSize: '20px', marginTop: '2px' }}>📍</span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#1b1c19', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Address</p>
                    <p style={{ fontSize: '13px', color: '#45483f', lineHeight: 1.6 }}>{business.address}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span style={{ color: '#566342', fontSize: '20px', marginTop: '2px' }}>📞</span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#1b1c19', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Phone</p>
                    <p style={{ fontSize: '13px', color: '#45483f' }}>{business.phone}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span style={{ color: '#566342', fontSize: '20px', marginTop: '2px' }}>✉️</span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#1b1c19', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Email</p>
                    <p style={{ fontSize: '13px', color: '#45483f' }}>{business.email}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span style={{ color: '#566342', fontSize: '20px', marginTop: '2px' }}>🕐</span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#1b1c19', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Schedule</p>
                    <p style={{ fontSize: '13px', color: '#45483f' }}>{contacto.schedule}</p>
                    <p style={{ fontSize: '12px', color: '#566342', marginTop: '4px' }}>Response time: {contacto.responseTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map image */}
            <div className="relative rounded-2xl overflow-hidden" style={{ height: '280px' }}>
              <Image
                src={images.contactMap}
                alt="Notting Hill, London"
                fill
                className="object-cover"
              />
              <div
                className="absolute bottom-5 left-5"
                style={{
                  background: 'rgba(251,249,244,0.9)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '10px',
                  padding: '10px 16px',
                }}
              >
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#1b1c19' }}>Notting Hill, London</p>
                <p style={{ fontSize: '11px', color: '#45483f' }}>W11 2PH</p>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            <div className="p-8 md:p-10" style={{ backgroundColor: '#f5f3ee', borderRadius: '16px' }}>
              <h3
                style={{ fontFamily: "'Noto Serif', serif", fontSize: '22px', fontWeight: 700, color: '#1b1c19', marginBottom: '8px' }}
              >
                {contacto.formTitle}
              </h3>
              <p style={{ fontSize: '13px', color: '#45483f', lineHeight: 1.6, marginBottom: '28px' }}>
                {contacto.formSubtitle}
              </p>

              {submitted ? (
                <div
                  style={{
                    backgroundColor: '#dae8be',
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '32px', marginBottom: '12px' }}>🌿</p>
                  <h4
                    style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px', fontWeight: 700, color: '#566342', marginBottom: '8px' }}
                  >
                    Namaste, {formData.nombre}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#45483f', lineHeight: 1.6 }}>
                    Your booking request has been received. We&apos;ll confirm your class within {contacto.responseTime}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle} htmlFor="nombre">Nombre</label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="telefono">Teléfono</label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+44 000 000 0000"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="clase">Clase Preferida</label>
                    <select
                      id="clase"
                      name="clase"
                      value={formData.clase}
                      onChange={handleChange}
                      required
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Select a class...</option>
                      {contacto.serviceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="mensaje">Mensaje</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Any questions, preferred times, or notes for your instructor..."
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? '#a3b18a' : 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 600,
                      padding: '15px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      letterSpacing: '0.03em',
                      transition: 'all 0.2s',
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {loading ? 'Sending...' : 'Reservar Clase'}
                  </button>

                  {/* Confidentiality note */}
                  <p style={{ fontSize: '11px', color: '#45483f', lineHeight: 1.6, textAlign: 'center' }}>
                    🔒 Your information is kept private and never shared with third parties. By submitting you agree to our Privacy Policy.
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
