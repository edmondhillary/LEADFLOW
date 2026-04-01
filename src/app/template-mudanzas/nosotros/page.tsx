import Link from 'next/link';
import { nosotros, images, business } from '../data';

export default function NosotrosPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa' }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative py-32 overflow-hidden"
        style={{ backgroundColor: '#002046' }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images.nosotrosHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.14,
            filter: 'grayscale(100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,32,70,0.95) 50%, rgba(0,32,70,0.70) 100%)',
          }}
        />

        <div className="relative z-10 px-6 md:px-10 max-w-[1440px] mx-auto">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#87a0cd',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '16px',
            }}
          >
            {nosotros.badge}
          </p>
          <h1
            className="max-w-2xl"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              marginBottom: '24px',
            }}
          >
            {nosotros.heroTitle}
          </h1>
          <p
            className="max-w-xl"
            style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
            }}
          >
            {nosotros.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── COMPANY STORY ────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#44474e',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '14px',
              }}
            >
              Our Story
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 800,
                color: '#191c1d',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '28px',
              }}
            >
              Built on training.<br />Grown on trust.
            </h2>
            {nosotros.story.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: '15px',
                  color: '#44474e',
                  lineHeight: 1.75,
                  marginBottom: '16px',
                }}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 32px 64px rgba(0,32,70,0.12)' }}
            >
              <img
                src={images.moverWorking}
                alt="Kinetic Editorial Moving team"
                className="w-full object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
            {/* Floating stat */}
            <div
              className="absolute -bottom-6 -right-6 rounded-2xl px-6 py-5"
              style={{
                backgroundColor: '#002046',
                boxShadow: '0 20px 40px rgba(0,32,70,0.20)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {business.totalMoves}
              </p>
              <p style={{ fontSize: '12px', color: '#87a0cd', marginTop: '4px' }}>
                Successful Moves
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#44474e',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              Our Values
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#191c1d',
                letterSpacing: '-0.03em',
              }}
            >
              What we stand for.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nosotros.values.map((val) => (
              <div
                key={val.num}
                className="rounded-2xl p-8"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,32,70,0.05)' }}
              >
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#ef8300',
                    letterSpacing: '0.12em',
                    marginBottom: '16px',
                  }}
                >
                  {val.num}
                </p>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#191c1d',
                    letterSpacing: '-0.02em',
                    marginBottom: '12px',
                  }}
                >
                  {val.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#44474e', lineHeight: 1.7 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM STATS BENTO ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#44474e',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '12px',
            }}
          >
            By the Numbers
          </p>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 800,
              color: '#191c1d',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            The team behind the move.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nosotros.teamStats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-8 flex flex-col justify-center items-center text-center"
              style={{
                backgroundColor: i === 0 ? '#002046' : '#ffffff',
                boxShadow: '0 4px 24px rgba(0,32,70,0.06)',
                minHeight: '160px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '36px',
                  fontWeight: 800,
                  color: i === 0 ? '#ffffff' : '#191c1d',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: i === 0 ? '#87a0cd' : '#44474e',
                  marginTop: '8px',
                  letterSpacing: '0.05em',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AWARDS & CERTIFICATIONS ──────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: '#edeeef' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <p
            className="text-center"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#44474e',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '24px',
            }}
          >
            Certifications &amp; Recognition
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {nosotros.certifications.map((cert) => (
              <div
                key={cert}
                className="rounded-xl px-6 py-4 flex items-center gap-3"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,32,70,0.05)' }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#002046' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#191c1d',
                  }}
                >
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div
          className="relative rounded-[2rem] overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: '#002046' }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${images.nosotrosHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.08,
            }}
          />
          <div className="relative z-10">
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              Join 2,000+ satisfied customers.
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.60)',
                marginBottom: '36px',
                maxWidth: '440px',
                margin: '0 auto 36px',
              }}
            >
              Experience the Kinetic difference. Get your free quote today.
            </p>
            <Link
              href="/template-mudanzas/contacto"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: '#552b00',
                color: '#ffffff',
                padding: '15px 36px',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
