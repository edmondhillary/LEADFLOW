import Link from 'next/link';
import { business, hero, services, stats, testimonials, credentials, images } from './data';

export default function CerrajeroHome() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative bg-[#131313] overflow-hidden"
        style={{ background: 'radial-gradient(circle at top right, rgba(255,215,0,0.08) 0%, transparent 60%), #131313' }}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            {/* Left col */}
            <div className="md:col-span-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-2 mb-8">
                <span className="animate-pulse w-2 h-2 bg-[#ffd700] rounded-full" />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{hero.badge}</span>
              </div>

              {/* Headline */}
              <h1
                className="mb-6 leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}
              >
                Cerrajero urgente en{' '}
                <span style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {hero.titleHighlight}
                </span>{' '}
                24 horas
              </h1>

              <p className="mb-10 max-w-xl" style={{ fontSize: '17px', color: '#d0c6ab', lineHeight: 1.7 }}>
                {hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="inline-flex items-center gap-2 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '14px', fontWeight: 700, padding: '16px 32px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.12-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                  {hero.ctaPrimary}
                </a>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="inline-flex items-center gap-3 rounded-lg border transition-all hover:border-[#ffd700] hover:text-[#ffd700]"
                  style={{ borderColor: '#4d4732', color: '#e5e2e1', fontSize: '14px', fontWeight: 600, padding: '16px 32px', textDecoration: 'none' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.12-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                  {hero.ctaSecondary}
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6">
                {hero.trustBadges.map(badge => (
                  <div key={badge.label} className="flex items-center gap-2">
                    <span style={{ color: '#ffd700', fontSize: '16px' }}>
                      {badge.icon === 'schedule' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg>
                      )}
                      {badge.icon === 'verified_user' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
                      )}
                      {badge.icon === 'security' && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
                      )}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#d0c6ab' }}>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col — image + floating card */}
            <div className="md:col-span-2 relative">
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden">
                <img
                  src={images.heroLock}
                  alt="Cerrajero profesional Madrid"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(19,19,19,0.3)' }} />
              </div>
              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -left-6 bg-[#353535] rounded-2xl p-5 shadow-xl"
                style={{ boxShadow: '0 24px 24px rgba(255,215,0,0.08)' }}
              >
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '32px', fontWeight: 800, color: '#ffd700', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  {hero.statCard.value}
                </p>
                <p style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                  {hero.statCard.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#1c1b1b] py-8 border-t border-b border-[#2a2a2a]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.value}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 800, color: '#ffd700', letterSpacing: '-0.04em' }}>{s.value}</p>
                <p style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES BENTO ── */}
      <section className="bg-[#0e0e0e] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="mb-12">
            <div className="h-1 w-20 bg-[#ffd700] mb-6" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
              Servicios de Cerrajería
            </h2>
            <p className="mt-4 max-w-2xl" style={{ fontSize: '16px', color: '#d0c6ab', lineHeight: 1.7 }}>
              Apertura de urgencias, cambio de cerraduras y sistemas de seguridad. Disponibles 24h en toda Madrid.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Featured — col-span-2 with image overlay */}
            <div className="md:col-span-2 relative rounded-[1.5rem] overflow-hidden min-h-[300px] group">
              <img
                src={images.techWorking}
                alt="Apertura sin daños"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(19,19,19,0.75)' }} />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#ffd700', color: '#3a3000' }}>URGENCIAS 24H</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.03em' }}>{services[0].name}</h3>
                <p className="mt-2" style={{ fontSize: '14px', color: '#d0c6ab', lineHeight: 1.6 }}>{services[0].desc}</p>
                <a href={`tel:${business.phoneIntl}`} className="mt-6 inline-flex items-center gap-2 transition-colors hover:text-[#ffd700]" style={{ fontSize: '12px', fontWeight: 600, color: '#ffd700', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Llamar Ahora
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
                </a>
              </div>
            </div>

            {/* Cambio Cerraduras */}
            <div className="rounded-[1.5rem] bg-[#1c1b1b] p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M12 1C8.676 1 6 3.676 6 7v2H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 9a2 2 0 0 1 1 3.732V17a1 1 0 0 1-2 0v-1.268A2 2 0 0 1 12 12z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em' }}>{services[1].name}</h3>
                <p className="mt-2" style={{ fontSize: '13px', color: '#d0c6ab', lineHeight: 1.6 }}>{services[1].desc}</p>
              </div>
              <Link href="/template-cerrajero/servicios" className="mt-6 text-xs font-semibold uppercase tracking-widest transition-colors hover:text-[#ffd700]" style={{ color: '#ffd700', textDecoration: 'none' }}>
                Ver detalles
              </Link>
            </div>

            {/* Cierres Locales — border accent */}
            <div className="rounded-[1.5rem] bg-[#1c1b1b] p-8 border-l-4 border-[#ffd700]">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em' }}>{services[2].name}</h3>
              <p className="mt-3" style={{ fontSize: '13px', color: '#d0c6ab', lineHeight: 1.6 }}>{services[2].desc}</p>
              <Link href="/template-cerrajero/servicios" className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest transition-colors hover:text-[#ffd700]" style={{ color: '#ffd700', textDecoration: 'none' }}>
                Saber más
              </Link>
            </div>

            {/* CTA Banner — col-span-2 */}
            <div
              className="md:col-span-2 rounded-[1.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)' }}
            >
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 800, color: '#3a3000', letterSpacing: '-0.03em' }}>
                  Urgencia ahora mismo?
                </p>
                <p style={{ fontSize: '14px', color: '#5a4a00', marginTop: '4px' }}>Llegamos en 20 minutos. Precio cerrado antes de empezar.</p>
              </div>
              <a
                href={`tel:${business.phoneIntl}`}
                className="flex-shrink-0 rounded-lg px-8 py-4 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: '#3a3000', color: '#ffd700', fontSize: '13px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}
              >
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#131313] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="mb-12">
            <div className="h-1 w-20 bg-[#ffd700] mb-6" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-[1.5rem] bg-[#1c1b1b] p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#ffd700">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: '#d0c6ab', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,215,0,0.1)' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#e5e2e1' }}>{t.name}</p>
                  <p style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="bg-[#131313] py-24 border-t border-[#2a2a2a]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 text-center">
          {/* Big icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center" style={{ boxShadow: '0 0 40px rgba(255,215,0,0.15)' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffd700">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
            CALIDAD SENTINEL GARANTIZADA
          </h2>
          <p className="mt-6 max-w-2xl mx-auto" style={{ fontSize: '16px', color: '#d0c6ab', lineHeight: 1.8 }}>
            Todos nuestros trabajos incluyen garantía escrita, factura oficial con IVA y atención posventa. Precio cerrado antes de empezar: sin sorpresas, sin cargos ocultos.
          </p>

          {/* Credentials row */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
            {credentials.map(c => (
              <span
                key={c.label}
                style={{ fontSize: '13px', fontWeight: 700, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.5 }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
