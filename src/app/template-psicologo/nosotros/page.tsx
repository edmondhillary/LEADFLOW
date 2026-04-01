import Link from 'next/link';
import { business, aboutPage, credentials, images } from '../data';

export default function NosotrosPage() {
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-8 overflow-hidden" style={{ backgroundColor: '#536066' }}>
        <div className="absolute inset-0 z-0">
          <img src={images.nosotrosHero} alt="Espacio terapéutico" className="w-full h-full object-cover" style={{ filter: 'brightness(0.25) saturate(0.5)' }} />
        </div>
        <div className="relative z-10 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8" style={{ backgroundColor: 'rgba(220,230,210,0.2)', color: '#dce6d2', letterSpacing: '0.2em', border: '1px solid rgba(220,230,210,0.3)' }}>
              {aboutPage.badge}
            </span>
            <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {aboutPage.heroTitle}
            </h1>
            <p className="text-lg leading-[1.7]" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '560px' }}>
              {aboutPage.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ===== DR. ELENA BIO ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          <div className="md:col-span-5">
            <img src={images.drPortrait} alt="Dra. Elena Sterling" className="w-full rounded-2xl object-cover" style={{ aspectRatio: '3/4', boxShadow: '0 20px 40px rgba(26,28,27,0.1)' }} />
          </div>

          <div className="md:col-span-7 md:pl-6">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '16px' }}>La Psicóloga</span>
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.2 }}>
              {business.psicóloga}
            </h2>

            <div className="space-y-5 mb-10">
              {aboutPage.drBio.map((para, idx) => (
                <p key={idx} style={{ fontSize: idx === 2 ? '16px' : '15px', color: idx === 2 ? '#586152' : '#454841', lineHeight: 1.7, fontStyle: idx === 2 ? 'italic' : 'normal', fontFamily: idx === 2 ? "'Noto Serif', serif" : 'inherit' }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Credentials */}
            <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: '#f4f4f2' }}>
              <h3 className="mb-4" style={{ fontSize: '11px', fontWeight: 700, color: '#1a1c1b', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Formación y Credenciales</h3>
              <div className="space-y-2">
                {aboutPage.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#dce6d2' }}>
                      <span style={{ fontSize: '10px', color: '#586152' }}>✓</span>
                    </span>
                    <span style={{ fontSize: '13px', color: '#454841' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif', serif", color: '#586152' }}>{business.yearsExperience}+</p>
                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#454841', marginTop: '4px' }}>Años de Experiencia</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif', serif", color: '#a7b19f' }}>500+</p>
                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#454841', marginTop: '4px' }}>Pacientes Atendidos</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif', serif", color: '#586152' }}>3</p>
                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#454841', marginTop: '4px' }}>Enfoques Integrados</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== VALUES / PHILOSOPHY ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Filosofía</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
              Nuestros <span style={{ fontStyle: 'italic' }}>valores</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutPage.values.map((v, idx) => (
              <div key={idx} className="p-10 rounded-xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <span className="text-5xl font-bold block mb-6" style={{ fontFamily: "'Noto Serif', serif", color: '#dce6d2' }}>{v.num}</span>
                <h3 className="text-xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM VALUES BENTO ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

          <div className="md:col-span-8 p-10 rounded-2xl flex flex-col justify-end" style={{ backgroundColor: '#dce6d2', minHeight: '320px', backgroundImage: `url(${images.therapyRoom})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(249,249,247,0.92)', backdropFilter: 'blur(8px)' }}>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>Espacio terapéutico</h3>
              <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.6 }}>Un entorno diseñado para la calma y la apertura. Cada detalle pensado para que te sientas seguro.</p>
            </div>
          </div>

          <div className="md:col-span-4 p-10 rounded-2xl flex flex-col justify-between" style={{ backgroundColor: '#586152' }}>
            <span style={{ fontFamily: "'Noto Serif', serif", fontSize: '48px', fontStyle: 'italic', color: 'rgba(255,255,255,0.2)' }}>&ldquo;</span>
            <div>
              <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '18px', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.5, marginBottom: '16px' }}>
                {business.quote}
              </p>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)' }}>— {business.psicóloga}</p>
            </div>
          </div>

          <div className="md:col-span-4 p-10 rounded-2xl" style={{ backgroundColor: '#e8e2d9' }}>
            <p className="text-4xl font-bold mb-2" style={{ fontFamily: "'Noto Serif', serif", color: '#494640' }}>{business.foundedYear}</p>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#494640', marginBottom: '16px' }}>Año de fundación</p>
            <p style={{ fontSize: '14px', color: '#494640', lineHeight: 1.7 }}>Más de una década acompañando procesos de cambio profundo y duradero en Madrid.</p>
          </div>

          <div className="md:col-span-8 p-10 rounded-2xl" style={{ backgroundColor: '#eeeeec' }}>
            <h3 className="text-2xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>Compromiso ético</h3>
            <p className="mb-6 leading-[1.7]" style={{ fontSize: '15px', color: '#454841' }}>
              Trabajamos bajo los más altos estándares éticos del Colegio Oficial de Psicólogos. La confidencialidad, el respeto y la no-maleficencia son principios irrenunciables.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Confidencialidad total', 'Código deontológico COPM', 'Formación continua', 'Supervisión clínica'].map((tag, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#ffffff', color: '#586152', fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-16 md:py-24 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2', borderTop: '1px solid #e2e3e1' }}>
        <div className="max-w-[1920px] mx-auto">
          <p className="text-center mb-10" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#a7b19f' }}>Acreditaciones & Formación</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {aboutPage.certifications.map((cert, idx) => (
              <div key={idx} className="px-6 py-3 rounded-full" style={{ backgroundColor: '#e8e8e6', border: '1px solid #c5c7bf' }}>
                <span style={{ fontSize: '12px', color: '#454841', fontWeight: 500 }}>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#536066' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-2xl mx-auto text-center p-12 rounded-[2rem]" style={{ backgroundColor: '#ffffff' }}>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.2 }}>
              {aboutPage.cta.title}
            </h2>
            <p className="mb-8 leading-[1.7]" style={{ fontSize: '15px', color: '#454841' }}>
              {aboutPage.cta.desc}
            </p>
            <Link href="/template-psicologo/contacto" className="inline-block rounded-lg transition-all active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #586152, #a7b19f)', color: '#ffffff', padding: '16px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
              Reservar Consulta Inicial
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
