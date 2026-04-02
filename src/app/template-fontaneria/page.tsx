'use client';
import { hero as defaultHero, services, trust, testimonials as defaultTestimonials, coverage, images, business as defaultBusiness } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function HomePage(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length ? ov.testimonials : defaultTestimonials;
  return (
    <main className="w-full">
      {/* ========== HERO SECTION ========== */}
      <section
        className="relative min-h-screen w-full flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #002045 0%, #1a365d 100%)',
        }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={images.heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative circle border (top right) */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full border-2 border-[#86a0cd] opacity-10 -translate-y-1/2 translate-x-1/2"></div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE: Text Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#ea580c] rounded-full px-4 py-2">
                <span className="material-symbols-outlined text-white text-sm">
                  emergency
                </span>
                <span className="text-white text-sm font-semibold">
                  {hero.badge}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight"
                style={{ fontFamily: 'Manrope' }}
              >
                {hero.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-[#86a0cd] leading-relaxed max-w-lg">
                {hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Primary Button */}
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#e88532] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-xl">
                    phone
                  </span>
                  {hero.ctaPrimary}
                </a>

                {/* Secondary Button (Glass effect) */}
                <button className="inline-flex items-center justify-center gap-2 border-2 border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-xl">
                    description
                  </span>
                  {hero.ctaSecondary}
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Features Glass Card (Desktop only) */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 space-y-6">
                {hero.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 bg-[#0061a5] rounded-2xl p-3">
                      <span className="material-symbols-outlined text-white text-2xl">
                        {feature.icon}
                      </span>
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-[#86a0cd] text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES BENTO GRID ========== */}
      <section className="w-full bg-[#f7f9fb] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center space-y-3 mb-16">
            <p className="text-[#0061a5] font-bold text-sm uppercase tracking-wide">
              NUESTRA ESPECIALIDAD
            </p>
            <h2
              className="text-4xl lg:text-5xl font-black text-[#002045] leading-tight"
              style={{ fontFamily: 'Manrope' }}
            >
              Servicios Destacados
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-b-4 border-transparent hover:border-[#ea580c]"
              >
                {/* Icon */}
                <div className="mb-4">
                  <span className="material-symbols-outlined text-[#0061a5] text-4xl">
                    {service.icon}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold text-[#002045] mb-3"
                  style={{ fontFamily: 'Manrope' }}
                >
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-[#43474e] text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>

                {/* Link */}
                <a
                  href="#"
                  className="text-[#0061a5] font-semibold text-sm hover:text-[#ea580c] transition-colors"
                >
                  MÁS INFO →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRUST SECTION ========== */}
      <section className="w-full bg-[#f2f4f6] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Image */}
            <div className="rounded-3xl overflow-hidden relative h-96 lg:h-full min-h-[500px]">
              {/* Image */}
              <img
                src={images.trustSection}
                alt="Trust Section"
                className="w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#002045]/20"></div>
            </div>

            {/* RIGHT: Content */}
            <div className="space-y-8">
              <h2
                className="text-4xl lg:text-5xl font-black text-[#002045] leading-tight"
                style={{ fontFamily: 'Manrope' }}
              >
                ¿Por qué elegirnos?
              </h2>

              {/* Trust items */}
              <div className="space-y-6">
                {trust.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    {/* Icon container */}
                    <div className="flex-shrink-0 bg-[#1a365d] rounded-2xl p-3">
                      <span className="material-symbols-outlined text-[#e88532] text-2xl">
                        {item.icon}
                      </span>
                    </div>

                    {/* Text */}
                    <div>
                      <h3
                        className="text-lg font-bold text-[#002045] mb-1"
                        style={{ fontFamily: 'Manrope' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[#43474e] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="w-full bg-[#f7f9fb] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-black text-[#002045] leading-tight"
              style={{ fontFamily: 'Manrope' }}
            >
              Opiniones de clientes
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[#e88532] text-xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#191c1e] italic text-base leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0061a5] to-[#002045] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name & Role */}
                  <div>
                    <p className="font-bold text-[#002045] text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-[#43474e] text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICE AREA ========== */}
      <section className="w-full bg-[#e6e8ea] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text Content */}
            <div className="space-y-8">
              <h2
                className="text-4xl lg:text-5xl font-black text-[#002045] leading-tight"
                style={{ fontFamily: 'Manrope' }}
              >
                {coverage.title}
              </h2>

              <p className="text-[#191c1e] text-base leading-relaxed">
                {coverage.desc}
              </p>

              {/* Zones Grid */}
              <div className="grid grid-cols-2 gap-4">
                {coverage.zones.map((zone, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0061a5] text-2xl">
                      location_on
                    </span>
                    <span className="text-[#191c1e] font-semibold text-sm">
                      {zone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Map Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              {/* Map image */}
              <img
                src={images.serviceArea}
                alt="Service Area Map"
                className="w-full h-full object-cover grayscale"
              />

              {/* Pulsing dot center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4 h-4">
                  {/* Pulsing ring */}
                  <div className="absolute inset-0 bg-[#ea580c] rounded-full animate-pulse"></div>

                  {/* Center dot */}
                  <div className="absolute inset-1 bg-[#e88532] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
