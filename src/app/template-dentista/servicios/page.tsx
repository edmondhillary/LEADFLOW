import Link from 'next/link';
import { serviciosPage, credentials, business } from '../data';

export default function ServiciosPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f7f9fb' }}>

      {/* Hero Header */}
      <section className="py-20" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eceef0' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ backgroundColor: '#c4e3ff', color: '#48667d' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>medical_services</span>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>{serviciosPage.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.03em', marginBottom: '20px' }}>
            {serviciosPage.title}
          </h1>
          <p style={{ fontSize: '17px', color: '#414750', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
            {serviciosPage.intro}
          </p>
        </div>
      </section>

      {/* Service Cards — Masonry-style grid */}
      <section className="py-20" style={{ backgroundColor: '#f2f4f6' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviciosPage.items.map((item) => (
              <div
                key={item.num}
                className={`rounded-3xl p-8 flex flex-col ${item.large ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{
                  backgroundColor: item.accent ? '#003e6f' : '#ffffff',
                  color: item.accent ? '#ffffff' : '#191c1e',
                  boxShadow: item.accent ? '0 20px 40px rgba(0,62,111,0.2)' : '0 4px 16px rgba(25,28,30,0.06)',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: item.accent ? 'rgba(255,255,255,0.5)' : '#727781', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>
                  {item.num}
                </span>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '22px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: item.accent ? 'rgba(255,255,255,0.85)' : '#414750', flex: 1, marginBottom: '20px' }}>
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1"
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: item.accent ? 'rgba(255,255,255,0.15)' : '#f2f4f6',
                        color: item.accent ? '#ffffff' : '#446279',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/template-dentista/contacto"
                  className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
                  style={{ fontSize: '14px', fontWeight: 600, color: item.accent ? '#ffffff' : '#003e6f', textDecoration: 'none' }}
                >
                  Solicitar Informacion
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Nuestro Proceso</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em' }}>
              Como trabajamos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-[1px] hidden md:block" style={{ backgroundColor: '#c1c7d2' }} />
            {serviciosPage.process.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10"
                  style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)', color: '#ffffff', boxShadow: '0 8px 24px rgba(0,62,111,0.25)' }}
                >
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 800 }}>{step.step}</span>
                </div>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 700, color: '#191c1e', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#414750', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20" style={{ backgroundColor: '#f2f4f6' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Precios Transparentes</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em' }}>
              Sin sorpresas, sin costes ocultos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviciosPage.pricing.map((p, i) => (
              <div
                key={p.tier}
                className="rounded-3xl p-8 flex flex-col"
                style={{
                  backgroundColor: i === 2 ? '#003e6f' : '#ffffff',
                  color: i === 2 ? '#ffffff' : '#191c1e',
                  boxShadow: i === 2 ? '0 20px 40px rgba(0,62,111,0.2)' : '0 4px 16px rgba(25,28,30,0.06)',
                  transform: i === 1 ? 'scale(1.02)' : 'none',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: i === 2 ? 'rgba(255,255,255,0.6)' : '#446279', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                  {p.tier}
                </p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '28px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
                  {p.price}
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: i === 2 ? 'rgba(255,255,255,0.8)' : '#414750', marginBottom: '24px', flex: 1 }}>
                  {p.desc}
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '18px', color: i === 2 ? '#ffffff' : '#003e6f', fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span style={{ fontSize: '14px', color: i === 2 ? 'rgba(255,255,255,0.9)' : '#414750' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/template-dentista/contacto"
                  className="block text-center rounded-xl py-3 transition-all hover:opacity-90"
                  style={{
                    backgroundColor: i === 2 ? '#ffffff' : 'transparent',
                    color: i === 2 ? '#003e6f' : '#003e6f',
                    border: i === 2 ? 'none' : '1.5px solid #003e6f',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Solicitar Consulta
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Row */}
      <section className="py-12" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eceef0' }}>
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

      {/* CTA */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="rounded-[3rem] px-8 md:px-16 py-16 text-center"
            style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)' }}
          >
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Primera Consulta Gratuita
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
              Visita nuestras instalaciones y conoce a nuestro equipo sin ningun compromiso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/template-dentista/contacto"
                className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: '#ffffff', color: '#003e6f', padding: '14px 28px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
              >
                Reservar Ahora
              </Link>
              <a
                href={`tel:${business.phoneIntl}`}
                className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', padding: '14px 28px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>phone</span>
                Llamar
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
