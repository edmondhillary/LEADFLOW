import Link from 'next/link';
import { about, images, founder, testimonials } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-estetica';
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-end">
        <img
          src={images.aboutHero}
          alt="About Aesthetic Clinic"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(30,30,28,0.85) 0%, rgba(30,30,28,0.3) 60%, transparent 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl">
            <span className="text-xs tracking-widest uppercase text-[#eeda7b] mb-6 block">Nuestra Historia</span>
            <h1
              className="text-4xl md:text-6xl font-medium text-white leading-tight mb-6"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              {about.heroTitle}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              {about.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="py-32 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left: image with offset overlapping smaller image */}
            <div className="relative">
              <img
                src={images.aboutPhilosophy}
                alt="Philosophy"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Overlapping smaller image */}
              <div className="absolute -bottom-8 -right-8 w-1/2 aspect-square overflow-hidden border-4 border-[#fbf9f5]">
                <img
                  src={images.aboutConsult}
                  alt="Consultation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: text with values grid */}
            <div className="flex flex-col gap-8 md:pt-8">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] mb-4 block">Nuestra Filosofia</span>
                <h2
                  className="text-3xl md:text-4xl font-medium text-[#30332e] mb-6 leading-snug"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Precision Clinica,<br />
                  <span className="text-[#6c5c4a]">Vision Artistica</span>
                </h2>
                {about.philosophy.map((para, i) => (
                  <p key={i} className="text-[#5d605a] text-sm leading-relaxed mb-4">{para}</p>
                ))}
              </div>

              {/* Values grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {about.values.map((v) => (
                  <div key={v.title} className="bg-[#f5f4ef] p-6">
                    <h3 className="text-base font-semibold text-[#30332e] mb-2">{v.title}</h3>
                    <p className="text-sm text-[#5d605a] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE BENTO ─── */}
      <section className="py-0 bg-[#f5f4ef]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:h-[800px]">

            {/* Large lobby image — col 8 */}
            <div className="md:col-span-8 relative overflow-hidden h-64 md:h-full">
              <img
                src={images.aboutLobby}
                alt="Clinic lobby"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.75) 0%, transparent 55%)' }}
              />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-xs tracking-widest uppercase text-[#eeda7b] mb-3 block">Nuestra Clinica</span>
                <h3
                  className="text-2xl font-medium text-white mb-3"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Un Santuario de Bienestar
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed max-w-lg">
                  Disenada para evocar calma y confianza desde el momento en que entras. Cada detalle del espacio ha sido curado para tu comodidad.
                </p>
              </div>
            </div>

            {/* Primary bg card — col 4 */}
            <div className="md:col-span-4 bg-[#6c5c4a] p-10 flex flex-col justify-between h-48 md:h-full">
              <div>
                <span className="material-symbols-outlined text-[#fff6f0]/40 text-5xl">spa</span>
                <h3
                  className="text-xl font-medium text-[#fff6f0] mt-6 mb-4"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  10 Anos de Excelencia
                </h3>
                <p className="text-[#fff6f0]/70 text-sm leading-relaxed">
                  Desde 2014, liderando la medicina estetica de precision en Madrid con mas de 2,400 tratamientos realizados.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-2xl font-medium text-[#eeda7b]" style={{ fontFamily: "'Noto Serif', serif" }}>25+</p>
                  <p className="text-xs text-[#fff6f0]/60 mt-1">Anos de experiencia combinada</p>
                </div>
                <div>
                  <p className="text-2xl font-medium text-[#eeda7b]" style={{ fontFamily: "'Noto Serif', serif" }}>98%</p>
                  <p className="text-xs text-[#fff6f0]/60 mt-1">Satisfaccion del paciente</p>
                </div>
              </div>
            </div>

            {/* Consultation card — col 4 */}
            <div className="md:col-span-4 bg-white p-8 flex flex-col justify-between h-48 md:h-full">
              <div className="flex flex-col gap-4">
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-3 py-1 w-fit">
                  Consultas Privadas
                </span>
                <h3
                  className="text-lg font-medium text-[#30332e]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Cada Consulta, Un Plan Unico
                </h3>
                <p className="text-sm text-[#5d605a] leading-relaxed">
                  Dedicamos el tiempo necesario para entender tus objetivos y disenamos un protocolo exclusivo para tu anatomia.
                </p>
              </div>
              <Link href={`${baseHref}/contacto`} className="text-[#6c5c4a] text-xs tracking-widest uppercase hover:text-[#5f503f] transition-colors">
                Reservar &rarr;
              </Link>
            </div>

            {/* Treatment room image — col 8 */}
            <div className="md:col-span-8 relative overflow-hidden h-48 md:h-full">
              <img
                src={images.aboutTreatmentRoom}
                alt="Treatment room"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(251,249,245,0.5) 0%, transparent 60%)' }}
              />
              <div className="absolute top-8 left-8">
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] bg-white/80 backdrop-blur-sm px-3 py-1.5">
                  Sala de Tratamiento
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SPECIALIST PROFILES ─── */}
      <section className="py-32 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs tracking-widest uppercase text-[#6c5c4a] mb-4 block">El Equipo</span>
            <h2
              className="text-3xl md:text-4xl font-medium text-[#30332e]"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Nuestros Especialistas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Founder */}
            <div className="flex flex-col gap-5">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images.founder}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3
                  className="text-xl font-medium text-[#30332e]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {founder.name}
                </h3>
                <p className="text-sm text-[#6c5c4a] tracking-wide mt-1">{founder.role}</p>
                <p className="text-sm text-[#5d605a] leading-relaxed mt-3">{founder.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {founder.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="text-xs border border-[#b1b3ab]/60 text-[#5d605a] px-3 py-1"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Second specialist */}
            <div className="flex flex-col gap-5 md:mt-20">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images.team2}
                  alt="Specialist team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3
                  className="text-xl font-medium text-[#30332e]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Dr. Carlos Vega, MD
                </h3>
                <p className="text-sm text-[#6c5c4a] tracking-wide mt-1">Especialista en Contorno Facial</p>
                <p className="text-sm text-[#5d605a] leading-relaxed mt-3">
                  Con especializacion en medicina regenerativa y rejuvenecimiento no invasivo, el Dr. Vega aporta una perspectiva integrativa y preventiva a cada protocolo de tratamiento.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Medico Especialista', 'Certificado AEDV', 'Formacion Paris'].map((cred) => (
                    <span
                      key={cred}
                      className="text-xs border border-[#b1b3ab]/60 text-[#5d605a] px-3 py-1"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL (large centered quote) ─── */}
      <section className="py-24 bg-[#eeeee8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span
            className="block text-8xl leading-none font-bold text-[#eeda7b] mb-2"
            style={{ fontFamily: "'Noto Serif', serif" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote
            className="text-2xl md:text-3xl font-medium text-[#30332e] leading-relaxed mb-8"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {testimonials[0].text}
          </blockquote>
          <p className="text-sm font-semibold text-[#30332e]">{testimonials[0].name}</p>
          <p className="text-xs text-[#6c5c4a] tracking-wide mt-1">{testimonials[0].role}</p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[#6c5c4a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs tracking-widest uppercase text-[#eeda7b] mb-6 block">Comienza Tu Viaje</span>
          <h2
            className="text-3xl md:text-5xl font-medium text-[#fff6f0] max-w-2xl mx-auto leading-tight mb-4"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {about.cta.title}
          </h2>
          <p className="text-[#fff6f0]/70 text-base leading-relaxed max-w-lg mx-auto mb-10">
            {about.cta.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`${baseHref}/contacto`}
              className="bg-[#fff6f0] text-[#6c5c4a] tracking-widest uppercase text-sm px-8 py-4 hover:bg-white transition-colors duration-200"
            >
              RESERVAR CONSULTA
            </Link>
            <Link
              href={`${baseHref}/servicios`}
              className="border border-[#fff6f0]/40 text-[#fff6f0] tracking-widest uppercase text-sm px-8 py-4 hover:border-[#fff6f0] transition-colors duration-200"
            >
              VER TRATAMIENTOS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
