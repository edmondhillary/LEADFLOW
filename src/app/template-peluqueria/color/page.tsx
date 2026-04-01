import { business, images, servicesColor } from '../data';

export default function ColorPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-0 bg-[#f9f9f9] min-h-[80vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
            {/* Left — text */}
            <div className="md:col-span-6 py-24 md:py-32 pr-0 md:pr-16 flex flex-col justify-center">
              <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-8">
                Portfolio de Color
              </span>
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#2d3435] leading-none"
                style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
              >
                Coloración
                <span
                  className="block italic"
                  style={{ color: '#785a1a' }}
                >
                  Atemporal.
                </span>
              </h1>
              <p className="text-[#5a6061] text-base mt-8 max-w-sm leading-relaxed">
                El color no es moda. Es un estado de ánimo, una extensión de la identidad. En L&apos;Artiste, cada formulación es única e irrepetible.
              </p>
              <div className="mt-10 flex items-center gap-6">
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#785a1a] text-[#fff8f1] uppercase tracking-widest text-xs font-semibold px-8 py-4 hover:bg-[#6b4e0e] transition-colors duration-200"
                >
                  CONSULTAR
                </a>
                <span className="text-[#adb3b4] text-xs">{business.hours}</span>
              </div>
            </div>
            {/* Right — full bleed image */}
            <div className="md:col-span-6 h-72 md:h-auto overflow-hidden">
              <img
                src={images.hairColor}
                alt="Balayage y coloración"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO DE ESPECIALIDADES ─── */}
      <section className="py-24 bg-[#f2f4f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-6 mb-4">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#2d3435] shrink-0"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Portfolio de Especialidades
              </h2>
              <div className="flex-1 h-px bg-[#dde4e5]" />
            </div>
            <p className="text-[#5a6061] text-sm max-w-lg leading-relaxed">
              Cuatro tratamientos diseñados para responder a las necesidades más exigentes del cabello contemporáneo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesColor.map((service, i) => (
              <div key={service.name} className={`group ${i % 2 !== 0 ? 'md:translate-y-8' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden bg-[#ebeeef] mb-6">
                  <img
                    src={images[service.image as keyof typeof images]}
                    alt={service.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-xl font-bold text-[#2d3435]"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {service.name}
                  </h3>
                  <span
                    className="text-[#785a1a] font-bold text-lg italic ml-4 shrink-0"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {service.price}&euro;
                  </span>
                </div>
                <p className="text-[#5a6061] text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SCIENCE QUOTE SECTION ─── */}
      <section className="py-24 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-10">Filosofía</span>
          <blockquote
            className="text-2xl md:text-4xl font-bold text-[#2d3435] leading-snug italic"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.01em' }}
          >
            &ldquo;El color no se aplica. Se compone, como una partitura que responde a la luz de cada persona.&rdquo;
          </blockquote>
          <p className="text-[#5a6061] text-sm mt-8 tracking-wide">
            Marc Antoine — Fundador & Master Colorist
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="border-t border-[#dde4e5] pt-8">
              <h4
                className="text-base font-bold text-[#2d3435] mb-3"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Formulación Personalizada
              </h4>
              <p className="text-[#5a6061] text-sm leading-relaxed">
                Ningún tono es igual al anterior. Cada visita implica una nueva lectura del cabello y una mezcla creada desde cero.
              </p>
            </div>
            <div className="border-t border-[#dde4e5] pt-8">
              <h4
                className="text-base font-bold text-[#2d3435] mb-3"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Pigmentos de Alta Concentración
              </h4>
              <p className="text-[#5a6061] text-sm leading-relaxed">
                Trabajamos exclusivamente con marcas de colorimetría profesional de última generación, seleccionadas por su rendimiento y seguridad.
              </p>
            </div>
            <div className="border-t border-[#dde4e5] pt-8">
              <h4
                className="text-base font-bold text-[#2d3435] mb-3"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Cuidado de la Fibra
              </h4>
              <p className="text-[#5a6061] text-sm leading-relaxed">
                Todo proceso de color incluye una etapa de nutrición capilar. El resultado debe verse tan saludable como se ve hermoso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DARK CTA ─── */}
      <section className="py-24 bg-[#2d3435]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs tracking-widest uppercase text-[#ffdea5] block mb-6">Transformación</span>
          <h2
            className="text-4xl md:text-6xl font-bold text-white leading-none mb-8"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Redefina su
            <span className="block italic text-[#ffdea5]"> Imagen</span>
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto mb-10 leading-relaxed">
            Una consulta de color sin cargo. Escriba por WhatsApp o visítenos en Recoleta.
          </p>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#785a1a] text-[#fff8f1] uppercase tracking-widest text-xs font-semibold px-12 py-5 hover:bg-[#6b4e0e] transition-colors duration-200"
          >
            AGENDAR CONSULTA
          </a>
        </div>
      </section>

      {/* ─── BEFORE/AFTER STRIP ─── */}
      <section className="bg-[#f9f9f9] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="aspect-[16/9] overflow-hidden bg-[#ebeeef]">
              <img
                src={images.haircut}
                alt="Resultado editorial"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden bg-[#dde4e5]">
              <img
                src={images.treatment}
                alt="Tratamiento capilar"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs tracking-widest uppercase text-[#adb3b4]">Resultados reales. Clientes reales.</p>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-[#785a1a] border-b border-[#785a1a] pb-0.5 hover:text-[#6b4e0e] transition-colors"
            >
              Reservar ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
