import Link from 'next/link';
import { business, services, serviciosPage, images } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-barberia';
  const bgMap: Record<string, string> = {
    haircut: images.haircut,
    beard: images.beard,
    ritual: images.ritual,
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#131313', color: '#e5e2e1' }}>

      {/* HERO */}
      <section className="relative py-40 flex items-center overflow-hidden" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="absolute inset-0">
          <img src={images.heroBg} alt="Servicios" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)', opacity: 0.15 }} />
        </div>
        <div className="relative z-10 px-6 md:px-8 max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '24px' }}>{serviciosPage.badge}</p>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '24px' }}>
            {serviciosPage.title}
          </h1>
          <p style={{ fontSize: '16px', color: '#9a8f80', lineHeight: 1.8, maxWidth: '560px' }}>{serviciosPage.intro}</p>
        </div>
      </section>

      {/* SERVICE DEEP-DIVES */}
      {services.map((service, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={service.num}
            className="py-32 px-6 md:px-8"
            style={{ backgroundColor: isEven ? '#131313' : '#0e0e0e' }}
          >
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Image — alternates side */}
              <div className={`overflow-hidden ${!isEven ? 'md:order-last' : ''}`} style={{ aspectRatio: '4/3' }}>
                <img
                  src={bgMap[service.image] ?? images.heroBg}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(0.2)' }}
                />
              </div>

              {/* Text */}
              <div>
                <span style={{ fontFamily: "'Newsreader', serif", fontSize: '72px', fontWeight: 700, color: '#1c1b1b', lineHeight: 1, display: 'block', marginBottom: '-16px' }}>{service.num}</span>
                <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '24px' }}>{service.name}</h2>
                <p style={{ fontSize: '15px', color: '#9a8f80', lineHeight: 1.8, marginBottom: '32px' }}>{service.desc}</p>

                <div className="flex gap-12 mb-10">
                  <div>
                    <p style={{ fontSize: '10px', color: '#4e4639', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>Price</p>
                    <p style={{ fontFamily: "'Newsreader', serif", fontSize: '22px', color: '#e9c176' }}>{service.price}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', color: '#4e4639', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>Duration</p>
                    <p style={{ fontFamily: "'Newsreader', serif", fontSize: '22px', color: '#e5e2e1' }}>{service.duration}</p>
                  </div>
                </div>

                <Link
                  href={`${baseHref}/contacto`}
                  style={{ display: 'inline-block', background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '10px', fontWeight: 700, padding: '14px 36px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em' }}
                >
                  Book This Service
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* PRICING CARDS */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>Pricing</p>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', marginBottom: '48px', lineHeight: 1.1 }}>Clear Pricing.<br /><em style={{ fontStyle: 'italic', color: '#9a8f80' }}>No Surprises.</em></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.num} className="p-8" style={{ backgroundColor: '#201f1f', borderTop: '1px solid #4e4639' }}>
                <p style={{ fontSize: '10px', color: '#4e4639', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>{service.num}</p>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '26px', color: '#e5e2e1', marginBottom: '12px' }}>{service.name}</h3>
                <p style={{ fontSize: '13px', color: '#9a8f80', lineHeight: 1.7, marginBottom: '24px' }}>{service.desc}</p>
                <div className="flex justify-between items-end" style={{ borderTop: '1px solid rgba(78,70,57,0.3)', paddingTop: '20px' }}>
                  <div>
                    <p style={{ fontSize: '10px', color: '#4e4639', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>From</p>
                    <p style={{ fontFamily: "'Newsreader', serif", fontSize: '28px', color: '#e9c176' }}>{service.price.replace('from ', '')}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9a8f80' }}>{service.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABILITY — TIME SLOTS */}
      <section className="py-24 px-6 md:px-8" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '32px' }}>Availability</p>
          <div className="flex flex-wrap gap-3">
            {serviciosPage.timeSlots.map(slot => (
              <span key={slot} style={{ fontSize: '12px', color: '#d1c5b4', border: '1px solid #4e4639', padding: '8px 20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{slot}</span>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#9a8f80', marginTop: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tuesday — Saturday. Exact slot confirmed on booking.</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>The Process</p>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', marginBottom: '64px', lineHeight: 1.1 }}>What to Expect</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {serviciosPage.process.map(step => (
              <div key={step.num}>
                <span style={{ fontFamily: "'Newsreader', serif", fontSize: '48px', fontWeight: 700, color: '#1c1b1b', lineHeight: 1, display: 'block', marginBottom: '16px' }}>{step.num}</span>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#e5e2e1', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#9a8f80', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ETIQUETTE */}
      <section className="py-24 px-6 md:px-8" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '32px' }}>Etiquette</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {serviciosPage.etiquette.map((item, i) => (
              <div key={i} className="flex gap-4 items-start" style={{ borderBottom: '1px solid rgba(78,70,57,0.2)', paddingBottom: '16px' }}>
                <span style={{ fontSize: '11px', color: '#4e4639', marginTop: '2px' }}>—</span>
                <p style={{ fontSize: '13px', color: '#d1c5b4', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-xl mx-auto">
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '24px' }}>
            Ready to Begin?
          </h2>
          <p style={{ fontSize: '15px', color: '#9a8f80', lineHeight: 1.8, marginBottom: '40px' }}>
            Book your appointment with {business.name} and experience precision grooming in London.
          </p>
          <Link
            href={`${baseHref}/contacto`}
            style={{ display: 'inline-block', background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '11px', fontWeight: 700, padding: '16px 48px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em' }}
          >
            Reserve Your Session
          </Link>
        </div>
      </section>

    </div>
  );
}
