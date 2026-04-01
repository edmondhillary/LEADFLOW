import Link from 'next/link';
import { business, hero, services, trustStats, benefits, testimonials, images, credentials } from './data';

export default function TemplateDentistaHome() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f7f9fb' }}>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        {/* Skewed background right panel */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
          style={{ backgroundColor: '#f2f4f6', clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />

        <div className="relative max-w-[1920px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="relative z-10">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
                style={{ backgroundColor: '#c4e3ff', color: '#48667d' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>{hero.badge}</span>
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#191c1e', marginBottom: '24px' }}>
                {hero.titleLine1}
                <br />
                <span style={{ color: '#003e6f' }}>{hero.titleAccent}</span>
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: '17px', color: '#414750', lineHeight: 1.7, maxWidth: '520px', marginBottom: '40px' }}>
                {hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/template-dentista/contacto"
                  className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)', color: '#ffffff', padding: '14px 28px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,62,111,0.25)' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>phone_in_talk</span>
                  {hero.ctaPrimary}
                </Link>
                <Link
                  href="/template-dentista/servicios"
                  className="inline-flex items-center gap-2 rounded-xl transition-all hover:bg-[#eceef0]"
                  style={{ border: '1.5px solid #c1c7d2', color: '#003e6f', padding: '14px 28px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', backgroundColor: 'transparent' }}
                >
                  {hero.ctaSecondary}
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right: Image with floating card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main image */}
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{ width: '480px', maxWidth: '100%', aspectRatio: '1 / 1', transform: 'rotate(2deg)', boxShadow: '0 20px 40px rgba(25,28,30,0.12)' }}
                >
                  <img
                    src={images.heroClinic}
                    alt="Clinica dental The Clinical Sanctuary"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Floating white card */}
                <div
                  className="absolute -bottom-6 -left-6 rounded-2xl flex items-center gap-4"
                  style={{ backgroundColor: '#ffffff', padding: '16px 20px', boxShadow: '0 16px 40px rgba(25,28,30,0.1)', minWidth: '220px' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#d2e4ff' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#003e6f' }}>{hero.floatingCard.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 700, color: '#191c1e' }}>{hero.floatingCard.title}</p>
                    <span
                      className="inline-block rounded-full px-2 py-0.5 mt-1"
                      style={{ backgroundColor: '#003e6f', color: '#ffffff', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}
                    >
                      {hero.floatingCard.badge}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="py-20" style={{ backgroundColor: '#f2f4f6' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Tratamientos Principales</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em' }}>
              Lo que hacemos mejor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.name}
                className={`rounded-3xl p-8 transition-all ${s.urgent ? '-translate-y-4' : ''}`}
                style={{
                  backgroundColor: s.urgent ? '#003e6f' : '#ffffff',
                  color: s.urgent ? '#ffffff' : '#191c1e',
                  boxShadow: s.urgent ? '0 20px 40px rgba(0,62,111,0.2)' : '0 4px 16px rgba(25,28,30,0.06)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: s.urgent ? 'rgba(255,255,255,0.15)' : '#d2e4ff' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '24px', color: s.urgent ? '#ffffff' : '#003e6f' }}>{s.icon}</span>
                </div>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{s.name}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, opacity: s.urgent ? 0.85 : undefined, color: s.urgent ? undefined : '#414750' }}>{s.desc}</p>
                <Link
                  href="/template-dentista/servicios"
                  className="inline-flex items-center gap-2 mt-6 transition-opacity hover:opacity-70"
                  style={{ fontSize: '13px', fontWeight: 600, color: s.urgent ? '#ffffff' : '#003e6f', textDecoration: 'none' }}
                >
                  Ver mas
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Photo grid with badge */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img src={images.dentalTeam} alt="Equipo clinico" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <img src={images.dentalTech} alt="Tecnologia dental" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="rounded-2xl overflow-hidden flex-1" style={{ minHeight: '140px' }}>
                    <img src={images.clinicRoom} alt="Sala clinica" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              {/* 15+ Years badge */}
              <div
                className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #446279 0%, #003e6f 100%)', color: '#ffffff', boxShadow: '0 8px 24px rgba(0,62,111,0.3)' }}
              >
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 800, lineHeight: 1 }}>{business.yearsExperience}</span>
                <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Anos</span>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Nuestra Filosofia</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em', marginBottom: '24px', lineHeight: 1.15 }}>
                Excelencia Medica con Trato Humano
              </h2>
              <p style={{ fontSize: '16px', color: '#414750', lineHeight: 1.7, marginBottom: '32px' }}>
                Desde 2009 combinamos la mas alta tecnologia dental con un trato cercano y personalizado. Cada paciente es unico y merece un plan de tratamiento adaptado a sus necesidades.
              </p>

              <div className="flex flex-col gap-6 mb-10">
                {benefits.map(b => (
                  <div key={b.title} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#d2e4ff' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#003e6f' }}>{b.icon}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '15px', fontWeight: 700, color: '#191c1e', marginBottom: '4px' }}>{b.title}</p>
                      <p style={{ fontSize: '14px', color: '#414750', lineHeight: 1.6 }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4">
                {trustStats.map(stat => (
                  <div key={stat.label} className="rounded-2xl p-4" style={{ backgroundColor: '#f2f4f6' }}>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '26px', fontWeight: 800, color: '#003e6f', lineHeight: 1 }}>{stat.value}</p>
                    <p style={{ fontSize: '12px', color: '#727781', marginTop: '4px' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ backgroundColor: '#f2f4f6' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Lo Que Dicen Nuestros Pacientes</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em' }}>
              Pacientes que confiaron en nosotros
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div
                key={t.name}
                className="rounded-2xl p-8 flex flex-col"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(25,28,30,0.06)' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize: '18px', color: '#f59e0b', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: '#414750', lineHeight: 1.7, fontStyle: 'italic', flex: 1, marginBottom: '24px' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #eceef0' }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#d2e4ff', color: '#003e6f' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 700, color: '#191c1e' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#727781' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eceef0', borderBottom: '1px solid #eceef0' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="flex flex-wrap justify-center items-center gap-10">
            {credentials.map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#003e6f' }}>verified</span>
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 700, color: '#191c1e' }}>{c.label}</p>
                  <p style={{ fontSize: '12px', color: '#727781' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="rounded-[3rem] px-8 md:px-16 py-16 text-center"
            style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)' }}
          >
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(210,228,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Urgencias 24h</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Tu salud dental no puede esperar
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
              Llama ahora o reserva tu cita online. Primera consulta completamente gratuita.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${business.phoneIntl}`}
                className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: '#ffffff', color: '#003e6f', padding: '14px 28px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>phone_in_talk</span>
                Llamar Ahora
              </a>
              <Link
                href="/template-dentista/contacto"
                className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', padding: '14px 28px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                Reservar Cita Online
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
