import Link from 'next/link';
import { images, business } from '../data';

const serviceItems = [
  {
    icon: 'electric_bolt',
    title: 'Urgencias Eléctricas',
    desc: 'Respuesta inmediata 24/7 para averías críticas. Diagnóstico técnico y reparación de cortocircuitos y cortes de suministro.',
    checks: ['Disponibilidad 24 horas', 'Reparación de cortocircuitos', 'Restablecimiento de potencia'],
    size: 'large' as const,
  },
];

const installationCards = [
  { label: 'Reformas Integrales', desc: 'Renovación completa de sistemas obsoletos bajo normativa RBT.' },
  { label: 'Iluminación LED', desc: 'Estudios lumínicos y optimización de consumo energético.' },
  { label: 'Puntos de Recarga', desc: 'Instalación certificada para vehículos eléctricos.' },
];

const certChecks = ['Aumentos de potencia', 'Altas de suministro', 'Cambios de titularidad'];

export default function ServiciosPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <header className="px-6 py-16 md:py-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <span className="inline-block py-1 px-3 bg-[#ffd700] text-[#705e00] font-bold text-xs tracking-[0.2em] uppercase mb-6">
              Instalador Autorizado
            </span>
            <h1
              className="font-extrabold leading-[0.9] tracking-tighter uppercase mb-8 text-[#1c1b1b]"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
            >
              Ingeniería <span className="text-[#705d00]">Eléctrica</span> de Precisión
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <p className="text-[#5f5e5e] leading-relaxed border-l-4 border-[#705d00] pl-6">
              Soluciones técnicas integrales para infraestructuras críticas. Desde boletín eléctrico rápido hasta sistemas industriales complejos. Seguridad certificada bajo normativa vigente.
            </p>
          </div>
        </div>
      </header>

      {/* ─── BENTO GRID ─── */}
      <section className="px-6 max-w-screen-2xl mx-auto space-y-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Urgencias — large */}
          <div className="md:col-span-7 bg-[#f6f3f2] p-8 md:p-12 relative overflow-hidden group min-h-[420px] flex flex-col">
            <div className="flex items-center gap-4 mb-12">
              <span className="material-symbols-outlined text-4xl text-[#705d00]">electric_bolt</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Urgencias Eléctricas</h2>
            </div>
            <p className="text-xl mb-8 max-w-md text-[#5f5e5e]">
              Respuesta inmediata 24/7 para averías críticas. Diagnóstico técnico y reparación de cortocircuitos y cortes de suministro.
            </p>
            <ul className="space-y-4 mb-12 flex-grow">
              {['Disponibilidad 24 horas', 'Reparación de cortocircuitos', 'Restablecimiento de potencia'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#705d00] shrink-0" />
                  <span className="font-bold uppercase text-sm tracking-wider">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${business.phoneIntl}`}
              className="w-fit text-[#705e00] font-black px-8 py-4 uppercase tracking-[0.1em] text-sm hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg, #705d00 0%, #ffd700 100%)' }}
            >
              Asistencia Inmediata
            </a>
            <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '20rem' }}>warning</span>
            </div>
          </div>

          {/* Photo */}
          <div className="md:col-span-5 relative min-h-[400px]">
            <img
              src={images.electricianPanel}
              alt="Electricista trabajando en cuadro"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#705d00]/20 mix-blend-multiply" />
          </div>

          {/* Instalaciones */}
          <div className="md:col-span-5 bg-[#e5e2e1] p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-4xl text-[#705d00]">electrical_services</span>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Instalaciones</h2>
            </div>
            <p className="text-[#5f5e5e] mb-8">
              Modernización y eficiencia energética para residencias y centros industriales.
            </p>
            <div className="space-y-4">
              {installationCards.map((card) => (
                <div key={card.label} className="p-6 bg-white shadow-sm">
                  <h3 className="font-black uppercase text-xs tracking-widest text-[#705d00] mb-2">{card.label}</h3>
                  <p className="text-sm text-[#1c1b1b]">{card.desc}</p>
                </div>
              ))}
            </div>
            <button className="mt-8 text-[#1c1b1b] border-b-4 border-[#705d00] font-black uppercase py-2 tracking-widest hover:bg-[#705d00]/10 transition-colors">
              Ver Catálogo
            </button>
          </div>

          {/* Certificaciones — dark */}
          <div className="md:col-span-7 bg-zinc-900 text-white p-8 md:p-12 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-4xl text-[#705d00]">verified</span>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Certificaciones</h2>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#ffd700]">Boletín Eléctrico Rápido</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed text-sm">
                  Emisión de Certificados de Instalación Eléctrica (CIE) en tiempo récord. Somos instaladores autorizados por el ministerio de industria.
                </p>
                <div className="space-y-4">
                  {certChecks.map((item) => (
                    <div key={item} className="flex justify-between items-center border-b border-zinc-800 pb-2">
                      <span className="text-xs uppercase tracking-widest font-bold">{item}</span>
                      <span className="material-symbols-outlined text-[#705d00] text-sm">check_circle</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/template-electricista/contacto"
                  className="mt-12 inline-block bg-white text-zinc-900 px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#ffd700] hover:text-[#705e00] transition-colors"
                >
                  Solicitar CIE
                </Link>
              </div>
              <div className="hidden lg:block relative">
                <img
                  src={images.certDoc}
                  alt="Documentación técnica"
                  className="w-full h-full object-cover grayscale brightness-50"
                />
                <div className="absolute inset-0 border-4 border-[#705d00]/30 translate-x-4 -translate-y-4 -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── STATUS CONDUIT ─── */}
        <div className="bg-[#f0eded] p-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="uppercase tracking-widest font-bold text-[#705d00] text-xs">Proyectos Activos</span>
              <h4 className="text-xl font-black uppercase">Capacidad Operativa</h4>
            </div>
            <span className="font-black text-3xl tabular-nums">85%</span>
          </div>
          <div className="w-full h-8 bg-[#e5e2e1] relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[85%] bg-[#705d00]" />
            <div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }}
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] font-bold text-[#5f5e5e]">
            Optimizando tiempos de respuesta técnica para la región metropolitana.
          </p>
        </div>
      </section>
    </>
  );
}
