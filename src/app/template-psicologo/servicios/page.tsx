import Link from 'next/link';
import { sessionTypes, approaches, pricing, faqs, process, images } from '../data';

export default function ServiciosPage() {
  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== HERO HEADER ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#dce6d2', color: '#586152', letterSpacing: '0.2em' }}>
                Servicios Terapéuticos
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Modalidades de <span style={{ fontStyle: 'italic', color: '#586152' }}>acompañamiento</span>.
            </h1>
            <p className="text-base md:text-lg leading-[1.7]" style={{ color: '#454841', maxWidth: '600px' }}>
              Ofrecemos diferentes formatos terapéuticos adaptados a tus necesidades y circunstancias vitales. Cada sesión es un espacio seguro de crecimiento y comprensión.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SESSION TYPES ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Modalidades</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
              Elige tu formato
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessionTypes.map((s, idx) => (
              <div key={idx} className="p-10 rounded-xl transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6" style={{ backgroundColor: '#dce6d2' }}>
                  {s.icon}
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{s.name}</h3>
                <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#f4f4f2', color: '#586152', fontWeight: 600 }}>{s.duration}</span>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THERAPEUTIC APPROACHES ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Enfoques Terapéuticos</span>
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.2 }}>
              Ciencia al servicio del <span style={{ fontStyle: 'italic' }}>bienestar</span>.
            </h2>
            <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>
              Integramos los enfoques con mayor evidencia científica, adaptados a las necesidades únicas de cada persona.
            </p>
            <div className="mt-8">
              <img src={images.sessionRoom} alt="Sala de sesiones" className="w-full rounded-xl object-cover" style={{ aspectRatio: '4/3', boxShadow: '0 8px 24px rgba(26,28,27,0.08)' }} />
            </div>
          </div>
          <div className="md:col-span-8 space-y-6">
            {approaches.map((a, idx) => (
              <div key={idx} className="p-8 rounded-xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: '#dce6d2', color: '#586152', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
                    {a.badge}
                  </span>
                  <h3 className="text-lg" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{a.name}</h3>
                </div>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Tarifas</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
              Inversión en tu <span style={{ fontStyle: 'italic', color: '#586152' }}>bienestar</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto leading-[1.7]" style={{ fontSize: '14px', color: '#454841' }}>
              Creemos que la salud mental debe ser accesible. Ofrecemos tarifas transparentes sin costes ocultos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((p, idx) => (
              <div key={idx} className={`p-8 rounded-xl transition-all duration-300 ${p.highlight ? 'ring-2 ring-[#586152]' : ''}`} style={{ backgroundColor: p.highlight ? '#dce6d2' : '#ffffff', boxShadow: p.highlight ? '0 12px 32px rgba(88,97,82,0.15)' : '0 2px 8px rgba(26,28,27,0.04)' }}>
                {p.highlight && (
                  <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: '#586152', color: '#ffffff', letterSpacing: '0.15em' }}>
                    Más Popular
                  </span>
                )}
                <h3 className="text-lg mb-1" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{p.tier}</h3>
                <p className="text-4xl font-bold mb-1" style={{ fontFamily: "'Noto Serif', serif", color: '#586152' }}>{p.price}</p>
                <p style={{ fontSize: '12px', color: '#454841', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.duration}</p>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>El Proceso</span>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
              Cómo funciona
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: '#dce6d2' }}>
                  {step.icon}
                </div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#a7b19f', display: 'block', marginBottom: '6px' }}>{step.num}</span>
                <h3 className="text-lg mb-2" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: '#454841', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Preguntas Frecuentes</span>
              <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
                Resolvemos tus <span style={{ fontStyle: 'italic' }}>dudas</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)', borderLeft: '3px solid #dce6d2' }}>
                  <h3 className="mb-3" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', fontSize: '16px' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#536066' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-2xl mx-auto text-center p-12 rounded-[2rem]" style={{ backgroundColor: '#ffffff' }}>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.2 }}>
              ¿Listo para dar el primer paso?
            </h2>
            <p className="mb-8 leading-[1.7]" style={{ fontSize: '15px', color: '#454841' }}>
              Reserva tu primera sesión y empieza tu camino hacia el bienestar. Sin compromisos, sin presiones.
            </p>
            <Link href="/template-psicologo/contacto" className="inline-block rounded-lg transition-all active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #586152, #a7b19f)', color: '#ffffff', padding: '16px 48px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}>
              Reservar Consulta
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
