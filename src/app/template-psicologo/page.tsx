import Link from 'next/link';
import { business, hero, specializations, benefits, process, testimonials, images, credentials } from './data';

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen py-20 md:py-0 md:flex md:items-center overflow-hidden" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto w-full px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center py-16 md:py-24">

          {/* Left — Text */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#dce6d2', color: '#586152', letterSpacing: '0.2em' }}>
                {hero.badge}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {hero.titleLine1}<br />
              <span style={{ fontStyle: 'italic', color: '#586152' }}>en {hero.titleItalic}</span>
            </h1>
            <p className="text-base md:text-lg mb-10 max-w-lg leading-[1.7]" style={{ color: '#454841' }}>
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/template-psicologo/contacto" className="inline-block text-center transition-all active:scale-[0.98] rounded-lg" style={{ background: 'linear-gradient(135deg, #586152, #a7b19f)', color: '#ffffff', padding: '16px 36px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
                {hero.ctaPrimary}
              </Link>
              <Link href="/template-psicologo/servicios" className="inline-block text-center transition-all active:scale-[0.98] rounded-lg" style={{ border: '1.5px solid #a7b19f', color: '#586152', padding: '16px 36px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
                {hero.ctaSecondary}
              </Link>
            </div>
            {/* Quick credentials */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#586152' }} />
                <span style={{ fontSize: '12px', color: '#454841', fontWeight: 500 }}>{credentials.college}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a7b19f' }} />
                <span style={{ fontSize: '12px', color: '#454841', fontWeight: 500 }}>{business.yearsExperience}+ años</span>
              </div>
            </div>
          </div>

          {/* Right — Image + floating card */}
          <div className="md:col-span-6 lg:col-span-7 relative">
            <div className="relative" style={{ transform: 'rotate(1.5deg)' }}>
              <img
                src={images.heroBg}
                alt="Dra. Elena Sterling, psicóloga clínica"
                className="w-full object-cover rounded-2xl"
                style={{ aspectRatio: '4/5', maxHeight: '600px', boxShadow: '0 20px 40px rgba(26,28,27,0.12)' }}
              />
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-6 -left-4 md:-left-10 max-w-xs p-6 rounded-2xl" style={{ backgroundColor: '#e8e2d9', boxShadow: '0 12px 32px rgba(26,28,27,0.1)', transform: 'rotate(-1deg)' }}>
              <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '14px', fontStyle: 'italic', color: '#494640', lineHeight: 1.6, marginBottom: '8px' }}>
                {hero.floatingQuote}
              </p>
              <p style={{ fontSize: '10px', color: '#586152', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{hero.floatingAuthor}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ===== AREAS OF SUPPORT ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Áreas de Acompañamiento</span>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.15 }}>
              ¿En qué podemos <span style={{ fontStyle: 'italic', color: '#586152' }}>ayudarte?</span>
            </h2>
          </div>

          {/* Bento grid — 3 top, 2 bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {specializations.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="group p-8 rounded-xl transition-all duration-300 hover:shadow-lg cursor-default" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6 transition-colors duration-300" style={{ backgroundColor: spec.bg }}>
                  {spec.icon}
                </div>
                <h3 className="text-xl mb-3" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{spec.title}</h3>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{spec.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specializations.slice(3).map((spec, idx) => (
              <div key={idx} className="group p-8 rounded-xl transition-all duration-300 hover:shadow-lg cursor-default" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6 transition-colors duration-300" style={{ backgroundColor: spec.bg }}>
                  {spec.icon}
                </div>
                <h3 className="text-xl mb-3" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{spec.title}</h3>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8 overflow-hidden" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left — image with glow */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(88,97,82,0.15) 0%, transparent 70%)' }} />
            <img
              src={images.therapyRoom}
              alt="Sala de terapia serena"
              className="w-full object-cover rounded-2xl relative z-10"
              style={{ aspectRatio: '4/5', transform: 'rotate(-1deg)', boxShadow: '0 20px 40px rgba(26,28,27,0.08)' }}
            />
          </div>

          {/* Right — numbered list */}
          <div className="md:col-span-6 md:col-start-7">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Lo que ganarás</span>
            <h2 className="text-3xl md:text-5xl mb-12" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.15 }}>
              Beneficios del <span style={{ fontStyle: 'italic' }}>proceso terapéutico</span>.
            </h2>
            <div className="space-y-10">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex gap-6">
                  <span className="text-4xl md:text-5xl font-bold shrink-0" style={{ fontFamily: "'Noto Serif', serif", color: '#dce6d2', lineHeight: 1 }}>{b.num}</span>
                  <div>
                    <h3 className="text-xl mb-2" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{b.title}</h3>
                    <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ===== DR. ELENA PREVIEW ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-7 p-10 md:p-14 rounded-2xl flex flex-col justify-center" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(26,28,27,0.04)' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '16px' }}>Quién te acompaña</span>
              <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.2 }}>
                {business.psicóloga}
              </h2>
              <p className="mb-8 leading-[1.7]" style={{ fontSize: '16px', color: '#454841' }}>
                Doctora en Psicología Clínica con más de 15 años de experiencia acompañando procesos de cambio. Su enfoque integrador combina rigor científico con calidez humana para crear un espacio de sanación genuino.
              </p>
              <div className="space-y-3 mb-8">
                {[credentials.degree, credentials.college, credentials.experience, credentials.speciality].map((cred, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#dce6d2' }}>
                      <span style={{ fontSize: '10px', color: '#586152' }}>✓</span>
                    </span>
                    <span style={{ fontSize: '13px', color: '#454841' }}>{cred}</span>
                  </div>
                ))}
              </div>
              <Link href="/template-psicologo/nosotros" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#586152', textDecoration: 'none', borderBottom: '1.5px solid #a7b19f', paddingBottom: '4px', alignSelf: 'flex-start' }}>
                Conocer Más
              </Link>
            </div>
            <div className="md:col-span-5">
              <img
                src={images.drPortrait}
                alt="Dra. Elena Sterling"
                className="w-full h-full object-cover rounded-2xl"
                style={{ minHeight: '400px', boxShadow: '0 20px 40px rgba(26,28,27,0.08)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>El Proceso</span>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.15 }}>
              Tu camino hacia <span style={{ fontStyle: 'italic', color: '#586152' }}>el bienestar</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 transition-colors duration-300 group-hover:bg-[#586152]" style={{ backgroundColor: '#dce6d2' }}>
                  {step.icon}
                </div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a7b19f', display: 'block', marginBottom: '8px' }}>{step.num}</span>
                <h3 className="text-xl mb-3" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7, maxWidth: '280px', margin: '0 auto' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#536066' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="p-10 md:p-16 rounded-[3rem]" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 60px rgba(26,28,27,0.15)' }}>
              <div className="text-center mb-12">
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Experiencias</span>
                <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.2 }}>
                  Lo que dicen quienes <span style={{ fontStyle: 'italic' }}>ya dieron el paso</span>.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {testimonials.map((t, idx) => (
                  <blockquote key={idx}>
                    <p className="text-lg mb-6" style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', color: '#454841', lineHeight: 1.6 }}>&ldquo;{t.text}&rdquo;</p>
                    <footer className="flex items-center gap-4">
                      <div className="w-8 h-[1px]" style={{ backgroundColor: '#a7b19f' }} />
                      <div>
                        <cite style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#1a1c1b', fontStyle: 'normal', display: 'block' }}>{t.name}</cite>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#586152', marginTop: '2px', display: 'block' }}>{t.role}</span>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/template-psicologo/contacto" className="inline-block rounded-lg transition-all active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #586152, #a7b19f)', color: '#ffffff', padding: '16px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
                  Reservar Primera Sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
