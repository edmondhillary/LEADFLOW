import Image from 'next/image';
import Link from 'next/link';
import { business, nosotrosPage, images } from '../data';

export default function NosotrosPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Hero — blue secondary */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#3a5f94' }}>
        <div className="absolute inset-0 opacity-10">
          <Image
            src={images.nosotrosHero}
            alt="ArcticStream technician team"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#9fc2fe', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{nosotrosPage.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '800px', marginBottom: '20px' }}>
            {nosotrosPage.heroTitle}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: '600px' }}>
            {nosotrosPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section style={{ backgroundColor: '#1b1b1d' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 px-6 md:px-8 max-w-[1920px] mx-auto divide-x divide-white/10">
          {nosotrosPage.stats.map(s => (
            <div key={s.label} className="py-8 px-6 text-center">
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '28px', fontWeight: 800, color: '#9fc2fe', letterSpacing: '-0.03em' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-24" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Our Story</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '24px' }}>
                {business.yearsExperience}+ years serving Austin
              </h2>
              <div className="flex flex-col gap-5">
                {nosotrosPage.story.map((para, i) => (
                  <p key={i} style={{ fontSize: '15px', color: '#414754', lineHeight: 1.75 }}>{para}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}>
              <Image
                src={images.nosotrosHero}
                alt="ArcticStream team at work"
                width={800}
                height={520}
                className="w-full object-cover"
                style={{ height: '460px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ backgroundColor: '#f6f3f5' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Our Values</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em' }}>
              Three pillars of our practice
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nosotrosPage.values.map(v => (
              <div
                key={v.num}
                className="rounded-xl p-8"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}
              >
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '64px', fontWeight: 800, color: 'rgba(141,75,0,0.08)', lineHeight: 1, marginBottom: '-12px' }}>{v.num}</p>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1b1b1d', marginBottom: '12px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#414754', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NATE Certifications */}
      <section className="py-24" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#3a5f94', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Credentials</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                NATE certified and fully licensed
              </h2>
              <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, marginBottom: '32px' }}>
                Every ArcticStream technician holds NATE certification — the industry&apos;s most rigorous and respected credential. Our certifications demonstrate real competency, not just on-the-job experience.
              </p>
              <div className="flex flex-col gap-4">
                {nosotrosPage.certifications.map(cert => (
                  <div key={cert.name} className="flex gap-4 items-start">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #3a5f94 0%, #294f83 100%)' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#ffffff', fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1b1b1d', marginBottom: '2px' }}>{cert.name}</p>
                      <p style={{ fontSize: '13px', color: '#717786' }}>{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}>
              <Image
                src={images.techPanel}
                alt="Technical panel and certification"
                width={800}
                height={520}
                className="w-full object-cover"
                style={{ height: '460px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ backgroundColor: '#eae7ea' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto text-center">
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>The Team</p>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '12px' }}>
            {nosotrosPage.team.title}
          </h2>
          <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 24px' }}>
            {nosotrosPage.team.desc}
          </p>
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ backgroundColor: 'rgba(58,95,148,0.1)', border: '1px solid rgba(58,95,148,0.2)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#3a5f94', fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#3a5f94' }}>{nosotrosPage.team.badge}</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="rounded-2xl p-12 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
              {nosotrosPage.cta.title}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
              {nosotrosPage.cta.desc}
            </p>
            <Link
              href="/template-aire/contacto"
              className="inline-flex items-center justify-center rounded-md transition-all hover:bg-white/90"
              style={{ backgroundColor: '#ffffff', color: '#8d4b00', fontSize: '14px', fontWeight: 700, padding: '14px 36px', textDecoration: 'none' }}
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
