import Link from 'next/link';
import { business, stats, precisionProtocol, credentials, images } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-mecanico';
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative py-32 bg-[#121416] overflow-hidden">
        {/* Machined texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #333537 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left — 7 cols */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <span
                className="inline-block text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-5 py-2 w-fit"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Fundado en 2009
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter text-[#e2e2e5]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow: '0 0 20px rgba(255, 181, 153, 0.3)',
                }}
              >
                AUTHORITATIVE
                <span className="block text-[#ff5f00]">LOCAL EXPERTISE</span>
                <span className="block text-[#c4c6cc] text-3xl md:text-4xl mt-2">SINCE 2009</span>
              </h1>
              <p className="text-[#c4c6cc] text-lg leading-relaxed max-w-lg">
                Industrial Authority nació en Madrid con una misión clara: ofrecer la más alta precisión técnica en reparación y mantenimiento del automóvil, con los estándares de un taller de competición.
              </p>
            </div>

            {/* Right — 5 cols */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={images.mechanicTeam}
                  alt="Equipo Industrial Authority"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BENTO ─── */}
      <section className="py-20 bg-[#1a1c1e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '15+', label: 'Años de experiencia', sub: 'Desde 2009 en Madrid' },
              { value: 'CIE', label: 'Centro de Inspección', sub: 'Inspección pre-ITV oficial' },
              { value: '100%', label: 'Garantía escrita', sub: 'En cada reparación' },
              { value: '24/7', label: 'Servicio de urgencias', sub: 'Todos los días del año' },
            ].map((item) => (
              <div
                key={item.value}
                className="bg-[#1e2022] p-8 border-b-2 border-[#ff5f00] flex flex-col gap-2"
              >
                <span
                  className="text-4xl md:text-5xl font-black text-[#ff5f00] leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.value}
                </span>
                <span
                  className="text-sm font-bold text-[#e2e2e5] uppercase tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </span>
                <span className="text-xs text-[#c4c6cc]/50">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PRECISION PROTOCOL ─── */}
      <section className="py-32 bg-[#121416]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-4 py-2 inline-block mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Nuestro protocolo
            </span>
            <h2
              className="text-3xl md:text-5xl font-black uppercase text-[#e2e2e5] tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              THE PRECISION
              <span className="text-[#ff5f00]"> PROTOCOL</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {precisionProtocol.map((rule) => (
              <div
                key={rule.num}
                className="group relative bg-[#1e2022] p-10 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00]" />
                <span
                  className="text-6xl font-black text-[#282a2c] leading-none pl-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {rule.num}
                </span>
                <h3
                  className="text-xl font-black uppercase text-[#e2e2e5] tracking-tight pl-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {rule.title}
                </h3>
                <p className="text-[#c4c6cc] text-sm leading-relaxed pl-4">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCAL LEADERSHIP ─── */}
      <section className="py-0 bg-[#1a1c1e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square md:aspect-auto overflow-hidden relative">
              <img
                src={images.diagnosticEquip}
                alt="Equipamiento diagnóstico Industrial Authority"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00]" />
            </div>

            {/* Text */}
            <div className="p-12 md:p-16 flex flex-col justify-center gap-6 bg-[#1e2022]">
              <span
                className="inline-block bg-[#ff5f00] text-[#531a00] text-xs tracking-[0.2em] uppercase px-4 py-2 w-fit font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Liderazgo Local
              </span>
              <h2
                className="text-3xl md:text-5xl font-black uppercase text-[#e2e2e5] leading-tight tracking-tighter"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                REFERENCIA TÉCNICA
                <span className="block text-[#ffb599]">EN MADRID</span>
              </h2>
              <p className="text-[#c4c6cc] text-sm leading-relaxed">
                Polígono Industrial Norte. La dirección que eligen los conductores más exigentes de Madrid cuando necesitan la máxima precisión técnica. Más de 15 años formando parte del tejido industrial de la ciudad.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#5b4137]/20">
                {stats.map((stat) => (
                  <div key={stat.value} className="flex flex-col gap-1">
                    <span
                      className="text-2xl font-black text-[#ff5f00] leading-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-xs text-[#c4c6cc]/60 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS LOGOS ─── */}
      <section className="py-24 bg-[#121416]">
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#c4c6cc]/40 text-center mb-12"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Certificaciones y Reconocimientos
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {credentials.map((cred) => (
              <div
                key={cred.label}
                className="flex flex-col items-center text-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-16 h-16 border border-[#5b4137]/30 flex items-center justify-center">
                  <span
                    className="text-xs font-black text-[#c4c6cc] uppercase tracking-tighter"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {cred.label.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>
                <span className="text-xs text-[#c4c6cc]/60">{cred.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 bg-[#1a1c1e] relative overflow-hidden">
        {/* Blueprint / machined bg */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #333537 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Large ghost text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-black uppercase leading-none text-[#e2e2e5] whitespace-nowrap tracking-tighter"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(60px, 12vw, 180px)', opacity: 0.02 }}
          >
            AUTHORITY
          </span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span
            className="text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-4 py-2 inline-block mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Confía en la Autoridad Técnica
          </span>
          <h2
            className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter text-[#e2e2e5] mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              textShadow: '0 0 20px rgba(255, 181, 153, 0.3)',
            }}
          >
            TU VEHÍCULO EN
            <span className="block text-[#ff5f00]">MANOS EXPERTAS</span>
          </h2>
          <p className="text-[#c4c6cc] text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            {business.phone} — Urgencias 24 horas. Diagnóstico, reparación y mantenimiento con garantía escrita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${business.phoneIntl}`}
              className="text-[#531a00] font-black uppercase tracking-widest px-12 py-5 text-sm transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              LLAMAR AHORA
            </a>
            <Link
              href={`${baseHref}/servicios`}
              className="border border-[#ffb599]/40 text-[#ffb599] uppercase tracking-[0.15em] text-sm font-bold px-10 py-4 hover:bg-[#ffb599]/10 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              VER SERVICIOS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
