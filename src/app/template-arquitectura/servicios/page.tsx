import Link from 'next/link';
import { serviciosPage, images, business } from '../data';

export default function ServiciosPage() {
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Hero */}
      <header className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-28 pt-8 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#635e57', display: 'block', marginBottom: '12px' }}>{serviciosPage.badge}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
              La Arquitectura <br />del <span style={{ fontStyle: 'italic' }}>Propósito</span>.
            </h1>
          </div>
          <div className="md:col-span-5 pb-2">
            <p className="text-base md:text-lg max-w-md" style={{ color: '#5a615c', lineHeight: 1.7 }}>{serviciosPage.intro}</p>
          </div>
        </div>
      </header>

      {/* Service 01: Asymmetric Hero */}
      <section className="mb-20 md:mb-40 px-6 md:px-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="md:col-span-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img src={images.serviciosHero} alt={serviciosPage.items[0].name} className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-4 p-8 md:p-16 flex flex-col justify-center" style={{ backgroundColor: '#f3f4f0' }}>
            <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '24px', color: '#5f5e5e', marginBottom: '16px' }}>{serviciosPage.items[0].num}</span>
            <h2 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430' }}>{serviciosPage.items[0].name}</h2>
            <p className="mb-6" style={{ fontSize: '14px', color: '#5a615c', lineHeight: 1.7 }}>{serviciosPage.items[0].desc}</p>
            <div className="flex flex-wrap gap-2">
              {serviciosPage.items[0].tags.map((tag, i) => (
                <span key={i} className="px-3 py-1" style={{ backgroundColor: '#e5e9e4', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services 02 & 03: Editorial Split */}
      <section className="mb-20 md:mb-40 py-16 md:py-28" style={{ backgroundColor: '#f3f4f0' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28">
            {serviciosPage.items.slice(1, 3).map((item, idx) => (
              <div key={idx} className="flex flex-col" style={{ marginTop: idx === 1 ? '0' : undefined }}>
                <div className="mb-8 overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={idx === 0 ? images.serviciosInterior : images.serviciosRenovation}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '20px', color: '#5f5e5e', marginBottom: '12px' }}>{item.num}</span>
                <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>{item.name}</h3>
                <p className="mb-6 max-w-md" style={{ fontSize: '14px', color: '#5a615c', lineHeight: 1.7 }}>{item.desc}</p>
                <span className="w-fit pb-1" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid rgba(118,124,119,0.3)', color: '#2e3430' }}>
                  Ver Más
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 04: Technical Focus */}
      <section className="mb-20 md:mb-40 px-6 md:px-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '20px', color: '#5f5e5e', display: 'block', marginBottom: '12px' }}>{serviciosPage.items[3].num}</span>
            <h2 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430' }}>{serviciosPage.items[3].name}</h2>
            <p className="text-base mb-8" style={{ color: '#5a615c', lineHeight: 1.7 }}>{serviciosPage.items[3].desc}</p>
            <div className="space-y-5">
              {serviciosPage.items[3].tags.map((tag, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined" style={{ color: '#5f5e5e', fontSize: '20px' }}>{i === 0 ? 'architecture' : 'light_mode'}</span>
                  <div>
                    <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#2e3430', marginBottom: '2px' }}>{tag}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="p-4 md:p-8" style={{ backgroundColor: '#ecefea' }}>
              <img src={images.serviciosBlueprint} alt="Planos" className="w-full object-cover" style={{ aspectRatio: '16/10', opacity: 0.85, mixBlendMode: 'multiply' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Services 05 & 06: Tonal Layers */}
      <section className="mb-20 md:mb-40 px-6 md:px-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-1 p-8 md:p-12" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(118,124,119,0.08)' }}>
            <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '20px', color: '#5f5e5e', display: 'block', marginBottom: '16px' }}>{serviciosPage.items[4].num}</span>
            <h3 className="text-xl md:text-2xl mb-4" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>{serviciosPage.items[4].name}</h3>
            <p className="text-sm mb-6" style={{ color: '#5a615c', lineHeight: 1.7 }}>{serviciosPage.items[4].desc}</p>
            <ul className="space-y-3">
              {serviciosPage.items[4].tags.map((tag, i) => (
                <li key={i} className="flex items-center gap-2" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57' }}>
                  <span className="block w-1 h-1" style={{ backgroundColor: '#5f5e5e' }} /> {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 relative group overflow-hidden">
            <img src={images.serviciosSupervision} alt="Supervisión" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" style={{ minHeight: '400px' }} />
            <div className="absolute inset-0 flex items-end p-8 md:p-12" style={{ background: 'linear-gradient(to top, rgba(13,15,13,0.6), transparent)' }}>
              <div style={{ color: '#faf7f6' }}>
                <span style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '20px', display: 'block', marginBottom: '8px' }}>{serviciosPage.items[5].num}</span>
                <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "'Noto Serif', serif" }}>{serviciosPage.items[5].name}</h3>
                <p className="max-w-md text-sm mb-4" style={{ opacity: 0.9 }}>{serviciosPage.items[5].desc}</p>
                <Link href="/template-arquitectura/contacto" className="inline-block transition-all active:scale-[0.98]" style={{ backgroundColor: '#faf7f6', color: '#2e3430', padding: '12px 32px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
                  Consultar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-28 md:py-40 px-6 md:px-8 text-center" style={{ backgroundColor: '#f3f4f0' }}>
        <h2 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', letterSpacing: '-0.02em' }}>
          Tu visión, <br /><span style={{ fontStyle: 'italic' }}>materializada</span>.
        </h2>
        <Link href="/template-arquitectura/contacto" className="inline-block transition-all active:scale-[0.98]" style={{ backgroundColor: '#5f5e5e', color: '#faf7f6', padding: '18px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>
          Agendar Consulta
        </Link>
      </section>
    </main>
  );
}
