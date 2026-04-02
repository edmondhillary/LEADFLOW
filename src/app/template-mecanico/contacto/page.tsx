'use client';

import { useState } from 'react';
import { business } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-mecanico';
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid rgba(91,65,55,0.2)',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#e2e2e5',
    backgroundColor: '#222428',
    outline: 'none',
    fontFamily: "'Manrope', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#121416' }}>
      <section style={{ backgroundColor: '#121416', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#ff5f00', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
            Contacto
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#e2e2e5', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            SOLICITAR PRESUPUESTO
          </h1>
          <p style={{ fontSize: '16px', color: '#c4c6cc', lineHeight: 1.7 }}>
            Describe el problema de tu vehiculo y te responderemos en menos de 15 minutos.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: '#1a1c1e', padding: '64px 24px 80px' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 800, color: '#e2e2e5', marginBottom: '12px', textTransform: 'uppercase' }}>
                Solicitud recibida
              </p>
              <p style={{ fontSize: '15px', color: '#c4c6cc' }}>
                Nuestro equipo tecnico te contactara en breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#ffb599', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Nombre
                </label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre completo" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#ffb599', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Email
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#ffb599', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Telefono
                </label>
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="+34 900 000 000" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#ffb599', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Servicio
                </label>
                <select name="servicio" value={form.servicio} onChange={handleChange} style={inputStyle}>
                  <option value="">Selecciona un servicio</option>
                  <option>Reparacion Urgente</option>
                  <option>Mantenimiento Preventivo</option>
                  <option>Diagnostico OBD</option>
                  <option>Pre-ITV</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#ffb599', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Descripcion del problema
                </label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="Describe el problema de tu vehiculo..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)', color: '#531a00', padding: '14px 32px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}>
                ENVIAR SOLICITUD
              </button>
            </form>
          )}

          <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid rgba(91,65,55,0.15)' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#ffb599', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Contacto directo
            </p>
            <p style={{ fontSize: '14px', color: '#c4c6cc', marginBottom: '8px' }}>{business.address}, {business.city}</p>
            <a href={`tel:${business.phoneIntl}`} style={{ fontSize: '16px', color: '#ffb599', fontWeight: 700, display: 'block', marginBottom: '8px', textDecoration: 'none' }}>{business.phone}</a>
            <a href={`mailto:${business.email}`} style={{ fontSize: '14px', color: '#c4c6cc', textDecoration: 'none' }}>{business.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
