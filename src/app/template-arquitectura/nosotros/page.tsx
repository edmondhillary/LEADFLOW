import Link from 'next/link';
import { about, images, business } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-arquitectura';
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Hero */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-28 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#635e57', display: 'block', marginBottom: '20px' }}>{about.badge}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {about.heroTitle.split('excelencia').map((part, i) => (
                <span key={i}>{part}{i === 0 && <span style={{ fontStyle: 'italic' }}>excelencia</span>}</span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-base md:text-lg max-w-md" style={{ color: '#5a615c', lineHeight: 1.7, fontWeight: 300 }}>{about.heroSubtitle}</p>
          </div>
        </div>
        <div className="mt-16 md:mt-24 w-full overflow-hidden" style={{ height: 'clamp(300px, 50vw, 700px)' }}>
          <img src={images.aboutHero} alt="Estudio" className="w-full h-full object-cover grayscale contrast-125" />
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f3f4f0' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative group">
            <div className="absolute -top-8 -left-8 w-48 h-48 hidden md:block" style={{ borderLeft: '1px solid rgba(118,124,119,0.15)', borderTop: '1px solid rgba(118,124,119,0.15)' }} />
            <img src={images.aboutFounder} alt={about.founder.name} className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" style={{ aspectRatio: '4/5', filter: 'brightness(0.9)' }} />
            <div className="absolute bottom-6 right-6 p-6 max-w-xs" style={{ backgroundColor: 'white', boxShadow: '0 20px 40px rgba(46,52,48,0.04)' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', marginBottom: '4px' }}>{about.founder.role}</p>
              <h3 className="text-xl" style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic' }}>{about.founder.name}</h3>
            </div>
          </div>
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430' }}>La Visión Creativa</h2>
            <div className="space-y-6" style={{ color: '#5a615c', lineHeight: 1.8, fontWeight: 300 }}>
              {about.founder.bio.map((p, i) => (
                <p key={i} style={i === 1 ? { fontStyle: 'italic', fontFamily: "'Noto Serif', serif", color: '#2e3430' } : undefined}>{i === 1 ? `"${p}"` : p}</p>
              ))}
            </div>
            <div className="mt-10 flex gap-10">
              {about.founder.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>{s.value}</p>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Methodology */}
      <section className="py-20 md:py-32 px-6 md:px-8 max-w-[1920px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-3xl md:text-5xl lg:w-1/2" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430' }}>
            Nuestra Filosofía y <br /><span style={{ fontStyle: 'italic' }}>Metodología</span>
          </h2>
          <p className="max-w-sm mb-2" style={{ color: '#5a615c', fontWeight: 300 }}>Tratamos cada encargo como un proyecto de investigación sobre la experiencia humana del espacio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderTop: '1px solid rgba(118,124,119,0.1)' }}>
          {about.values.map((v, i) => (
            <div key={i} className="p-8 md:p-12 hover:bg-[#f3f4f0] transition-colors group" style={{ borderRight: i < 2 ? '1px solid rgba(118,124,119,0.1)' : 'none' }}>
              <span className="text-3xl md:text-4xl block mb-8 group-hover:text-[#5f5e5e] transition-colors" style={{ fontFamily: "'Noto Serif', serif", color: 'rgba(118,124,119,0.2)' }}>{v.num}.</span>
              <h4 className="text-xl md:text-2xl mb-4" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>{v.title}</h4>
              <p style={{ fontSize: '14px', color: '#5a615c', lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div style={{ height: 'clamp(400px, 40vw, 600px)' }}>
            <img src={images.aboutTeam} alt="Equipo" className="w-full h-full object-cover" />
          </div>
          <div className="p-12 md:p-20 lg:p-28 flex flex-col justify-center" style={{ backgroundColor: '#0d0f0d', color: '#faf7f6' }}>
            <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Noto Serif', serif" }}>Especialización Técnica</h2>
            <ul className="space-y-6">
              {about.expertise.map((e, i) => (
                <li key={i} className="flex items-start gap-5 pb-5" style={{ borderBottom: i < about.expertise.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <span className="material-symbols-outlined" style={{ color: '#767c77', fontSize: '24px' }}>{e.icon}</span>
                  <div>
                    <h5 className="text-base font-medium mb-1">{e.title}</h5>
                    <p className="text-sm" style={{ color: '#5a615c', fontWeight: 300 }}>{e.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 px-6 md:px-8 text-center" style={{ backgroundColor: '#e5e9e4' }}>
        <h2 className="text-4xl md:text-6xl mb-8" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', letterSpacing: '-0.02em' }}>
          {about.cta.title.split('diálogo').map((part, i) => (
            <span key={i}>{part}{i === 0 && <span style={{ fontStyle: 'italic' }}>diálogo</span>}</span>
          ))}
        </h2>
        <Link href={`${baseHref}/contacto`} className="inline-block transition-all active:scale-[0.98]" style={{ backgroundColor: '#5f5e5e', color: '#faf7f6', padding: '18px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>
          Consultar Sobre Tu Proyecto
        </Link>
      </section>
    </main>
  );
}
