'use client';

import { useState } from 'react';
import { business, contactoPage, images } from '../data';

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-dentista';
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
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
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1.5px solid #c1c7d2',
    fontSize: '15px',
    color: '#191c1e',
    backgroundColor: '#f7f9fb',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f7f9fb' }}>

      {/* Hero Header */}
      <section className="py-20" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eceef0' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ backgroundColor: '#c4e3ff', color: '#48667d' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_month</span>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>{contactoPage.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            {contactoPage.title}
          </h1>
          <p style={{ fontSize: '17px', color: '#414750', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            {contactoPage.subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: Info cards + map */}
            <div className="flex flex-col gap-6">
              {/* Teléfono */}
              <div
                className="rounded-2xl p-6 flex items-center gap-5"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(25,28,30,0.06)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#d2e4ff' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#003e6f' }}>phone</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#727781', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Telefono</p>
                  <a
                    href={`tel:${business.phoneIntl}`}
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 700, color: '#191c1e', textDecoration: 'none' }}
                  >
                    {business.phone}
                  </a>
                  <p style={{ fontSize: '13px', color: '#727781', marginTop: '2px' }}>{contactoPage.schedule}</p>
                  <p style={{ fontSize: '13px', color: '#727781' }}>{contactoPage.scheduleWeekend}</p>
                </div>
              </div>

              {/* Email */}
              <div
                className="rounded-2xl p-6 flex items-center gap-5"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(25,28,30,0.06)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#d2e4ff' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#003e6f' }}>mail</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#727781', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Email</p>
                  <a
                    href={`mailto:${business.email}`}
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 600, color: '#191c1e', textDecoration: 'none' }}
                  >
                    {business.email}
                  </a>
                  <p style={{ fontSize: '13px', color: '#727781', marginTop: '2px' }}>Respuesta en {contactoPage.responseTime}</p>
                </div>
              </div>

              {/* Dirección */}
              <div
                className="rounded-2xl p-6 flex items-center gap-5"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(25,28,30,0.06)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#d2e4ff' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#003e6f' }}>location_on</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#727781', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Direccion</p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '15px', fontWeight: 600, color: '#191c1e' }}>{business.address}</p>
                  <p style={{ fontSize: '13px', color: '#727781', marginTop: '2px' }}>{business.city}, {business.country}</p>
                </div>
              </div>

              {/* Urgencias emergency card */}
              <div
                className="rounded-2xl p-6 flex items-center gap-5"
                style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#fca5a5' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#991b1b', fontVariationSettings: "'FILL' 1" }}>emergency</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Urgencias 24h</p>
                  <a
                    href={`tel:${business.emergency}`}
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#7f1d1d', textDecoration: 'none' }}
                  >
                    {business.emergency}
                  </a>
                  <p style={{ fontSize: '13px', color: '#991b1b', marginTop: '2px' }}>Disponible 24 horas, 365 dias</p>
                </div>
              </div>

              {/* Map image */}
              <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '16/9', boxShadow: '0 8px 24px rgba(25,28,30,0.08)' }}>
                <img
                  src={images.contactMap}
                  alt="Ubicacion The Clinical Sanctuary"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Right: Form */}
            <div
              className="rounded-3xl p-8 md:p-10 self-start"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,30,0.06)' }}
            >
              {submitted ? (
                <div className="flex flex-col items-center text-center py-12">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: '#d2e4ff' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#003e6f', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, color: '#191c1e', marginBottom: '12px' }}>
                    Solicitud recibida
                  </h3>
                  <p style={{ fontSize: '16px', color: '#414750', lineHeight: 1.7, maxWidth: '360px' }}>
                    Nuestro equipo se pondra en contacto contigo en menos de 2 horas. Nos vemos pronto.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' }); }}
                    className="mt-8 rounded-xl px-6 py-3 transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)', color: '#ffffff', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                  >
                    Nueva solicitud
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, color: '#191c1e', marginBottom: '8px' }}>
                    {contactoPage.formTitle}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#727781', marginBottom: '28px', lineHeight: 1.5 }}>
                    {contactoPage.formSubtitle}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#414750', display: 'block', marginBottom: '8px' }}>
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Maria Garcia"
                        required
                        style={inputStyle}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#414750', display: 'block', marginBottom: '8px' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="maria@email.com"
                          required
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#414750', display: 'block', marginBottom: '8px' }}>
                          Telefono
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={form.telefono}
                          onChange={handleChange}
                          placeholder="+34 612 345 678"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#414750', display: 'block', marginBottom: '8px' }}>
                        Servicio de interes
                      </label>
                      <select
                        name="servicio"
                        value={form.servicio}
                        onChange={handleChange}
                        style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                      >
                        <option value="">Selecciona un servicio</option>
                        {contactoPage.serviceOptions.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#414750', display: 'block', marginBottom: '8px' }}>
                        Mensaje
                      </label>
                      <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        placeholder="Cuentanos como podemos ayudarte..."
                        rows={4}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-xl py-4 transition-all hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)', color: '#ffffff', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,62,111,0.25)' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>send</span>
                      Enviar Solicitud
                    </button>
                  </form>

                  {/* Privacy note */}
                  <div
                    className="mt-6 rounded-xl p-4 flex items-start gap-3"
                    style={{ backgroundColor: '#f2f4f6' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#446279', flexShrink: 0, marginTop: '1px' }}>lock</span>
                    <p style={{ fontSize: '12px', color: '#727781', lineHeight: 1.6 }}>
                      Tus datos estan protegidos conforme al RGPD. Informacion confidencial utilizada exclusivamente para gestionar tu cita. Nunca compartimos datos con terceros.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
