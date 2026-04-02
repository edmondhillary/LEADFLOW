'use client';

import { useState } from 'react';
import Image from 'next/image';
import { business, contacto, images } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-aire';
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
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
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <section className="py-24" style={{ backgroundColor: '#f6f3f5' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(141,75,0,0.1)', border: '1px solid rgba(141,75,0,0.2)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{contacto.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            {contacto.title}
          </h1>
          <p style={{ fontSize: '16px', color: '#414754', lineHeight: 1.7, maxWidth: '560px' }}>{contacto.subtitle}</p>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-20" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — contact info */}
            <div className="flex flex-col gap-10">
              {/* Contact info cards */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: 'phone', label: 'Teléfono', value: business.phone, href: `tel:${business.phoneIntl}` },
                  { icon: 'email', label: 'Email', value: business.email, href: `mailto:${business.email}` },
                  { icon: 'location_on', label: 'Dirección', value: business.address, href: undefined },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 p-5 rounded-xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(27,27,29,0.04)', border: '1px solid #e4e2e4' }}>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: '#717786', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: '14px', color: '#1b1b1d', fontWeight: 500, textDecoration: 'none' }}>{item.value}</a>
                      ) : (
                        <p style={{ fontSize: '14px', color: '#1b1b1d', fontWeight: 500 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Horario */}
              <div className="rounded-xl p-6" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(27,27,29,0.04)', border: '1px solid #e4e2e4' }}>
                <div className="flex items-center gap-2 mb-5">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#8d4b00', fontVariationSettings: "'FILL' 1" }}>schedule</span>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, color: '#1b1b1d', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Horario comercial</p>
                </div>
                <div className="flex flex-col gap-3">
                  {contacto.hours.map(h => (
                    <div key={h.day} className="flex justify-between items-center">
                      <span style={{ fontSize: '13px', color: '#414754' }}>{h.day}</span>
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1b1b1d' }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency note */}
              <div
                className="rounded-xl p-5 flex items-start gap-3"
                style={{ backgroundColor: 'rgba(141,75,0,0.06)', border: '1px solid rgba(141,75,0,0.2)' }}
              >
                <span className="material-symbols-outlined flex-shrink-0 mt-0.5" style={{ fontSize: '20px', color: '#8d4b00', fontVariationSettings: "'FILL' 1" }}>warning</span>
                <p style={{ fontSize: '13px', color: '#8d4b00', lineHeight: 1.6 }}>{contacto.emergency}</p>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(27,27,29,0.04)' }}>
                <Image
                  src={images.contactMap}
                  alt="Austin TX map"
                  width={700}
                  height={280}
                  className="w-full object-cover"
                  style={{ height: '240px' }}
                />
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div
                  className="rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-6"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(27,27,29,0.05)', border: '1px solid #e4e2e4', minHeight: '520px' }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em' }}>
                    Request received!
                  </h2>
                  <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, maxWidth: '380px' }}>
                    A certified technician will contact you within {contacto.responseTime}. For urgent issues, call us directly at {business.phone}.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' }); }}
                    className="px-6 py-3 rounded-md transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)', color: '#ffffff', fontSize: '13px', fontWeight: 600 }}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-8 md:p-10"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(27,27,29,0.05)', border: '1px solid #e4e2e4' }}
                >
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                    {contacto.formTitle}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#717786', marginBottom: '28px' }}>{contacto.formSubtitle}</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nombre" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1b1b1d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Full Name *</label>
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          required
                          value={form.nombre}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-3 rounded-md outline-none transition-all"
                          style={{ border: '1px solid #c1c6d7', fontSize: '14px', color: '#1b1b1d', backgroundColor: '#fcf8fb' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1b1b1d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 rounded-md outline-none transition-all"
                          style={{ border: '1px solid #c1c6d7', fontSize: '14px', color: '#1b1b1d', backgroundColor: '#fcf8fb' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="telefono" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1b1b1d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Teléfono</label>
                        <input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          value={form.telefono}
                          onChange={handleChange}
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-3 rounded-md outline-none transition-all"
                          style={{ border: '1px solid #c1c6d7', fontSize: '14px', color: '#1b1b1d', backgroundColor: '#fcf8fb' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="servicio" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1b1b1d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Service Needed *</label>
                        <select
                          id="servicio"
                          name="servicio"
                          required
                          value={form.servicio}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-md outline-none transition-all"
                          style={{ border: '1px solid #c1c6d7', fontSize: '14px', color: form.servicio ? '#1b1b1d' : '#717786', backgroundColor: '#fcf8fb', appearance: 'none' }}
                        >
                          <option value="" disabled>Select a service</option>
                          {contacto.serviceOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mensaje" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#1b1b1d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Message</label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={5}
                        value={form.mensaje}
                        onChange={handleChange}
                        placeholder="Describe your project or issue — system age, symptoms, property type..."
                        className="w-full px-4 py-3 rounded-md outline-none transition-all resize-none"
                        style={{ border: '1px solid #c1c6d7', fontSize: '14px', color: '#1b1b1d', backgroundColor: '#fcf8fb' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-md transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)', color: '#ffffff', fontSize: '14px', fontWeight: 700 }}
                    >
                      Send Request
                    </button>

                    <p style={{ fontSize: '11px', color: '#717786', textAlign: 'center' }}>
                      We respond within {contacto.responseTime}. No spam, ever.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
