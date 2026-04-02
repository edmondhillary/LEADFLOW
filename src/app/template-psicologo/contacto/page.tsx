'use client';

import { useState } from 'react';
import { business, contacto, images } from '../data';

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
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
  const baseHref = ov?.baseHref || '/template-psicologo';
  const [form, setForm] = useState<FormData>({
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

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1.5px solid #c5c7bf',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1a1c1b',
    backgroundColor: '#f9f9f7',
    outline: 'none',
    fontFamily: "'Manrope', sans-serif",
  };

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600 as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    color: '#454841',
    marginBottom: '8px',
  };

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#dce6d2', color: '#586152', letterSpacing: '0.2em' }}>
                {contacto.badge}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {contacto.title}.
            </h1>
            <p className="text-base md:text-lg leading-[1.7]" style={{ color: '#454841', maxWidth: '560px' }}>
              {contacto.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT BODY ===== */}
      <section className="py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Left — Info + map */}
          <div className="md:col-span-5">

            {/* Info cards */}
            <div className="space-y-6 mb-8">

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#586152', marginBottom: '8px' }}>Dirección</p>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>
                  {business_.address}<br />
                  {business_.postalCode} {business_.city}, {business_.country}
                </p>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#586152', marginBottom: '8px' }}>Teléfono & Email</p>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>
                  <a href={`tel:${business_.phoneIntl}`} style={{ color: '#454841', textDecoration: 'none' }}>{business_.phone}</a>
                  <br />
                  <a href={`mailto:${business_.email}`} style={{ color: '#586152', textDecoration: 'none' }}>{business_.email}</a>
                </p>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#586152', marginBottom: '8px' }}>Horario</p>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>
                  {contacto.schedule}
                </p>
                <p className="mt-2" style={{ fontSize: '12px', color: '#a7b19f' }}>Respuesta en {contacto.responseTime}</p>
              </div>

            </div>

            {/* Map image */}
            <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(26,28,27,0.08)' }}>
              <img
                src={images.contactMap}
                alt="Ubicación SerenePath Psychology"
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            </div>

            {/* Confidentiality note */}
            <div className="mt-6 p-5 rounded-xl" style={{ backgroundColor: '#dce6d2', borderLeft: '3px solid #586152' }}>
              <p style={{ fontSize: '13px', color: '#454841', lineHeight: 1.6 }}>
                🔒 {contacto.confidentialityNote}
              </p>
            </div>

          </div>

          {/* Right — Form */}
          <div className="md:col-span-7">
            <div className="p-8 md:p-12 rounded-2xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(26,28,27,0.04)' }}>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6" style={{ backgroundColor: '#dce6d2' }}>
                    ✓
                  </div>
                  <h2 className="text-2xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
                    ¡Consulta recibida!
                  </h2>
                  <p className="leading-[1.7] max-w-sm mx-auto" style={{ fontSize: '15px', color: '#454841' }}>
                    La Dra. Sterling revisará tu mensaje y te contactará personalmente en menos de 24 horas. Gracias por dar este primer paso.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl mb-2" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
                      {contacto.formTitle}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#454841', lineHeight: 1.6 }}>{contacto.formSubtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nombre" style={labelStyle}>Nombre completo *</label>
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          value={form.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" style={labelStyle}>Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="telefono" style={labelStyle}>Teléfono</label>
                        <input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          value={form.telefono}
                          onChange={handleChange}
                          placeholder="+34 600 000 000"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor="servicio" style={labelStyle}>Tipo de servicio *</label>
                        <select
                          id="servicio"
                          name="servicio"
                          value={form.servicio}
                          onChange={handleChange}
                          required
                          style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                          <option value="">Selecciona una opción</option>
                          {contacto.serviceOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mensaje" style={labelStyle}>Mensaje *</label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Cuéntanos brevemente qué te trae por aquí y cómo podemos ayudarte..."
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-lg font-semibold transition-all active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #586152, #a7b19f)', color: '#ffffff', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}
                    >
                      Enviar Consulta
                    </button>

                    <p style={{ fontSize: '11px', color: '#a7b19f', textAlign: 'center', lineHeight: 1.5 }}>
                      Al enviar este formulario aceptas nuestra política de privacidad. Toda la información es confidencial.
                    </p>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
