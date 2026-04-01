import Link from 'next/link';
import { services, images } from '../data';

export default function ServiciosPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-[#fbf9f5] pt-16 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pb-12">
            {/* Left: badge + title */}
            <div className="flex flex-col gap-5">
              <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-4 py-2 w-fit">
                Medicina Estetica Premium
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#30332e] leading-none tracking-tight"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Nuestros<br />
                <span className="text-[#6c5c4a]">Tratamientos</span>
              </h1>
            </div>
            {/* Right: subtitle */}
            <div className="flex flex-col gap-6 md:pb-4">
              <p className="text-[#5d605a] text-lg leading-relaxed">
                Cada tratamiento es el resultado de anos de perfeccionamiento clinico. Nuestros protocolos combinan la ciencia mas avanzada con una sensibilidad artistica inigualable.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-medium text-[#6c5c4a]" style={{ fontFamily: "'Noto Serif', serif" }}>6+</p>
                  <p className="text-xs text-[#5d605a] tracking-wide mt-1">Especialidades clinicas</p>
                </div>
                <div>
                  <p className="text-2xl font-medium text-[#6c5c4a]" style={{ fontFamily: "'Noto Serif', serif" }}>FDA</p>
                  <p className="text-xs text-[#5d605a] tracking-wide mt-1">Tecnologias aprobadas</p>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image with gradient overlay */}
          <div className="relative h-[400px] overflow-hidden">
            <img
              src={images.treatment1}
              alt="Treatments overview"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(251,249,245,0.6) 0%, transparent 50%)' }}
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-12">
                <p
                  className="text-2xl font-medium text-[#30332e] max-w-md leading-relaxed"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  "La ciencia al servicio de tu belleza natural"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES BENTO GRID ─── */}
      <section className="py-24 bg-[#f5f4ef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

            {/* Row 1: 8 + 4 */}
            {/* Toxina Botulinica — large with image */}
            <div className="md:col-span-8 relative overflow-hidden group h-64 md:h-[420px]">
              <img
                src={images.treatment2}
                alt={services[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.8) 20%, transparent 70%)' }}
              />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs tracking-widest uppercase text-[#eeda7b] mb-3 block">{services[0].benefit}</span>
                <h3
                  className="text-2xl font-medium text-white mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {services[0].name}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed max-w-md">{services[0].desc}</p>
              </div>
            </div>

            {/* Rellenos Dermicos — image + text */}
            <div className="md:col-span-4 flex flex-col gap-3 h-64 md:h-[420px]">
              <div className="flex-1 relative overflow-hidden group">
                <img
                  src={images.treatment3}
                  alt={services[1].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.7) 0%, transparent 50%)' }}
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3
                    className="text-base font-medium text-white mb-1"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {services[1].name}
                  </h3>
                  <span className="text-xs text-[#eeda7b]">{services[1].benefit}</span>
                </div>
              </div>
              <div className="bg-white p-5 flex-1 flex flex-col justify-between">
                <p className="text-[#5d605a] text-sm leading-relaxed">{services[1].desc}</p>
                <Link href="/template-estetica/contacto" className="text-[#6c5c4a] text-xs tracking-widest uppercase mt-3 hover:text-[#5f503f] transition-colors">Consultar &rarr;</Link>
              </div>
            </div>

            {/* Row 2: 4 + 8 */}
            {/* Rejuvenecimiento — text first */}
            <div className="md:col-span-4 bg-white p-8 flex flex-col justify-between h-auto md:h-[420px]">
              <div className="flex flex-col gap-4">
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-3 py-1 w-fit">
                  {services[2].benefit}
                </span>
                <h3
                  className="text-xl font-medium text-[#30332e]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {services[2].name}
                </h3>
                <p className="text-[#5d605a] text-sm leading-relaxed">{services[2].desc}</p>
              </div>
              <Link href="/template-estetica/contacto" className="text-[#6c5c4a] text-xs tracking-widest uppercase hover:text-[#5f503f] transition-colors">Saber mas &rarr;</Link>
            </div>

            {/* Armonizacion Facial — 2-col internal grid */}
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-auto md:h-[420px]">
              <div className="relative overflow-hidden group h-48 md:h-auto">
                <img
                  src={images.clinicDetail}
                  alt={services[3].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="bg-[#6c5c4a] p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <span className="text-xs tracking-widest uppercase text-[#eeda7b]">{services[3].benefit}</span>
                  <h3
                    className="text-xl font-medium text-[#fff6f0]"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {services[3].name}
                  </h3>
                  <p className="text-[#fff6f0]/70 text-sm leading-relaxed">{services[3].desc}</p>
                  {services[3].features && (
                    <ul className="mt-2 flex flex-col gap-2">
                      {services[3].features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#fff6f0]/80">
                          <span className="w-1 h-1 rounded-full bg-[#eeda7b] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link href="/template-estetica/contacto" className="text-[#eeda7b] text-xs tracking-widest uppercase hover:text-white transition-colors">Consultar &rarr;</Link>
              </div>
            </div>

            {/* Row 3: 6 + 6 */}
            {/* Contorno Corporal */}
            <div className="md:col-span-6 relative overflow-hidden group h-64 md:h-[360px]">
              <img
                src={images.aboutEquipment}
                alt={services[4].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.75) 0%, transparent 55%)' }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <h3
                  className="text-xl font-medium text-white mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {services[4].name}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-3">{services[4].desc}</p>
                {services[4].tags && (
                  <div className="flex flex-wrap gap-2">
                    {services[4].tags.map((tag) => (
                      <span key={tag} className="text-xs border border-white/30 text-white px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Skincare Medico */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="flex-1 relative overflow-hidden group h-48 md:h-auto">
                <img
                  src={images.aboutConsult}
                  alt={services[5].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="bg-[#eeeee8] p-8 flex flex-col gap-4">
                <h3
                  className="text-xl font-medium text-[#30332e]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {services[5].name}
                </h3>
                <p className="text-[#5d605a] text-sm leading-relaxed">{services[5].desc}</p>
                {services[5].tags && (
                  <div className="flex flex-wrap gap-2">
                    {services[5].tags.map((tag) => (
                      <span key={tag} className="text-xs border border-[#b1b3ab]/60 text-[#5d605a] px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white relative overflow-hidden p-16 text-center">
            {/* Decorative icon background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5" aria-hidden="true">
              <span className="material-symbols-outlined text-[#6c5c4a] text-[300px]">spa</span>
            </div>
            <div className="relative z-10">
              <span className="text-xs tracking-widest uppercase text-[#6c5c4a] mb-6 block">Consulta Gratuita</span>
              <h2
                className="text-3xl md:text-4xl font-medium text-[#30332e] mb-4 max-w-xl mx-auto"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                No sabe por donde empezar?
              </h2>
              <p className="text-[#5d605a] text-base leading-relaxed max-w-md mx-auto mb-10">
                Nuestros especialistas realizan una evaluacion completa para disenar el protocolo ideal para tus objetivos esteticos.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/template-estetica/contacto"
                  className="bg-[#6c5c4a] text-[#fff6f0] tracking-widest uppercase text-sm px-8 py-4 hover:bg-[#5f503f] transition-colors duration-200"
                >
                  RESERVAR EVALUACION
                </Link>
                <Link
                  href="/template-estetica/nosotros"
                  className="border border-[#6c5c4a] text-[#6c5c4a] tracking-widest uppercase text-sm px-8 py-4 hover:bg-[#6c5c4a] hover:text-[#fff6f0] transition-colors duration-200"
                >
                  CONOCER AL EQUIPO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
