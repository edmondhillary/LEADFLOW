import Image from 'next/image';
import Link from 'next/link';
import { allClasses, pricing, schedule, images } from '../data';

export default function ServiciosPage() {
  const classImages: Record<string, string> = {
    hatha: images.hatha,
    vinyasa: images.vinyasa,
    restorative: images.restorative,
    yin: images.meditationRoom,
    meditation: images.blog2,
    breathwork: images.blog3,
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      {/* Header */}
      <section className="w-full pt-24 pb-16 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          <span
            className="inline-block mb-5 px-4 py-2 rounded-full"
            style={{ backgroundColor: '#dae8be', color: '#566342', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Curated Practices
          </span>
          <h1
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#1b1c19',
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: '700px',
            }}
          >
            Six Paths to{' '}
            <em style={{ fontStyle: 'italic', color: '#566342' }}>Stillness</em>
          </h1>
          <p className="mt-6 max-w-xl" style={{ fontSize: '16px', color: '#45483f', lineHeight: 1.7 }}>
            Each class is a distinct practice designed with intention. Whether you seek movement, restoration, or inner quiet — your path is here.
          </p>
        </div>
      </section>

      {/* Bento Classes Grid */}
      <section className="w-full pb-24 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          {/* Large featured + small 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Large card */}
            {allClasses.slice(0, 1).map(cls => (
              <div
                key={cls.key}
                className="md:col-span-2 group transition-all duration-500 hover:-translate-y-2"
                style={{ backgroundColor: '#f5f3ee', borderRadius: '16px', overflow: 'hidden' }}
              >
                <div className="relative w-full" style={{ height: '360px' }}>
                  <Image
                    src={classImages[cls.key] ?? images.hatha}
                    alt={cls.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,28,25,0.5) 0%, transparent 55%)' }} />
                  <span
                    className="absolute top-5 left-5"
                    style={{
                      backgroundColor: '#dae8be',
                      color: '#566342',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '5px 12px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {cls.type}
                  </span>
                </div>
                <div className="p-8">
                  <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: '24px', fontWeight: 700, color: '#1b1c19', marginBottom: '12px' }}>
                    {cls.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#45483f', lineHeight: 1.7, marginBottom: '16px' }}>{cls.desc}</p>
                  <div className="flex gap-6 flex-wrap">
                    <span style={{ fontSize: '11px', color: '#566342', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {cls.duration}
                    </span>
                    <span style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {cls.level}
                    </span>
                    <span style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {cls.sessions}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Small card */}
            {allClasses.slice(1, 2).map(cls => (
              <div
                key={cls.key}
                className="group transition-all duration-500 hover:-translate-y-2"
                style={{ backgroundColor: '#f5f3ee', borderRadius: '16px', overflow: 'hidden' }}
              >
                <div className="relative w-full" style={{ height: '200px' }}>
                  <Image
                    src={classImages[cls.key] ?? images.vinyasa}
                    alt={cls.name}
                    fill
                    className="object-cover"
                  />
                  <span
                    className="absolute top-4 left-4"
                    style={{
                      backgroundColor: '#dae8be',
                      color: '#566342',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {cls.type}
                  </span>
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px', fontWeight: 700, color: '#1b1c19', marginBottom: '8px' }}>
                    {cls.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#45483f', lineHeight: 1.6, marginBottom: '12px' }}>{cls.desc}</p>
                  <p style={{ fontSize: '11px', color: '#566342', fontWeight: 600 }}>{cls.duration} · {cls.level}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 4 remaining cards in 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allClasses.slice(2).map(cls => (
              <div
                key={cls.key}
                className="group transition-all duration-500 hover:-translate-y-2"
                style={{ backgroundColor: '#f5f3ee', borderRadius: '16px', overflow: 'hidden' }}
              >
                <div className="relative w-full" style={{ height: '180px' }}>
                  <Image
                    src={classImages[cls.key] ?? images.hatha}
                    alt={cls.name}
                    fill
                    className="object-cover"
                  />
                  <span
                    className="absolute top-3 left-3"
                    style={{
                      backgroundColor: '#dae8be',
                      color: '#566342',
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {cls.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 style={{ fontFamily: "'Noto Serif', serif", fontSize: '17px', fontWeight: 700, color: '#1b1c19', marginBottom: '6px' }}>
                    {cls.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#45483f', lineHeight: 1.6, marginBottom: '10px' }}>
                    {cls.desc.substring(0, 120)}...
                  </p>
                  <p style={{ fontSize: '11px', color: '#566342', fontWeight: 600 }}>{cls.duration} · {cls.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-24 px-6 md:px-16" style={{ backgroundColor: '#f5f3ee' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1b1c19', fontWeight: 700 }}>
              Simple, Honest <em style={{ fontStyle: 'italic', color: '#566342' }}>Pricing</em>
            </h2>
            <p className="mt-4 max-w-md mx-auto" style={{ fontSize: '14px', color: '#45483f', lineHeight: 1.7 }}>
              No hidden fees. No pressure to upgrade. Just yoga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map(tier => (
              <div
                key={tier.name}
                style={{
                  backgroundColor: tier.highlight ? '#566342' : '#ffffff',
                  borderRadius: '16px',
                  padding: '40px',
                  border: tier.highlight ? 'none' : '1px solid #e4e2dd',
                  position: 'relative',
                }}
              >
                {tier.highlight && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    style={{
                      backgroundColor: '#a3b18a',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '4px 16px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Most Popular
                  </span>
                )}
                <p style={{ fontSize: '13px', fontWeight: 700, color: tier.highlight ? '#becca3' : '#566342', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                  {tier.name}
                </p>
                <div className="flex items-end gap-2 mb-3">
                  <span style={{ fontFamily: "'Noto Serif', serif", fontSize: '48px', fontWeight: 700, color: tier.highlight ? '#ffffff' : '#1b1c19', lineHeight: 1 }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '12px', color: tier.highlight ? 'rgba(255,255,255,0.65)' : '#45483f', marginBottom: '8px' }}>
                    {tier.period}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: tier.highlight ? 'rgba(255,255,255,0.75)' : '#45483f', marginBottom: '24px', lineHeight: 1.6 }}>
                  {tier.desc}
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span style={{ color: tier.highlight ? '#becca3' : '#566342', fontSize: '14px' }}>✓</span>
                      <span style={{ fontSize: '13px', color: tier.highlight ? 'rgba(255,255,255,0.85)' : '#45483f' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/template-yoga/contacto"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: tier.highlight ? 'rgba(255,255,255,0.15)' : 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '13px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    border: tier.highlight ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="w-full py-24 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12">
            <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#1b1c19', fontWeight: 700 }}>
              Weekly <em style={{ fontStyle: 'italic', color: '#566342' }}>Schedule</em>
            </h2>
            <p className="mt-3" style={{ fontSize: '14px', color: '#45483f' }}>All classes led by Aria Morant</p>
          </div>

          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #e4e2dd' }}>
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f3ee' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#1b1c19', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e4e2dd' }}>
                    Class
                  </th>
                  {days.map(d => (
                    <th key={d} style={{ padding: '16px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#1b1c19', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e4e2dd' }}>
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#fbf9f4' }}>
                    <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 600, color: '#1b1c19', borderBottom: '1px solid #e4e2dd', whiteSpace: 'nowrap' }}>
                      {row.class}
                    </td>
                    {([row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun] as string[]).map((time: string, j: number) => (
                      <td key={j} style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', color: time === '—' ? '#c6c8bb' : '#566342', fontWeight: time === '—' ? 400 : 600, borderBottom: '1px solid #e4e2dd', whiteSpace: 'nowrap' }}>
                        {time}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 px-6 md:px-16 text-center" style={{ backgroundColor: '#f5f3ee' }}>
        <h2 style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1b1c19', fontWeight: 700 }}>
          Ready to begin?
        </h2>
        <p className="mt-4 mb-8 max-w-md mx-auto" style={{ fontSize: '15px', color: '#45483f', lineHeight: 1.7 }}>
          Book your first class today. All levels welcome — we&apos;ll take care of the rest.
        </p>
        <Link
          href="/template-yoga/contacto"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 600,
            padding: '15px 40px',
            borderRadius: '12px',
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          Reservar Clase
        </Link>
      </section>
    </>
  );
}
