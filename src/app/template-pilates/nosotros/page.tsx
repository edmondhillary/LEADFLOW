import Link from 'next/link';
import { business, about, instructors, images } from '../data';

export default function NosotrosPage() {
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden mb-0">
        <div className="absolute inset-0 z-0">
          <img
            src={images.nosotrosHero}
            alt="Kinetic Gallery Studio"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(250,249,246,0.92) 0%, rgba(250,249,246,0.50) 60%, transparent 100%)' }}
          />
        </div>
        <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-8 py-28 md:py-40">
          <div className="max-w-xl">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#536257', display: 'block', marginBottom: '16px' }}>
              {about.badge}
            </span>
            <h1
              className="text-4xl md:text-6xl mb-8"
              style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.12 }}
            >
              {about.heroTitle}
            </h1>
            <p style={{ fontSize: '16px', color: '#5c605c', lineHeight: 1.8, maxWidth: '440px' }}>
              {about.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#faf9f6' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>Our Mission</span>
            <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.15 }}>
              Intelligence in every <span style={{ fontStyle: 'italic' }}>movement.</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#5c605c', lineHeight: 1.8 }}>{about.mission}</p>
            <div className="flex gap-12 mt-12">
              <div>
                <div className="text-3xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#536257' }}>2</div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', marginTop: '4px' }}>Instructors</div>
              </div>
              <div>
                <div className="text-3xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#536257' }}>6</div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', marginTop: '4px' }}>Class Formats</div>
              </div>
              <div>
                <div className="text-3xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#536257' }}>5</div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#5c605c', marginTop: '4px' }}>Days/Week</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-3">
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: '12px' }}>
              <img src={images.studioMain} alt="Studio interior" className="w-full h-full object-cover" />
            </div>
            <div className="mt-12" style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: '12px' }}>
              <img src={images.instructorHands} alt="Instructor detail" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY — 3 PILLARS ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>The Kinetic Philosophy</span>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.15 }}>
              Three principles. <span style={{ fontStyle: 'italic' }}>One practice.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((v) => (
              <div
                key={v.num}
                className="p-8 rounded-xl"
                style={{ backgroundColor: '#ffffff', boxShadow: '0px 24px 48px rgba(47,52,48,0.06)', border: '1px solid rgba(175,179,174,0.15)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#d6e7d8' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#536257' }}>{v.num}</span>
                </div>
                <h3 className="text-xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#5c605c', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSTRUCTORS ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#faf9f6' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>The Instructors</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
              Meet the people who <span style={{ fontStyle: 'italic' }}>guide your practice.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {instructors.map((inst, idx) => {
              const imgSrc = images[inst.image as keyof typeof images] as string;
              return (
                <div key={inst.name} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className={`md:col-span-5 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div style={{ aspectRatio: '3/4', overflow: 'hidden', borderRadius: '12px' }}>
                      <img
                        src={imgSrc}
                        alt={inst.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className={`md:col-span-7 ${idx % 2 === 1 ? 'md:order-1' : ''} flex flex-col justify-center`}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#536257', display: 'block', marginBottom: '8px' }}>
                      {inst.role}
                    </span>
                    <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
                      {inst.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#5c605c', lineHeight: 1.8, marginBottom: '16px' }}>{inst.bio}</p>
                    <div
                      className="py-3 px-4 rounded-lg"
                      style={{ backgroundColor: '#d6e7d8', display: 'inline-block' }}
                    >
                      <p style={{ fontSize: '11px', fontWeight: 600, color: '#536257', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {inst.specialty}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STUDIO SPACE ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#edeeea' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>The Space</span>
              <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
                Designed to support your <span style={{ fontStyle: 'italic' }}>practice.</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#5c605c', lineHeight: 1.8, marginBottom: '12px' }}>
                Our 1,200 sq ft studio at 124 Serenity Lane is outfitted with Balanced Body Reformers, a full Cadillac unit, Wunda Chairs, and a dedicated mat floor.
              </p>
              <p style={{ fontSize: '15px', color: '#5c605c', lineHeight: 1.8 }}>
                Natural light, considered acoustics, and materials chosen for calm create an environment where focus comes naturally.
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-3">
              {[images.studioLobby, images.reformer, images.matClass, images.studioDetails].map((img, i) => (
                <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={img} alt={`Studio ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CREDENTIALS ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#faf9f6' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>Credentials</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
              Held to the highest <span style={{ fontStyle: 'italic' }}>standard.</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {about.credentials.map((cred) => (
              <div
                key={cred}
                className="py-3 px-6 rounded-full"
                style={{ backgroundColor: '#d6e7d8', border: '1px solid rgba(83,98,87,0.15)' }}
              >
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#536257' }}>{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOIN CTA ===== */}
      <section
        className="py-28 md:py-40 px-6 md:px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #536257 0%, #47564b 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(235,252,237,0.65)', display: 'block', marginBottom: '20px' }}>
            Join Us
          </span>
          <h2
            className="text-4xl md:text-6xl mb-8"
            style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, fontStyle: 'italic', color: '#ebfced', lineHeight: 1.15 }}
          >
            Your practice begins with one session.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(235,252,237,0.75)', lineHeight: 1.7, marginBottom: '32px' }}>
            Meet {instructors[0].name} or {instructors[1].name}. Try your first class for $25. See what intentional movement can do.
          </p>
          <Link
            href="/template-pilates/contacto"
            className="inline-block transition-all active:scale-[0.98]"
            style={{ backgroundColor: '#ebfced', color: '#536257', padding: '18px 48px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', borderRadius: '9999px' }}
          >
            Book Your First Session
          </Link>
          <p className="mt-6" style={{ fontSize: '12px', color: 'rgba(235,252,237,0.55)' }}>
            {business.address} · {business.city}, {business.state}
          </p>
        </div>
      </section>
    </main>
  );
}
