import Link from 'next/link';
import { business, images, servicesCorte, processSteps } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-peluqueria';
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-32 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-6">
              Atelier de Corte
            </span>
            <h1
              className="text-6xl md:text-8xl font-bold text-[#2d3435] leading-none"
              style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
            >
              EL ARTE DEL
              <span className="block italic text-[#785a1a]">CORTE</span>
            </h1>
            <p className="text-[#5a6061] text-lg mt-8 max-w-lg leading-relaxed">
              Cada servicio en L&apos;Artiste es el resultado de una escucha profunda y una ejecución sin concesiones. El corte como forma de arte aplicado.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MENÚ DE AUTOR ─── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#2d3435] shrink-0"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Menú de Autor
            </h2>
            <div className="flex-1 h-px bg-[#dde4e5]" />
            <span className="text-xs tracking-widest uppercase text-[#adb3b4] shrink-0">Corte & Estilo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesCorte.map((service, i) => (
              <div key={service.name} className={`group ${i === 1 ? 'md:translate-y-10' : ''}`}>
                <div className="aspect-[3/4] overflow-hidden bg-[#ebeeef] mb-6">
                  <img
                    src={images[service.image as keyof typeof images]}
                    alt={service.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-3">
                  {service.technique}
                </span>
                <h3
                  className="text-xl font-bold text-[#2d3435] mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {service.name}
                </h3>
                <p className="text-[#5a6061] text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold text-[#785a1a] italic"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {service.price}&euro;
                  </span>
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase text-[#5a6061] border-b border-[#785a1a] pb-0.5 hover:text-[#785a1a] transition-colors"
                  >
                    Consultar Técnica
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-24 bg-[#f2f4f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-4">El método</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#2d3435] leading-tight"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              La Consulta: El Primer
              <span className="block italic text-[#785a1a]">Paso del Arte</span>
            </h2>
            <p className="text-[#5a6061] mt-4 max-w-lg leading-relaxed text-sm">
              No existe un buen corte sin una buena conversación. El proceso que seguimos en cada visita garantiza un resultado que respeta la esencia del cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <span
                  className="text-6xl font-bold leading-none italic"
                  style={{ fontFamily: "'Noto Serif', serif", color: '#ffdea5' }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-xl font-bold text-[#2d3435]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#5a6061] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA IMAGE ─── */}
      <section className="relative h-80 md:h-[500px] overflow-hidden bg-[#2d3435]">
        <img
          src={images.salonInterior}
          alt="Interior L'Artiste Coiffure"
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          style={{ opacity: 0.5 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(45,52,53,0.8) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 h-full flex items-center px-6 max-w-7xl mx-auto">
          <div className="max-w-lg">
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-none mb-6"
              style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
            >
              Redefine
              <span className="block italic text-[#ffdea5]">tu estilo</span>
            </h2>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#785a1a] text-[#fff8f1] uppercase tracking-widest text-xs font-semibold px-10 py-4 hover:bg-[#6b4e0e] transition-colors duration-200"
            >
              RESERVAR
            </a>
          </div>
        </div>
      </section>

      {/* ─── ADDITIONAL INFO ─── */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-4">Colorimetría</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#2d3435] leading-tight mb-6"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                El color como
                <span className="block italic text-[#785a1a]"> segunda piel</span>
              </h2>
              <p className="text-[#5a6061] text-sm leading-relaxed mb-8">
                Nuestros servicios de color van más allá del cambio de tonalidad. Son rituales de transformación formulados con pigmentos de alta concentración y técnicas que respetan la integridad de la fibra capilar.
              </p>
              <Link
                href={`${baseHref}/color`}
                className="inline-block bg-[#2d3435] text-white uppercase tracking-widest text-xs font-semibold px-10 py-4 hover:bg-[#5f5e5e] transition-colors duration-200"
              >
                VER SERVICIOS DE COLOR
              </Link>
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-[#ebeeef]">
              <img
                src={images.hairColor}
                alt="Colorimetría en L'Artiste"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
