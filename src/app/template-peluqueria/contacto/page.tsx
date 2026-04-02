'use client';

import { useState } from 'react';
import { business } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-peluqueria';
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
    border: '1px solid #ebeeef',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#2d3435',
    backgroundColor: '#ffffff',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ backgroundColor: '#f9f9f9', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#785a1a', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
            Reservas
          </p>
          <h1 style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#2d3435', marginBottom: '16px' }}>
            Reserva Tu Cita
          </h1>
          <p style={{ fontSize: '16px', color: '#5a6061', lineHeight: 1.7 }}>
            Escríbenos y uno de nuestros estilistas te responderá en menos de 24 horas.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: '#ffffff', padding: '64px 24px 80px' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <p style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '24px', color: '#2d3435', marginBottom: '12px' }}>
                Gracias por contactarnos
              </p>
              <p style={{ fontSize: '15px', color: '#5a6061' }}>
                Nos pondremos en contacto contigo muy pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#5a6061', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Nombre
                </label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre completo" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#5a6061', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Email
                </label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#5a6061', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Telefono
                </label>
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="+54 11 0000 0000" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#5a6061', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Servicio
                </label>
                <select name="servicio" value={form.servicio} onChange={handleChange} style={inputStyle}>
                  <option value="">Selecciona un servicio</option>
                  <option>Corte de Autor</option>
                  <option>Coloracion</option>
                  <option>Tratamiento Capilar</option>
                  <option>Balayage</option>
                  <option>Consulta</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#5a6061', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  Mensaje
                </label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="Cuentanos sobre lo que buscas..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#785a1a', color: '#fff8f1', padding: '14px 32px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                ENVIAR SOLICITUD
              </button>
            </form>
          )}

          <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid #ebeeef' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#5a6061', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Informacion de contacto
            </p>
            <p style={{ fontSize: '14px', color: '#2d3435', marginBottom: '8px' }}>{business.address}, {business.city}</p>
            <a href={`tel:${business.phoneIntl}`} style={{ fontSize: '14px', color: '#785a1a', display: 'block', marginBottom: '8px', textDecoration: 'none' }}>{business.phone}</a>
            <a href={`mailto:${business.email}`} style={{ fontSize: '14px', color: '#785a1a', textDecoration: 'none' }}>{business.email}</a>
            <p style={{ fontSize: '13px', color: '#5a6061', marginTop: '12px' }}>{business.hours}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
