'use client';

import { useState } from 'react';
import { contact, business, images } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-veterinario';
  const [formData, setFormData] = useState({
    name: '',
    petName: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-24 px-8 bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto">
          <span
            className="text-[#166875] font-bold uppercase tracking-[0.2em] text-xs block mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {contact.badge}
          </span>
          <h1
            className="font-extrabold text-[#38312b] tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
          >
            {contact.title}{' '}
            <span className="text-[#166875]">{contact.titleAccent}</span>
          </h1>
          <p className="text-[#665e56] text-lg max-w-md leading-relaxed">
            {contact.subtitle}
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTACT ─── */}
      <section className="py-20 px-8 bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left — Info (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              {/* Teléfono info box */}
              <div className="bg-[#fcf2eb] p-8 rounded-2xl flex flex-col gap-6">
                <div className="flex items-start gap-6">
                  <div className="bg-[#a4ebf9] p-3 rounded-full text-[#005964] shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-xl text-[#38312b]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      General Inquiries
                    </h3>
                    <a
                      href={`tel:${business.phoneIntl}`}
                      className="text-2xl font-bold text-[#166875] mt-1 block hover:text-[#005c68] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {business.phone}
                    </a>
                    <p className="text-[#665e56] text-sm mt-1">Mon—Fri, 8:00am — 6:00pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 pt-6 border-t border-[#827971]/10">
                  <div className="bg-[#f56965]/20 p-3 rounded-full text-[#65000b] shrink-0">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-xl text-[#ac3434]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Emergency Care
                    </h3>
                    <a
                      href={`tel:${business.phoneIntl}`}
                      className="text-2xl font-bold text-[#ac3434] mt-1 block hover:text-[#70030f] transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {business.emergency}
                    </a>
                    <p className="text-[#665e56] text-sm mt-1">24/7 Veterinary Response Unit</p>
                  </div>
                </div>
              </div>

              {/* Horario + Parking grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f1e6dd]/50 p-6 rounded-2xl">
                  <h4
                    className="font-bold text-xs uppercase tracking-wider text-[#665e56] mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Clinic Horario
                  </h4>
                  <ul className="flex flex-col gap-2 text-sm text-[#38312b]">
                    {contact.hours.map((row) => (
                      <li key={row.day} className="flex justify-between">
                        <span className="text-[#665e56]">{row.day}</span>
                        <span className="font-bold">{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#f1e6dd]/50 p-6 rounded-2xl">
                  <h4
                    className="font-bold text-xs uppercase tracking-wider text-[#665e56] mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Parking
                  </h4>
                  <p className="text-sm text-[#665e56] leading-relaxed">
                    Dedicated sanctuary parking behind the clinic on{' '}
                    <span className="font-bold text-[#38312b]">Paws Street</span>.
                    Valet available for surgical drop-offs.
                  </p>
                </div>
              </div>

              {/* Dirección */}
              <div>
                <p
                  className="text-xs uppercase tracking-widest font-bold text-[#665e56] mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Find Us
                </p>
                <p
                  className="text-2xl font-bold text-[#38312b] leading-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {business.address},
                  <br />
                  {business.city}, {business.state} {business.zip}
                </p>
              </div>
            </div>

            {/* Right — Form (7 cols) */}
            <div className="lg:col-span-7">
              <div
                className="bg-white p-8 md:p-12 rounded-2xl relative overflow-hidden border border-[#827971]/5"
                style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.05)' }}
              >
                {/* Decorative orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#166875]/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

                {submitted ? (
                  <div className="text-center py-16 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-[#cffcd5] flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-[#41684a] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <h3
                      className="text-2xl font-bold text-[#38312b] mb-3"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Appointment Request Received
                    </h3>
                    <p className="text-[#665e56] leading-relaxed max-w-sm mx-auto">
                      Our team will contact you within 24 hours to confirm your appointment and answer any questions.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          className="text-sm font-bold text-[#665e56] px-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Jane Smith"
                          className="w-full bg-[#f6ece4] border-none rounded-2xl p-4 text-[#38312b] placeholder-[#bbb0a7] outline-none focus:ring-2 focus:ring-[#166875]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="text-sm font-bold text-[#665e56] px-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          Pet&apos;s Name
                        </label>
                        <input
                          type="text"
                          name="petName"
                          value={formData.petName}
                          onChange={handleChange}
                          placeholder="Luna"
                          className="w-full bg-[#f6ece4] border-none rounded-2xl p-4 text-[#38312b] placeholder-[#bbb0a7] outline-none focus:ring-2 focus:ring-[#166875]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          className="text-sm font-bold text-[#665e56] px-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 000-0000"
                          className="w-full bg-[#f6ece4] border-none rounded-2xl p-4 text-[#38312b] placeholder-[#bbb0a7] outline-none focus:ring-2 focus:ring-[#166875]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className="text-sm font-bold text-[#665e56] px-1"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          Reason for Visit
                        </label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className="w-full bg-[#f6ece4] border-none rounded-2xl p-4 text-[#38312b] outline-none focus:ring-2 focus:ring-[#166875] cursor-pointer appearance-none"
                        >
                          <option value="">Select reason...</option>
                          {contact.visitOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        className="text-sm font-bold text-[#665e56] px-1"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Detailed Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How can we help your pet today? Describe any symptoms or concerns..."
                        className="w-full bg-[#f6ece4] border-none rounded-2xl p-4 text-[#38312b] placeholder-[#bbb0a7] outline-none focus:ring-2 focus:ring-[#166875] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#166875] text-[#edfcff] py-5 rounded-full font-bold text-lg hover:bg-[#005c68] transition-all shadow-lg flex items-center justify-center gap-3"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 10px 40px -10px rgba(22,104,117,0.4)' }}
                    >
                      <span className="material-symbols-outlined">send</span>
                      Submit Appointment Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section className="mt-24 mx-8 mb-16 rounded-2xl overflow-hidden shadow-xl relative group">
        <div className="h-[500px] w-full">
          <img
            src={images.contactMap}
            alt="Kindred Paws clinic location map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(56,49,43,0.4) 0%, transparent 50%)' }} />

          {/* Glass address card */}
          <div
            className="absolute bottom-8 left-8 right-8 p-8 rounded-2xl max-w-xl border border-white/20"
            style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#166875] text-[#edfcff] p-3 rounded-full shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h3
                  className="font-bold text-xl text-[#38312b]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  The Sanctuary Location
                </h3>
                <p className="text-[#665e56] mt-1">
                  {business.address}
                  <br />
                  {business.city}, {business.state} {business.zip}
                </p>
                <button
                  className="mt-4 text-[#166875] font-bold flex items-center gap-2 hover:underline"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Get Directions
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
