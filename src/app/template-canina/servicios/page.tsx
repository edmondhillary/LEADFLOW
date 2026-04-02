import Link from 'next/link';
import { services, serviciosPage, pricingTiers, groomingProcess, images, business } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-canina';
  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", backgroundColor: '#fafaf5', color: '#2f342e' }}>

      {/* Header */}
      <section className="px-6 md:px-10 py-20 md:py-28 max-w-[1920px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: '#cee9d6', color: '#3f5749' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>content_cut</span>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{serviciosPage.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#2f342e', lineHeight: 1.05, marginBottom: '20px' }}>
            {serviciosPage.title}
          </h1>
          <p style={{ fontSize: '16px', color: '#5c605a', lineHeight: 1.75, maxWidth: '560px' }}>
            {serviciosPage.intro}
          </p>
        </div>
      </section>

      {/* 6 Service Cards */}
      <section className="px-6 md:px-10 py-16" style={{ backgroundColor: '#f3f4ee' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.name} className="rounded-xl overflow-hidden flex flex-col" style={{ backgroundColor: '#ffffff', boxShadow: '0px 16px 40px rgba(47,52,46,0.06)' }}>
              <div className="overflow-hidden" style={{ height: '200px', backgroundColor: '#edefe8' }}>
                <img
                  src={service.name === 'Bath and Dry' ? images.bathDog
                    : service.name === 'Full Grooming' ? images.fullGrooming
                    : service.name === 'Haircut and Styling' ? images.groomerHands
                    : service.name === 'Nail Trimming' ? images.gallery2
                    : service.name === 'Ear Cleaning' ? images.gallery3
                    : images.gallery4}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#cee9d6' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749' }}>{service.icon}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 700, color: '#2f342e', letterSpacing: '-0.01em' }}>{service.name}</h3>
                </div>
                <p style={{ fontSize: '14px', color: '#5c605a', lineHeight: 1.7, flex: 1 }}>{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#edefe8', fontSize: '11px', fontWeight: 500, color: '#5c605a', letterSpacing: '0.05em' }}>{tag}</span>
                  ))}
                </div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#4c6456' }}>{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="text-center mb-14">
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Pricing</p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e' }}>
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className="rounded-xl p-10 flex flex-col gap-6" style={{
              backgroundColor: tier.highlight ? '#4c6456' : '#ffffff',
              boxShadow: tier.highlight ? '0px 32px 64px rgba(76,100,86,0.25)' : '0px 16px 40px rgba(47,52,46,0.06)',
              transform: tier.highlight ? 'scale(1.03)' : 'none',
            }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: tier.highlight ? '#cee9d6' : '#4c6456', marginBottom: '8px' }}>{tier.name}</p>
                <p style={{ fontSize: '13px', color: tier.highlight ? 'rgba(230,255,237,0.7)' : '#5c605a', marginBottom: '16px' }}>{tier.desc}</p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '36px', fontWeight: 800, letterSpacing: '-0.04em', color: tier.highlight ? '#e6ffed' : '#2f342e' }}>{tier.price}</p>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: tier.highlight ? '#cee9d6' : '#4c6456', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span style={{ fontSize: '13px', color: tier.highlight ? 'rgba(230,255,237,0.85)' : '#5c605a' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href={`${baseHref}/contacto`} className="inline-flex items-center justify-center gap-2 rounded-full transition-all hover:opacity-90" style={{
                backgroundColor: tier.highlight ? '#e6ffed' : '#4c6456',
                color: tier.highlight ? '#2d4437' : '#e6ffed',
                padding: '13px 28px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Grooming Process */}
      <section className="px-6 md:px-10 py-20" style={{ backgroundColor: '#f3f4ee' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-14">
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>How It Works</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e' }}>
              The Grooming Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {groomingProcess.map((step) => (
              <div key={step.step} className="flex flex-col gap-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#cee9d6' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 800, color: '#3f5749' }}>{step.step}</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', fontWeight: 700, color: '#2f342e', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: '#5c605a', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breed-Specific Care */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Breed Expertise</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e', marginBottom: '20px', lineHeight: 1.1 }}>
              Tailored to Every Breed
            </h2>
            <p style={{ fontSize: '15px', color: '#5c605a', lineHeight: 1.75, marginBottom: '24px' }}>
              From double-coated Huskies requiring deshedding to delicate Toy breeds needing precise scissors work — our groomers are trained in breed-specific techniques to ensure every dog leaves looking their absolute best.
            </p>
            <div className="flex flex-col gap-3">
              {['Long-coat breeds (Shih Tzu, Maltese)', 'Double-coat breeds (Husky, Golden Retriever)', 'Curly-coat breeds (Poodle, Doodles)', 'Wire-coat terriers', 'Short-coat breeds (Beagles, Boxers)'].map(breed => (
                <div key={breed} className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#4c6456', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span style={{ fontSize: '14px', color: '#5c605a' }}>{breed}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0px 24px 48px rgba(47,52,46,0.10)' }}>
            <img src={images.gallery1} alt="Breed-specific grooming" className="w-full object-cover" style={{ aspectRatio: '4/3' }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="rounded-xl px-10 py-16 text-center" style={{ backgroundColor: '#4c6456' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 800, color: '#e6ffed', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Ready to book your dog&apos;s session?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(230,255,237,0.75)', marginBottom: '32px' }}>
            Reach us at {business.phone} or book online below.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`${baseHref}/contacto`} className="inline-flex items-center gap-2 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#e6ffed', color: '#2d4437', padding: '14px 32px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              Reservar cita
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </Link>
            <a href={`tel:${business.phoneIntl}`} className="inline-flex items-center gap-2 rounded-full transition-all" style={{ border: '1.5px solid rgba(230,255,237,0.4)', color: '#e6ffed', padding: '14px 32px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              Call Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
