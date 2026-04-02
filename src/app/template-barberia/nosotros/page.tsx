import Link from 'next/link';
import { business, about, images } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-barberia';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#131313', color: '#e5e2e1' }}>

      {/* HERO */}
      <section className="relative py-48 flex items-end overflow-hidden" style={{ backgroundColor: '#0e0e0e', minHeight: '70vh' }}>
        <div className="absolute inset-0">
          <img src={images.nosotrosHero} alt="The Noir Atelier" className="w-full h-full object-cover" style={{ filter: 'grayscale(1)', opacity: 0.2 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0e0e0e 30%, transparent)' }} />
        </div>
        <div className="relative z-10 px-6 md:px-8 max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '24px' }}>{about.badge}</p>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '24px' }}>
            {about.heroTitle}
          </h1>
          <p style={{ fontSize: '16px', color: '#9a8f80', lineHeight: 1.8, maxWidth: '560px' }}>{about.heroSubtitle}</p>
        </div>
      </section>

      {/* HERITAGE STORY */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img src={images.shopInterior} alt="The Atelier" className="w-full h-full object-cover" style={{ filter: 'grayscale(0.4)' }} />
            </div>
          </div>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '24px' }}>The Heritage</p>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '32px' }}>
              Founded {business.established}.<br />
              <em style={{ fontStyle: 'italic', color: '#9a8f80' }}>Built on Craft.</em>
            </h2>
            <p style={{ fontSize: '15px', color: '#9a8f80', lineHeight: 1.8, marginBottom: '24px' }}>{about.studioNote}</p>
            <p style={{ fontSize: '15px', color: '#9a8f80', lineHeight: 1.8 }}>
              Every decision in this space — from the tools we carry to the products on the shelf — reflects a single standard: the best available, or nothing at all.
            </p>
          </div>
        </div>
      </section>

      {/* MASTER BARBERS */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>El equipo</p>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', marginBottom: '64px', lineHeight: 1.1 }}>
            Master Barbers.<br />
            <em style={{ fontStyle: 'italic', color: '#9a8f80' }}>Dedicated Craft.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {about.barbers.map((barber, i) => (
              <div key={i}>
                <div className="overflow-hidden mb-6" style={{ aspectRatio: '3/4', backgroundColor: '#1c1b1b' }}>
                  <img
                    src={i === 0 ? images.haircut : i === 1 ? images.beard : images.shopProducts}
                    alt={barber.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(0.5)', opacity: 0.8 }}
                  />
                </div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '24px', color: '#e5e2e1', marginBottom: '4px' }}>{barber.name}</h3>
                <p style={{ fontSize: '10px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>{barber.role}</p>
                <p style={{ fontSize: '14px', color: '#9a8f80', lineHeight: 1.7, marginBottom: '16px' }}>{barber.bio}</p>
                <p style={{ fontSize: '11px', color: '#4e4639', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Speciality: {barber.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY BENTO */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>Philosophy</p>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', marginBottom: '48px', lineHeight: 1.1 }}>
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.values.map((val) => (
              <div key={val.num} className="p-8" style={{ backgroundColor: '#1c1b1b', borderTop: '2px solid #4e4639' }}>
                <span style={{ fontFamily: "'Newsreader', serif", fontSize: '48px', fontWeight: 700, color: '#201f1f', lineHeight: 1, display: 'block', marginBottom: '24px' }}>{val.num}</span>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#e5e2e1', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>{val.title}</h3>
                <p style={{ fontSize: '14px', color: '#9a8f80', lineHeight: 1.7 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO IMAGERY */}
      <section className="py-24 px-6 md:px-8" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[images.heroBg, images.shopInterior, images.shopProducts, images.haircut].map((src, i) => (
              <div key={i} className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img src={src} alt="The Noir Atelier" className="w-full h-full object-cover" style={{ filter: 'grayscale(0.3)', transition: 'transform 0.4s' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-xl mx-auto">
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '24px' }}>
            {about.cta?.title ?? 'Begin the Experience.'}
          </h2>
          <p style={{ fontSize: '15px', color: '#9a8f80', lineHeight: 1.8, marginBottom: '40px' }}>
            {about.cta?.desc ?? 'Reserve your session and meet the team.'}
          </p>
          <Link
            href={`${baseHref}/contacto`}
            style={{ display: 'inline-block', background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '11px', fontWeight: 700, padding: '16px 48px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em' }}
          >
            Book Your Appointment
          </Link>
        </div>
      </section>

    </div>
  );
}
