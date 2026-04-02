import Link from 'next/link';
import { about, images, business } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-canina';
  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", backgroundColor: '#fafaf5', color: '#2f342e' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '480px' }}>
        <div className="absolute inset-0">
          <img src={images.nosotrosHero} alt="The Tailored Sanctuary grooming studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(47,52,46,0.55) 0%, rgba(47,52,46,0.75) 100%)' }} />
        </div>
        <div className="relative z-10 px-6 md:px-10 py-28 md:py-36 max-w-[1920px] mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: 'rgba(206,233,214,0.2)', border: '1px solid rgba(206,233,214,0.4)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#cee9d6' }}>{about.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e6ffed', lineHeight: 1.05, maxWidth: '700px', marginBottom: '20px' }}>
            {about.heroTitle}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(230,255,237,0.75)', lineHeight: 1.75, maxWidth: '540px' }}>
            {about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Our Founder</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e', marginBottom: '24px', lineHeight: 1.1 }}>
              {about.founder.name}
            </h2>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>{about.founder.role}</p>
            {about.founder.bio.map((para, i) => (
              <p key={i} style={{ fontSize: '15px', color: '#5c605a', lineHeight: 1.8, marginBottom: '16px' }}>{para}</p>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {about.founder.stats.map(stat => (
                <div key={stat.label} className="text-center p-5 rounded-xl" style={{ backgroundColor: '#f3f4ee' }}>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', fontWeight: 800, color: '#4c6456', letterSpacing: '-0.04em' }}>{stat.value}</p>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0px 24px 48px rgba(47,52,46,0.10)' }}>
            <img src={images.studioInterior} alt="Emma Hartley, Founder" className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-10 py-20" style={{ backgroundColor: '#f3f4ee' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-14">
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>What We Believe</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e' }}>
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((val) => (
              <div key={val.num} className="rounded-xl p-10 flex flex-col gap-6" style={{ backgroundColor: '#ffffff', boxShadow: '0px 12px 32px rgba(47,52,46,0.05)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#cee9d6' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 800, color: '#3f5749' }}>{val.num}</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 700, color: '#2f342e', letterSpacing: '-0.02em' }}>{val.title}</h3>
                <p style={{ fontSize: '14px', color: '#5c605a', lineHeight: 1.75 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Conoce al equipo</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e', marginBottom: '20px', lineHeight: 1.1 }}>
              {about.team.title}
            </h2>
            <p style={{ fontSize: '15px', color: '#5c605a', lineHeight: 1.75, marginBottom: '24px' }}>
              {about.team.desc}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#cee9d6', color: '#3f5749' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{about.team.badge}</span>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0px 24px 48px rgba(47,52,46,0.08)' }}>
            <img src={images.groomerHands} alt="The Tailored Sanctuary grooming team" className="w-full object-cover" style={{ aspectRatio: '16/9' }} />
          </div>
        </div>
      </section>

      {/* Estudio Gallery */}
      <section className="px-6 md:px-10 py-16" style={{ backgroundColor: '#f3f4ee' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-12">
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4c6456', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Inside the Estudio</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e' }}>
              Your Dog&apos;s Sanctuary
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[images.gallery1, images.gallery2, images.gallery3, images.gallery4].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <img src={img} alt={`Estudio gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20 max-w-[1920px] mx-auto">
        <div className="rounded-xl px-10 py-16 text-center" style={{ backgroundColor: '#4c6456' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 800, color: '#e6ffed', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            {about.cta.title}
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(230,255,237,0.75)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
            {about.cta.desc}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`${baseHref}/contacto`} className="inline-flex items-center gap-2 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#e6ffed', color: '#2d4437', padding: '14px 32px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              Book Your Visit
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
            </Link>
            <a href={`tel:${business.phoneIntl}`} className="inline-flex items-center gap-2 rounded-full" style={{ border: '1.5px solid rgba(230,255,237,0.4)', color: '#e6ffed', padding: '14px 32px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              {business.phone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
