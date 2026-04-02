'use client';
import Link from 'next/link';
import { business as defaultBusiness, hero as defaultHero, images, services, philosophy, gallery, testimonials as defaultTestimonials } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function TemplateCaninaHome(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length ? ov.testimonials : defaultTestimonials;

  const base = ov?.baseHref ?? '/template-canina';
  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", backgroundColor: '#fafaf5', color: '#2f342e' }}>

      {/* Hero Section */}
      <section className="px-6 md:px-10 py-20 md:py-32 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* Left: Text */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full" style={{ backgroundColor: '#c7e8f7', color: '#375663' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>auto_awesome</span>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{hero.badge}</span>
            </div>

            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', color: '#2f342e' }}>
              Dog Grooming in{' '}
              <span style={{ color: '#4c6456', fontStyle: 'italic' }}>Aspen</span>
              {' '}—<br />Where Your Pet<br />is Family
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#5c605a', maxWidth: '520px' }}>
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={`${base}/contacto`} className="inline-flex items-center gap-2 rounded-full transition-all hover:opacity-90 active:scale-[0.98]" style={{ backgroundColor: '#4c6456', color: '#e6ffed', padding: '14px 32px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}>
                {hero.ctaPrimary}
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
              <Link href={`${base}/servicios`} className="inline-flex items-center gap-2 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#e7e9e2', color: '#2f342e', padding: '14px 32px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}>
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="md:col-span-5 relative">
            <div className="relative overflow-hidden rounded-xl" style={{ transform: 'rotate(2deg)', boxShadow: '0px 24px 48px rgba(47,52,46,0.12)' }}>
              <img
                src={images.heroPet}
                alt="Happy dog at The Tailored Sanctuary"
                className="w-full object-cover"
                style={{ aspectRatio: '4/5' }}
              />
            </div>
            {/* Warm tan blob */}
            <div className="absolute -z-10 rounded-full blur-3xl opacity-60" style={{ backgroundColor: '#feecce', width: '70%', height: '70%', top: '15%', left: '-10%' }} />
          </div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="mb-12">
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>What We Offer</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e' }}>
            The Grooming Atelier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Large card: Bath and Dry — col-span-2 */}
          <div className="md:col-span-2 rounded-xl overflow-hidden flex flex-col md:flex-row" style={{ backgroundColor: '#ffffff', boxShadow: '0px 24px 48px rgba(47,52,46,0.06)' }}>
            <div className="md:w-1/2 overflow-hidden">
              <img src={images.bathDog} alt="Bath and Dry service" className="w-full h-full object-cover" style={{ minHeight: '280px' }} />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#cee9d6' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749' }}>water_drop</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#2f342e', marginBottom: '12px', letterSpacing: '-0.02em' }}>Bath and Dry</h3>
                <p style={{ fontSize: '14px', color: '#5c605a', lineHeight: 1.7 }}>
                  {services[0].desc}
                </p>
              </div>
              <Link href={`${base}/servicios`} className="inline-flex items-center gap-1 mt-6" style={{ fontSize: '12px', fontWeight: 600, color: '#4c6456', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Saber más
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Primary sage card: Full Grooming */}
          <div className="rounded-xl overflow-hidden flex flex-col" style={{ backgroundColor: '#4c6456' }}>
            <div className="overflow-hidden" style={{ height: '200px' }}>
              <img src={images.fullGrooming} alt="Full Grooming service" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#e6ffed' }}>content_cut</span>
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 700, color: '#e6ffed', letterSpacing: '-0.02em' }}>Full Grooming</h3>
              <p style={{ fontSize: '13px', color: 'rgba(230,255,237,0.75)', lineHeight: 1.7 }}>{services[1].desc}</p>
              <Link href={`${base}/servicios`} className="inline-flex items-center gap-1 mt-2" style={{ fontSize: '12px', fontWeight: 600, color: '#cee9d6', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Reservar ahora
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Small cards */}
          {services.slice(2, 5).map((service) => (
            <div key={service.name} className="rounded-lg p-7 flex flex-col gap-4" style={{ backgroundColor: '#f3f4ee', boxShadow: '0px 8px 24px rgba(47,52,46,0.04)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#cee9d6' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749' }}>{service.icon}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#2f342e', marginBottom: '8px', letterSpacing: '-0.01em' }}>{service.name}</h3>
                <p style={{ fontSize: '13px', color: '#5c605a', lineHeight: 1.65 }}>{service.desc}</p>
              </div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#4c6456' }}>{service.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us / Philosophy */}
      <section className="px-6 md:px-10 py-20" style={{ backgroundColor: '#f3f4ee' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: staggered image grid */}
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <img src={images.groomerHands} alt="Groomer working with care" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl flex items-center justify-center mt-8" style={{ backgroundColor: '#feecce', aspectRatio: '1/1' }}>
              <div className="text-center p-6">
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '42px', fontWeight: 800, color: '#6a5e46', letterSpacing: '-0.04em', lineHeight: 1 }}>10+</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#635740', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '8px' }}>Years of Trusted Care</p>
              </div>
            </div>
            <div className="rounded-xl flex items-center justify-center -mt-4" style={{ backgroundColor: '#cee9d6', aspectRatio: '1/1' }}>
              <div className="text-center p-6">
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#3f5749' }}>verified</span>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#3f5749', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '8px' }}>Fear-Free Certified</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden mt-4" style={{ aspectRatio: '1/1' }}>
              <img src={images.studioInterior} alt="Clean grooming studio" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Philosophy */}
          <div className="flex flex-col gap-10">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Nuestra filosofía</p>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e', lineHeight: 1.1 }}>
                The Organic Atelier Philosophy
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {philosophy.map((item) => (
                <div key={item.title} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#cee9d6' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#3f5749' }}>{item.icon}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#2f342e', marginBottom: '6px' }}>{item.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5c605a', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href={`${base}/nosotros`} className="inline-flex items-center gap-2 rounded-full self-start transition-all hover:opacity-90" style={{ backgroundColor: '#4c6456', color: '#e6ffed', padding: '13px 28px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Nuestra historia
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Pet Gallery */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="text-center mb-14">
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Our Guests</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e' }}>
            Every Dog Leaves Glowing
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { src: images.gallery1, alt: gallery[0].alt, offset: false },
            { src: images.gallery2, alt: gallery[1].alt, offset: true },
            { src: images.gallery3, alt: gallery[2].alt, offset: false },
            { src: images.gallery4, alt: gallery[3].alt, offset: true },
          ].map((item, i) => (
            <div key={i} className={`rounded-xl overflow-hidden transition-all hover:shadow-lg ${item.offset ? 'mt-8' : ''}`} style={{ aspectRatio: '1/1', boxShadow: '0px 12px 32px rgba(47,52,46,0.06)' }}>
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-10 py-20" style={{ backgroundColor: '#d8dbd3', borderRadius: '0' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: Quote */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 select-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '140px', fontWeight: 800, color: 'rgba(76,100,86,0.12)', lineHeight: 1 }}>&ldquo;</div>
            <div className="relative">
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontStyle: 'italic', fontWeight: 600, color: '#2f342e', lineHeight: 1.4, letterSpacing: '-0.02em' }}>
                &ldquo;{testimonials[0].text}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-8">
                <img src={images.testimonialAvatar} alt={testimonials[0].name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#2f342e' }}>{testimonials[0].name}</p>
                  <p style={{ fontSize: '12px', color: '#5c605a' }}>{testimonials[0].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Rating card */}
          <div className="relative">
            <div className="absolute -top-6 -right-4 w-20 h-20 rounded-full" style={{ backgroundColor: '#4c6456', opacity: 0.15 }} />
            <div className="rounded-xl p-10 relative" style={{ backgroundColor: '#ffffff', boxShadow: '0px 24px 48px rgba(47,52,46,0.08)' }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[1].rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4c6456', fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p style={{ fontSize: '15px', color: '#5c605a', lineHeight: 1.75, marginBottom: '24px', fontStyle: 'italic' }}>
                &ldquo;{testimonials[1].text}&rdquo;
              </p>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#2f342e' }}>{testimonials[1].name}</p>
                <p style={{ fontSize: '12px', color: '#5c605a' }}>{testimonials[1].role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-24 max-w-[1920px] mx-auto">
        <div className="rounded-xl px-10 py-16 md:py-20 text-center" style={{ backgroundColor: '#4c6456' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#cee9d6', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Ready to Begin?</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#e6ffed', letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>
            Your dog deserves the sanctuary experience.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(230,255,237,0.75)', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
            {business.tagline} — First appointments include a complimentary coat consultation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`${base}/contacto`} className="inline-flex items-center gap-2 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#e6ffed', color: '#2d4437', padding: '14px 32px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em' }}>
              Reservar cita
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </Link>
            <Link href={`${base}/servicios`} className="inline-flex items-center gap-2 rounded-full transition-all hover:bg-[#40584a]" style={{ border: '1.5px solid rgba(230,255,237,0.4)', color: '#e6ffed', padding: '14px 32px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}>
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
