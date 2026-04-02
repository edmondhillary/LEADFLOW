import Link from 'next/link';
import { nosotrosPage, trustStats, images, business } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-dentista';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f7f9fb' }}>

      {/* Dark Clinical Gradient Hero */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)' }}>
        {/* Team image overlay */}
        <div className="absolute inset-0">
          <img
            src={images.nosotrosHero}
            alt="Equipo The Clinical Sanctuary"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }}
          />
        </div>
        <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#d2e4ff' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>groups</span>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>{nosotrosPage.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '24px', lineHeight: 1.05 }}>
            {nosotrosPage.heroTitle}
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            {nosotrosPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Dr. Alejandro Reyes — Full Bio */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '4/5', boxShadow: '0 20px 40px rgba(25,28,30,0.1)' }}>
                <img
                  src={images.doctorPortrait}
                  alt={nosotrosPage.doctor.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Stats overlay card */}
              <div
                className="absolute -bottom-6 -right-6 rounded-2xl p-6"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,30,0.1)', minWidth: '240px' }}
              >
                <div className="flex flex-col gap-4">
                  {nosotrosPage.doctor.stats.map(s => (
                    <div key={s.label} className="flex items-center gap-4">
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, color: '#003e6f', minWidth: '60px' }}>{s.value}</span>
                      <span style={{ fontSize: '12px', color: '#727781', lineHeight: 1.4 }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Director Medico</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                {nosotrosPage.doctor.name}
              </h2>
              <p style={{ fontSize: '15px', color: '#446279', fontWeight: 500, marginBottom: '28px' }}>{nosotrosPage.doctor.role}</p>
              <div className="flex flex-col gap-5">
                {nosotrosPage.doctor.bio.map((para, i) => (
                  <p key={i} style={{ fontSize: '16px', color: '#414750', lineHeight: 1.8 }}>{para}</p>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-8 p-5 rounded-2xl" style={{ backgroundColor: '#f2f4f6', borderLeft: '3px solid #003e6f' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#003e6f' }}>format_quote</span>
                <p style={{ fontSize: '15px', color: '#414750', fontStyle: 'italic', lineHeight: 1.6 }}>
                  Mi filosofia: cada paciente merece el mismo cuidado que daria a mi propia familia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values/Philosophy */}
      <section className="py-20" style={{ backgroundColor: '#f2f4f6' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Nuestra Filosofia</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em' }}>
              Los pilares de nuestra clinica
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nosotrosPage.values.map((v) => (
              <div
                key={v.num}
                className="rounded-3xl p-8"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(25,28,30,0.06)' }}
              >
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '48px', fontWeight: 800, color: '#eceef0', lineHeight: 1, display: 'block', marginBottom: '16px' }}>{v.num}</span>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 700, color: '#191c1e', marginBottom: '12px' }}>{v.title}</h3>
                <p style={{ fontSize: '15px', color: '#414750', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bento */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>{business.yearsExperience} Anos de Trayectoria</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em' }}>
              Numeros que avalan nuestra excelencia
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustStats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-3xl p-8 text-center"
                style={{
                  backgroundColor: i === 0 ? '#003e6f' : '#f2f4f6',
                  color: i === 0 ? '#ffffff' : '#191c1e',
                  boxShadow: i === 0 ? '0 16px 40px rgba(0,62,111,0.2)' : 'none',
                }}
              >
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '8px', color: i === 0 ? '#ffffff' : '#003e6f' }}>{stat.value}</p>
                <p style={{ fontSize: '13px', color: i === 0 ? 'rgba(255,255,255,0.75)' : '#727781' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20" style={{ backgroundColor: '#f2f4f6' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Equipo Clinico</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em', marginBottom: '20px' }}>
                {nosotrosPage.team.title}
              </h2>
              <p style={{ fontSize: '16px', color: '#414750', lineHeight: 1.7, marginBottom: '28px' }}>
                {nosotrosPage.team.desc}
              </p>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{ backgroundColor: '#c4e3ff', color: '#48667d' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{nosotrosPage.team.badge}</span>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '16/9', boxShadow: '0 20px 40px rgba(25,28,30,0.08)' }}>
              <img
                src={images.dentalTeam}
                alt="Equipo clinico The Clinical Sanctuary"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="rounded-[3rem] px-8 md:px-16 py-16 text-center"
            style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)' }}
          >
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              {nosotrosPage.cta.title}
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
              {nosotrosPage.cta.desc}
            </p>
            <Link
              href={`${baseHref}/contacto`}
              className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: '#ffffff', color: '#003e6f', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
            >
              Reservar Consulta Gratuita
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
