import Image from 'next/image';
import Link from 'next/link';
import { courses, pricing, images } from '../data';

const categories = ['Todos', 'Diseno', 'Ingenieria', 'Marketing', 'Datos', 'Producto', 'Seguridad'];

const curriculum = [
  { week: 'Semanas 1-2', title: 'Fundamentos y Metodologia', topics: ['Design Thinking', 'User Research', 'Competitive Analysis'] },
  { week: 'Semanas 3-5', title: 'Arquitectura de Informacion', topics: ['Wireframing', 'Information Architecture', 'User Flows'] },
  { week: 'Semanas 6-9', title: 'Diseno Visual y Prototipado', topics: ['UI Systems', 'Figma Advanced', 'Micro-interactions'] },
  { week: 'Semanas 10-12', title: 'Entrega y Portfolio', topics: ['Usability Testing', 'Developer Handoff', 'Portfolio Review'] },
];

const levelColors: Record<string, string> = {
  Basico: '#acf4a4',
  Intermedio: '#d9e2ff',
  Avanzado: '#ffdbcf',
};
const levelTextColors: Record<string, string> = {
  Basico: '#0c5216',
  Intermedio: '#001944',
  Avanzado: '#370d00',
};

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-academia';
  const featuredCourse = courses[0];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa', color: '#191c1d' }}>

      {/* Page Header */}
      <section className="w-full py-20 md:py-24" style={{ background: 'linear-gradient(to right, #001944, #002c6e)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#6b95f3', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>Catalogo Completo</p>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1.05, marginBottom: '20px' }}>
            Todos nuestros cursos
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
            Programas intensivos disenados con expertos activos del sector. Aprende las habilidades que el mercado demanda hoy.
          </p>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="w-full py-8 sticky top-[68px] z-30" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e7e8e9' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <span key={cat} className="rounded-full px-4 py-2 cursor-pointer transition-all" style={{ fontSize: '13px', fontWeight: 600, backgroundColor: i === 0 ? '#001944' : '#f3f4f5', color: i === 0 ? '#ffffff' : '#454652', border: i === 0 ? 'none' : '1px solid #e7e8e9' }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="w-full py-16" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.slug} className="rounded-[2rem] overflow-hidden flex flex-col" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={images[course.image as keyof typeof images]} alt={course.title} fill className="object-cover" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="rounded-full px-3 py-1" style={{ fontSize: '11px', fontWeight: 700, backgroundColor: levelColors[course.level] || '#e1e3e4', color: levelTextColors[course.level] || '#191c1d', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {course.level}
                    </span>
                    <span className="rounded-full px-3 py-1" style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#f3f4f5', color: '#454652' }}>
                      {course.category}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', color: '#191c1d', marginBottom: '8px' }}>{course.title}</h3>
                  <p style={{ fontSize: '13px', color: '#454652', lineHeight: 1.7, flex: 1 }}>{course.desc}</p>
                  <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: '1px solid #e7e8e9' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#454652', marginBottom: '2px' }}>{course.duration}</p>
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '22px', fontWeight: 800, color: '#001944' }}>{course.price}</p>
                    </div>
                    <Link href={`${baseHref}/contacto`} className="rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '13px', fontWeight: 600, padding: '12px 20px', textDecoration: 'none' }}>
                      Inscribirse
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="w-full py-20" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Curriculo Destacado</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1, marginBottom: '16px' }}>
                {featuredCourse.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#454652', lineHeight: 1.75, marginBottom: '28px' }}>{featuredCourse.desc}</p>
              <div className="flex gap-4 flex-wrap">
                <div className="rounded-xl px-4 py-3" style={{ backgroundColor: '#d9e2ff' }}>
                  <p style={{ fontSize: '11px', color: '#001944', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Duracion</p>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: '#001944', fontFamily: "'Manrope', sans-serif" }}>{featuredCourse.duration}</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ backgroundColor: '#acf4a4' }}>
                  <p style={{ fontSize: '11px', color: '#0c5216', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Nivel</p>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: '#0c5216', fontFamily: "'Manrope', sans-serif" }}>{featuredCourse.level}</p>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ backgroundColor: '#ffdbcf' }}>
                  <p style={{ fontSize: '11px', color: '#370d00', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Precio</p>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: '#370d00', fontFamily: "'Manrope', sans-serif" }}>{featuredCourse.price}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {curriculum.map(item => (
                <div key={item.week} className="rounded-2xl p-5" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(25,28,29,0.04)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: '#454652', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.week}</p>
                      <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 700, color: '#191c1d', marginBottom: '8px' }}>{item.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map(t => (
                          <span key={t} className="rounded-full px-3 py-1" style={{ fontSize: '11px', backgroundColor: '#f3f4f5', color: '#454652', fontWeight: 500 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Planes y Precios</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.1 }}>
              Elige el plan que se adapta a ti
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map(plan => (
              <div key={plan.tier} className="rounded-[2rem] p-8 flex flex-col" style={{ backgroundColor: plan.highlighted ? '#001944' : '#ffffff', boxShadow: plan.highlighted ? '0 30px 60px rgba(0,25,68,0.25)' : '0 20px 40px rgba(25,28,29,0.05)', transform: plan.highlighted ? 'scale(1.03)' : 'none' }}>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: plan.highlighted ? '#ffffff' : '#191c1d', marginBottom: '6px' }}>{plan.tier}</h3>
                <p style={{ fontSize: '13px', color: plan.highlighted ? 'rgba(255,255,255,0.6)' : '#454652', marginBottom: '24px', lineHeight: 1.6 }}>{plan.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '40px', fontWeight: 800, color: plan.highlighted ? '#6b95f3' : '#001944', letterSpacing: '-0.04em', lineHeight: 1 }}>{plan.price}</span>
                  {plan.period && <span style={{ fontSize: '14px', color: plan.highlighted ? 'rgba(255,255,255,0.5)' : '#454652', marginBottom: '6px' }}>{plan.period}</span>}
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: plan.highlighted ? 'rgba(172,244,164,0.25)' : '#acf4a4' }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={plan.highlighted ? '#acf4a4' : '#0c5216'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span style={{ fontSize: '13px', color: plan.highlighted ? 'rgba(255,255,255,0.75)' : '#454652' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`${baseHref}/contacto`} className="block w-full text-center rounded-xl py-3.5 transition-all hover:opacity-90" style={{ background: plan.highlighted ? 'linear-gradient(to right, #2a6b2c, #307231)' : 'linear-gradient(to right, #001944, #002c6e)', color: '#ffffff', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: "'Manrope', sans-serif" }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1.2 }}>
              Primera clase completamente gratuita.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>Sin compromiso. Sin tarjeta de credito.</p>
          </div>
          <Link href={`${baseHref}/contacto`} className="flex-shrink-0 rounded-xl transition-all hover:bg-[#f3f4f5]" style={{ backgroundColor: '#ffffff', color: '#001944', fontSize: '15px', fontWeight: 700, padding: '16px 36px', textDecoration: 'none', fontFamily: "'Manrope', sans-serif" }}>
            Empezar gratis
          </Link>
        </div>
      </section>
    </div>
  );
}
