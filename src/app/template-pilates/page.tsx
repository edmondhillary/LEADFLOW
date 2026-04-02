'use client';
import Link from 'next/link';
import { business as defaultBusiness, hero as defaultHero, classes, philosophy, testimonials as defaultTestimonials, images } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function HomePage(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, titleItalic: ov.city, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length ? ov.testimonials : defaultTestimonials;

  const base = ov?.baseHref ?? '/template-pilates';
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.heroBg}
            alt="Kinetic Gallery Studio"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay: left-heavy */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(250,249,246,0.90) 0%, rgba(250,249,246,0.40) 55%, transparent 100%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1920px] w-full mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-2xl">
            {/* Editorial label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px]" style={{ backgroundColor: '#536257' }} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#536257', textTransform: 'uppercase', letterSpacing: '0.25em' }}>
                {hero.badge}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl mb-8"
              style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.08, letterSpacing: '-0.02em' }}
            >
              {hero.titleLine1}<br />
              {hero.titleLine2}<br />
              <span style={{ fontStyle: 'italic', color: '#536257' }}>{hero.titleItalic}</span>{' '}
              {hero.titleLine3}
            </h1>

            <p className="text-base md:text-lg mb-10 max-w-xl" style={{ color: '#5c605c', lineHeight: 1.7 }}>
              {hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${base}/contacto`}
                className="inline-block text-center transition-all active:scale-[0.98]"
                style={{ backgroundColor: '#536257', color: '#ebfced', padding: '16px 40px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', borderRadius: '9999px' }}
              >
                {hero.ctaPrimary}
              </Link>
              <Link
                href={`${base}/servicios`}
                className="inline-block text-center transition-all active:scale-[0.98]"
                style={{ color: '#2f3430', padding: '16px 40px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', borderBottom: '1px solid #2f3430' }}
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE BENTO GRID ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#faf9f6' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>Our Practice</span>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.15 }}>
                Every body, every <span style={{ fontStyle: 'italic' }}>intention.</span>
              </h2>
            </div>
            <Link
              href={`${base}/servicios`}
              style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2f3430', textDecoration: 'none', borderBottom: '1px solid #2f3430', paddingBottom: '4px', alignSelf: 'flex-start' }}
            >
              View All Classes
            </Link>
          </div>

          {/* Bento grid — fixed height on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3" style={{ minHeight: '900px' }}>
            {/* Large card: Reformer Collective — col-span-8 */}
            <div className="md:col-span-8 relative group overflow-hidden rounded-xl" style={{ minHeight: '420px' }}>
              <img
                src={images.reformer}
                alt={classes[0].name}
                className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(47,52,48,0.80) 0%, rgba(47,52,48,0.10) 60%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(235,252,237,0.75)', display: 'block', marginBottom: '6px' }}>{classes[0].tag}</span>
                <h3 className="text-2xl md:text-3xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#ebfced' }}>{classes[0].name}</h3>
                <p className="mt-2 max-w-md" style={{ fontSize: '13px', color: 'rgba(235,252,237,0.75)', lineHeight: 1.6 }}>{classes[0].desc}</p>
              </div>
            </div>

            {/* Small card: Private Studio — col-span-4 */}
            <div className="md:col-span-4 relative group overflow-hidden rounded-xl" style={{ minHeight: '300px' }}>
              <img
                src={images.privateSession}
                alt={classes[1].name}
                className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(47,52,48,0.80) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(235,252,237,0.75)', display: 'block', marginBottom: '6px' }}>{classes[1].tag}</span>
                <h3 className="text-xl md:text-2xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#ebfced' }}>{classes[1].name}</h3>
              </div>
            </div>

            {/* Small card: Mat Sculpt — col-span-4 */}
            <div className="md:col-span-4 relative group overflow-hidden rounded-xl" style={{ minHeight: '300px' }}>
              <img
                src={images.matClass}
                alt={classes[2].name}
                className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(47,52,48,0.80) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(235,252,237,0.75)', display: 'block', marginBottom: '6px' }}>{classes[2].tag}</span>
                <h3 className="text-xl md:text-2xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#ebfced' }}>{classes[2].name}</h3>
              </div>
            </div>

            {/* Large card: Introductory Series — col-span-8 */}
            <div className="md:col-span-8 relative group overflow-hidden rounded-xl" style={{ minHeight: '300px' }}>
              <img
                src={images.studioLobby}
                alt={classes[3].name}
                className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(47,52,48,0.80) 0%, rgba(47,52,48,0.10) 60%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(235,252,237,0.75)', display: 'block', marginBottom: '6px' }}>{classes[3].tag}</span>
                <h3 className="text-2xl md:text-3xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#ebfced' }}>{classes[3].name}</h3>
                <p className="mt-2 max-w-md" style={{ fontSize: '13px', color: 'rgba(235,252,237,0.75)', lineHeight: 1.6 }}>{classes[3].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY US — Asymmetric 2-col ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8 overflow-hidden" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Image col with glassmorphism quote */}
          <div className="md:col-span-5 relative">
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: '12px' }}>
              <img
                src={images.studioMain}
                alt="Kinetic Gallery Studio"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glassmorphism quote card — floating above-left */}
            <div
              className="absolute -top-6 -left-4 md:-left-8 max-w-xs p-6 rounded-xl"
              style={{ background: 'rgba(250,249,246,0.80)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0px 24px 48px rgba(47,52,48,0.06)', border: '1px solid rgba(175,179,174,0.2)' }}
            >
              <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '14px', fontStyle: 'italic', color: '#2f3430', lineHeight: 1.6 }}>
                {business.quote}
              </p>
              <p className="mt-3" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#536257' }}>— Joseph H. Pilates</p>
            </div>
          </div>

          {/* Content col */}
          <div className="md:col-span-7 md:pl-12">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>
              The Kinetic Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl mb-10" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.15 }}>
              Where movement becomes <span style={{ fontStyle: 'italic' }}>mastery.</span>
            </h2>

            <div className="flex flex-col gap-8">
              {philosophy.map((p) => (
                <div key={p.num} className="flex gap-6">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#d6e7d8' }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#536257' }}>{p.num}</span>
                  </div>
                  <div>
                    <h4 className="mb-2" style={{ fontSize: '15px', fontWeight: 600, color: '#2f3430' }}>{p.title}</h4>
                    <p style={{ fontSize: '14px', color: '#5c605c', lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STUDIO GALLERY ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#faf9f6' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>The Space</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
              A studio calibrated for <span style={{ fontStyle: 'italic' }}>focus.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ height: '600px' }}>
            {[images.studioLobby, images.reformer, images.matClass, images.studioDetails].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-xl" style={{ height: '100%' }}>
                <img
                  src={img}
                  alt={`Studio ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  style={{ marginTop: i % 2 === 1 ? '24px' : 0 }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>Client Experiences</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.2 }}>
              What our clients say.
            </h2>
            {/* Giant quote mark */}
            <div className="mt-8 hidden md:block" style={{ fontFamily: "'Noto Serif', serif", fontSize: '120px', fontWeight: 300, color: '#d6e7d8', lineHeight: 1 }}>&ldquo;</div>
          </div>
          <div className="md:col-span-8 flex flex-col gap-12">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`p-8 md:p-10 rounded-xl ${idx === 1 ? 'md:ml-12' : ''}`}
                style={{ backgroundColor: '#ffffff', boxShadow: '0px 24px 48px rgba(47,52,48,0.06)' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s} style={{ color: '#536257', fontSize: '16px' }}>★</span>
                  ))}
                </div>
                <blockquote>
                  <p
                    className="text-lg md:text-xl mb-6"
                    style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', color: '#2f3430', lineHeight: 1.6 }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-8 h-[1px]" style={{ backgroundColor: '#536257' }} />
                    <div>
                      <cite style={{ fontSize: '12px', fontWeight: 600, color: '#2f3430', fontStyle: 'normal', display: 'block', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.name}</cite>
                      <span style={{ fontSize: '11px', color: '#5c605c', display: 'block', marginTop: '2px' }}>{t.role}</span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section
        className="py-28 md:py-40 px-6 md:px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #536257 0%, #47564b 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(235,252,237,0.65)', display: 'block', marginBottom: '20px' }}>
            Begin Today
          </span>
          <h2
            className="text-4xl md:text-6xl mb-8"
            style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, fontStyle: 'italic', color: '#ebfced', lineHeight: 1.15 }}
          >
            Your practice starts here.
          </h2>
          <p className="text-base md:text-lg mb-12 max-w-xl mx-auto" style={{ color: 'rgba(235,252,237,0.75)', lineHeight: 1.7 }}>
            Introductory sessions are $25. No experience required. All equipment provided. Austin&rsquo;s most intentional pilates studio is ready for you.
          </p>
          <Link
            href={`${base}/contacto`}
            className="inline-block transition-all active:scale-[0.98]"
            style={{ backgroundColor: '#ebfced', color: '#536257', padding: '18px 48px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', borderRadius: '9999px' }}
          >
            Book Your Intro Class
          </Link>
        </div>
      </section>
    </main>
  );
}
