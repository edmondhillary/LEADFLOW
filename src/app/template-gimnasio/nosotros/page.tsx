import Link from 'next/link';
import { about, images, business } from '../data';

export default function NosotrosPage() {
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Hero */}
      <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-28 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase mb-6 block" style={{ color: '#eb0000', letterSpacing: '0.2em' }}>{about.badge}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.04em' }}>
              {about.heroTitle}
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-base md:text-lg max-w-md" style={{ color: '#ababab', lineHeight: 1.7 }}>{about.heroSubtitle}</p>
          </div>
        </div>
        <div className="mt-12 md:mt-20 w-full overflow-hidden" style={{ height: 'clamp(300px, 45vw, 650px)' }}>
          <img src={images.aboutHero} alt="Instalaciones" className="w-full h-full object-cover grayscale contrast-125" style={{ filter: 'brightness(0.7) grayscale(1) contrast(1.2)' }} />
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 md:py-28 px-6" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="relative group">
            <img src={images.aboutFounder} alt={about.founder.name} className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" style={{ aspectRatio: '4/5', filter: 'brightness(0.8)' }} />
            <div className="absolute bottom-6 right-6 p-5" style={{ backgroundColor: '#eb0000' }}>
              <p className="text-xs font-bold uppercase" style={{ color: '#000', letterSpacing: '0.1em' }}>{about.founder.role}</p>
              <h3 className="text-xl font-black uppercase italic" style={{ fontFamily: "'Epilogue', sans-serif", color: '#000' }}>{about.founder.name}</h3>
            </div>
          </div>
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>La Visión</h2>
            <div className="space-y-6" style={{ color: '#ababab', lineHeight: 1.8 }}>
              <p>{about.founder.bio[0]}</p>
              <p style={{ fontStyle: 'italic', fontFamily: "'Epilogue', sans-serif", color: '#ff8e7d' }}>&ldquo;{about.founder.bio[1]}&rdquo;</p>
            </div>
            <div className="mt-10 flex gap-10">
              {about.founder.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-black" style={{ fontFamily: "'Epilogue', sans-serif", color: '#eb0000' }}>{s.value}</p>
                  <p className="text-xs font-bold uppercase" style={{ color: '#757575', letterSpacing: '0.1em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
            Nuestra <span style={{ color: '#eb0000' }}>Filosofía</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {about.values.map((v, i) => (
            <div key={i} className="p-8 md:p-12 hover:bg-[#131313] transition-colors group" style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span className="text-4xl block mb-8 group-hover:text-[#eb0000] transition-colors" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', color: 'rgba(255,255,255,0.08)' }}>{v.num}.</span>
              <h4 className="text-xl md:text-2xl mb-4" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800 }}>{v.title}</h4>
              <p className="text-sm" style={{ color: '#ababab', lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="mb-16 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div style={{ height: 'clamp(350px, 40vw, 550px)' }}>
            <img src={images.aboutTeam} alt="Equipo" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
          </div>
          <div className="p-12 md:p-20 lg:p-28 flex flex-col justify-center" style={{ backgroundColor: '#131313' }}>
            <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>Especialización</h2>
            <ul className="space-y-6">
              {about.expertise.map((e, i) => (
                <li key={i} className="flex items-start gap-5 pb-5" style={{ borderBottom: i < about.expertise.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span className="material-symbols-outlined" style={{ color: '#eb0000', fontSize: '24px' }}>{e.icon}</span>
                  <div>
                    <h5 className="font-bold mb-1">{e.title}</h5>
                    <p className="text-sm" style={{ color: '#757575' }}>{e.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 text-center" style={{ backgroundColor: '#131313' }}>
        <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
          {about.cta.title}
        </h2>
        <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: '#ababab' }}>{about.cta.desc}</p>
        <Link href="/template-gimnasio/contacto" className="inline-block transition-all active:scale-95" style={{ backgroundColor: '#eb0000', color: '#000', padding: '18px 48px', fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', boxShadow: '0 0 30px rgba(235,0,0,0.3)' }}>
          Reservar Sesión Gratis
        </Link>
      </section>
    </main>
  );
}
