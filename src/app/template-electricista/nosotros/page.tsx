import Link from 'next/link';
import { stats, precisionProtocol, credentials, expertiseData, images, business } from '../data';

export default function NosotrosPage() {
  return (
    <>
      {/* ─── HERO (dark) ─── */}
      <section className="relative min-h-[716px] flex items-center overflow-hidden bg-[#1c1b1b]">
        <div className="absolute inset-0 opacity-40">
          <img
            src={images.teamHero}
            alt="Equipo de electricistas profesionales"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #1c1b1b 50%, #1c1b1b80 70%, transparent 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 py-24 w-full">
          <div className="md:col-span-8">
            <div className="inline-block bg-[#705d00] px-3 py-1 mb-6">
              <span className="text-[#ffd700] font-bold tracking-[0.2em] text-xs uppercase">Precision Engineered</span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-8 uppercase">
              Expertos Locales <br />
              <span className="text-[#ffd700]">de Confianza</span>{' '}
              <br />
              desde {business.founded}.
            </h1>
            <p className="text-[#e5e2e1] text-lg max-w-xl leading-relaxed font-light">
              Volt Precision Electrical ofrece soluciones de nivel industrial para el sector residencial y comercial. Nuestra base se construye sobre quince años de estándares de seguridad inamovibles y maestría técnica.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STATS BENTO ─── */}
      <section className="py-0 relative z-20 -mt-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-8 border-b-4 shadow-lg flex flex-col justify-between min-h-[120px] ${
                i % 2 === 0
                  ? 'bg-white border-[#705d00]'
                  : 'bg-zinc-900 border-transparent'
              }`}
            >
              <span
                className={`font-black text-4xl md:text-5xl ${i % 2 === 0 ? 'text-[#705d00]' : 'text-[#ffd700]'}`}
              >
                {stat.value}
              </span>
              <span
                className={`font-bold uppercase tracking-widest text-xs ${i % 2 === 0 ? 'text-[#1c1b1b]' : 'text-zinc-400'}`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRECISION PROTOCOL ─── */}
      <section className="py-24 bg-[#f6f3f2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <div>
              <h2 className="text-[#1c1b1b] text-4xl font-extrabold tracking-tighter uppercase mb-12 flex items-center gap-4">
                <span className="h-1 w-12 bg-[#705d00]" />
                The Precision Protocol
              </h2>
              <div className="space-y-12">
                {precisionProtocol.map((rule) => (
                  <div key={rule.num} className="group">
                    <span className="block text-[#705d00] font-bold text-xs tracking-widest uppercase mb-2">Regla {rule.num}</span>
                    <h3 className="text-2xl font-bold mb-4">{rule.title}</h3>
                    <p className="text-[#5f5e5e] leading-relaxed">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-[#e5e2e1] overflow-hidden shadow-2xl relative">
                <img
                  src={images.circuitPanel}
                  alt="Panel de cuadro eléctrico moderno"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 right-0 bg-[#ffd700] p-8 m-0">
                  <span className="material-symbols-outlined text-[#705e00] text-4xl">verified_user</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS ─── */}
      <section className="py-16 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">
            Certified Compliance &amp; Standards
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
            {credentials.map((cred) => (
              <div key={cred} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-4xl">bolt</span>
                <span className="font-black text-xl">{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCAL LEADERSHIP ─── */}
      <section className="py-24 bg-[#fcf9f8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Image */}
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="aspect-square bg-zinc-100 overflow-hidden relative">
                <img
                  src={images.copperWiring}
                  alt="Cableado de cobre de alta calidad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="md:col-span-7 order-1 md:order-2 pl-0 md:pl-16">
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-8 leading-none text-[#1c1b1b]">
                Liderazgo Técnico <br /> Local.
              </h2>
              <p className="text-[#5f5e5e] mb-8 leading-relaxed">
                Con base en el corazón de Madrid, Volt Precision lleva {new Date().getFullYear() - parseInt(business.founded)} años conociendo los desafíos eléctricos únicos de la infraestructura local. Desde renovaciones históricas que exigen retrofitting delicado hasta complejos industriales de alta producción, nuestra experiencia local garantiza que tus sistemas sean seguros, eficientes y preparados para el futuro.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {expertiseData.map((item) => (
                  <div key={item.label}>
                    <h4 className="font-black uppercase tracking-widest text-xs mb-2 text-[#705d00]">{item.label}</h4>
                    <p className="text-[#1c1b1b] font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA (dark) ─── */}
      <section className="py-24 bg-[#1c1b1b] relative overflow-hidden">
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #7e775f 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.05,
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase mb-12">
            ¿Listo para una{' '}
            <span className="text-[#ffd700]">Actualización de Precisión?</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              href="/template-electricista/contacto"
              className="bg-[#ffd700] text-[#705e00] font-black uppercase tracking-tighter px-10 py-5 text-lg hover:scale-[1.02] transition-transform"
            >
              Solicitar Auditoría
            </Link>
            <Link
              href="/template-electricista/servicios"
              className="bg-white/10 text-white font-black uppercase tracking-tighter px-10 py-5 text-lg hover:bg-white/20 transition-colors"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
