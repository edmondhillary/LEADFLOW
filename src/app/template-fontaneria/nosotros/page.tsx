'use client';

import Image from 'next/image';
import Link from 'next/link';
import { about, images, business } from '../data';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section
        className="relative min-h-[530px] bg-[#1a365d] overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(${images.aboutHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002045] via-[#002045]/80 to-transparent opacity-40 z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="mb-6 inline-block">
            <div className="px-4 py-2 rounded-full bg-[#e88532]/10 border border-[#e88532]/20">
              <span className="text-sm font-semibold text-[#e88532]">{about.badge}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-white mb-6 leading-tight">
            {about.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#86a0cd] max-w-3xl mx-auto">
            {about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. NUESTRA HISTORIA SECTION */}
      <section className="bg-[#f7f9fb] py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Image with floating badge */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={images.aboutHistory}
                  alt="Nuestro equipo"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating glass card with badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-12 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-xs border border-white/50">
                <div className="text-center">
                  <p className="font-manrope font-black text-4xl text-[#0061a5]">
                    {business.yearsExperience}+
                  </p>
                  <p className="text-sm text-[#43474e] font-medium mt-1">años de experiencia</p>
                </div>
              </div>
            </div>

            {/* Right: Text content */}
            <div>
              <div className="mb-4">
                <p className="text-sm font-bold text-[#0061a5] uppercase tracking-wide">Trayectoria</p>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#002045] mb-6 leading-tight">
                Más de {business.yearsExperience} años de excelencia técnica
              </h2>

              <div className="space-y-4">
                {about.history.map((paragraph, index) => (
                  <p key={index} className="text-base text-[#43474e] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUES SECTION */}
      <section className="bg-[#f2f4f6] py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002045] mb-4">
              Valores Fundamentales
            </h2>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-[#0061a5] rounded-full" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex">
                  <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-[#0061a5] transition-colors duration-300">
                    <span className="material-symbols-outlined text-2xl text-[#0061a5]">
                      {value.icon}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#002045] mb-3">{value.title}</h3>

                {/* Description */}
                <p className="text-base text-[#43474e] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION */}
      <section className="bg-[#f7f9fb] py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#002045] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Text content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {about.team.title}
                </h2>

                <p className="text-[#86a0cd] text-base leading-relaxed mb-8">
                  {about.team.desc}
                </p>

                {/* Badge row */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#86a0cd]/20">
                  <span className="material-symbols-outlined text-[#e88532]">verified</span>
                  <span className="text-sm font-medium text-[#86a0cd]">{about.team.badge}</span>
                </div>
              </div>

              {/* Right: Image with grayscale to color hover */}
              <div className="relative h-[300px] md:h-[400px] overflow-hidden group">
                <Image
                  src={images.aboutTeam}
                  alt="Equipo técnico certificado"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="bg-[#f7f9fb] py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon circle */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[#e88532]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-[#e88532]">
                support_agent
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#002045] mb-4">
            {about.cta.title}
          </h2>

          {/* Description */}
          <p className="text-base text-[#43474e] leading-relaxed mb-8 max-w-2xl mx-auto">
            {about.cta.desc}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary button */}
            <Link
              href="/template-fontaneria/contacto"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#e88532] text-white font-semibold hover:bg-[#d67320] transition-colors duration-300"
            >
              Solicitar servicio
            </Link>

            {/* Secondary button */}
            <Link
              href="/template-fontaneria"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-[#0061a5] text-[#0061a5] font-semibold hover:bg-[#0061a5]/5 transition-colors duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
