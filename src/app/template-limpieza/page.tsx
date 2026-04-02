'use client';
import Link from 'next/link';
import { hero as defaultHero, images, services, promise, testimonials as defaultTestimonials, business as defaultBusiness } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function TemplateLimpiezaHome(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length
    ? ov.testimonials.map((t, i) => ({ ...t, image: defaultTestimonials[i % defaultTestimonials.length]?.image ?? defaultTestimonials[0]?.image }))
    : defaultTestimonials;

  const base = ov?.baseHref ?? '/template-limpieza';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <section className="w-full bg-[#f8f9fa] py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left */}
            <div className="md:col-span-6 flex flex-col gap-6">
              {/* Freshness Chip */}
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-[#80f98b]">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#007327' }}>eco</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#007327' }}>{hero.badge}</span>
              </div>

              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#191c1d' }}>
                {hero.title}
              </h1>

              <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#414754', maxWidth: '480px' }}>
                {hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <Link href={`${base}/contacto`} className="inline-block rounded-lg transition-all hover:opacity-90 active:scale-[0.98]" style={{ background: 'linear-gradient(to right, #0059bb, #0070ea)', color: '#ffffff', fontSize: '15px', fontWeight: 600, padding: '14px 28px', textDecoration: 'none' }}>
                  Request a Free Quote
                </Link>
                <Link href={`${base}/servicios`} className="inline-block rounded-lg transition-all hover:bg-[#e1e3e4] active:scale-[0.98]" style={{ backgroundColor: '#e7e8e9', color: '#191c1d', fontSize: '15px', fontWeight: 600, padding: '14px 28px', textDecoration: 'none' }}>
                  Our Portfolio
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mt-4 pt-6" style={{ borderTop: '1px solid rgba(193,198,215,0.5)' }}>
                {hero.stats.map(s => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '22px', fontWeight: 800, color: '#0059bb', letterSpacing: '-0.03em' }}>{s.value}</p>
                    <p style={{ fontSize: '12px', color: '#414754', marginTop: '2px' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="md:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.15)' }}>
                <img src={images.heroClean} alt="Clean bright living room" className="w-full h-full object-cover" />
              </div>
              {/* Green glow orb */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(128,249,139,0.4) 0%, transparent 70%)', filter: 'blur(20px)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="w-full bg-[#f3f4f5] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>What We Do</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1 }}>
                Services Built for<br />Every Space
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: '#414754', maxWidth: '360px', lineHeight: 1.7 }}>
              From single-room refreshes to full clinical disinfection protocols — we have the expertise and equipment for any job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map(s => (
              <div key={s.name} className="group bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-lg cursor-pointer" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.04)' }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-[#0059bb]" style={{ backgroundColor: '#edeeef' }}>
                  <span className="material-symbols-outlined transition-colors duration-300 group-hover:text-white" style={{ fontSize: '22px', color: '#0059bb' }}>{s.icon}</span>
                </div>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 700, color: '#191c1d', marginBottom: '10px' }}>{s.name}</h3>
                <p style={{ fontSize: '14px', color: '#414754', lineHeight: 1.7 }}>{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  <Link href={`${base}/servicios`} style={{ fontSize: '13px', fontWeight: 600, color: '#0059bb', textDecoration: 'none' }}>Saber más</Link>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#0059bb' }}>arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Promise */}
      <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left image */}
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.1)' }}>
                <img src={images.cleanerWorking} alt="Professional cleaner at work" className="w-full h-full object-cover" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-8 -right-8 bg-[#0059bb] text-white rounded-xl p-6" style={{ boxShadow: '0 20px 40px -10px rgba(0,89,187,0.4)' }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '32px', fontWeight: 800, lineHeight: 1 }}>100%</p>
                <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.85 }}>Satisfaction<br />Guaranteed</p>
              </div>
            </div>

            {/* Right content */}
            <div className="flex flex-col gap-8">
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Our Commitment</p>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1 }}>
                  The PureLinen Promise
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {promise.map(p => (
                  <div key={p.title} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#80f98b' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#007327' }}>{p.icon}</span>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 700, color: '#191c1d', marginBottom: '4px' }}>{p.title}</h4>
                      <p style={{ fontSize: '14px', color: '#414754', lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-[#f3f4f5] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Historias de clientes</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d' }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-xl p-8" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.04)' }}>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize: '18px', color: '#0059bb', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                {/* Avatar row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 700, color: '#191c1d' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#414754' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: '#0059bb' }}>
        {/* White glow orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: '16px' }}>
            Ready for a Spotless Space?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', marginBottom: '36px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Get your free, no-obligation quote today. Our team responds within 24 hours.
          </p>
          <Link href={`${base}/contacto`} className="inline-block rounded-lg transition-all hover:opacity-90 active:scale-[0.98]" style={{ backgroundColor: '#ffffff', color: '#0059bb', fontSize: '15px', fontWeight: 700, padding: '16px 36px', textDecoration: 'none' }}>
            Pedir presupuesto gratis
          </Link>
        </div>
      </section>

    </div>
  );
}
