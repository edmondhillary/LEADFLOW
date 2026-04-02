import Link from 'next/link';
import { about, images, business } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-pintor';
  return (
    <main style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* Hero */}
      <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-24 pt-8 md:pt-16">
        <span className="uppercase tracking-widest text-xs text-[#5a6061] mb-4 block" style={{ fontFamily: "'Manrope', sans-serif" }}>{about.badge}</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-teal-900 leading-tight tracking-tight max-w-4xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
          {about.heroTitle}
        </h1>
        <p className="mt-6 text-lg text-[#5a6061] max-w-xl leading-relaxed font-light">{about.heroSubtitle}</p>
      </section>

      {/* Founder */}
      <section className="bg-[#f2f4f4] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <img src={images.aboutFounder} alt={about.founder.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 md:right-10 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <p className="text-xs text-[#5a6061] uppercase tracking-widest mb-1">{about.founder.role}</p>
              <h3 className="text-xl font-bold text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>{about.founder.name}</h3>
            </div>
          </div>
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>La Visión</h2>
            <div className="space-y-6 text-[#5a6061] leading-relaxed">
              <p>{about.founder.bio[0]}</p>
              <p className="italic text-teal-800 border-l-2 border-[#c0ebea] pl-6">&ldquo;{about.founder.bio[1]}&rdquo;</p>
            </div>
            <div className="mt-10 flex gap-10">
              {about.founder.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-bold text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>{s.value}</p>
                  <p className="text-xs text-[#5a6061] uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-12" style={{ fontFamily: "'Manrope', sans-serif" }}>Nuestro Proceso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {about.values.map((v, i) => (
            <div key={i} className="bg-[#f2f4f4] p-8 md:p-10 rounded-xl hover:shadow-md transition-shadow">
              <span className="text-3xl font-extrabold text-[#adb3b4]/30 block mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>{v.num}.</span>
              <h4 className="text-xl font-bold text-teal-900 mb-3" style={{ fontFamily: "'Manrope', sans-serif" }}>{v.title}</h4>
              <p className="text-sm text-[#5a6061] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[350px] md:h-[500px]">
            <img src={images.aboutTeam} alt="Equipo" className="w-full h-full object-cover" />
          </div>
          <div className="bg-[#3d6565] p-12 md:p-20 flex flex-col justify-center text-[#d9fffe]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>El Equipo</h2>
            <p className="text-[#c0ebea] leading-relaxed mb-8">
              Un equipo de maestros pintores, técnicos en acabados y asesores cromáticos que comparten la pasión por transformar espacios en obras de arte habitables.
            </p>
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(192,235,234,0.2)' }}>
              <span className="material-symbols-outlined">verified</span>
              <span className="text-sm font-medium">Certificados en acabados de alta gama</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-bold text-teal-900 mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>{about.cta.title}</h3>
        <p className="text-[#5a6061] mb-10">{about.cta.desc}</p>
        <Link href={`${baseHref}/contacto`} className="inline-block text-[#d9fffe] px-10 py-4 rounded-md font-bold text-lg shadow-lg transition-all active:scale-95" style={{ background: 'linear-gradient(135deg, #3d6565, #315959)', textDecoration: 'none' }}>
          Solicitar Presupuesto
        </Link>
      </section>
    </main>
  );
}
