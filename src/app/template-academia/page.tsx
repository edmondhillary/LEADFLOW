'use client';
import Image from 'next/image';
import Link from 'next/link';
import { hero as defaultHero, partners, courses, stats, testimonial as defaultTestimonial, process, images, business as defaultBusiness } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function AcademiaHomePage(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonial = ov?.testimonials?.[0]
    ? { ...defaultTestimonial, text: ov.testimonials[0].text, author: ov.testimonials[0].name }
    : defaultTestimonial;

  const base = ov?.baseHref ?? '/template-academia';
  const uxuiCourse = courses.find(c => c.slug === 'uxui-mastery')!;
  const webdevCourse = courses.find(c => c.slug === 'advanced-web-dev')!;
  const marketingCourse = courses.find(c => c.slug === 'digital-marketing-strategy')!;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa', color: '#191c1d' }}>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f3f4f5 100%)', minHeight: '90vh' }}>
        {/* Background glow */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #6b95f3 0%, transparent 70%)' }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left col — 7 */}
            <div className="col-span-12 md:col-span-7">
              {/* Badge chip */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8" style={{ backgroundColor: 'rgba(172,244,164,0.3)', border: '1px solid rgba(42,107,44,0.2)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2a6b2c' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0c5216', letterSpacing: '0.05em' }}>{hero.badge}</span>
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#191c1d', marginBottom: '28px' }}>
                Empower Your Future with{' '}
                <span style={{ background: 'linear-gradient(to right, #001944, #6b95f3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Industry-Lead Skills
                </span>
              </h1>

              <p style={{ fontSize: '18px', color: '#454652', lineHeight: 1.75, maxWidth: '560px', marginBottom: '40px' }}>
                {hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`${base}/servicios`} className="inline-flex items-center justify-center gap-2 rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '15px', fontWeight: 700, padding: '16px 32px', textDecoration: 'none', fontFamily: "'Manrope', sans-serif" }}>
                  {hero.ctaPrimary}
                </Link>
                <Link href={`${base}/servicios`} className="inline-flex items-center justify-center gap-2 rounded-xl transition-all hover:bg-[#e7e8e9]" style={{ backgroundColor: '#ffffff', color: '#001944', fontSize: '15px', fontWeight: 600, padding: '16px 32px', textDecoration: 'none', border: '1.5px solid #e1e3e4', fontFamily: "'Manrope', sans-serif" }}>
                  {hero.ctaSecondary}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>

            {/* Right col — 5 */}
            <div className="col-span-12 md:col-span-5 relative flex justify-center md:justify-end">
              {/* Blue glow orb */}
              <div className="absolute -left-10 -bottom-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(107,149,243,0.3) 0%, transparent 70%)' }} />

              <div className="relative" style={{ transform: 'rotate(2deg)' }}>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ width: '420px', maxWidth: '100%', aspectRatio: '4/5', position: 'relative' }}>
                  <Image
                    src={images.heroBg}
                    alt="Estudiante aprendiendo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating Live Now card */}
                <div className="absolute -bottom-6 -left-8 rounded-2xl px-5 py-4 shadow-xl" style={{ backgroundColor: '#ffffff', minWidth: '180px' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2a6b2c' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#0c5216', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Now</span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#191c1d' }}>UX/UI Mastery Masterclass</p>
                  <p style={{ fontSize: '11px', color: '#454652', marginTop: '2px' }}>En curso — 1.2k oyentes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full py-14" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#454652', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '28px' }}>
            Nuestros graduates trabajan en
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map(p => (
              <span key={p.name} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default" style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 800, color: '#191c1d', letterSpacing: '-0.03em' }}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Bento Section */}
      <section className="w-full py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Cursos Destacados</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1 }}>
              Formacion de nivel industria
            </h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* UX/UI — col 8 white with image split */}
            <div className="col-span-12 md:col-span-8 rounded-[2rem] overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)', minHeight: '280px' }}>
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full px-3 py-1 mb-4" style={{ backgroundColor: '#d9e2ff', fontSize: '11px', fontWeight: 700, color: '#001944', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{uxuiCourse.category}</span>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', color: '#191c1d', lineHeight: 1.2, marginBottom: '10px' }}>{uxuiCourse.title}</h3>
                  <p style={{ fontSize: '14px', color: '#454652', lineHeight: 1.7 }}>{uxuiCourse.desc}</p>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#454652' }}>{uxuiCourse.duration}</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#001944', fontFamily: "'Manrope', sans-serif" }}>{uxuiCourse.price}</span>
                  <Link href={`${base}/servicios`} className="ml-auto rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #001944, #002c6e)', color: '#ffffff', fontSize: '13px', fontWeight: 600, padding: '10px 20px', textDecoration: 'none' }}>
                    Inscribirse
                  </Link>
                </div>
              </div>
              <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                <Image src={images.uxuiCourse} alt={uxuiCourse.title} fill className="object-cover" />
              </div>
            </div>

            {/* Web Dev — col 4 navy */}
            <div className="col-span-12 md:col-span-4 rounded-[2rem] overflow-hidden p-8 flex flex-col justify-between" style={{ background: 'linear-gradient(to bottom, #001944, #002c6e)', boxShadow: '0 20px 40px rgba(25,28,29,0.05)', minHeight: '280px' }}>
              <div>
                <span className="inline-block rounded-full px-3 py-1 mb-4" style={{ backgroundColor: 'rgba(107,149,243,0.25)', fontSize: '11px', fontWeight: 700, color: '#6b95f3', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{webdevCourse.category}</span>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.2, marginBottom: '10px' }}>{webdevCourse.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{webdevCourse.desc.slice(0, 100)}...</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#6b95f3', fontFamily: "'Manrope', sans-serif" }}>{webdevCourse.price}</span>
                <Link href={`${base}/servicios`} className="rounded-xl transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', fontSize: '13px', fontWeight: 600, padding: '10px 18px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  Ver mas
                </Link>
              </div>
            </div>

            {/* Marketing — col 4 white with image */}
            <div className="col-span-12 md:col-span-4 rounded-[2rem] overflow-hidden" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)', minHeight: '280px', position: 'relative' }}>
              <div className="relative h-40 w-full overflow-hidden">
                <Image src={images.marketingCourse} alt={marketingCourse.title} fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(255,255,255,1) 100%)' }} />
              </div>
              <div className="p-6 pt-2">
                <span className="inline-block rounded-full px-3 py-1 mb-3" style={{ backgroundColor: '#acf4a4', fontSize: '11px', fontWeight: 700, color: '#0c5216', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{marketingCourse.category}</span>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', color: '#191c1d', marginBottom: '6px' }}>{marketingCourse.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#001944', fontFamily: "'Manrope', sans-serif" }}>{marketingCourse.price}</span>
                  <Link href={`${base}/servicios`} style={{ fontSize: '13px', fontWeight: 600, color: '#2a6b2c', textDecoration: 'none' }}>Ver curso &rarr;</Link>
                </div>
              </div>
            </div>

            {/* Testimonial — col 8 beige */}
            <div className="col-span-12 md:col-span-8 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between" style={{ backgroundColor: '#ffdbcf', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 700, fontStyle: 'italic', color: '#370d00', lineHeight: 1.45, letterSpacing: '-0.02em' }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={images.testimonialAvatar} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#370d00', fontFamily: "'Manrope', sans-serif" }}>{testimonial.name}</p>
                  <p style={{ fontSize: '12px', color: '#5a1b00', fontWeight: 500 }}>{testimonial.role}</p>
                </div>
                <div className="ml-auto hidden md:flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ fontSize: '18px', color: '#ff6826' }}>&#9733;</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20" style={{ backgroundColor: '#001944' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, color: '#acf4a4', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-20" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Como funciona</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1 }}>
              Tres pasos hacia tu nueva carrera
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map(step => (
              <div key={step.num} className="rounded-[2rem] p-8" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '48px', fontWeight: 800, color: '#e1e3e4', letterSpacing: '-0.04em', lineHeight: 1 }}>{step.num}</span>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '22px', fontWeight: 800, color: '#191c1d', letterSpacing: '-0.03em', marginTop: '16px', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#454652', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="rounded-[3rem] p-12 md:p-20 text-center" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Empieza hoy</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(32px, 4.5vw, 58px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.05, maxWidth: '700px', margin: '0 auto 20px' }}>
              Tu proxima oportunidad profesional comienza aqui.
            </h2>
            <p style={{ fontSize: '17px', color: '#454652', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 36px' }}>
              Mas de 50.000 estudiantes ya confiaron en nosotros. Cursos desde 199 euros. Primera clase gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`${base}/servicios`} className="inline-flex items-center justify-center rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '16px', fontWeight: 700, padding: '18px 40px', textDecoration: 'none', fontFamily: "'Manrope', sans-serif" }}>
                Empezar a aprender
              </Link>
              <Link href={`${base}/contacto`} className="inline-flex items-center justify-center rounded-xl transition-all hover:bg-[#e7e8e9]" style={{ backgroundColor: '#f3f4f5', color: '#001944', fontSize: '16px', fontWeight: 600, padding: '18px 40px', textDecoration: 'none', fontFamily: "'Manrope', sans-serif" }}>
                Hablar con un asesor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
