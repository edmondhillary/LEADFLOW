'use client';
import Image from 'next/image';
import Link from 'next/link';
import { business as defaultBusiness, hero as defaultHero, services, trust, process, stats, testimonials as defaultTestimonials, images } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function TemplateAirePage(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, titleAccent: ov.city, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length
    ? ov.testimonials.map((t, i) => ({ ...t, image: defaultTestimonials[i % defaultTestimonials.length]?.image ?? defaultTestimonials[0]?.image }))
    : defaultTestimonials;

  const base = ov?.baseHref ?? '/template-aire';

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.heroBg}
            alt="Modern home exterior Austin"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(252,248,251,0.90) 0%, rgba(252,248,251,0.40) 60%, transparent 100%)' }} />
        </div>
        <div className="relative z-10 w-full px-6 md:px-8 max-w-[1920px] mx-auto py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(141,75,0,0.1)', border: '1px solid rgba(141,75,0,0.2)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#8d4b00', fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{hero.badge}</span>
              </div>
              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#1b1b1d', marginBottom: '24px' }}>
                {hero.title}{' '}
                <span style={{ color: '#8d4b00' }}>{hero.titleAccent}</span>
              </h1>
              <p style={{ fontSize: '16px', color: '#414754', lineHeight: 1.7, maxWidth: '520px', marginBottom: '40px' }}>
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`${base}/contacto`}
                  className="inline-flex items-center justify-center gap-2 rounded-md transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)', color: '#ffffff', fontSize: '14px', fontWeight: 600, padding: '14px 32px', textDecoration: 'none' }}
                >
                  {hero.ctaPrimary}
                </Link>
                <Link
                  href={`${base}/servicios`}
                  className="inline-flex items-center justify-center gap-2 rounded-md transition-all hover:bg-[#eae7ea]"
                  style={{ backgroundColor: '#ffffff', color: '#3a5f94', border: '2px solid #3a5f94', fontSize: '14px', fontWeight: 600, padding: '14px 32px', textDecoration: 'none' }}
                >
                  {hero.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* Right — Atmospheric Gauge Panel */}
            <div className="hidden lg:flex justify-end">
              <div
                className="rounded-2xl p-8 w-80"
                style={{ background: 'rgba(252,248,251,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 12px 40px rgba(27,27,29,0.05)', border: '1px solid rgba(193,198,215,0.4)' }}
              >
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '11px', fontWeight: 700, color: '#717786', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px' }}>
                  {hero.gauge.label}
                </p>
                {/* Temp display */}
                <div className="flex items-end gap-2 mb-6">
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '72px', fontWeight: 800, lineHeight: 1, color: '#1b1b1d', letterSpacing: '-0.04em' }}>{hero.gauge.temp}</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 600, color: '#8d4b00', paddingBottom: '12px' }}>&deg;{hero.gauge.tempUnit}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span style={{ fontSize: '12px', color: '#717786' }}>Humidity</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 700, color: '#3a5f94' }}>{hero.gauge.humidity}%</span>
                </div>
                {/* Efficiency bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: '12px', color: '#717786' }}>{hero.gauge.efficiencyLabel}</span>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, color: '#8d4b00' }}>{hero.gauge.efficiency}%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: '#e4e2e4' }}>
                    <div className="h-2 rounded-full" style={{ width: `${hero.gauge.efficiency}%`, background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }} />
                  </div>
                </div>
                {/* SEER badge */}
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'rgba(58,95,148,0.08)', border: '1px solid rgba(58,95,148,0.15)' }}>
                  <span style={{ fontSize: '12px', color: '#414754' }}>{hero.gauge.seerLabel}</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 800, color: '#3a5f94' }}>{hero.gauge.seer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ backgroundColor: '#1b1b1d' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 px-6 md:px-8 max-w-[1920px] mx-auto divide-x divide-white/10">
          {stats.map(s => (
            <div key={s.label} className="py-8 px-6 text-center">
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, color: '#ffdcc3', letterSpacing: '-0.03em' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="py-24" style={{ backgroundColor: '#f6f3f5' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="mb-12">
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>What We Do</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em' }}>Full-service climate control</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => (
              <div
                key={s.name}
                className="rounded-xl p-8 flex flex-col gap-5"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: s.colorBox === 'tertiary-container' ? '#317d98'
                      : s.colorBox === 'secondary-container' ? '#9fc2fe'
                      : '#ffdcc3',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: '22px',
                      fontVariationSettings: "'FILL' 1",
                      color: s.colorBox === 'tertiary-container' ? '#fafdff'
                        : s.colorBox === 'secondary-container' ? '#294f83'
                        : '#8d4b00',
                    }}
                  >{s.icon}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1b1b1d', marginBottom: '8px' }}>{s.name}</h3>
                  <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
                <Link
                  href={`${base}/servicios`}
                  style={{ fontSize: '13px', fontWeight: 600, color: '#8d4b00', textDecoration: 'none', marginTop: 'auto' }}
                >
                  Saber más &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left — image */}
            <div className="lg:col-span-5 relative">
              <div
                className="absolute -inset-4 rounded-2xl opacity-30 blur-3xl"
                style={{ background: 'radial-gradient(circle, #3a5f94 0%, transparent 70%)' }}
              />
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}>
                <Image
                  src={images.hvacTech}
                  alt="NATE certified technician"
                  width={700}
                  height={500}
                  className="w-full object-cover"
                  style={{ height: '480px' }}
                />
              </div>
            </div>
            {/* Right — trust pillars */}
            <div className="lg:col-span-7">
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Why ArcticStream</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '40px' }}>
                Built on expertise and accountability
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {trust.map(t => (
                  <div key={t.title} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(5,100,126,0.1)' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#05647e', fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1b1b1d', marginBottom: '4px' }}>{t.title}</h3>
                      <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.6 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Journey */}
      <section className="py-24" style={{ backgroundColor: '#eae7ea' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>The Process</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em' }}>
              Your installation journey
            </h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Connector line — desktop only */}
            <div
              className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px]"
              style={{ backgroundColor: 'rgba(141,75,0,0.2)', zIndex: 0 }}
            />
            {process.map((step, i) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center text-center gap-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }}
                >
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>{i + 1}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '15px', fontWeight: 700, color: '#1b1b1d', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="mb-12 text-center">
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Customer Reviews</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em' }}>
              What Austin homeowners say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div
                key={t.name}
                className="rounded-xl p-8 flex flex-col gap-5"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize: '18px', color: '#b15f00', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#414754', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={images[t.image as keyof typeof images]}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, color: '#1b1b1d' }}>{t.name}</p>
                    <p style={{ fontSize: '11px', color: '#717786' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="rounded-2xl p-12 md:p-20 text-center"
            style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,220,195,0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
              {business.city}, {business.state}
            </p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
              Ready for reliable cooling?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
              Get your free site assessment and no-obligation quote. We respond within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`${base}/contacto`}
                className="inline-flex items-center justify-center rounded-md transition-all hover:bg-white/90"
                style={{ backgroundColor: '#ffffff', color: '#8d4b00', fontSize: '14px', fontWeight: 700, padding: '14px 36px', textDecoration: 'none' }}
              >
                Pedir presupuesto gratis
              </Link>
              <a
                href={`tel:${business.phoneIntl}`}
                className="inline-flex items-center justify-center rounded-md transition-all"
                style={{ border: '2px solid rgba(255,255,255,0.5)', color: '#ffffff', fontSize: '14px', fontWeight: 600, padding: '14px 36px', textDecoration: 'none' }}
              >
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
