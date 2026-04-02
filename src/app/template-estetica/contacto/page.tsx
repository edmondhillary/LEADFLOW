'use client';

import { useState } from 'react';
import { contacto, business, images, testimonials } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-estetica';
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
    privacidad: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f5f4ef 0%, #fbf9f5 60%, #eeeee8 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-4 py-2 mb-8">
            {contacto.badge}
          </span>
          <h1
            className="text-5xl md:text-7xl font-medium text-[#30332e] leading-tight mb-6"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {contacto.title}
          </h1>
          <p className="text-[#5d605a] text-lg leading-relaxed max-w-xl mx-auto">
            {contacto.subtitle}
          </p>
        </div>
      </section>

      {/* ─── MAIN: INFO + FORM ─── */}
      <section className="py-16 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Left info — col 5 */}
            <div className="md:col-span-5 flex flex-col gap-10">
              {/* Dirección */}
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border-b border-[#b1b3ab]/30 pb-3 mb-1">Ubicacion</span>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#6c5c4a] text-xl shrink-0 mt-0.5">location_on</span>
                  <div>
                    <p className="text-sm text-[#30332e] font-medium">{business.address}</p>
                    <p className="text-sm text-[#5d605a]">{business.postalCode} {business.city}, {business.country}</p>
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border-b border-[#b1b3ab]/30 pb-3 mb-1">Telefono</span>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="flex gap-3 hover:text-[#6c5c4a] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#6c5c4a] text-xl shrink-0 mt-0.5">phone</span>
                  <span className="text-sm text-[#30332e] font-medium">{business.phone}</span>
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border-b border-[#b1b3ab]/30 pb-3 mb-1">WhatsApp</span>
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center group"
                >
                  <span className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" className="fill-[#25d366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <span className="text-sm text-[#30332e] font-medium group-hover:text-[#6c5c4a] transition-colors">
                    Enviar mensaje
                  </span>
                </a>
              </div>

              {/* Horario */}
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border-b border-[#b1b3ab]/30 pb-3 mb-1">Horario</span>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#6c5c4a] text-xl shrink-0 mt-0.5">schedule</span>
                  <p className="text-sm text-[#5d605a] leading-relaxed">{contacto.schedule}</p>
                </div>
              </div>

              {/* Map image */}
              <div className="relative overflow-hidden h-48 mt-2">
                <img
                  src={images.contactMap}
                  alt="Clinic location map"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.3) 0%, transparent 60%)' }}
                />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-white bg-[#6c5c4a] px-3 py-1.5 tracking-wide">{business.city}</span>
                </div>
              </div>
            </div>

            {/* Right form — col 7 */}
            <div className="md:col-span-7">
              <div className="bg-white p-8 md:p-12">
                {submitted ? (
                  <div className="text-center py-16 flex flex-col items-center gap-6">
                    <span className="material-symbols-outlined text-[#6c5c4a] text-6xl">check_circle</span>
                    <h3
                      className="text-2xl font-medium text-[#30332e]"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      Mensaje enviado
                    </h3>
                    <p className="text-[#5d605a] text-sm leading-relaxed max-w-sm">
                      Nuestro equipo se pondra en contacto contigo en las proximas 24 horas para confirmar tu consulta.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2
                        className="text-2xl font-medium text-[#30332e] mb-2"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      >
                        Solicitar Consulta
                      </h2>
                      <p className="text-sm text-[#5d605a]">Todos los campos son obligatorios salvo indicacion contraria.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Nombre */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs tracking-widest uppercase text-[#5d605a]">Nombre completo</label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre completo"
                          className="w-full bg-transparent border-b border-[#b1b3ab]/40 pb-3 text-sm text-[#30332e] placeholder-[#b1b3ab] outline-none focus:border-[#6c5c4a] transition-colors"
                        />
                      </div>

                      {/* Email + Telefono */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs tracking-widest uppercase text-[#5d605a]">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                            className="w-full bg-transparent border-b border-[#b1b3ab]/40 pb-3 text-sm text-[#30332e] placeholder-[#b1b3ab] outline-none focus:border-[#6c5c4a] transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs tracking-widest uppercase text-[#5d605a]">Telefono</label>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="+34 600 000 000"
                            className="w-full bg-transparent border-b border-[#b1b3ab]/40 pb-3 text-sm text-[#30332e] placeholder-[#b1b3ab] outline-none focus:border-[#6c5c4a] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Servicio */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs tracking-widest uppercase text-[#5d605a]">Tratamiento de interes</label>
                        <select
                          name="servicio"
                          value={formData.servicio}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-[#b1b3ab]/40 pb-3 text-sm text-[#30332e] outline-none focus:border-[#6c5c4a] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Selecciona un tratamiento</option>
                          {contacto.serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Mensaje */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs tracking-widest uppercase text-[#5d605a]">Mensaje (opcional)</label>
                        <textarea
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Cuentanos sobre tus objetivos esteticos o cualquier consulta previa..."
                          className="w-full bg-transparent border-b border-[#b1b3ab]/40 pb-3 text-sm text-[#30332e] placeholder-[#b1b3ab] outline-none focus:border-[#6c5c4a] transition-colors resize-none"
                        />
                      </div>

                      {/* Privacidad */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="privacidad"
                          name="privacidad"
                          checked={formData.privacidad}
                          onChange={handleChange}
                          required
                          className="mt-0.5 w-4 h-4 accent-[#6c5c4a] shrink-0"
                        />
                        <label htmlFor="privacidad" className="text-xs text-[#5d605a] leading-relaxed cursor-pointer">
                          He leido y acepto la{' '}
                          <a href="#" className="text-[#6c5c4a] underline hover:text-[#5f503f]">Politica de Privacidad</a>
                          {' '}y consiento el tratamiento de mis datos con fines de gestion de consultas.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#6c5c4a] text-[#fff6f0] tracking-widest uppercase text-sm px-8 py-4 hover:bg-[#5f503f] transition-colors duration-200 w-full md:w-auto"
                      >
                        ENVIAR SOLICITUD
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL INSET ─── */}
      <section className="py-20 bg-[#f5f4ef]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span
            className="block text-7xl leading-none font-bold text-[#eeda7b] mb-2"
            style={{ fontFamily: "'Noto Serif', serif" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote
            className="text-xl md:text-2xl font-medium text-[#30332e] leading-relaxed mb-6 -mt-4"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {testimonials[1].text}
          </blockquote>
          <p className="text-sm font-semibold text-[#30332e]">{testimonials[1].name}</p>
          <p className="text-xs text-[#6c5c4a] tracking-wide mt-1">{testimonials[1].role}</p>
        </div>
      </section>
    </>
  );
}
