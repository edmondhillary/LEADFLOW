import Link from 'next/link';
import { nosotros, images, business } from '../data';

export default function NosotrosPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Blue Hero */}
      <section className="w-full py-24 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: '#0059bb' }}>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(128,249,139,0.2)', border: '1px solid rgba(128,249,139,0.3)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#80f98b' }}>{nosotros.badge}</span>
              </div>
              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: '20px', lineHeight: 1.05 }}>
                {nosotros.heroTitle}
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '480px' }}>
                {nosotros.heroSubtitle}
              </p>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden" style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)' }}>
              <img src={images.nosotrosHero} alt="PureLinen professional cleaning team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Our Story</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', marginBottom: '24px', lineHeight: 1.1 }}>
                {business.yearsExperience} Years of<br />Clinical-Grade Excellence
              </h2>
              <div className="flex flex-col gap-4" style={{ fontSize: '15px', color: '#414754', lineHeight: 1.8 }}>
                <p>Founded in {business.foundedYear} in New York City, PureLinen started as a small residential cleaning service with a single guiding principle: never cut corners. Our founder believed that truly clean spaces require clinical standards — not just a quick sweep.</p>
                <p>Over the past decade, we have grown into a trusted partner for homeowners, commercial facilities, medical centers, and industrial clients across the New York metro area. Every service we offer reflects our original commitment to precision, sustainability, and reliability.</p>
                <p>Today, our certified team of over 50 professionals handles hundreds of cleaning jobs every month — each one held to the same rigorous standard we set on day one.</p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'Years in Business', icon: 'calendar_today' },
                { value: '5,000+', label: 'Spaces Cleaned', icon: 'cleaning_services' },
                { value: '50+', label: 'Team Members', icon: 'groups' },
                { value: '100%', label: 'Satisfaction Rate', icon: 'verified' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl p-6" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.06)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#e7e8e9' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#0059bb' }}>{stat.icon}</span>
                  </div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '32px', fontWeight: 800, color: '#0059bb', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: '13px', color: '#414754', marginTop: '6px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-[#f3f4f5] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>What Drives Us</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d' }}>
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nosotros.values.map(v => (
              <div key={v.title} className="bg-white rounded-xl p-8" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.04)' }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '48px', fontWeight: 800, color: '#e7e8e9', letterSpacing: '-0.05em', marginBottom: '16px', lineHeight: 1 }}>{v.num}</p>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#191c1d', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#414754', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Our People</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', marginBottom: '20px', lineHeight: 1.1 }}>
                {nosotros.team.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.8, marginBottom: '24px' }}>
                {nosotros.team.desc}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#80f98b]">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#007327' }}>verified</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#007327' }}>{nosotros.team.badge}</span>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.1)' }}>
              <img src={images.cleanerWorking} alt="PureLinen team members" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="w-full bg-[#f3f4f5] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Standards & Trust</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d' }}>
              Certifications & Guarantees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {nosotros.certifications.map(cert => (
              <div key={cert.title} className="bg-white rounded-xl p-6 text-center" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.04)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#80f98b' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#007327' }}>{cert.icon}</span>
                </div>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 700, color: '#191c1d', marginBottom: '6px' }}>{cert.title}</h3>
                <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.5 }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: '#0059bb' }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: '16px' }}>
            {nosotros.cta.title}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            {nosotros.cta.desc}
          </p>
          <Link href="/template-limpieza/contacto" className="inline-block rounded-lg transition-all hover:opacity-90 active:scale-[0.98]" style={{ backgroundColor: '#ffffff', color: '#0059bb', fontSize: '15px', fontWeight: 700, padding: '14px 32px', textDecoration: 'none' }}>
            Request Your Free Quote
          </Link>
        </div>
      </section>

    </div>
  );
}
