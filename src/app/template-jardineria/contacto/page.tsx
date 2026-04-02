'use client';

import { useState } from 'react';
import { business, contacto, images } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-jardineria';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#fafaf5' }}>

      {/* Header */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[1920px] mx-auto">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
            {contacto.badge}
          </span>
          <h1
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 300,
              color: '#1a1c19',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '16px',
            }}
          >
            {contacto.title}
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.75, maxWidth: '520px' }}>
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="w-full py-20 px-6 md:px-10 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">

          {/* Left — Info */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              {[
                { label: 'Estudio', value: business.address },
                { label: 'Telephone', value: business.phone },
                { label: 'Email', value: business.email },
                { label: 'Horario', value: contacto.schedule },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: '#f4f4ef' }}
                >
                  <p style={{ fontSize: '10px', fontWeight: 600, color: '#56642b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '6px' }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: '14px', color: '#1a1c19', fontWeight: 400, lineHeight: 1.5 }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Map image */}
            <div className="rounded-3xl overflow-hidden" style={{ height: '260px' }}>
              <img
                src={images.contactMap}
                alt="Estudio location — London"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Consultation note */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: '16px',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: '#ffffff',
                  lineHeight: 1.65,
                  marginBottom: '12px',
                }}
              >
                &ldquo;Every great garden begins with a single conversation.&rdquo;
              </p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#adc0a8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Response within {contacto.responseTime}
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div
                className="rounded-3xl p-16 flex flex-col items-center justify-center text-center"
                style={{ backgroundColor: '#f4f4ef', minHeight: '500px' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
                  style={{ backgroundColor: '#d6e7a1' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#283827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: '32px',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: '#1a1c19',
                    lineHeight: 1.2,
                    marginBottom: '16px',
                  }}
                >
                  Enquiry Received
                </h2>
                <p style={{ fontSize: '15px', fontWeight: 300, color: '#444842', lineHeight: 1.75, maxWidth: '400px' }}>
                  Thank you for reaching out. A member of our studio team will be in contact within {contacto.responseTime}.
                </p>
              </div>
            ) : (
              <div
                className="rounded-3xl p-10 md:p-12"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(40,56,39,0.06)' }}
              >
                <h2
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: '28px',
                    fontWeight: 300,
                    color: '#1a1c19',
                    letterSpacing: '-0.01em',
                    marginBottom: '8px',
                  }}
                >
                  {contacto.formTitle}
                </h2>
                <p style={{ fontSize: '13px', fontWeight: 300, color: '#444842', lineHeight: 1.7, marginBottom: '32px' }}>
                  {contacto.formSubtitle}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#444842', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="rounded-md px-4 py-3 outline-none transition-all"
                        style={{
                          backgroundColor: '#f4f4ef',
                          border: 'none',
                          fontSize: '14px',
                          color: '#1a1c19',
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#444842', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="studio@example.com"
                        className="rounded-md px-4 py-3 outline-none transition-all"
                        style={{
                          backgroundColor: '#f4f4ef',
                          border: 'none',
                          fontSize: '14px',
                          color: '#1a1c19',
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#444842', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 20 0000 0000"
                        className="rounded-md px-4 py-3 outline-none transition-all"
                        style={{
                          backgroundColor: '#f4f4ef',
                          border: 'none',
                          fontSize: '14px',
                          color: '#1a1c19',
                          fontFamily: "'Manrope', sans-serif",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#444842', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        Service Required
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="rounded-md px-4 py-3 outline-none transition-all"
                        style={{
                          backgroundColor: '#f4f4ef',
                          border: 'none',
                          fontSize: '14px',
                          color: formData.service ? '#1a1c19' : '#888',
                          fontFamily: "'Manrope', sans-serif",
                          appearance: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="" disabled>Select a service</option>
                        {contacto.serviceOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#444842', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                      Tell Us About Your Garden
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your garden, your goals, and any relevant details about the property..."
                      className="rounded-md px-4 py-3 outline-none transition-all resize-none"
                      style={{
                        backgroundColor: '#f4f4ef',
                        border: 'none',
                        fontSize: '14px',
                        color: '#1a1c19',
                        fontFamily: "'Manrope', sans-serif",
                        lineHeight: 1.7,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl py-4 transition-all hover:opacity-90 active:scale-[0.99] mt-2"
                    style={{
                      background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Send Enquiry
                  </button>

                  <p style={{ fontSize: '11px', color: '#444842', textAlign: 'center', lineHeight: 1.6 }}>
                    We typically respond within {contacto.responseTime}. Your information is handled in confidence.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
