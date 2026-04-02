'use client';
import Link from 'next/link';
import { business as defaultBusiness, hero as defaultHero, services, philosophy, testimonial as defaultTestimonial, images } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function BarberiaHomePage(props: any = {}) {
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

  const base = ov?.baseHref ?? '/template-barberia';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#131313', color: '#e5e2e1' }}>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={images.heroBg}
            alt="The Noir Atelier"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(1)', opacity: 0.4 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #131313 0%, transparent 30%, transparent 70%, #131313 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '32px' }}>
            {hero.badge}
          </p>

          <h1 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 700, lineHeight: 1.1, color: '#e5e2e1', marginBottom: '32px' }}>
            {hero.title}<br />
            <em style={{ fontStyle: 'italic', color: '#e9c176' }}>{hero.titleItalic}</em>
          </h1>

          <p style={{ fontSize: '16px', color: '#d1c5b4', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 48px' }}>
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${base}/contacto`}
              style={{ display: 'inline-block', background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '11px', fontWeight: 700, padding: '16px 40px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em' }}
            >
              {hero.ctaPrimary}
            </Link>
            <Link
              href={`${base}/servicios`}
              style={{ display: 'inline-block', border: '1px solid rgba(78,70,57,0.4)', color: '#d1c5b4', fontSize: '11px', fontWeight: 600, padding: '16px 40px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em' }}
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES LOOKBOOK */}
      <section className="py-32 px-6 md:px-8 max-w-[1920px] mx-auto" style={{ backgroundColor: '#131313' }}>
        <div className="mb-20">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>The Selection</p>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1 }}>
            Crafted Services.<br />
            <em style={{ fontStyle: 'italic', color: '#9a8f80' }}>Considered Detail.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {services.map((service, i) => (
            <div key={service.num} className={i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-32' : ''}>
              {/* Tall image with gradient overlay */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src={`https://images.unsplash.com/photo-${service.image === 'haircut' ? '1599351431202-1e0f0137899a' : service.image === 'beard' ? '1520633024148-9a8c5ef5d04a' : '1503951914875-452162b0f3f1'}?auto=format&fit=crop&w=800&q=80`}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(0.3)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.9) 0%, transparent 50%)' }} />
                {/* Gold number label */}
                <div className="absolute bottom-6 left-6">
                  <span style={{ fontFamily: "'Newsreader', serif", fontSize: '11px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{service.num}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '24px', fontWeight: 700, color: '#e5e2e1', marginBottom: '12px' }}>{service.name}</h3>
                <p style={{ fontSize: '14px', color: '#9a8f80', lineHeight: 1.7, marginBottom: '16px' }}>{service.desc}</p>
                <p style={{ fontSize: '12px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid #e9c176', display: 'inline-block', paddingBottom: '2px' }}>{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY / WHY US */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left: image grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <img src={images.shopInterior} alt="Atelier interior" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)' }} />
            </div>
            <div className="overflow-hidden mt-12" style={{ aspectRatio: '3/4' }}>
              <img src={images.shopProducts} alt="Grooming products" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)' }} />
            </div>
          </div>

          {/* Right: content */}
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '24px' }}>Why The Atelier</p>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '48px' }}>
              Mastery in<br />
              <em style={{ fontStyle: 'italic', color: '#e9c176' }}>Every Detail.</em>
            </h2>

            <div className="flex flex-col gap-10">
              {philosophy.map(item => (
                <div key={item.num} className="flex gap-6">
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Newsreader', serif", fontSize: '11px', color: '#4e4639', letterSpacing: '0.1em' }}>{item.num}</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#e5e2e1', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ fontSize: '14px', color: '#9a8f80', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-3xl mx-auto">
          {/* Quote mark */}
          <div style={{ fontFamily: "'Newsreader', serif", fontSize: '120px', color: '#e9c176', lineHeight: 0.6, marginBottom: '40px', opacity: 0.4 }}>&ldquo;</div>

          <blockquote style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontStyle: 'italic', color: '#e5e2e1', lineHeight: 1.6, marginBottom: '40px' }}>
            {testimonial.quote}
          </blockquote>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4px' }}>{testimonial.author}</p>
            <p style={{ fontSize: '11px', color: '#9a8f80', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{testimonial.role}</p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.shopInterior} alt="Reserve your chair" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)', opacity: 0.3 }} />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(19,19,19,0.7)' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '24px' }}>
            Claim Your<br />
            <em style={{ fontStyle: 'italic', color: '#e9c176' }}>Chair.</em>
          </h2>
          <p style={{ fontSize: '15px', color: '#d1c5b4', lineHeight: 1.8, marginBottom: '48px' }}>
            Limited appointments each week. Reserve yours and experience {business.name}.
          </p>
          <Link
            href={`${base}/contacto`}
            style={{ display: 'inline-block', background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '11px', fontWeight: 700, padding: '18px 56px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em' }}
          >
            Book Your Session
          </Link>
        </div>
      </section>

    </div>
  );
}
