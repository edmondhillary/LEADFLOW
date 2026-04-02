'use client';

import { useState } from 'react';
import { business, contacto, images } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
const business_ = ov ? {
    ...business,
    name: ov.businessName || business.name,
    fullName: ov.businessName || (business as any).fullName || business.name,
    legalName: ov.businessName || (business as any).legalName || (business as any).fullName || business.name,
    phone: ov.phone || business.phone,
    phoneIntl: ov.phoneIntl || business.phoneIntl,
    email: ov.email || business.email,
    address: ov.address || business.address,
    city: ov.city || business.city,
  } : business;
const mapLink = ov?.mapDirections || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ov?.address || business_.address || ov?.city || business_.city || '')}`;
  const baseHref = ov?.baseHref || '/template-barberia';
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #4e4639',
    color: '#e5e2e1',
    fontSize: '14px',
    padding: '12px 0',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#9a8f80',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#131313', color: '#e5e2e1' }}>

      {/* DARK HERO */}
      <section className="relative py-40 flex items-end overflow-hidden" style={{ backgroundColor: '#0e0e0e', minHeight: '50vh' }}>
        <div className="absolute inset-0">
          <img src={images.heroBg} alt="Reserve" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)', opacity: 0.12 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0e0e0e 40%, transparent)' }} />
        </div>
        <div className="relative z-10 px-6 md:px-8 max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '24px' }}>{contacto.badge}</p>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '16px' }}>
            {contacto.title}
          </h1>
          <p style={{ fontSize: '15px', color: '#9a8f80', lineHeight: 1.8, maxWidth: '480px' }}>{contacto.subtitle}</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* LEFT — Info */}
          <div>
            {/* Info cards */}
            <div className="flex flex-col gap-6 mb-12">
              <div className="p-6" style={{ backgroundColor: '#1c1b1b', borderLeft: '2px solid #e9c176' }}>
                <p style={{ fontSize: '10px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Dirección</p>
                <p style={{ fontSize: '15px', color: '#e5e2e1', lineHeight: 1.6 }}>{business_.address}</p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#1c1b1b', borderLeft: '2px solid #e9c176' }}>
                <p style={{ fontSize: '10px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Teléfono</p>
                <a href={`tel:${business_.phoneIntl}`} style={{ fontSize: '15px', color: '#e5e2e1', textDecoration: 'none' }}>{business_.phone}</a>
              </div>
              <div className="p-6" style={{ backgroundColor: '#1c1b1b', borderLeft: '2px solid #e9c176' }}>
                <p style={{ fontSize: '10px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Email</p>
                <a href={`mailto:${business_.email}`} style={{ fontSize: '15px', color: '#e5e2e1', textDecoration: 'none' }}>{business_.email}</a>
              </div>
            </div>

            {/* Horario */}
            <div style={{ borderTop: '1px solid rgba(78,70,57,0.3)', paddingTop: '32px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px' }}>Estudio Horario</p>
              <div className="flex flex-col gap-3">
                {[
                  { day: 'Tuesday — Friday', time: '09:00 — 19:00' },
                  { day: 'Saturday', time: '09:00 — 17:00' },
                  { day: 'Sunday — Monday', time: 'Closed' },
                ].map(h => (
                  <div key={h.day} className="flex justify-between" style={{ borderBottom: '1px solid rgba(78,70,57,0.15)', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#d1c5b4', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h.day}</span>
                    <span style={{ fontSize: '13px', color: h.time === 'Closed' ? '#4e4639' : '#e9c176' }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map image */}
            <div className="mt-12 overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img src={images.contactMap} alt="Location" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)', opacity: 0.6 }} />
            </div>
          </div>

          {/* RIGHT — Form */}
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '8px' }}>{contacto.formTitle}</p>
            <p style={{ fontSize: '14px', color: '#9a8f80', marginBottom: '40px', lineHeight: 1.7 }}>{contacto.formSubtitle}</p>

            {/* Appointment note */}
            <div className="mb-8 flex items-start gap-3" style={{ borderLeft: '1px solid #4e4639', paddingLeft: '16px' }}>
              <p style={{ fontSize: '12px', color: '#9a8f80', lineHeight: 1.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{contacto.appointmentNote}</p>
            </div>

            {submitted ? (
              <div className="py-16 text-center" style={{ backgroundColor: '#1c1b1b' }}>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '32px', color: '#e9c176', marginBottom: '16px', fontStyle: 'italic' }}>Your session is requested.</p>
                <p style={{ fontSize: '14px', color: '#9a8f80', lineHeight: 1.7 }}>We will confirm your appointment within {contacto.responseTime}. Thank you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label htmlFor="name" style={labelStyle}>Full Name</label>
                  <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} style={inputStyle} placeholder="James Whitmore" />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>Correo electrónico</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="you@example.com" />
                </div>

                <div>
                  <label htmlFor="phone" style={labelStyle}>Teléfono (optional)</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+44 20 0000 0000" />
                </div>

                <div>
                  <label htmlFor="service" style={labelStyle}>Service</label>
                  <select id="service" name="service" required value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
                    <option value="">Select a service</option>
                    {contacto.serviceOptions.map(opt => (
                      <option key={opt} value={opt} style={{ backgroundColor: '#1c1b1b' }}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Notes (optional)</label>
                  <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'none' }} placeholder="Preferred dates, times, or any special requests..." />
                </div>

                <div>
                  <button
                    type="submit"
                    style={{ background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '11px', fontWeight: 700, padding: '16px 48px', textTransform: 'uppercase', letterSpacing: '0.2em', border: 'none', cursor: 'pointer', width: '100%' }}
                  >
                    Request Appointment
                  </button>
                  <p style={{ fontSize: '11px', color: '#4e4639', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>Response within {contacto.responseTime}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
