import Link from 'next/link';
import { business, hero, services, projects, testimonials, images, about } from './data';

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={images.heroBg} alt="Arquitectura moderna" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} />
        </div>
        <div className="relative z-10 max-w-5xl px-6 md:px-12 py-16 md:py-24 mb-8 md:mb-16" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(4px)' }}>
          <div style={{ borderLeft: '4px solid #5f5e5e', paddingLeft: '24px', marginBottom: '32px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#d6d4d3', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{hero.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: 'white', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '700px' }}>
            {hero.title}
          </h1>
          <p className="text-base md:text-lg mb-10 max-w-xl" style={{ color: '#d4dcd5', lineHeight: 1.7 }}>{hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href={`tel:${business.phoneIntl}`} className="inline-block text-center transition-all active:scale-[0.98]" style={{ backgroundColor: '#5f5e5e', color: '#faf7f6', padding: '16px 40px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>
              {hero.ctaPrimary}
            </a>
            <Link href="/template-arquitectura/servicios" className="inline-block text-center transition-all active:scale-[0.98]" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '16px 40px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
              {hero.ctaSecondary}
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            {hero.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#d6d4d3' }}>{f.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#e4e2e1' }}>{f.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SELECTED WORKS ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f9f9f6' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
            <div className="max-w-2xl">
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#635e57', display: 'block', marginBottom: '12px' }}>Trabajos Seleccionados</span>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', lineHeight: 1.15 }}>
                Definiendo el futuro del <br />habitar.
              </h2>
            </div>
            <Link href="/template-arquitectura/servicios" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2e3430', textDecoration: 'none', borderBottom: '1px solid #2e3430', paddingBottom: '4px', alignSelf: 'flex-start' }}>
              Ver Todos
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3" style={{ minHeight: '600px' }}>
            <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden" style={{ backgroundColor: '#e4e2e1' }}>
              <img src={images.project1} alt={projects[0].name} className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 translate-y-1 group-hover:translate-y-0 transition-transform" style={{ background: 'rgba(212,220,213,0.85)', backdropFilter: 'blur(16px)' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', display: 'block', marginBottom: '4px' }}>{projects[0].category} — {projects[0].year}</span>
                <h3 className="text-xl md:text-2xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430' }}>{projects[0].name}</h3>
              </div>
            </div>
            {projects.slice(1).map((project, idx) => {
              const img = [images.project2, images.project3, images.project4][idx];
              return (
                <div key={idx} className="md:col-span-4 relative group overflow-hidden" style={{ backgroundColor: '#e4e2e1' }}>
                  <img src={img} alt={project.name} className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 translate-y-1 group-hover:translate-y-0 transition-transform" style={{ background: 'rgba(212,220,213,0.85)', backdropFilter: 'blur(16px)' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', display: 'block', marginBottom: '4px' }}>{project.category} — {project.year}</span>
                    <h3 className="text-lg md:text-xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430' }}>{project.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#f3f4f0' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          <div className="md:col-span-1">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#635e57', display: 'block', marginBottom: '12px' }}>Nuestros Servicios</span>
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430' }}>Proyectando a toda escala.</h2>
            <p style={{ fontSize: '14px', color: '#5a615c', lineHeight: 1.7 }}>Desde la estructura fundacional hasta el último detalle textil, ofrecemos un enfoque holístico del diseño espacial.</p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-10">
            {services.map((service, idx) => (
              <div key={idx} className="group hover:border-[#5f5e5e] transition-colors duration-300" style={{ borderLeft: '1px solid rgba(118,124,119,0.15)', paddingLeft: '24px' }}>
                <h4 className="text-xl md:text-2xl mb-3" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>{service.name}</h4>
                <p className="mb-4" style={{ fontSize: '14px', color: '#5a615c', lineHeight: 1.7 }}>{service.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="block w-1.5 h-1.5" style={{ backgroundColor: '#5f5e5e' }} />
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57' }}>
                    {idx === 0 ? 'Diseño Conceptual' : idx === 1 ? 'Dirección de Obra' : idx === 2 ? 'Selección de Materiales' : 'Control de Calidad'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8 overflow-hidden" style={{ backgroundColor: '#f9f9f6' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 md:pr-8">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#635e57', display: 'block', marginBottom: '12px' }}>La Filosofía</span>
            <h2 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', lineHeight: 1.15 }}>
              La arquitectura como <span style={{ fontStyle: 'italic' }}>lenguaje silencioso</span>.
            </h2>
            <div className="space-y-6" style={{ fontSize: '16px', color: '#5a615c', lineHeight: 1.8 }}>
              <p>{about.heroSubtitle}</p>
              <p>Eliminando lo superfluo, revelamos el alma del material. Piedra, madera y luz se convierten en nuestras herramientas primarias para construir confianza a través de la transparencia y la honestidad estructural.</p>
            </div>
            <div className="mt-12 flex gap-10">
              <div className="text-center">
                <div className="text-3xl" style={{ fontFamily: "'Noto Serif', serif", color: '#5f5e5e' }}>{business.yearsExperience}+</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', marginTop: '4px' }}>Años de Estudio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl" style={{ fontFamily: "'Noto Serif', serif", color: '#5f5e5e' }}>120</div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57', marginTop: '4px' }}>Proyectos</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-3">
            <img src={images.philosophy1} alt="Detalle arquitectónico" className="w-full object-cover" style={{ aspectRatio: '4/5' }} />
            <img src={images.philosophy2} alt="Espacio de trabajo" className="w-full object-cover mt-16" style={{ aspectRatio: '4/5' }} />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8" style={{ backgroundColor: '#1c1917', color: 'white' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:border-r md:pr-12" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#78716c', display: 'block', marginBottom: '12px' }}>Experiencia del Cliente</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700 }}>Lo que dicen nuestros clientes.</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-16">
            {testimonials.map((t, idx) => (
              <blockquote key={idx} className={idx === 1 ? 'md:ml-auto' : ''} style={{ maxWidth: '700px' }}>
                <p className="text-xl md:text-3xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', color: '#d6d3d1', lineHeight: 1.5 }}>&ldquo;{t.text}&rdquo;</p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-[1px]" style={{ backgroundColor: '#5f5e5e' }} />
                  <div>
                    <cite style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'white', fontStyle: 'normal', display: 'block' }}>{t.name}</cite>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#78716c', marginTop: '2px', display: 'block' }}>{t.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-28 md:py-40 px-6 md:px-8 text-center" style={{ backgroundColor: '#f3f4f0' }}>
        <div className="max-w-4xl mx-auto">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#635e57', display: 'block', marginBottom: '20px' }}>El Siguiente Paso</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl mb-8" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', lineHeight: 1.1 }}>
            Eleva tu <span style={{ fontStyle: 'italic' }}>Espacio</span>.
          </h2>
          <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#5a615c', lineHeight: 1.7 }}>
            Actualmente aceptamos consultas para proyectos de 2026. Contacta con nuestro equipo para iniciar tu proyecto arquitectónico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/template-arquitectura/contacto" className="inline-block text-center transition-all active:scale-[0.98]" style={{ backgroundColor: '#5f5e5e', color: '#faf7f6', padding: '18px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>
              Solicitar Consulta
            </Link>
            <Link href="/template-arquitectura/servicios" className="inline-block text-center transition-all" style={{ border: '1px solid #767c77', color: '#2e3430', padding: '18px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>
              Nuestro Proceso
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
