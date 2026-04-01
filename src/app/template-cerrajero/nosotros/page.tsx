import Link from 'next/link';
import { business, nosotrosPage, credentials, testimonials, images } from '../data';

export default function NosotrosPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#131313] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.nosotrosHero}
            alt="The Sentinel Guard equipo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(19,19,19,0.85)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at bottom left, rgba(255,215,0,0.08) 0%, transparent 60%)' }} />
        </div>
        <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-8 py-32">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-2 mb-8">
            <span className="animate-pulse w-2 h-2 bg-[#ffd700] rounded-full" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{nosotrosPage.badge}</span>
          </div>
          <h1
            className="max-w-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1', lineHeight: 1.05 }}
          >
            {nosotrosPage.title}
          </h1>
          <div className="h-1 w-20 bg-[#ffd700] my-8" />
          <p className="max-w-2xl" style={{ fontSize: '17px', color: '#d0c6ab', lineHeight: 1.8 }}>
            {nosotrosPage.subtitle}
          </p>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="bg-[#1c1b1b] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="h-1 w-20 bg-[#ffd700] mb-8" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1', lineHeight: 1.1 }}>
                Nuestra Historia
              </h2>
              <div className="flex flex-col gap-5 mt-6">
                {nosotrosPage.story.map((para, i) => (
                  <p key={i} style={{ fontSize: '16px', color: '#d0c6ab', lineHeight: 1.8 }}>{para}</p>
                ))}
              </div>
            </div>

            {/* Expertise stats */}
            <div className="grid grid-cols-2 gap-4">
              {nosotrosPage.expertise.map(e => (
                <div key={e.label} className="rounded-2xl bg-[#20201f] p-6" style={{ border: '1px solid #2a2a2a' }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '36px', fontWeight: 800, color: '#ffd700', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {e.value}
                  </p>
                  <p className="mt-2" style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{e.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#131313] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="h-1 w-20 bg-[#ffd700] mx-auto mb-6" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
              Nuestros Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nosotrosPage.values.map(v => (
              <div key={v.num} className="rounded-[1.5rem] bg-[#1c1b1b] p-8" style={{ border: '1px solid #2a2a2a' }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '64px', fontWeight: 800, color: 'rgba(255,215,0,0.1)', lineHeight: 1, display: 'block', letterSpacing: '-0.04em' }}>
                  {v.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center mb-4 -mt-4">
                  {v.icon === 'speed' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffd700"><path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" /></svg>
                  )}
                  {v.icon === 'verified_user' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffd700"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
                  )}
                  {v.icon === 'workspace_premium' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffd700"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.02em' }}>{v.title}</h3>
                <p className="mt-3" style={{ fontSize: '14px', color: '#d0c6ab', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="bg-[#0e0e0e] py-16 border-t border-[#1c1b1b]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12">
            {credentials.map(c => (
              <div key={c.label} className="text-center" style={{ opacity: 0.5 }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 700, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#131313] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="h-1 w-20 bg-[#ffd700] mx-auto mb-6" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
              Confianza de Nuestros Clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-[1.5rem] bg-[#1c1b1b] p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#ffd700">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#d0c6ab', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,215,0,0.1)' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#e5e2e1' }}>{t.name}</p>
                  <p style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1c1b1b] py-24" style={{ border: '1px solid #2a2a2a' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 text-center">
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
            {nosotrosPage.cta.title}
          </h2>
          <p className="mt-4 mb-10" style={{ fontSize: '16px', color: '#d0c6ab' }}>{nosotrosPage.cta.desc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${business.phoneIntl}`}
              className="rounded-lg px-10 py-5 transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '14px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              {business.phone}
            </a>
            <Link
              href="/template-cerrajero/contacto"
              className="rounded-lg px-10 py-5 transition-all"
              style={{ border: '1px solid #4d4732', color: '#e5e2e1', fontSize: '14px', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
