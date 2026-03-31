'use client';

import { serviciosPage, images } from '../data';

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO/INTRO SECTION */}
      <section className="relative py-20 lg:py-32 bg-white">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-[#1a365d]/5 skew-y-12 -z-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              {/* Badge */}
              <div className="inline-block mb-8">
                <span
                  className="text-xs font-bold tracking-widest uppercase text-[#0061a5]"
                  style={{ fontFamily: 'Inter' }}
                >
                  {serviciosPage.badge}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-[#002045]"
                style={{
                  fontFamily: 'Manrope',
                  lineHeight: '1.1',
                }}
              >
                {serviciosPage.title}
              </h1>

              {/* Description with highlights */}
              <p
                className="text-lg text-[#43474e] mb-8 leading-relaxed"
                style={{ fontFamily: 'Inter' }}
              >
                {serviciosPage.intro.split('Cámara TV').map((part, idx) => (
                  <span key={idx}>
                    {part}
                    {idx === 0 && <span className="font-bold text-[#002045]">Cámara TV</span>}
                  </span>
                ))}
              </p>

              {/* Chips/Pills */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {serviciosPage.chips.map((chip, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-[#f2f4f6] px-5 py-3 rounded-full"
                  >
                    <span className="material-symbols-outlined text-[#0061a5] text-xl">
                      {chip.icon}
                    </span>
                    <span
                      className="text-sm font-medium text-[#0061a5]"
                      style={{ fontFamily: 'Inter' }}
                    >
                      {chip.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              {/* Main Image - Rotated with shadow */}
              <div className="relative -rotate-2 mb-8">
                <img
                  src={images.serviciosHero}
                  alt="Servicios Fontanería"
                  className="w-full rounded-3xl shadow-2xl object-cover aspect-video"
                />
              </div>

              {/* Floating Glass Card */}
              <div
                className="absolute -bottom-6 -left-8 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/20 flex items-center gap-3 max-w-xs"
              >
                <span className="material-symbols-outlined text-[#e88532] text-3xl flex-shrink-0">
                  emergency_home
                </span>
                <div>
                  <p
                    className="font-bold text-[#002045] text-sm"
                    style={{ fontFamily: 'Manrope' }}
                  >
                    Atención 24/7
                  </p>
                  <p
                    className="text-xs text-[#43474e]"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Disponibles todo el año
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="py-20 lg:py-28 bg-[#f2f4f6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#002045] mb-6"
              style={{ fontFamily: 'Manrope' }}
            >
              Soluciones Integrales
            </h2>
            {/* Orange divider bar */}
            <div className="flex justify-center">
              <div className="h-1 w-24 bg-[#e88532] rounded-full" />
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviciosPage.items.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon Background */}
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                    service.urgent
                      ? 'bg-[#e88532]'
                      : 'bg-[#0061a5]'
                  }`}
                >
                  <span className="material-symbols-outlined text-white text-2xl">
                    {service.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-xl font-bold text-[#002045]"
                    style={{ fontFamily: 'Manrope' }}
                  >
                    {service.name}
                  </h3>
                  {service.urgent && (
                    <span
                      className="bg-[#572900] text-[#e88532] text-xs font-bold px-3 py-1 rounded-full ml-2 whitespace-nowrap"
                      style={{ fontFamily: 'Inter' }}
                    >
                      URGENTE
                    </span>
                  )}
                </div>

                <p
                  className="text-[#43474e] mb-6 leading-relaxed"
                  style={{ fontFamily: 'Inter' }}
                >
                  {service.desc}
                </p>

                {/* Más info link */}
                <a
                  href="/template-fontaneria/contacto"
                  className="inline-flex items-center gap-2 text-[#e88532] font-semibold hover:gap-3 transition-all"
                  style={{ fontFamily: 'Inter' }}
                >
                  Más info
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIZED TECH SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div>
              <img
                src={images.serviciosTech}
                alt="Inspección con Cámara TV"
                className="w-full rounded-2xl shadow-lg object-cover aspect-video"
              />
            </div>

            {/* Right - Content */}
            <div>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-[#002045] mb-6"
                style={{ fontFamily: 'Manrope' }}
              >
                {serviciosPage.tech.title}
              </h2>

              <p
                className="text-lg text-[#43474e] mb-8 leading-relaxed"
                style={{ fontFamily: 'Inter' }}
              >
                {serviciosPage.tech.desc}
              </p>

              {/* Checklist */}
              <ul className="space-y-4">
                {serviciosPage.tech.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#e88532] text-2xl flex-shrink-0 mt-1">
                      check_circle
                    </span>
                    <span
                      className="text-[#191c1e] font-medium pt-1"
                      style={{ fontFamily: 'Inter' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="/template-fontaneria/contacto"
                className="inline-block mt-10 px-8 py-4 bg-[#e88532] text-white font-bold rounded-lg hover:bg-[#d67420] transition-colors"
                style={{ fontFamily: 'Inter' }}
              >
                Solicitar inspección
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
