'use client';

import { useState } from 'react';
import { contacto, business, images } from '../data';

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  frecuencia: string;
  mensaje: string;
};

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
  const baseHref = ov?.baseHref || '/template-limpieza';
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    frecuencia: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle = {
    width: '100%',
    border: '1px solid #c1c6d7',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#191c1d',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#80f98b] mb-6">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#007327' }}>request_quote</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#007327' }}>{contacto.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', marginBottom: '16px', lineHeight: 1.05 }}>
            {contacto.title}
          </h1>
          <p style={{ fontSize: '17px', color: '#414754', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="w-full bg-[#f3f4f5] py-16 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Left: Contact info */}
            <div className="flex flex-col gap-6">
              {/* Info cards */}
              {[
                { icon: 'phone', label: 'Teléfono', value: business_.phone, href: `tel:${business_.phoneIntl}` },
                { icon: 'mail', label: 'Email', value: business_.email, href: `mailto:${business_.email}` },
                { icon: 'schedule', label: 'Horario', value: contacto.schedule, href: mapLink },
                { icon: 'location_on', label: 'Dirección', value: business_.address, href: mapLink },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl p-5 flex items-center gap-4" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.06)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#edeeef' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#0059bb' }}>{item.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#414754', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: '14px', fontWeight: 600, color: '#191c1d', textDecoration: 'none' }}>{item.value}</a>
                    ) : (
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#191c1d' }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Service area */}
              <div className="bg-white rounded-xl p-5" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.06)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#0059bb' }}>map</span>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#191c1d' }}>Service Area</p>
                </div>
                <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.6 }}>
                  We serve all five boroughs of New York City and surrounding areas including Long Island, Westchester, and New Jersey.
                </p>
              </div>

              {/* Map */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.08)' }}>
                <img src={images.contactMap} alt="New York service area map" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-8 md:p-10" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.08)' }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 py-12 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#80f98b' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#007327', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, color: '#191c1d' }}>Quote Request Received!</h2>
                  <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, maxWidth: '340px' }}>
                    Thank you, {form.nombre ? form.nombre.split(' ')[0] : 'there'}! Our team will review your request and contact you within 24 hours.
                  </p>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#f3f4f5' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#0059bb' }}>schedule</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0059bb' }}>Response within {contacto.responseTime}</span>
                  </div>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '22px', fontWeight: 800, color: '#191c1d', marginBottom: '6px' }}>{contacto.formTitle}</h2>
                  <p style={{ fontSize: '14px', color: '#414754', marginBottom: '28px', lineHeight: 1.6 }}>{contacto.formSubtitle}</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#414754', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={form.nombre}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#414754', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#414754', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        style={inputStyle}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#414754', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Service Type *</label>
                        <select
                          name="servicio"
                          required
                          value={form.servicio}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                          <option value="">Select a service</option>
                          {contacto.serviceOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#414754', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Frequency</label>
                        <select
                          name="frecuencia"
                          value={form.frecuencia}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                          <option value="">Select frequency</option>
                          {contacto.frequencyOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#414754', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Message</label>
                      <textarea
                        name="mensaje"
                        rows={4}
                        value={form.mensaje}
                        onChange={handleChange}
                        placeholder="Tell us about your space, square footage, special requirements..."
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    {/* 24h guarantee note */}
                    <div className="flex items-center gap-2 p-4 rounded-lg" style={{ backgroundColor: '#f3f4f5' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#006e25' }}>schedule</span>
                      <p style={{ fontSize: '13px', color: '#414754' }}>
                        <span style={{ fontWeight: 600, color: '#191c1d' }}>24-hour response guarantee.</span> We will get back to you with a detailed quote within one business day.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg py-4 transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ background: 'linear-gradient(to right, #0059bb, #0070ea)', color: '#ffffff', fontSize: '15px', fontWeight: 700 }}
                    >
                      Send Quote Request
                    </button>
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
