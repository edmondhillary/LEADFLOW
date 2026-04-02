import Link from 'next/link';
import { menuItems, drinks, images } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-restaurante';
  const entrantes = menuItems.filter((d) => d.category === 'Entrantes');
  const principales = menuItems.filter((d) => d.category === 'Principales');
  const postres = menuItems.filter((d) => d.category === 'Postres');

  const dishImages: Record<string, string> = {
    dish1: images.dish1,
    dish2: images.dish2,
    dish3: images.dish3,
    dish4: images.dish4,
    dish5: images.dish5,
    dish6: images.dish6,
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-32 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#735C00] border border-[#735C00]/30 px-5 py-2 mb-8">
            Temporada Primavera — Verano 2026
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold text-[#1B1D0E] leading-none tracking-tight mb-4"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Nuestra
            <span className="block italic text-[#735C00]"> Carta</span>
          </h1>
          <p className="text-[#444748] text-lg max-w-2xl mx-auto leading-relaxed">
            Platos de autor construidos sobre el producto de temporada. La carta cambia con las estaciones, y cada visita es una edicion unica.
          </p>
        </div>
      </section>

      {/* ─── ENTRANTES ─── */}
      <section className="py-20 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header with line */}
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1B1D0E] shrink-0"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Entrantes
            </h2>
            <div className="flex-1 h-px bg-[#C4C7C7]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#747878] shrink-0">01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {entrantes.map((dish, i) => (
              <div key={dish.name} className={`group ${i % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden bg-[#E4E4CC] mb-5">
                  <img
                    src={dishImages[dish.image]}
                    alt={dish.name}
                    className="w-full h-full object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-xl font-bold text-[#1B1D0E]"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {dish.name}
                  </h3>
                  <span className="text-[#735C00] font-bold text-lg ml-4 shrink-0">{dish.price}&euro;</span>
                </div>
                <p className="text-[#444748] text-sm leading-relaxed">{dish.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINCIPALES ─── */}
      <section className="py-20 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1B1D0E] shrink-0"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Principales
            </h2>
            <div className="flex-1 h-px bg-[#C4C7C7]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#747878] shrink-0">02</span>
          </div>

          {/* Hero card (featured principal) */}
          {principales[0] && (
            <div className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[#EFEFD7] mb-8">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={dishImages[principales[0].image]}
                  alt={principales[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] mb-4">Plato Principal Estrella</span>
                <h3
                  className="text-3xl md:text-4xl font-bold text-[#1B1D0E] leading-tight mb-4"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {principales[0].name}
                </h3>
                <p className="text-[#444748] leading-relaxed mb-6">{principales[0].desc}</p>
                <span
                  className="text-2xl font-bold text-[#735C00]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {principales[0].price}&euro;
                </span>
              </div>
            </div>
          )}

          {/* Remaining principals 2-col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principales.slice(1).map((dish, i) => (
              <div key={dish.name} className={`group ${i % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden bg-[#E4E4CC] mb-5">
                  <img
                    src={dishImages[dish.image]}
                    alt={dish.name}
                    className="w-full h-full object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-xl font-bold text-[#1B1D0E]"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {dish.name}
                  </h3>
                  <span className="text-[#735C00] font-bold text-lg ml-4 shrink-0">{dish.price}&euro;</span>
                </div>
                <p className="text-[#444748] text-sm leading-relaxed">{dish.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POSTRES ─── */}
      <section className="py-20 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1B1D0E] shrink-0"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Postres
            </h2>
            <div className="flex-1 h-px bg-[#C4C7C7]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#747878] shrink-0">03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {postres.map((dish, i) => (
              <div key={dish.name} className={`group ${i === 1 ? 'md:translate-y-24' : ''}`}>
                <div className="aspect-[3/4] overflow-hidden bg-[#E4E4CC] mb-5">
                  <img
                    src={dishImages[dish.image]}
                    alt={dish.name}
                    className="w-full h-full object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-xl font-bold text-[#1B1D0E]"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {dish.name}
                  </h3>
                  <span className="text-[#735C00] font-bold text-lg ml-4 shrink-0">{dish.price}&euro;</span>
                </div>
                <p className="text-[#444748] text-sm leading-relaxed">{dish.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEBIDAS ─── */}
      <section className="py-20 bg-[#1C1B1B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-white shrink-0"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Bebidas
            </h2>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#FED65B] shrink-0">04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Drink list — 1/3 */}
            <div className="md:col-span-1">
              <p className="text-xs tracking-[0.3em] uppercase text-[#FED65B] mb-8">Seleccion de Vinos y Bebidas</p>
              <div className="flex flex-col gap-0">
                {drinks.map((drink, i) => (
                  <div
                    key={drink.name}
                    className={`flex items-center justify-between py-4 ${i < drinks.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <span
                      className="text-white text-sm"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      {drink.name}
                    </span>
                    <span className="text-[#FED65B] font-bold text-sm ml-4 shrink-0">{drink.price}&euro;</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Images grid — 2/3 */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images.wine}
                  alt="Seleccion de vinos"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden mt-8">
                <img
                  src={images.cocktail}
                  alt="Cocktails de autor"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[#FBFBE2] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1B1D0E] mb-6"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Reserve su mesa
          </h2>
          <p className="text-[#444748] mb-8 leading-relaxed">
            Para grupos de mas de 6 personas, eventos privados o el menu degustacion completo, contactenos directamente.
          </p>
          <Link
            href={`${baseHref}/contacto`}
            className="inline-block bg-[#3C0610] text-white uppercase tracking-[0.15em] text-sm font-bold px-12 py-5 hover:bg-[#2d0409] transition-colors duration-200"
          >
            HACER UNA RESERVA
          </Link>
        </div>
      </section>
    </>
  );
}
