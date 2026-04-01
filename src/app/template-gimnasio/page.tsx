import Link from 'next/link';
import { business, hero, services, plans, classes, testimonials, images } from './data';

export default function HomePage() {
  return (
    <main>
      {/* ===== HERO — matches ZIP exactly ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={images.heroBg} alt="Gym" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-transparent to-transparent opacity-60" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 items-center gap-12">
          <div className="md:col-span-8">
            <span className="inline-block bg-[#842133] text-[#ffc0c4] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              {hero.badge}
            </span>
            <h1 className="font-black italic text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-8" style={{ fontFamily: "'Epilogue', sans-serif" }}>
              {hero.title} <br />
              <span className="text-[#eb0000]">{hero.titleAccent}</span>
            </h1>
            <p className="text-[#ababab] text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${business.phoneIntl}`}
                className="bg-[#eb0000] text-black px-10 py-5 font-black uppercase tracking-widest text-base md:text-lg hover:bg-[#ff8e7d] transition-all duration-300 text-center shadow-[0_0_30px_rgba(235,0,0,0.4)] active:scale-95"
                style={{ fontFamily: "'Epilogue', sans-serif", textDecoration: 'none' }}
              >
                {hero.ctaPrimary}
              </a>
              <Link
                href="/template-gimnasio/servicios"
                className="bg-[#262626] text-white px-10 py-5 font-black uppercase tracking-widest text-base md:text-lg hover:bg-[#2c2c2c] transition-all duration-300 text-center active:scale-95"
                style={{ fontFamily: "'Epilogue', sans-serif", textDecoration: 'none' }}
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 self-end pb-12">
            <div className="flex flex-col gap-8">
              {hero.stats.map((s, i) => (
                <div key={i} className="border-l-4 border-[#eb0000] pl-6">
                  <h3 className="font-black italic text-3xl" style={{ fontFamily: "'Epilogue', sans-serif" }}>{s.value}</h3>
                  <p className="text-[#ababab] uppercase text-xs tracking-widest font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PERFORMANCE / STATS ===== */}
      <section className="py-24 bg-[#131313]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-[#191919] overflow-hidden rounded-lg">
              <img src={images.performance} alt="Performance" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#eb0000]/10 rounded-full -z-10 blur-[60px]" />
          </div>
          <div>
            <h2 className="font-black italic uppercase text-4xl md:text-5xl leading-tight tracking-tighter mb-8" style={{ fontFamily: "'Epilogue', sans-serif" }}>
              INGENIERÍA DEL CUERPO
            </h2>
            <p className="text-[#ababab] mb-8 text-lg leading-relaxed">
              No somos solo un gimnasio. Somos un laboratorio de fuerza donde la ciencia del deporte y la disciplina brutal se encuentran para forjar atletas imparables.
            </p>
            <ul className="space-y-6">
              {[
                { icon: 'bolt', text: 'Entrenamiento de alta intensidad' },
                { icon: 'monitoring', text: 'Bio-seguimiento avanzado' },
                { icon: 'restaurant', text: 'Nutrición de precisión' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#eb0000]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <span className="font-bold uppercase tracking-wider text-sm" style={{ fontFamily: "'Epilogue', sans-serif" }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== PLANS — matches ZIP grid exactly ===== */}
      <section className="py-24 bg-[#0e0e0e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-black italic uppercase tracking-tighter text-5xl md:text-7xl mb-4" style={{ fontFamily: "'Epilogue', sans-serif" }}>
              ELIGE TU <span className="text-[#eb0000]">DESTINO</span>
            </h2>
            <p className="text-[#ababab] max-w-2xl mx-auto font-medium">
              Planes diseñados para cada etapa de tu evolución física. Sin contratos, solo resultados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-[#191919] p-10 flex flex-col hover:bg-[#1f1f1f] transition-all duration-500 group">
              <h3 className="font-black uppercase text-2xl mb-2 tracking-tighter" style={{ fontFamily: "'Epilogue', sans-serif" }}>Básico</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-[#ff8e7d]">$29</span>
                <span className="text-[#ababab] uppercase text-xs font-bold tracking-widest">/ Mes</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plans[0].features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#ababab] group-hover:text-white">
                    <span className="material-symbols-outlined text-xs">check_circle</span> {f}
                  </li>
                ))}
                {plans[0].missing.map((m, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/20">
                    <span className="material-symbols-outlined text-xs">cancel</span> {m}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-[#262626] font-black uppercase tracking-widest text-sm group-hover:bg-white group-hover:text-black transition-all" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                SELECCIONAR
              </button>
            </div>

            {/* Pro — highlighted */}
            <div className="bg-[#eb0000] p-10 flex flex-col relative scale-100 md:scale-105 z-10 shadow-[0_20px_60px_rgba(235,0,0,0.3)]">
              <div className="absolute top-0 right-0 bg-white text-[#eb0000] font-black text-[10px] px-3 py-1 uppercase tracking-tighter" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                Most Popular
              </div>
              <h3 className="font-black uppercase text-2xl mb-2 tracking-tighter text-black" style={{ fontFamily: "'Epilogue', sans-serif" }}>Pro</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-black">$59</span>
                <span className="text-black/70 uppercase text-xs font-bold tracking-widest">/ Mes</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plans[1].features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-black font-bold">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-black text-[#eb0000] font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                COMENZAR AHORA
              </button>
            </div>

            {/* Elite */}
            <div className="bg-[#191919] p-10 flex flex-col hover:bg-[#1f1f1f] transition-all duration-500 group">
              <h3 className="font-black uppercase text-2xl mb-2 tracking-tighter" style={{ fontFamily: "'Epilogue', sans-serif" }}>Élite</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-[#ff8e7d]">$99</span>
                <span className="text-[#ababab] uppercase text-xs font-bold tracking-widest">/ Mes</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plans[2].features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#ababab] group-hover:text-white">
                    <span className="material-symbols-outlined text-xs">check_circle</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-[#262626] font-black uppercase tracking-widest text-sm group-hover:bg-white group-hover:text-black transition-all" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                SELECCIONAR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLASSES BENTO — matches ZIP h-[600px] grid exactly ===== */}
      <section className="py-24 bg-[#131313]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[600px]">
            {/* Powerlifting — 2col 2row */}
            <div className="col-span-2 row-span-2 bg-neutral-900 relative group overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" src={images.crossfit} alt="Powerlifting" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h4 className="font-black text-3xl uppercase italic" style={{ fontFamily: "'Epilogue', sans-serif" }}>Powerlifting</h4>
                <p className="text-[#eb0000] font-bold tracking-[0.2em] text-xs">MARTES &amp; JUEVES</p>
              </div>
            </div>
            {/* Combat Arts — 2col */}
            <div className="col-span-2 bg-neutral-900 relative group overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" src={images.boxing} alt="Combat Arts" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h4 className="font-black text-2xl uppercase italic" style={{ fontFamily: "'Epilogue', sans-serif" }}>Combat Arts</h4>
                <p className="text-[#eb0000] font-bold tracking-[0.2em] text-xs">LUNES A VIERNES</p>
              </div>
            </div>
            {/* Core Blast — 1col */}
            <div className="bg-neutral-900 relative group overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" src={images.coreBlast} alt="Core Blast" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="font-black text-xl uppercase italic" style={{ fontFamily: "'Epilogue', sans-serif" }}>Core Blast</h4>
              </div>
            </div>
            {/* Zen Recovery — 1col */}
            <div className="bg-neutral-900 relative group overflow-hidden">
              <img className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" src={images.yoga} alt="Zen Recovery" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="font-black text-xl uppercase italic" style={{ fontFamily: "'Epilogue', sans-serif" }}>Zen Recovery</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-black italic uppercase tracking-tighter text-4xl md:text-5xl text-center mb-16" style={{ fontFamily: "'Epilogue', sans-serif" }}>
            LA COMUNIDAD <span className="text-[#eb0000]">HABLA</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#191919] p-8 md:p-10">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg text-[#eb0000]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-[#ababab] text-base md:text-lg mb-8 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#eb0000] flex items-center justify-center">
                    <span className="text-lg font-black text-black">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase" style={{ fontFamily: "'Epilogue', sans-serif" }}>{t.name}</p>
                    <p className="text-xs text-[#757575]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA — glassmorphism from ZIP ===== */}
      <section className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-30" src={images.ctaBg} alt="" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-[#262626]/40 backdrop-blur-[40px] p-12 md:p-24 border border-[#484848]/20">
          <h2 className="font-black italic uppercase tracking-tighter text-4xl md:text-6xl mb-8" style={{ fontFamily: "'Epilogue', sans-serif" }}>
            TU PRIMERA SESIÓN ES <span className="text-[#eb0000]">GRATIS</span>
          </h2>
          <p className="text-xl text-[#ababab] mb-12 max-w-lg mx-auto">
            Ven, conoce las instalaciones, entrena con nosotros y decide si KINETIC es tu lugar.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/template-gimnasio/contacto"
              className="bg-[#eb0000] text-black px-10 py-5 font-black italic uppercase tracking-widest text-lg hover:scale-105 transition-transform duration-300 text-center active:scale-95"
              style={{ fontFamily: "'Epilogue', sans-serif", textDecoration: 'none' }}
            >
              Reservar Sesión Gratis
            </Link>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#757575] text-white px-10 py-5 font-black italic uppercase tracking-widest text-lg hover:bg-white hover:text-black transition-all duration-300 text-center"
              style={{ fontFamily: "'Epilogue', sans-serif", textDecoration: 'none' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
