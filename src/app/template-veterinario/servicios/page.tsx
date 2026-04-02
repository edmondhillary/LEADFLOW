import Link from 'next/link';
import { fullServices, images, business } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-veterinario';
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-12 pb-24 px-8 overflow-hidden bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            <span
              className="inline-block text-[#166875] font-bold tracking-[0.2em] text-xs uppercase mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Clinical Sanctuary
            </span>
            <h1
              className="text-5xl lg:text-7xl font-extrabold text-[#38312b] tracking-tight leading-[1.1] mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Advanced Medicine,
              <br />
              <span className="text-[#166875] italic font-medium">Gentle Hands.</span>
            </h1>
            <p className="text-[#665e56] text-lg lg:text-xl max-w-xl leading-relaxed mb-8">
              From routine wellness to life-saving surgical care, we provide a spectrum of veterinary services designed for the emotional and physical well-being of your companion.
            </p>
            <a
              href="#preventive"
              className="inline-flex items-center gap-2 bg-[#166875] text-[#edfcff] px-8 py-4 rounded-full font-bold hover:bg-[#005c68] transition-all"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Explore Care Options
              <span className="material-symbols-outlined text-base">arrow_downward</span>
            </a>
          </div>

          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl z-0"
              style={{ transform: 'rotate(2deg)', boxShadow: '0 40px 80px -20px rgba(56,49,43,0.15)' }}
            >
              <img
                src={images.servicesHero}
                alt="Veterinarian examining a dog"
                className="w-full h-full object-cover"
              />
            </div>
            {/* AAHA badge */}
            <div
              className="absolute -bottom-6 -left-12 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-[#bbb0a7]/10"
              style={{ transform: 'rotate(-3deg)' }}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="material-symbols-outlined text-[#166875] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <span className="font-bold text-[#38312b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AAHA Accredited</span>
              </div>
              <p className="text-sm text-[#665e56] leading-snug">Meeting the highest standards in veterinary excellence and clinical care.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fcf2eb] -z-10 rounded-l-[6rem]" />
      </section>

      {/* ─── SERVICES BENTO GRID ─── */}
      <section className="py-24 px-8 bg-[#fcf2eb]" id="preventive">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2
              className="text-4xl font-bold tracking-tight mb-4 text-[#38312b]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Total Wellness Ecosystem
            </h2>
            <p className="text-[#665e56]">
              We believe in proactive health management. Our services are structured to provide a safety net for every stage of your pet&apos;s life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Preventive Care — Large */}
            <div className="md:col-span-8 bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-lg transition-shadow">
              <div className="w-full md:w-1/2">
                <span className="material-symbols-outlined text-[#41684a] text-5xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                <h3
                  className="text-2xl font-bold mb-3 text-[#38312b]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Preventive Care
                </h3>
                <p className="text-[#665e56] mb-6 leading-relaxed">
                  The cornerstone of longevity. We offer personalized wellness plans including nutrition consulting, parasite prevention, and geriatric screenings.
                </p>
                <ul className="flex flex-col gap-3">
                  {['Annual Comprehensive Exams', 'Nutritional Counseling', 'Parasite Prevention'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-medium text-[#38312b]">
                      <span className="material-symbols-outlined text-[#41684a] text-lg">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden h-64">
                <img
                  src={images.preventiveCare}
                  alt="Preventive care — healthy dog at vet"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Vaccinations — Destacado teal */}
            <div className="md:col-span-4 bg-[#166875] text-[#edfcff] rounded-2xl p-8 hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-4xl mb-6 block">vaccines</span>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Vaccinations
              </h3>
              <p className="opacity-80 mb-8 leading-relaxed text-sm">
                Customized immunization protocols tailored to your pet&apos;s lifestyle, breed, and environmental risk factors.
              </p>
              <Link
                href={`${baseHref}/contacto`}
                className="block w-full py-3 rounded-full border border-[#edfcff]/20 hover:bg-[#edfcff] hover:text-[#166875] font-bold transition-all text-center text-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                View Schedule
              </Link>
            </div>

            {/* Diagnostics */}
            <div className="md:col-span-4 bg-[#ece0d7] rounded-2xl p-8 hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-[#166875] text-4xl mb-6 block">biotech</span>
              <h3
                className="text-2xl font-bold mb-3 text-[#38312b]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Diagnostics
              </h3>
              <p className="text-[#665e56] mb-4 leading-relaxed text-sm">
                In-house laboratory, digital radiology, and ultrasound for immediate answers when time matters most.
              </p>
              <div className="pt-4 border-t border-[#bbb0a7]/20">
                <div className="text-xs uppercase tracking-widest font-bold text-[#665e56] mb-2">Capabilities</div>
                <div className="flex flex-wrap gap-2">
                  {['X-Ray', 'Bloodwork', 'ECG'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#fcf2eb] rounded-full text-xs font-bold text-[#38312b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Surgery */}
            <div className="md:col-span-4 bg-white rounded-2xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow border border-[#bbb0a7]/5">
              <div>
                <span className="material-symbols-outlined text-[#ac3434] text-4xl mb-6 block">medical_information</span>
                <h3
                  className="text-2xl font-bold mb-3 text-[#38312b]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Surgery
                </h3>
                <p className="text-[#665e56] leading-relaxed text-sm">
                  Soft tissue and orthopedic procedures performed in our sterile surgical suite with continuous vitals monitoring.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-[#cffcd5] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3c6245] text-lg">monitor_heart</span>
                </div>
                <span
                  className="text-sm font-bold text-[#38312b]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Advanced Anesthesia
                </span>
              </div>
            </div>

            {/* Dental Care */}
            <div className="md:col-span-4 bg-[#41684a] text-[#e8ffe8] rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-4xl mb-6 block" style={{ fontVariationSettings: "'FILL' 1" }}>dentistry</span>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Dental Care
              </h3>
              <p className="opacity-80 mb-6 text-sm leading-relaxed">
                Professional cleaning and digital dental X-rays to prevent systemic disease and maintain oral health.
              </p>
              <div className="bg-[#e8ffe8]/10 p-4 rounded-2xl">
                <p className="text-xs font-bold leading-relaxed">
                  80% of pets show signs of oral disease by age three. Let&apos;s fix that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EMERGENCY SECTION ─── */}
      <section className="py-24 px-8 bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f6ece4] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
            {/* Text */}
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-3 h-3 bg-[#ac3434] rounded-full animate-pulse" />
                <span
                  className="text-[#ac3434] font-bold uppercase tracking-widest text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Emergency Assistance
                </span>
              </div>
              <h2
                className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-[#38312b]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                When Every Second
                <br />Counts.
              </h2>
              <p className="text-[#665e56] text-lg leading-relaxed mb-10">
                Our triage team is trained for critical care scenarios. We provide immediate stabilizing treatment and intensive monitoring for acute injuries and sudden illnesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="bg-[#ac3434] text-[#fff7f6] px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#70030f] transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="material-symbols-outlined">call</span>
                  Call Now: {business.emergency}
                </a>
                <Link
                  href={`${baseHref}/contacto`}
                  className="bg-white text-[#38312b] px-8 py-4 rounded-full font-bold border border-[#bbb0a7]/20 flex items-center justify-center gap-2 hover:bg-[#f1e6dd] transition-all"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="material-symbols-outlined">map</span>
                  Directions
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="relative min-h-[400px]">
              <img
                src={images.emergencyRoom}
                alt="Modern veterinary emergency room"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: 'linear-gradient(to right, #f6ece4 0%, transparent 40%)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-8 bg-[#fcf2eb] text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#38312b] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready to book your appointment?
          </h2>
          <p className="text-[#665e56] mb-10 leading-relaxed">
            Our clinic is accepting new patients for all services. Let&apos;s take care of your companion together.
          </p>
          <Link
            href={`${baseHref}/contacto`}
            className="inline-block bg-[#166875] text-[#edfcff] px-12 py-5 rounded-full font-bold text-lg hover:bg-[#005c68] transition-all shadow-lg"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Reservar cita
          </Link>
        </div>
      </section>
    </>
  );
}
