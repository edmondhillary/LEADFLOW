import Link from 'next/link';
import { serviciosPage, services, images, business } from '../data';

export default function ServiciosPage() {
  return (
    <main style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* Hero */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end gap-8">
          <div className="md:w-2/3">
            <span className="uppercase tracking-widest text-xs text-[#5a6061] mb-4 block" style={{ fontFamily: "'Manrope', sans-serif" }}>{serviciosPage.badge}</span>
            <h2 className="text-5xl md:text-7xl font-extrabold text-teal-900 leading-tight tracking-tighter" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {serviciosPage.title} <br /><span className="text-[#315959]">{serviciosPage.titleAccent}</span>
            </h2>
          </div>
          <div className="md:w-1/3 pb-2">
            <p className="text-[#5a6061] text-lg leading-relaxed border-l-2 border-[#c0ebea] pl-6">{serviciosPage.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Service 1: Interior — Asymmetric */}
      <section className="bg-[#f2f4f4] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <img src={images.interior1} alt={services[0].name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 right-4 md:right-10 bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-xs hidden md:block">
              <h4 className="font-bold text-teal-900 mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>Acabados Premium</h4>
              <p className="text-sm text-[#5a6061]">Uso exclusivo de pinturas ecológicas con bajo contenido de COV y acabados satinados de alta durabilidad.</p>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#3d6565] font-semibold tracking-wide flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#3d6565]" /> 01
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>{services[0].name}</h3>
            <p className="text-[#5a6061] leading-relaxed">{services[0].desc}</p>
            <ul className="space-y-3 py-4">
              {services[0].features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-[#2d3435]">
                  <span className="material-symbols-outlined text-[#3d6565] text-sm">check_circle</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/template-pintor/contacto" className="group flex items-center gap-2 text-teal-800 font-bold uppercase tracking-tighter text-sm" style={{ fontFamily: "'Manrope', sans-serif", textDecoration: 'none' }}>
              Explorar Interior <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Service 2: Exterior — Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="uppercase tracking-widest text-xs text-[#5a6061] mb-2 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Protección y Estética</span>
          <h3 className="text-3xl md:text-4xl font-bold text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>{services[1].name}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#e4e9ea] rounded-xl overflow-hidden group relative min-h-[350px] md:min-h-[400px]">
            <img src={images.exterior1} alt="Fachadas" className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <h4 className="text-white font-bold text-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>Fachadas Residenciales</h4>
              <p className="text-zinc-300 text-sm max-w-sm mt-2">Revestimientos impermeables de alta resistencia para proteger frente al clima extremo.</p>
            </div>
          </div>
          <div className="bg-[#3d6565] text-[#d9fffe] p-8 rounded-xl flex flex-col justify-between">
            <span className="material-symbols-outlined text-4xl">shield</span>
            <div className="mt-6">
              <h4 className="font-bold text-xl mb-3" style={{ fontFamily: "'Manrope', sans-serif" }}>Resistencia UV</h4>
              <p className="text-sm opacity-80 leading-relaxed">Pigmentos de grado arquitectónico que mantienen la saturación del color frente a la radiación solar.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col justify-between" style={{ border: '1px solid rgba(173,179,180,0.15)' }}>
            <div>
              <h4 className="font-bold text-xl text-teal-900 mb-3" style={{ fontFamily: "'Manrope', sans-serif" }}>Terrazas y Decking</h4>
              <p className="text-sm text-[#5a6061]">Tratamientos especializados para maderas y superficies porosas en zonas de exterior.</p>
            </div>
            <div className="mt-6 aspect-video rounded-lg overflow-hidden">
              <img src={images.exterior2} alt="Terraza" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-2 bg-[#ebeeef] p-8 rounded-xl flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h4 className="font-bold text-xl text-teal-900 mb-3" style={{ fontFamily: "'Manrope', sans-serif" }}>Mantenimiento de Estructuras</h4>
              <p className="text-sm text-[#5a6061]">Protección anticorrosiva para elementos metálicos, verjas y estructuras arquitectónicas complejas.</p>
            </div>
            <div className="md:w-1/2 w-full h-32 md:h-40 rounded-lg overflow-hidden bg-white/50 flex items-center justify-center" style={{ border: '1px dashed #adb3b4' }}>
              <span className="text-[#757c7d] italic text-xs font-medium">Visualización de Proyecto en Curso</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Decoración — Dark Section */}
      <section className="bg-zinc-950 py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <span className="uppercase tracking-widest text-xs text-zinc-500 block" style={{ fontFamily: "'Manrope', sans-serif" }}>Arte Aplicado</span>
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Decoración y <br /><span className="text-teal-400">Acabados de Lujo</span>
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed">{services[2].desc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-teal-500/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-zinc-800 mb-4 overflow-hidden border-2 border-zinc-700">
                  <div className="w-full h-full bg-gradient-to-br from-zinc-600 to-zinc-900" />
                </div>
                <h5 className="text-white font-bold mb-1">Estuco Veneciano</h5>
                <p className="text-zinc-500 text-xs">Efecto mármol con profundidad visual y brillo natural.</p>
              </div>
              <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-teal-500/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-zinc-800 mb-4 overflow-hidden border-2 border-zinc-700">
                  <div className="w-full h-full bg-gradient-to-br from-teal-800 to-teal-950" />
                </div>
                <h5 className="text-white font-bold mb-1">Papel Pintado</h5>
                <p className="text-zinc-500 text-xs">Instalación experta de textiles y papeles de diseñador.</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img src={images.deco1} alt="Acabados de lujo" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden md:block z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-teal-400">brush</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Color del Mes</span>
                  <span className="text-white font-bold block">Tidal Spruce</span>
                  <span className="text-[10px] text-zinc-400">Reflectance: 12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-bold text-teal-900 mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
          ¿Listo para redefinir <br /> su lienzo?
        </h3>
        <p className="text-[#5a6061] mb-10">Solicite una consultoría técnica gratuita en su domicilio para evaluar su proyecto y materiales.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/template-pintor/contacto" className="text-[#d9fffe] px-8 py-4 rounded-md font-bold shadow-lg transition-all active:scale-95 inline-block" style={{ background: 'linear-gradient(135deg, #3d6565, #315959)', textDecoration: 'none' }}>
            Programar Visita
          </Link>
          <Link href="/template-pintor" className="text-teal-900 px-8 py-4 rounded-md font-bold transition-all hover:bg-[#ebeeef] inline-block" style={{ border: '1px solid #adb3b4', textDecoration: 'none' }}>
            Ver Portafolio
          </Link>
        </div>
      </section>
    </main>
  );
}
