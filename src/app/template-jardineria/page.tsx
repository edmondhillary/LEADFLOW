'use client';
import Link from 'next/link';
import { business as defaultBusiness, hero as defaultHero, images, services, values, testimonials as defaultTestimonials, portfolio } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function TemplateJardineriaHome(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length ? ov.testimonials : defaultTestimonials;

  const base = ov?.baseHref ?? '/template-jardineria';
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#fafaf5' }}>

      {/* Hero Section */}
      <section className="w-full px-6 md:px-10 py-20 md:py-28 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span
              className="inline-block mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ backgroundColor: '#d6e7a1', color: '#5a682f' }}
            >
              {hero.badge}
            </span>
            <h1
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: '#1a1c19',
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              {hero.title}{' '}
              <span style={{ fontStyle: 'italic', color: '#283827' }}>{hero.titleEmphasis}</span>
            </h1>
            <p
              className="mb-10"
              style={{ fontSize: '17px', fontWeight: 300, color: '#444842', lineHeight: 1.75, maxWidth: '480px' }}
            >
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${base}/contacto`}
                className="inline-block text-center rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)',
                  color: '#ffffff',
                  padding: '16px 36px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}
              >
                {hero.ctaPrimary}
              </Link>
              <Link
                href={`${base}/servicios`}
                className="inline-block text-center rounded-xl transition-all hover:bg-[#e8e8e3] active:scale-[0.98]"
                style={{
                  border: '1.5px solid #283827',
                  color: '#283827',
                  padding: '16px 36px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  backgroundColor: 'transparent',
                }}
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right — image + floating quote */}
          <div className="relative" style={{ height: '600px' }}>
            <div
              className="w-full h-full rounded-3xl overflow-hidden"
              style={{ transform: 'rotate(1deg)' }}
            >
              <img
                src={images.heroGarden}
                alt="Curated garden landscape"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating quote card */}
            <div
              className="absolute rounded-2xl p-8"
              style={{
                bottom: '-40px',
                left: '-40px',
                backgroundColor: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                maxWidth: '320px',
                boxShadow: '0 20px 40px rgba(40,56,39,0.10)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: '15px',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: '#283827',
                  lineHeight: 1.65,
                  marginBottom: '12px',
                }}
              >
                &ldquo;{hero.quoteCard.text}&rdquo;
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#56642b', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {hero.quoteCard.attribution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[1920px] mx-auto">
          <span
            className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#56642b' }}
          >
            What We Do
          </span>
          <h2
            className="mb-14"
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 300,
              color: '#1a1c19',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Landscape Stewardship
          </h2>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Maintenance — col-span-2, large with image */}
            <div className="md:col-span-2 rounded-3xl overflow-hidden relative" style={{ minHeight: '380px' }}>
              <img
                src={images.maintenance}
                alt="Garden maintenance"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(40,56,39,0.85) 0%, rgba(40,56,39,0.1) 60%)' }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#adc0a8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>01</p>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '24px', fontWeight: 400, color: '#ffffff', lineHeight: 1.2 }}>Monthly Maintenance</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '8px', lineHeight: 1.6 }}>Scheduled care tailored to your garden&apos;s seasonal rhythm.</p>
              </div>
            </div>

            {/* Full Landscaping — col-span-3, large with image */}
            <div className="md:col-span-3 rounded-3xl overflow-hidden relative" style={{ minHeight: '380px' }}>
              <img
                src={images.landscaping}
                alt="Full landscaping"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(40,56,39,0.8) 0%, rgba(40,56,39,0.05) 55%)' }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#adc0a8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>02</p>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '28px', fontWeight: 400, color: '#ffffff', lineHeight: 1.2 }}>Full Landscaping</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '8px', lineHeight: 1.6 }}>Ground-up transformation — from bare earth to curated estate.</p>
              </div>
            </div>

            {/* Irrigation — text card */}
            <div className="rounded-2xl p-8 flex flex-col justify-between" style={{ backgroundColor: '#eeeee9', minHeight: '200px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#56642b', textTransform: 'uppercase', letterSpacing: '0.2em' }}>03</p>
              <div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', fontWeight: 400, color: '#1a1c19', lineHeight: 1.2, marginBottom: '8px' }}>Irrigation Design</h3>
                <p style={{ fontSize: '12px', color: '#444842', lineHeight: 1.65 }}>Bespoke systems engineered for efficiency.</p>
              </div>
            </div>

            {/* Pruning — text card */}
            <div className="md:col-span-2 rounded-2xl p-8 flex flex-col justify-between" style={{ backgroundColor: '#e8e8e3', minHeight: '200px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#56642b', textTransform: 'uppercase', letterSpacing: '0.2em' }}>04</p>
              <div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', fontWeight: 400, color: '#1a1c19', lineHeight: 1.2, marginBottom: '8px' }}>Pruning &amp; Tree Care</h3>
                <p style={{ fontSize: '12px', color: '#444842', lineHeight: 1.65 }}>Certified arboricultural work with precision shaping.</p>
              </div>
            </div>

            {/* Horticultural Care — text card */}
            <div className="rounded-2xl p-8 flex flex-col justify-between" style={{ backgroundColor: '#ffffff', minHeight: '200px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#56642b', textTransform: 'uppercase', letterSpacing: '0.2em' }}>05</p>
              <div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', fontWeight: 400, color: '#1a1c19', lineHeight: 1.2, marginBottom: '8px' }}>Horticultural Care</h3>
                <p style={{ fontSize: '12px', color: '#444842', lineHeight: 1.65 }}>Plant health, soil diagnostics, disease treatment.</p>
              </div>
            </div>

            {/* Tailored Programs — primary green card */}
            <div
              className="md:col-span-2 rounded-2xl p-8 flex flex-col justify-between"
              style={{ background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)', minHeight: '200px' }}
            >
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#adc0a8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Tailored</p>
              <div>
                <h3
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: '22px',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '12px',
                  }}
                >
                  Bespoke Programmes for Every Estate
                </h3>
                <Link
                  href={`${base}/servicios`}
                  style={{ fontSize: '10px', fontWeight: 600, color: '#adc0a8', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}
                >
                  Explore All Services &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="w-full py-24 px-6 md:px-10 max-w-[1920px] mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#56642b' }}
          >
            Case Study
          </span>
          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 300,
              color: '#1a1c19',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            Before &amp; After
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Before image */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden" style={{ minHeight: '420px' }}>
            <img
              src={images.beforeGarden}
              alt="Garden before transformation"
              className="w-full h-full object-cover absolute inset-0"
              style={{ opacity: 0.6, filter: 'grayscale(100%)' }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div
              className="absolute top-6 left-6 px-4 py-2 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.85)', fontSize: '10px', fontWeight: 700, color: '#1a1c19', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              Before
            </div>
          </div>

          {/* After image */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden" style={{ minHeight: '420px' }}>
            <img
              src={images.afterGarden}
              alt="Garden after transformation"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div
              className="absolute top-6 left-6 px-4 py-2 rounded-full"
              style={{ background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)', fontSize: '10px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              After
            </div>
          </div>

          {/* Case study card + detail */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: '#f4f4ef', boxShadow: '0 20px 40px rgba(40,56,39,0.06)' }}
            >
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#56642b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Project</p>
              <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', fontWeight: 400, color: '#1a1c19', lineHeight: 1.2, marginBottom: '16px' }}>
                {portfolio.name}
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span style={{ fontSize: '11px', color: '#444842' }}>Duration</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#283827' }}>{portfolio.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '11px', color: '#444842' }}>Species</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#283827' }}>{portfolio.speciesPlanted}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: '11px', color: '#444842' }}>Location</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#283827' }}>{portfolio.location}</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: '200px' }}>
              <img
                src={images.projectDetail}
                alt="Garden detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Values */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#283827' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          {/* Left — headline */}
          <div className="md:col-span-1">
            <span
              className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#adc0a8' }}
            >
              Our Philosophy
            </span>
            <h2
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: 'clamp(2rem, 3vw, 3.5rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                marginBottom: '24px',
              }}
            >
              Gardens designed to last generations.
            </h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#adc0a8', marginTop: '8px' }} />
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(173,192,168,0.8)', lineHeight: 1.75, marginTop: '24px' }}>
              Founded in {business.foundedYear}, {business.name} brings together horticultural expertise and editorial rigour to create landscapes of lasting distinction.
            </p>
          </div>

          {/* Right — 2x2 values grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.num}
                className="rounded-2xl p-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(173,192,168,0.15)' }}
              >
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#adc0a8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>{v.num}</p>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '18px', fontWeight: 400, color: '#ffffff', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(173,192,168,0.8)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#fafaf5' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <h2
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: 'clamp(2rem, 3vw, 3.5rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#1a1c19',
                letterSpacing: '-0.02em',
              }}
            >
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="rounded-3xl p-10"
                style={{ backgroundColor: i === 1 ? '#f4f4ef' : '#ffffff', boxShadow: '0 20px 40px rgba(40,56,39,0.06)' }}
              >
                {/* Quote mark */}
                <div
                  className="mb-6"
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: '64px',
                    fontStyle: 'italic',
                    color: '#d6e7a1',
                    lineHeight: 0.8,
                    fontWeight: 700,
                  }}
                >
                  &ldquo;
                </div>
                <p
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: '16px',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: '#1a1c19',
                    lineHeight: 1.75,
                    marginBottom: '24px',
                  }}
                >
                  {t.text}
                </p>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#283827' }}>{t.name}</p>
                  <p style={{ fontSize: '11px', color: '#444842', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-12 px-6 md:px-10">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="rounded-[3rem] overflow-hidden relative py-24 px-10 md:px-20 flex flex-col items-center text-center"
            style={{ background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)' }}
          >
            {/* Background image overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${images.heroGarden})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
              }}
            />
            <div className="relative z-10">
              <span
                className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#adc0a8' }}
              >
                Begin Your Project
              </span>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                  fontWeight: 300,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  maxWidth: '700px',
                  margin: '0 auto 24px',
                }}
              >
                Begin Your Transformation
              </h2>
              <p
                className="mb-10"
                style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(173,192,168,0.9)', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto 40px' }}
              >
                From a single consultation to a full estate programme — we are ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`${base}/contacto`}
                  className="inline-block rounded-xl transition-all hover:opacity-90"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#283827',
                    padding: '16px 40px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  Request a Quote
                </Link>
                <Link
                  href={`${base}/servicios`}
                  className="inline-block rounded-xl transition-all hover:bg-white/10"
                  style={{
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    color: '#ffffff',
                    padding: '16px 40px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    backgroundColor: 'transparent',
                  }}
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
