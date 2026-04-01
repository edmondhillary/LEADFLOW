import Link from 'next/link';
import { business, repairServices, maintenanceServices, diagnosticsServices, credentials, commonFailures, images } from '../data';

export default function ServiciosPage() {
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span
            className="inline-block text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-5 py-2 mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Alta Precisión — Madrid
          </span>
          <h1
            className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter text-[#e2e2e5] mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              textShadow: '0 0 20px rgba(255, 181, 153, 0.3)',
            }}
          >
            SERVICIOS DE
            <span className="block text-[#ff5f00]">ALTA INTENSIDAD</span>
          </h1>
          <p className="text-[#c4c6cc] text-lg max-w-2xl mx-auto leading-relaxed">
            Reparación, mantenimiento y diagnóstico con tecnología de vanguardia. Cada intervención respaldada por certificación ASE Master y garantía total.
          </p>
        </div>
      </section>

      {/* ─── STATUS BAR ─── */}
      <section className="bg-[#1a1c1e] py-6 border-y border-[#5b4137]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <span
              className="text-xs text-[#c4c6cc]/60 uppercase tracking-widest shrink-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Capacidad actual del taller
            </span>
            <div className="flex-1 h-2 bg-[#282a2c] overflow-hidden">
              <div
                className="h-full transition-all duration-1000"
                style={{ width: '85%', background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}
              />
            </div>
            <span
              className="text-[#ffb599] font-black text-sm uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              85% — ALTA DEMANDA
            </span>
          </div>
        </div>
      </section>

      {/* ─── REPARACIÓN ─── */}
      <section className="py-24 bg-[#1a1c1e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-3xl md:text-4xl font-black uppercase text-[#e2e2e5] shrink-0 tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              REPARACIÓN
            </h2>
            <div className="flex-1 h-px bg-[#5b4137]/30" />
            <span
              className="text-xs tracking-[0.2em] uppercase text-[#ff5f00] shrink-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              01
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured card */}
            <div className="relative bg-[#1e2022] overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={images.mechanicHands}
                  alt="Reparación mecánica"
                  className="w-full h-full object-cover grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
                />
              </div>
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00]" />
              <div className="p-8">
                <span
                  className="text-xs text-[#ffb599] uppercase tracking-widest mb-3 block"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Especialidad Principal
                </span>
                <h3
                  className="text-2xl md:text-3xl font-black uppercase text-[#e2e2e5] tracking-tight mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  MOTOR & SISTEMAS CRÍTICOS
                </h3>
                <p className="text-[#c4c6cc] text-sm leading-relaxed">
                  Reparación integral de motores de combustión interna, turboalimentadores y sistemas de inyección directa. Diagnóstico antes, durante y después de cada intervención.
                </p>
              </div>
            </div>

            {/* Services list */}
            <div className="flex flex-col gap-3">
              {repairServices.map((service, i) => (
                <div
                  key={service}
                  className="group relative bg-[#1e2022] p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00]" />
                  <span
                    className="text-[#ff5f00]/50 font-black text-xs w-6 shrink-0"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[#e2e2e5] font-bold uppercase tracking-wide text-sm group-hover:text-[#ffb599] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {service}
                  </span>
                  <span className="ml-auto text-[#ff5f00] opacity-0 group-hover:opacity-100 transition-opacity duration-200">&rarr;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANTENIMIENTO ─── */}
      <section className="py-24 bg-[#121416]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-3xl md:text-4xl font-black uppercase text-[#e2e2e5] shrink-0 tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              MANTENIMIENTO
            </h2>
            <div className="flex-1 h-px bg-[#5b4137]/30" />
            <span
              className="text-xs tracking-[0.2em] uppercase text-[#ff5f00] shrink-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              02
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Services list */}
            <div className="flex flex-col gap-3">
              {maintenanceServices.map((service, i) => (
                <div
                  key={service}
                  className="group relative bg-[#1e2022] p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#ffb599]" />
                  <span
                    className="text-[#ffb599]/50 font-black text-xs w-6 shrink-0"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[#e2e2e5] font-bold uppercase tracking-wide text-sm group-hover:text-[#ffb599] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {service}
                  </span>
                  <span className="ml-auto text-[#ffb599] opacity-0 group-hover:opacity-100 transition-opacity duration-200">&rarr;</span>
                </div>
              ))}
            </div>

            {/* Info panel */}
            <div className="bg-[#1e2022] p-8 border-t-4 border-[#ffb599] flex flex-col gap-6">
              <h3
                className="text-2xl font-black uppercase text-[#e2e2e5] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                PREVENCIÓN INTELIGENTE
              </h3>
              <p className="text-[#c4c6cc] text-sm leading-relaxed">
                Un programa de mantenimiento riguroso reduce en un 70% la probabilidad de averías críticas. Seguimos los intervalos recomendados por fabricante con repuestos OEM originales.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p
                    className="text-3xl font-black text-[#ffb599]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    70%
                  </p>
                  <p className="text-xs text-[#c4c6cc]/60 uppercase tracking-wider mt-1">Menos averías</p>
                </div>
                <div className="text-center">
                  <p
                    className="text-3xl font-black text-[#ffb599]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    OEM
                  </p>
                  <p className="text-xs text-[#c4c6cc]/60 uppercase tracking-wider mt-1">Repuestos originales</p>
                </div>
              </div>
              <a
                href={`tel:${business.phoneIntl}`}
                className="block text-center text-[#531a00] font-black uppercase tracking-widest py-3 text-sm transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                SOLICITAR REVISIÓN
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIAGNÓSTICO ─── */}
      <section className="py-24 bg-[#1a1c1e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-3xl md:text-4xl font-black uppercase text-[#e2e2e5] shrink-0 tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              DIAGNÓSTICO
            </h2>
            <div className="flex-1 h-px bg-[#5b4137]/30" />
            <span
              className="text-xs tracking-[0.2em] uppercase text-[#ff5f00] shrink-0"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {diagnosticsServices.map((service) => (
              <div
                key={service}
                className="group relative bg-[#1e2022] p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5f00]" />
                <div className="w-10 h-10 flex items-center justify-center ml-2" style={{ background: 'rgba(255,95,0,0.15)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5f00" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.25 48.25 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h3
                  className="text-lg font-black uppercase text-[#e2e2e5] tracking-tight pl-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {service}
                </h3>
              </div>
            ))}
          </div>

          {/* Common failures */}
          <div>
            <h3
              className="text-xl font-black uppercase text-[#c4c6cc]/60 tracking-tighter mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              FALLOS FRECUENTES QUE DETECTAMOS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commonFailures.map((failure) => (
                <div
                  key={failure.title}
                  className="relative bg-[#1e2022] p-6 border-l-4 border-[#ff5f00]"
                >
                  <h4
                    className="text-base font-black uppercase text-[#ffb599] tracking-tight mb-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {failure.title}
                  </h4>
                  <p className="text-[#c4c6cc] text-sm leading-relaxed">{failure.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS ─── */}
      <section className="py-24 bg-[#121416]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#ffb599] border border-[#ffb599]/30 px-4 py-2 inline-block mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Certificaciones
            </span>
            <h2
              className="text-3xl md:text-5xl font-black uppercase text-[#e2e2e5] tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AUTORIDAD
              <span className="text-[#ff5f00]"> CERTIFICADA</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {credentials.map((cred) => (
              <div
                key={cred.label}
                className="bg-[#1e2022] p-6 text-center border-b-2 border-[#ff5f00] flex flex-col gap-2"
              >
                <p
                  className="text-lg font-black text-[#ffb599] uppercase tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {cred.label}
                </p>
                <p className="text-xs text-[#c4c6cc]/60 leading-relaxed">{cred.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EMERGENCY CTA ─── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #531a00 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter text-[#531a00] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            RESERVA TU
            <span className="block">DIAGNÓSTICO</span>
          </h2>
          <p className="text-[#531a00]/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Primer diagnóstico sin compromiso. Presupuesto detallado antes de comenzar cualquier trabajo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${business.phoneIntl}`}
              className="bg-[#121416] text-[#ffb599] uppercase tracking-[0.15em] text-sm font-black px-10 py-4 hover:bg-[#1a1c1e] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {business.phone}
            </a>
            <Link
              href="/template-mecanico"
              className="border-2 border-[#531a00] text-[#531a00] uppercase tracking-[0.15em] text-sm font-black px-10 py-4 hover:bg-[#531a00] hover:text-[#ffb599] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SOLICITAR CITA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
