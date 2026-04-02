'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contacto, images, business } from '../data';

export default function ContactoPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-fontaneria';
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setFormData({ nombre: '', telefono: '', servicio: '', mensaje: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side: Title and text */}
          <div>
            <div className="inline-block mb-6">
              <span
                className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
                style={{ backgroundColor: '#0061a5', color: 'white' }}
              >
                {contacto.badge}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4"
              style={{
                fontFamily: 'Manrope',
                color: '#002045',
                letterSpacing: '-0.02em',
              }}
            >
              {contacto.title}
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: '#43474e' }}
            >
              {contacto.subtitle}
            </p>
          </div>

          {/* Right side: Action buttons */}
          <div className="flex flex-col gap-4 pt-4 lg:pt-0">
            <Link href={`tel:${business.phoneIntl}`}>
              <button
                className="w-full px-8 py-4 rounded-lg font-semibold uppercase tracking-wide text-white transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                style={{ backgroundColor: '#e88532' }}
              >
                <span className="material-symbols-outlined text-xl">
                  phone_in_talk
                </span>
                Llamada Directa
              </button>
            </Link>

            <Link href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <button
                className="w-full px-8 py-4 rounded-lg font-semibold uppercase tracking-wide text-white transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                style={{ backgroundColor: '#25D366' }}
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                WhatsApp
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid: Form + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Form Card (7 cols) */}
          <div
            className="lg:col-span-7 p-8 rounded-2xl"
            style={{ backgroundColor: 'white', border: '1px solid #e0e3e5' }}
          >
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: '#002045' }}
            >
              {contacto.formTitle}
            </h2>
            <p
              className="text-sm mb-8"
              style={{ color: '#43474e' }}
            >
              {contacto.formSubtitle}
            </p>

            {submitted && (
              <div
                className="mb-6 p-4 rounded-lg text-white text-center"
                style={{ backgroundColor: '#25D366' }}
              >
                ¡Gracias! Tu solicitud ha sido enviada. Un técnico te contactará pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre + Teléfono (2-col on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: '#0061a5' }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                    style={{
                      backgroundColor: '#e0e3e5',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: '#0061a5' }}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                    style={{
                      backgroundColor: '#e0e3e5',
                      border: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Tipo de Servicio */}
              <div>
                <label
                  className="block text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: '#0061a5' }}
                >
                  Tipo de Servicio
                </label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all appearance-none"
                  style={{
                    backgroundColor: '#e0e3e5',
                    border: 'none',
                    color: '#43474e',
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  {contacto.serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label
                  className="block text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: '#0061a5' }}
                >
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all resize-none"
                  style={{
                    backgroundColor: '#e0e3e5',
                    border: 'none',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 rounded-lg font-semibold uppercase tracking-wide text-white transition-all duration-200 active:scale-95"
                style={{ backgroundColor: '#002045' }}
              >
                Enviar Solicitud
              </button>
            </form>
          </div>

          {/* Right Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Top Card: Service Guarantee */}
            <div
              className="p-8 rounded-2xl text-white"
              style={{ backgroundColor: '#002045' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h3 className="text-lg font-bold">Servicio Local Garantizado</h3>
              </div>

              <p className="text-sm leading-relaxed mb-6 opacity-90">
                Nuestro despliegue logístico te garantiza respuesta técnica en tiempo récord. Todos nuestros profesionales están certificados y uniformados.
              </p>

              {/* Schedule info rows */}
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-80">Horario:</span>
                  <span className="font-semibold">{contacto.schedule}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-80">Tiempo Respuesta:</span>
                  <span className="font-semibold">{contacto.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Bottom Card: Location & Contact */}
            <div
              className="p-8 rounded-2xl"
              style={{ backgroundColor: '#f2f4f6' }}
            >
              <h3
                className="text-xs font-bold tracking-widest uppercase mb-6"
                style={{ color: '#0061a5' }}
              >
                Ubicación y Datos
              </h3>

              {/* Dirección */}
              <div className="flex gap-3 mb-4">
                <span
                  className="material-symbols-outlined flex-shrink-0 mt-1"
                  style={{ color: '#002045' }}
                >
                  location_on
                </span>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: '#002045' }}
                  >
                    {business.address}
                  </p>
                  <p className="text-xs" style={{ color: '#43474e' }}>
                    {business.postalCode} {business.city}, {business.country}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <span
                  className="material-symbols-outlined flex-shrink-0 mt-1"
                  style={{ color: '#002045' }}
                >
                  mail
                </span>
                <a
                  href={`mailto:${business.email}`}
                  className="text-sm"
                  style={{ color: '#0061a5' }}
                >
                  {business.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative h-96 rounded-3xl overflow-hidden group">
          {/* Map Image */}
          <Image
            src={images.contactMap}
            alt="Service area map"
            fill
            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
          />

          {/* Pulsing Dot Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulsing rings */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  backgroundColor: '#25D366',
                  opacity: 0.3,
                  width: '60px',
                  height: '60px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: '#25D366',
                  width: '20px',
                  height: '20px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </div>

          {/* "Operativos ahora" Badge */}
          <div
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(37, 211, 102, 0.9)' }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'white' }}
            />
            Estamos operativos ahora
          </div>
        </div>
      </section>
    </main>
  );
}
