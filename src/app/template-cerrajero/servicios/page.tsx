import Link from 'next/link';
import { business, serviciosPage, images } from '../data';

const imageMap: Record<string, string> = {
  techWorking: images.techWorking,
  lockDetail: images.lockDetail,
  securityDoor: images.securityDoor,
};

export default function ServiciosPage() {
  return (
    <>
      {/* ── HERO HEADER ── */}
      <section
        className="bg-[#131313] py-24"
        style={{ background: 'radial-gradient(circle at top right, rgba(255,215,0,0.08) 0%, transparent 60%), #131313' }}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-2 mb-8">
            <span className="animate-pulse w-2 h-2 bg-[#ffd700] rounded-full" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{serviciosPage.badge}</span>
          </div>
          <h1
            className="max-w-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1', lineHeight: 1 }}
          >
            {serviciosPage.title}
          </h1>
          <div className="h-1 w-20 bg-[#ffd700] my-8" />
          <p className="max-w-2xl" style={{ fontSize: '17px', color: '#d0c6ab', lineHeight: 1.8 }}>
            {serviciosPage.intro}
          </p>
        </div>
      </section>

      {/* ── SERVICE DEEP DIVES ── */}
      {serviciosPage.items.map((item, i) => (
        <section
          key={item.num}
          className={i % 2 === 0 ? 'bg-[#131313] py-20' : 'bg-[#1c1b1b] py-20'}
        >
          <div className="max-w-[1920px] mx-auto px-6 md:px-8">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              {/* Text */}
              <div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '72px', fontWeight: 800, color: 'rgba(255,215,0,0.1)', lineHeight: 1, display: 'block', letterSpacing: '-0.04em' }}>
                  {item.num}
                </span>
                <h2 className="-mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  {item.name}
                </h2>
                <div className="h-1 w-16 bg-[#ffd700] my-6" />
                <p style={{ fontSize: '16px', color: '#d0c6ab', lineHeight: 1.8 }}>{item.desc}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {item.tags.map(tag => (
                    <span key={tag} className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: '#2a2a2a', color: '#d0c6ab' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="inline-flex items-center gap-2 mt-8 rounded-lg transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '12px', fontWeight: 700, padding: '12px 24px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}
                >
                  Solicitar Servicio
                </a>
              </div>

              {/* Image */}
              <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/3]">
                <img
                  src={imageMap[item.image] ?? images.techWorking}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(19,19,19,0.2)' }} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── PRICING ── */}
      <section className="bg-[#0e0e0e] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="h-1 w-20 bg-[#ffd700] mx-auto mb-6" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
              Tarifas Transparentes
            </h2>
            <p className="mt-4" style={{ fontSize: '16px', color: '#d0c6ab' }}>Precio cerrado antes de empezar. Sin sorpresas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {serviciosPage.pricing.map(p => (
              <div
                key={p.tier}
                className={`rounded-[1.5rem] p-8 flex flex-col ${p.featured ? '' : 'bg-[#1c1b1b]'}`}
                style={p.featured ? { background: 'linear-gradient(135deg, #2a2a2a, #353535)', border: '1px solid rgba(255,215,0,0.3)', boxShadow: '0 24px 24px rgba(255,215,0,0.08)' } : { border: '1px solid #2a2a2a' }}
              >
                {p.featured && (
                  <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest self-start" style={{ backgroundColor: '#ffd700', color: '#3a3000' }}>
                    Recomendado
                  </span>
                )}
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.02em' }}>{p.tier}</h3>
                <p className="mt-1" style={{ fontSize: '12px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.desc}</p>
                <p className="mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 800, color: '#ffd700', letterSpacing: '-0.03em' }}>{p.price}</p>
                <ul className="flex flex-col gap-3 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffd700"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                      <span style={{ fontSize: '13px', color: '#d0c6ab' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="mt-8 block text-center py-3 rounded-lg transition-all hover:scale-[1.02]"
                  style={p.featured
                    ? { background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }
                    : { backgroundColor: '#2a2a2a', color: '#e5e2e1', fontSize: '12px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }
                  }
                >
                  Llamar Ahora
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#131313] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="h-1 w-20 bg-[#ffd700] mx-auto mb-6" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
              Cómo Trabajamos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {serviciosPage.process.map((step, i) => (
              <div key={step.step} className="relative">
                {i < serviciosPage.process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px z-0" style={{ background: 'linear-gradient(to right, rgba(255,215,0,0.3), transparent)' }} />
                )}
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05))', border: '1px solid rgba(255,215,0,0.2)' }}
                  >
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 800, color: '#ffd700' }}>{step.step}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em' }}>{step.title}</h3>
                  <p className="mt-2" style={{ fontSize: '14px', color: '#d0c6ab', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 text-center">
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#3a3000' }}>
            Necesitas un cerrajero ahora?
          </h2>
          <p className="mt-4 mb-10" style={{ fontSize: '17px', color: '#5a4a00' }}>
            Disponible 24 horas, 7 dias a la semana. Llegamos en 20 minutos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${business.phoneIntl}`}
              className="rounded-lg px-10 py-5 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#3a3000', color: '#ffd700', fontSize: '14px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              {business.phone}
            </a>
            <Link
              href="/template-cerrajero/contacto"
              className="rounded-lg px-10 py-5 transition-all hover:bg-[#3a3000]/10"
              style={{ border: '2px solid #3a3000', color: '#3a3000', fontSize: '14px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              Solicitar Presupuesto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
