'use client';
import Link from 'next/link';
import { business as defaultBusiness, hero as defaultHero, stats, services, whyUs, processSteps, testimonials as defaultTestimonials, images } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function TemplateMudanzasHome(props: any = {}) {
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

  const base = ov?.baseHref ?? '/template-mudanzas';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa' }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: '#002046' }}>
        {/* Background image — grayscale + low opacity */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${images.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
            filter: 'grayscale(100%)',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(105deg, rgba(0,32,70,0.97) 55%, rgba(0,32,70,0.70) 100%)',
          }}
        />

        <div className="relative z-10 px-6 md:px-10 max-w-[1440px] mx-auto w-full py-24">
          {/* Badge chip */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#ef8300' }}
            />
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                color: '#87a0cd',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="max-w-3xl"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
            }}
          >
            {hero.title}{' '}
            <span style={{ color: '#ef8300' }}>{hero.titleAccent}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              marginBottom: '40px',
            }}
          >
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${base}/contacto`}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: '#552b00',
                color: '#ffffff',
                padding: '15px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              {hero.ctaPrimary}
            </Link>
            <a
              href={`tel:${business.phoneIntl}`}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: 'rgba(255,255,255,0.10)',
                color: '#ffffff',
                padding: '15px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
              className="hover:bg-white/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {hero.ctaSecondary}
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p style={{ fontSize: '12px', color: '#87a0cd', marginTop: '4px', letterSpacing: '0.05em' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES BENTO ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#44474e',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '12px',
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              color: '#191c1d',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Every type of move,<br />covered.
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Residential — col-span-3, white card */}
          <div
            className="md:col-span-3 rounded-2xl p-8 flex flex-col justify-between min-h-[280px]"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,32,70,0.05)' }}
          >
            <div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#f3f4f5' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#002046" aria-hidden="true">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#191c1d',
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                }}
              >
                Residential Moving
              </h3>
              <p style={{ fontSize: '14px', color: '#44474e', lineHeight: 1.65 }}>
                From studio apartments to family homes, we handle every detail of your move with care, precision, and respect for your belongings.
              </p>
            </div>
            <div className="flex gap-2 mt-6 flex-wrap">
              {['Local & Long Distance', 'Full Packing Available'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
                  style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#f3f4f5', color: '#44474e' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Office — col-span-3, navy card */}
          <div
            className="md:col-span-3 rounded-2xl p-8 flex flex-col justify-between min-h-[280px]"
            style={{ backgroundColor: '#002046' }}
          >
            <div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#87a0cd" aria-hidden="true">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                }}
              >
                Office Relocation
              </h3>
              <p style={{ fontSize: '14px', color: '#87a0cd', lineHeight: 1.65 }}>
                Minimize downtime with our expert office relocation service. We work around your schedule to get you operational in your new space fast.
              </p>
            </div>
            <div className="flex gap-2 mt-6 flex-wrap">
              {['IT Equipment Handling', 'After-Hours Service'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
                  style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(255,255,255,0.10)', color: '#87a0cd' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Packing — col-span-2 */}
          <div
            className="md:col-span-2 rounded-2xl p-6 min-h-[200px]"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,32,70,0.05)' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#f3f4f5' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#002046" aria-hidden="true">
                <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A1 1 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#191c1d',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              Packing Services
            </h3>
            <p style={{ fontSize: '13px', color: '#44474e', lineHeight: 1.6 }}>
              Professional packing with quality materials. Fragile specialists on every crew.
            </p>
          </div>

          {/* Storage — col-span-2 */}
          <div
            className="md:col-span-2 rounded-2xl p-6 min-h-[200px]"
            style={{ backgroundColor: '#f3f4f5' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#e7e8e9' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#002046" aria-hidden="true">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v4c0 .74.4 1.38 1 1.72V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9.72c.6-.35 1-.98 1-1.72V4c0-1.1-.9-2-2-2zm-5 12H9v-2h6v2zm5-8H4V4h16v2z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#191c1d',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              Storage Solutions
            </h3>
            <p style={{ fontSize: '13px', color: '#44474e', lineHeight: 1.6 }}>
              Secure, climate-controlled units. Short or long term, with 24/7 access.
            </p>
          </div>

          {/* Long-Distance — col-span-2 */}
          <div
            className="md:col-span-2 rounded-2xl p-6 min-h-[200px]"
            style={{ backgroundColor: '#1B365D' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#87a0cd" aria-hidden="true">
                <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}
            >
              Long-Distance Moving
            </h3>
            <p style={{ fontSize: '13px', color: '#87a0cd', lineHeight: 1.6 }}>
              Cross-country moves with GPS tracking, dedicated trucks, and white-glove service.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`${base}/servicios`}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#002046',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,32,70,0.3)',
              paddingBottom: '2px',
            }}
          >
            View all services and pricing
          </Link>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <div className="relative">
              <div
                className="rounded-3xl overflow-hidden aspect-square"
                style={{ transform: 'rotate(2deg)', boxShadow: '0 32px 64px rgba(0,32,70,0.12)' }}
              >
                <img
                  src={images.whyUsImage}
                  alt="Professional moving service"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-4"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(0,32,70,0.10)' }}
              >
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#002046',
                  }}
                >
                  Fully Insured
                </p>
                <p style={{ fontSize: '11px', color: '#44474e', marginTop: '2px' }}>
                  {business.insurance}
                </p>
              </div>
            </div>

            {/* Content side */}
            <div>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#44474e',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: '12px',
                }}
              >
                Why Kinetic
              </p>
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#191c1d',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '40px',
                }}
              >
                Not just movers.<br />Move managers.
              </h2>

              <div className="flex flex-col gap-8">
                {whyUs.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#002046' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#191c1d',
                          marginBottom: '6px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#44474e', lineHeight: 1.65 }}>
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

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#edeeef' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#44474e',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              How It Works
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#191c1d',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Four steps to a perfect move.
            </h2>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Dashed connecting line — desktop only */}
            <div
              className="hidden md:block absolute top-8 left-0 right-0 h-px"
              style={{ borderTop: '2px dashed rgba(0,32,70,0.15)', top: '32px', zIndex: 0 }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, i) => (
                <div key={step.num} className="flex flex-col items-center text-center">
                  {/* Circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: i === 1 ? '#002046' : '#ffffff',
                      boxShadow: '0 8px 24px rgba(0,32,70,0.10)',
                      border: i === 1 ? 'none' : '2px solid rgba(0,32,70,0.10)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '14px',
                        fontWeight: 800,
                        color: i === 1 ? '#ffffff' : '#002046',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#191c1d',
                      marginBottom: '8px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#44474e', lineHeight: 1.65 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#44474e',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              Client Stories
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#191c1d',
                letterSpacing: '-0.03em',
              }}
            >
              4.9 stars across 2,000+ moves.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,32,70,0.05)' }}
              >
                {/* Big quote mark */}
                <span
                  className="absolute top-4 right-6 select-none"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '80px',
                    fontWeight: 800,
                    color: 'rgba(0,32,70,0.05)',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#ef8300" aria-hidden="true">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    fontStyle: 'italic',
                    fontSize: '15px',
                    color: '#44474e',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                    flex: 1,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={images[t.image as keyof typeof images]}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#191c1d',
                      }}
                    >
                      {t.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#44474e' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div
          className="relative rounded-[2rem] overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: '#002046' }}
        >
          {/* Background image overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${images.heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.10,
            }}
          />
          <div className="relative z-10">
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#87a0cd',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '16px',
              }}
            >
              Ready to Move?
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Get your free quote in 2 hours.
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.60)',
                marginBottom: '40px',
                maxWidth: '480px',
                margin: '0 auto 40px',
              }}
            >
              No commitment required. Tell us about your move and we will give you a detailed, transparent estimate.
            </p>
            <Link
              href={`${base}/contacto`}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                backgroundColor: '#552b00',
                color: '#ffffff',
                padding: '16px 40px',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Request Free Estimate
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
