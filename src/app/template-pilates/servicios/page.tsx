import Link from 'next/link';
import { classes, schedule, pricing, instructors, images } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-pilates';
  const classChips = ['Todas', 'Reformer', 'Suelo', 'Privada', 'Respiración', 'Principiante', 'Avanzado'];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '16px' }}>Nuestras clases</span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Movimiento para cada<br />
              <span style={{ fontStyle: 'italic', color: '#536257' }}>cuerpo e intención.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p className="max-w-sm" style={{ fontSize: '15px', color: '#5c605c', lineHeight: 1.7 }}>
              Desde clases de suelo para principiantes hasta sesiones avanzadas de Cadillac, cada clase se imparte con precisión y cuidado.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CLASS CHIPS FILTER (static) ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16">
        <div className="flex flex-wrap gap-3">
          {classChips.map((chip, i) => (
            <span
              key={chip}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                padding: '8px 20px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                backgroundColor: i === 0 ? '#536257' : '#edeeea',
                color: i === 0 ? '#ebfced' : '#5c605c',
                border: '1px solid transparent',
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      {/* ===== FULL CLASSES LIST ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => {
            const imgSrc = images[cls.image as keyof typeof images] as string;
            return (
              <div
                key={cls.name}
                className="group overflow-hidden rounded-xl"
                style={{ backgroundColor: '#ffffff', boxShadow: '0px 24px 48px rgba(47,52,48,0.06)', border: '1px solid rgba(175,179,174,0.15)' }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={imgSrc}
                    alt={cls.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span
                    style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#536257', display: 'block', marginBottom: '8px' }}
                  >
                    {cls.tag}
                  </span>
                  <h3
                    className="text-xl mb-3"
                    style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}
                  >
                    {cls.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#5c605c', lineHeight: 1.7 }}>{cls.desc}</p>
                  <Link
                    href={`${baseHref}/contacto`}
                    className="inline-block mt-4 transition-all"
                    style={{ fontSize: '11px', fontWeight: 600, color: '#536257', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', borderBottom: '1px solid #536257', paddingBottom: '2px' }}
                  >
                    Reservar clase
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== SCHEDULE GRID ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>Horario semanal</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
              5 días a la semana, <span style={{ fontStyle: 'italic' }}>siempre disponible.</span>
            </h2>
          </div>

          {/* Schedule table */}
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(175,179,174,0.25)' }}>
            <table className="w-full" style={{ borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
              <thead>
                <tr style={{ backgroundColor: '#edeeea' }}>
                  <th
                    className="text-left px-6 py-4"
                    style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2f3430', borderBottom: '1px solid rgba(175,179,174,0.2)' }}
                  >
                    Clase
                  </th>
                  {days.map(d => (
                    <th
                      key={d}
                      className="px-4 py-4"
                      style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2f3430', textAlign: 'center', borderBottom: '1px solid rgba(175,179,174,0.2)' }}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{ borderBottom: idx < schedule.length - 1 ? '1px solid rgba(175,179,174,0.15)' : 'none' }}
                  >
                    <td className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 500, color: '#2f3430', minWidth: '200px' }}>
                      {row.class}
                    </td>
                    {[row.mon, row.tue, row.wed, row.thu, row.fri].map((slot, si) => (
                      <td
                        key={si}
                        className="px-4 py-4 text-center"
                        style={{ fontSize: '12px', color: slot === '—' ? '#afb3ae' : '#536257', fontWeight: slot === '—' ? 400 : 600 }}
                      >
                        {slot}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6" style={{ fontSize: '12px', color: '#5c605c' }}>
            Sesiones privadas disponibles con cita previa — contáctanos para consultar disponibilidad.
          </p>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#faf9f6' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>Precios</span>
            <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
              Simple y <span style={{ fontStyle: 'italic' }}>transparente.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((tier) => (
              <div
                key={tier.name}
                className="rounded-xl p-8 flex flex-col"
                style={{
                  backgroundColor: tier.highlight ? '#536257' : '#ffffff',
                  color: tier.highlight ? '#ebfced' : '#2f3430',
                  boxShadow: tier.highlight ? '0px 32px 64px rgba(83,98,87,0.25)' : '0px 24px 48px rgba(47,52,48,0.06)',
                  border: tier.highlight ? 'none' : '1px solid rgba(175,179,174,0.15)',
                  transform: tier.highlight ? 'scale(1.03)' : 'none',
                }}
              >
                <div className="mb-6">
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: tier.highlight ? 'rgba(235,252,237,0.65)' : '#5c605c', marginBottom: '8px' }}>
                    {tier.name}
                  </p>
                  <p
                    className="text-4xl md:text-5xl"
                    style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: tier.highlight ? '#ebfced' : '#2f3430' }}
                  >
                    {tier.price}
                  </p>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: tier.highlight ? 'rgba(235,252,237,0.8)' : '#5c605c', marginBottom: '24px' }}>
                  {tier.desc}
                </p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: tier.highlight ? '#ebfced' : '#536257', flexShrink: 0, display: 'inline-block' }} />
                      <span style={{ fontSize: '13px', color: tier.highlight ? 'rgba(235,252,237,0.85)' : '#5c605c' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${baseHref}/contacto`}
                  className="block text-center transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: tier.highlight ? '#ebfced' : '#536257',
                    color: tier.highlight ? '#536257' : '#ebfced',
                    padding: '14px 32px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSTRUCTORS PREVIEW ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#edeeea' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>Nuestros instructores</span>
              <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>
                Guía experta en cada <span style={{ fontStyle: 'italic' }}>sesión.</span>
              </h2>
            </div>
            <Link
              href={`${baseHref}/nosotros`}
              style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2f3430', textDecoration: 'none', borderBottom: '1px solid #2f3430', paddingBottom: '4px', alignSelf: 'flex-start' }}
            >
              Conoce al equipo
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instructors.map((inst) => {
              const imgSrc = images[inst.image as keyof typeof images] as string;
              return (
                <div
                  key={inst.name}
                  className="flex gap-6 p-8 rounded-xl"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0px 24px 48px rgba(47,52,48,0.06)' }}
                >
                  <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden">
                    <img src={imgSrc} alt={inst.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}>{inst.name}</h3>
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#536257', marginBottom: '8px' }}>{inst.role}</p>
                    <p style={{ fontSize: '12px', color: '#5c605c', lineHeight: 1.7 }}>{inst.specialty}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BOOKING CTA ===== */}
      <section
        className="py-24 px-6 md:px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #536257 0%, #47564b 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, fontStyle: 'italic', color: '#ebfced' }}
          >
            ¿Lista para empezar?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(235,252,237,0.75)', lineHeight: 1.7, marginBottom: '32px' }}>
            Reserva tu primera sesión hoy. Clase de prueba por 15€ — todo el equipamiento incluido.
          </p>
          <Link
            href={`${baseHref}/contacto`}
            className="inline-block transition-all active:scale-[0.98]"
            style={{ backgroundColor: '#ebfced', color: '#536257', padding: '16px 48px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', borderRadius: '9999px' }}
          >
            Reservar ahora
          </Link>
        </div>
      </section>
    </main>
  );
}
