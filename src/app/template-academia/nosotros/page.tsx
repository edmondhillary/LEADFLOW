import Image from 'next/image';
import Link from 'next/link';
import { nosotros, stats, images, business } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-academia';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa', color: '#191c1d' }}>

      {/* Navy Hero */}
      <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(to right, #001944, #002c6e)', minHeight: '520px' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#6b95f3', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>{nosotros.badge}</p>
            <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1.05, marginBottom: '20px' }}>
              {nosotros.heroTitle}
            </h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: '480px' }}>
              {nosotros.heroSubtitle}
            </p>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden" style={{ height: '380px' }}>
            <Image src={images.nosotrosHero} alt="Equipo Scholarly Academy" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,25,68,0.4) 0%, transparent 60%)' }} />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="w-full py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 max-w-3xl mx-auto text-center" style={{ maxWidth: '760px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Nuestra Mision</p>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#191c1d', lineHeight: 1.5, letterSpacing: '-0.02em' }}>
            {nosotros.mission}
          </p>
        </div>
      </section>

      {/* Academic Philosophy — Values */}
      <section className="w-full py-20" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="mb-12 text-center">
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Filosofia Academica</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1 }}>
              Los principios que nos guian
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nosotros.values.map(v => (
              <div key={v.num} className="rounded-[2rem] p-8" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '48px', fontWeight: 800, color: '#e1e3e4', lineHeight: 1 }}>{v.num}</span>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '22px', fontWeight: 800, color: '#191c1d', letterSpacing: '-0.03em', marginTop: '16px', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#454652', lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="w-full py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>El Equipo Docente</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1 }}>
              Mentores activos en las mejores empresas
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nosotros.instructors.map(instructor => (
              <div key={instructor.name} className="rounded-[2rem] overflow-hidden" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
                <div className="relative h-52 w-full overflow-hidden" style={{ backgroundColor: '#f3f4f5' }}>
                  <Image src={images.nosotrosHero} alt={instructor.name} fill className="object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,1) 100%)' }} />
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '17px', fontWeight: 800, color: '#191c1d', marginBottom: '3px' }}>{instructor.name}</h3>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#2a6b2c', marginBottom: '8px' }}>{instructor.role}</p>
                  <span className="inline-block rounded-full px-3 py-1" style={{ fontSize: '11px', backgroundColor: '#d9e2ff', color: '#001944', fontWeight: 600 }}>{instructor.specialty}</span>
                  <p style={{ fontSize: '11px', color: '#454652', marginTop: '8px' }}>{instructor.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="w-full py-16" style={{ backgroundColor: '#001944' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#acf4a4', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="w-full py-20" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>Comunidad</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1, marginBottom: '20px' }}>
                Aprende rodeado de los mejores.
              </h2>
              <p style={{ fontSize: '16px', color: '#454652', lineHeight: 1.75, marginBottom: '28px' }}>
                Mas de 50.000 profesionales conectados en nuestra comunidad exclusiva. Acceso a grupos de estudio, eventos en directo, sesiones de networking y oportunidades laborales que no encontraras en ningun otro lugar.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Grupos de estudio', desc: 'Colaboracion entre pares con feedback real' },
                  { label: 'Eventos en directo', desc: 'Masterclasses, Q&A con expertos y hackathons' },
                  { label: 'Bolsa de empleo exclusiva', desc: 'Mas de 500 empresas contratando graduates' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#acf4a4' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0c5216" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#191c1d', fontFamily: "'Manrope', sans-serif" }}>{item.label}</p>
                      <p style={{ fontSize: '13px', color: '#454652' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] overflow-hidden relative" style={{ height: '420px' }}>
              <Image src={images.nosotrosHero} alt="Comunidad Scholarly Academy" fill className="object-cover" />
              <div className="absolute inset-0 rounded-[2rem]" style={{ background: 'linear-gradient(135deg, rgba(0,25,68,0.3) 0%, transparent 60%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="rounded-[3rem] p-12 md:p-20 text-center" style={{ background: 'linear-gradient(to right, #001944, #002c6e)', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1.05, marginBottom: '16px' }}>
              {nosotros.cta.title}
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 36px' }}>
              {nosotros.cta.desc}
            </p>
            <Link href={`${baseHref}/contacto`} className="inline-flex items-center justify-center rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '16px', fontWeight: 700, padding: '18px 40px', textDecoration: 'none', fontFamily: "'Manrope', sans-serif" }}>
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
