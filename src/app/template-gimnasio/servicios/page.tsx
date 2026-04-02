import Link from 'next/link';
import { serviciosPage, images, business } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-gimnasio';
  return (
    <main>
      {/* Hero Editorial — matches ZIP */}
      <section className="px-6 mb-24 md:mb-32 relative overflow-hidden pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 z-10">
            <h1 className="font-black italic text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-6" style={{ fontFamily: "'Epilogue', sans-serif" }}>
              {serviciosPage.title} <br /><span className="text-[#eb0000]">{serviciosPage.titleAccent}</span>
            </h1>
            <p className="text-[#ababab] text-lg md:text-xl max-w-lg leading-relaxed">
              {serviciosPage.subtitle}
            </p>
          </div>
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] bg-[#1f1f1f] overflow-hidden">
              <img src={images.serviciosHero} alt="Atleta" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#eb0000] p-6 md:p-8 hidden md:block">
              <span className="font-black italic text-3xl md:text-4xl text-black" style={{ fontFamily: "'Epilogue', sans-serif" }}>EST. 2010</span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Training Bento — matches ZIP structure */}
      <section className="px-6 mb-24 md:mb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-l-4 border-[#eb0000] pl-6">
          <div>
            <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tighter italic" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.personalTraining.title}</h2>
            <p className="text-[#ababab] mt-2">{serviciosPage.personalTraining.subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Feature Card — 2col */}
          <div className="md:col-span-2 bg-[#131313] p-8 flex flex-col justify-between min-h-[350px] md:min-h-[400px] relative overflow-hidden group">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[#eb0000] text-4xl mb-4">analytics</span>
              <h3 className="font-extrabold text-2xl md:text-3xl uppercase italic mb-4" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.personalTraining.mainFeature.title}</h3>
              <p className="text-[#ababab] max-w-md">{serviciosPage.personalTraining.mainFeature.desc}</p>
            </div>
            <div className="mt-8 z-10">
              <Link href={`${baseHref}/contacto`} className="flex items-center gap-2 text-[#eb0000] font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all" style={{ textDecoration: 'none' }}>
                CONOCER MÁS <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity">
              <img className="w-full h-full object-cover grayscale" src={images.serviciosData} alt="" />
            </div>
          </div>
          {/* 1:1 Card */}
          <div className="bg-[#1f1f1f] p-8 flex flex-col justify-center text-center">
            <h4 className="font-black text-5xl text-[#eb0000] mb-2 tracking-tighter" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.personalTraining.stats.value}</h4>
            <p className="font-bold uppercase text-xl mb-4" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.personalTraining.stats.label}</p>
            <p className="text-[#ababab] text-sm">{serviciosPage.personalTraining.stats.desc}</p>
          </div>
          {/* Nutrition Card */}
          <div className="bg-[#191919] p-8 flex flex-col justify-between border-b-4 border-[#eb0000]">
            <div>
              <span className="material-symbols-outlined text-[#dba2ff] text-3xl mb-4">nutrition</span>
              <h4 className="font-bold uppercase text-xl mb-2" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.personalTraining.nutrition.title}</h4>
            </div>
            <p className="text-[#ababab] text-sm">{serviciosPage.personalTraining.nutrition.desc}</p>
          </div>
          {/* Coach Card — 2col */}
          <div className="md:col-span-2 bg-[#131313] p-8 flex items-center gap-6 md:gap-8">
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#eb0000]">
              <img src={images.serviciosCoach} alt={serviciosPage.personalTraining.coach.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[#ff8e7d] font-bold uppercase text-xs tracking-widest mb-1 italic">Coach Destacado</p>
              <h4 className="font-bold text-xl md:text-2xl uppercase italic" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.personalTraining.coach.name}</h4>
              <p className="text-[#ababab] text-sm italic">{serviciosPage.personalTraining.coach.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Classes — asymmetric grid from ZIP */}
      <section className="px-6 mb-24 md:mb-32 max-w-7xl mx-auto">
        <div className="flex flex-col mb-16 text-right items-end">
          <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tighter italic" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.groupClasses.title}</h2>
          <div className="h-1 w-32 bg-[#eb0000] mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* CrossFit — 2col 2row */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden min-h-[400px] md:min-h-[500px]">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale brightness-50 group-hover:grayscale-0" src={images.crossfit} alt="CrossFit" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 p-8">
              <div className="flex gap-2 mb-4">
                <span className="bg-[#842133] text-[#ffc0c4] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{serviciosPage.groupClasses.items[0].tag}</span>
              </div>
              <h3 className="font-black text-4xl md:text-5xl uppercase italic mb-2" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.groupClasses.items[0].name}</h3>
              <p className="text-[#ababab] max-w-sm mb-6">{serviciosPage.groupClasses.items[0].desc}</p>
              <Link href={`${baseHref}/contacto`} className="bg-white text-black px-8 py-3 font-bold uppercase tracking-tighter hover:bg-[#eb0000] hover:text-white transition-all inline-block" style={{ textDecoration: 'none' }}>
                Ver Horarios
              </Link>
            </div>
          </div>
          {/* HIIT */}
          <div className="bg-[#1f1f1f] p-8 flex flex-col justify-end group hover:bg-[#eb0000] transition-colors duration-500 min-h-[200px]">
            <span className="material-symbols-outlined text-4xl mb-6 group-hover:text-black">{serviciosPage.groupClasses.items[1].icon}</span>
            <h3 className="font-extrabold text-2xl uppercase italic mb-2 group-hover:text-black" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.groupClasses.items[1].name}</h3>
            <p className="text-[#ababab] text-sm group-hover:text-black/80">{serviciosPage.groupClasses.items[1].desc}</p>
          </div>
          {/* Yoga */}
          <div className="bg-[#191919] p-8 flex flex-col justify-end border-t-2 border-[#dba2ff] min-h-[200px]">
            <span className="material-symbols-outlined text-[#dba2ff] text-4xl mb-6">{serviciosPage.groupClasses.items[2].icon}</span>
            <h3 className="font-extrabold text-2xl uppercase italic mb-2" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.groupClasses.items[2].name}</h3>
            <p className="text-[#ababab] text-sm">{serviciosPage.groupClasses.items[2].desc}</p>
          </div>
          {/* Boxing — 2col split */}
          <div className="md:col-span-2 bg-[#131313] p-0 flex flex-col md:flex-row overflow-hidden group">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="font-black text-3xl md:text-4xl uppercase italic mb-4" style={{ fontFamily: "'Epilogue', sans-serif" }}>{serviciosPage.groupClasses.items[3].name}</h3>
              <p className="text-[#ababab] text-sm mb-6">{serviciosPage.groupClasses.items[3].desc}</p>
              <ul className="text-xs space-y-2 uppercase tracking-widest font-bold">
                {serviciosPage.groupClasses.items[3].features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#eb0000]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 min-h-[250px] md:min-h-[300px] grayscale group-hover:grayscale-0 transition-all duration-700">
              <img className="w-full h-full object-cover" src={images.serviciosBoxing} alt="Boxing" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Glassmorphism */}
      <section className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-30" src={images.ctaBg} alt="" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-[#262626]/40 backdrop-blur-[40px] p-12 md:p-24 border border-[#484848]/20">
          <h2 className="font-black italic uppercase tracking-tighter text-4xl md:text-6xl mb-8" style={{ fontFamily: "'Epilogue', sans-serif" }}>¿LISTO?</h2>
          <p className="text-xl text-[#ababab] mb-12 max-w-lg mx-auto">
            Agenda una sesión informativa personalizada. Evaluaremos tu estado actual y definiremos tu ruta hacia el máximo rendimiento.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href={`${baseHref}/contacto`} className="bg-[#eb0000] text-black px-10 py-5 font-black italic uppercase tracking-widest text-lg hover:scale-105 transition-transform duration-300 text-center active:scale-95" style={{ fontFamily: "'Epilogue', sans-serif", textDecoration: 'none' }}>
              Agenda una sesión
            </Link>
            <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="border-2 border-[#757575] text-white px-10 py-5 font-black italic uppercase tracking-widest text-lg hover:bg-white hover:text-black transition-all duration-300 text-center" style={{ fontFamily: "'Epilogue', sans-serif", textDecoration: 'none' }}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
