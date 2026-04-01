'use client';

import { useState } from 'react';
import { business, contacto, images } from '../data';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dogName: '',
    dogBreed: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle = {
    backgroundColor: '#e7e9e2',
    border: 'none',
    outline: 'none',
    borderRadius: '12px',
    padding: '14px 18px',
    fontSize: '14px',
    color: '#2f342e',
    fontFamily: "'Be Vietnam Pro', sans-serif",
    width: '100%',
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", backgroundColor: '#fafaf5', color: '#2f342e' }}>

      {/* Header */}
      <section className="px-6 md:px-10 py-20 md:py-28 max-w-[1920px] mx-auto">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: '#cee9d6', color: '#3f5749' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_month</span>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{contacto.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#2f342e', lineHeight: 1.05, marginBottom: '20px' }}>
            {contacto.title}
          </h1>
          <p style={{ fontSize: '16px', color: '#5c605a', lineHeight: 1.75 }}>
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 md:px-10 pb-24 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left: Info */}
          <div className="flex flex-col gap-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl p-7 flex items-start gap-5" style={{ backgroundColor: '#f3f4ee' }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cee9d6' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749' }}>location_on</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#2f342e', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Address</p>
                  <p style={{ fontSize: '14px', color: '#5c605a', lineHeight: 1.65 }}>{business.address}</p>
                </div>
              </div>
              <div className="rounded-xl p-7 flex items-start gap-5" style={{ backgroundColor: '#f3f4ee' }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cee9d6' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749' }}>schedule</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#2f342e', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Hours</p>
                  <p style={{ fontSize: '14px', color: '#5c605a' }}>{contacto.schedule}</p>
                </div>
              </div>
              <div className="rounded-xl p-7 flex items-start gap-5" style={{ backgroundColor: '#f3f4ee' }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cee9d6' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749' }}>call</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#2f342e', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Phone</p>
                  <a href={`tel:${business.phoneIntl}`} style={{ fontSize: '14px', color: '#4c6456', textDecoration: 'none', fontWeight: 600 }}>{business.phone}</a>
                </div>
              </div>
              <div className="rounded-xl p-7 flex items-start gap-5" style={{ backgroundColor: '#f3f4ee' }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cee9d6' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749' }}>mail</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#2f342e', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Email</p>
                  <a href={`mailto:${business.email}`} style={{ fontSize: '14px', color: '#4c6456', textDecoration: 'none', fontWeight: 600 }}>{business.email}</a>
                </div>
              </div>
            </div>

            {/* Map image */}
            <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0px 16px 40px rgba(47,52,46,0.08)' }}>
              <img src={images.contactMap} alt="Aspen, Colorado location map" className="w-full object-cover" style={{ aspectRatio: '16/9' }} />
            </div>

            {/* Note */}
            <div className="rounded-xl p-6 flex items-start gap-4" style={{ backgroundColor: '#feecce', border: '1px solid #f5d79e' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#6a5e46', flexShrink: 0, marginTop: '2px' }}>info</span>
              <p style={{ fontSize: '13px', color: '#635740', lineHeight: 1.7 }}>{contacto.note}</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-xl p-10 md:p-12" style={{ backgroundColor: '#ffffff', boxShadow: '0px 24px 48px rgba(47,52,46,0.08)' }}>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#cee9d6' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#3f5749', fontVariationSettings: "'FILL' 1" }}>pets</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '26px', fontWeight: 800, color: '#2f342e', letterSpacing: '-0.03em' }}>
                  Request Received!
                </h3>
                <p style={{ fontSize: '15px', color: '#5c605a', lineHeight: 1.75, maxWidth: '360px' }}>
                  Thank you for reaching out. Our team will confirm your appointment within {contacto.responseTime}.
                </p>
                <button onClick={() => setSubmitted(false)} className="rounded-full px-8 py-3 transition-all hover:opacity-90" style={{ backgroundColor: '#4c6456', color: '#e6ffed', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  Book Another
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '24px', fontWeight: 800, color: '#2f342e', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                    {contacto.formTitle}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#5c605a' }}>{contacto.formSubtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Smith" style={inputStyle} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 970 000 0000" style={inputStyle} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com" style={inputStyle} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dog&apos;s Name</label>
                      <input type="text" name="dogName" value={formData.dogName} onChange={handleChange} placeholder="Cooper" style={inputStyle} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Breed</label>
                      <input type="text" name="dogBreed" value={formData.dogBreed} onChange={handleChange} placeholder="Golden Retriever" style={inputStyle} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Service</label>
                    <select name="service" value={formData.service} onChange={handleChange} required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select a service...</option>
                      {contacto.serviceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message (optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any special requests or notes about your dog..."
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="rounded-full py-4 transition-all hover:opacity-90 active:scale-[0.98] mt-2" style={{ backgroundColor: '#4c6456', color: '#e6ffed', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    Request Appointment
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
