'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contacto, images, business } from '../data';

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
  const baseHref = ov?.baseHref || '/template-pilates';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', classType: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '16px' }}>
              {contacto.badge}
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Begin your<br />
              <span style={{ fontStyle: 'italic', color: '#536257' }}>practice.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p style={{ fontSize: '15px', color: '#5c605c', lineHeight: 1.7, maxWidth: '360px' }}>
              {contacto.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ===== FORM + SIDEBAR ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">

          {/* ===== FORM ===== */}
          <div
            className="lg:col-span-7 p-8 md:p-12 lg:p-16 rounded-xl"
            style={{ backgroundColor: '#f4f4f0' }}
          >
            <h2
              className="text-2xl md:text-3xl mb-3"
              style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}
            >
              {contacto.formTitle}
            </h2>
            <p style={{ fontSize: '13px', color: '#5c605c', lineHeight: 1.6, marginBottom: '32px' }}>
              {contacto.formSubtitle}
            </p>

            {/* Success state */}
            {submitted && (
              <div
                className="mb-8 p-5 rounded-xl flex items-start gap-3"
                style={{ backgroundColor: '#d6e7d8', border: '1px solid rgba(83,98,87,0.2)' }}
              >
                <span style={{ fontSize: '20px', flexShrink: 0 }}>✓</span>
                <div>
                  <p style={{ fontWeight: 600, color: '#536257', marginBottom: '4px' }}>Session request received!</p>
                  <p style={{ fontSize: '13px', color: '#5c605c' }}>We will confirm your booking within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', display: 'block', marginBottom: '8px' }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full py-3 text-sm"
                    style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(83,98,87,0.25)', outline: 'none', color: '#2f3430' }}
                  />
                </div>
                <div>
                  <label
                    style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', display: 'block', marginBottom: '8px' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    autoComplete="email"
                    className="w-full py-3 text-sm"
                    style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(83,98,87,0.25)', outline: 'none', color: '#2f3430' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', display: 'block', marginBottom: '8px' }}
                  >
                    Teléfono (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    className="w-full py-3 text-sm"
                    style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(83,98,87,0.25)', outline: 'none', color: '#2f3430' }}
                  />
                </div>
                <div>
                  <label
                    style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', display: 'block', marginBottom: '8px' }}
                  >
                    Class Type
                  </label>
                  <select
                    name="classType"
                    value={formData.classType}
                    onChange={handleChange}
                    required
                    className="w-full py-3 text-sm appearance-none"
                    style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(83,98,87,0.25)', outline: 'none', color: formData.classType ? '#2f3430' : '#afb3ae' }}
                  >
                    <option value="">Select a class...</option>
                    {contacto.serviceOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', display: 'block', marginBottom: '8px' }}
                >
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your experience level, any injuries, or what you're hoping to achieve..."
                  className="w-full py-3 text-sm resize-none"
                  style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(83,98,87,0.25)', outline: 'none', color: '#2f3430' }}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="transition-all active:scale-[0.98]"
                  style={{ backgroundColor: '#536257', color: '#ebfced', padding: '16px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer', borderRadius: '9999px' }}
                >
                  Request Session
                </button>
              </div>
            </form>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Estudio info */}
            <div>
              <h3
                className="text-xl md:text-2xl mb-6"
                style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}
              >
                Estudio Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-0.5" style={{ color: '#536257', fontSize: '20px' }}>location_on</span>
                  <div>
                    <p style={{ fontSize: '14px', color: '#2f3430', fontWeight: 500 }}>{business_.address}</p>
                    <p style={{ fontSize: '13px', color: '#5c605c' }}>{business_.city}, {business_.state}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-0.5" style={{ color: '#536257', fontSize: '20px' }}>mail</span>
                  <p style={{ fontSize: '14px', color: '#2f3430' }}>{business_.email}</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-0.5" style={{ color: '#536257', fontSize: '20px' }}>call</span>
                  <p style={{ fontSize: '14px', color: '#2f3430' }}>{business_.phone}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full overflow-hidden rounded-xl" style={{ height: '280px' }}>
              <img
                src={images.contactMap}
                alt="Kinetic Gallery location"
                className="w-full h-full object-cover grayscale opacity-80 hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Schedule & availability */}
            <div
              className="p-6 md:p-8 rounded-xl"
              style={{ backgroundColor: '#f4f4f0', border: '1px solid rgba(175,179,174,0.15)' }}
            >
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>
                Availability
              </span>
              <h4
                className="text-xl mb-4"
                style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, fontStyle: 'italic', color: '#2f3430' }}
              >
                Estudio Horario
              </h4>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#5c605c' }}>Schedule:</span>
                  <span style={{ color: '#2f3430', fontWeight: 600 }}>{contacto.schedule}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#5c605c' }}>Response Time:</span>
                  <span style={{ color: '#2f3430', fontWeight: 600 }}>{contacto.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#5c605c' }}>Intro Class:</span>
                  <span style={{ color: '#536257', fontWeight: 600 }}>$25</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${business_.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit transition-colors"
                style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#536257', textDecoration: 'none', borderBottom: '2px solid #d6e7d8', paddingBottom: '2px' }}
              >
                Message on WhatsApp
              </a>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              <Link
                href={`${baseHref}/servicios`}
                className="flex items-center justify-between px-5 py-4 rounded-xl transition-colors hover:bg-[#edeeea]"
                style={{ border: '1px solid rgba(175,179,174,0.25)', textDecoration: 'none', color: '#2f3430' }}
              >
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Ver todas las clases</span>
                <span style={{ color: '#536257', fontSize: '18px' }}>→</span>
              </Link>
              <Link
                href={`${baseHref}/nosotros`}
                className="flex items-center justify-between px-5 py-4 rounded-xl transition-colors hover:bg-[#edeeea]"
                style={{ border: '1px solid rgba(175,179,174,0.25)', textDecoration: 'none', color: '#2f3430' }}
              >
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Meet the Instructors</span>
                <span style={{ color: '#536257', fontSize: '18px' }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
