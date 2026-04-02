import Link from 'next/link';
import { about, team, images } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-veterinario';
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative px-8 pt-20 pb-32 overflow-hidden bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-6 relative z-10">
            <span
              className="inline-block px-4 py-1.5 rounded-full bg-[#cffcd5] text-[#3c6245] text-xs font-bold tracking-widest mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {about.badge}
            </span>
            <h1
              className="font-extrabold tracking-tighter text-[#166875] leading-[1.1] mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.8rem, 6vw, 4.5rem)' }}
            >
              {about.title}{' '}
              <span className="text-[#005c68] italic">{about.titleAccent}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#665e56] max-w-xl leading-relaxed mb-10">
              {about.subtitle}
            </p>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-[#166875]/10 flex items-center justify-center text-[#166875]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </span>
              <div>
                <div className="font-bold text-[#38312b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AAHA Accredited</div>
                <div className="text-sm text-[#665e56]">Top 15% in North America</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-6 relative">
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl hover:rotate-0 transition-transform duration-700"
              style={{ transform: 'rotate(2deg)' }}
            >
              <img
                src={images.aboutFacility}
                alt="Modern high-end veterinary clinic interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlapping quote card */}
            <div
              className="absolute -bottom-8 -left-8 md:-left-16 bg-white p-8 rounded-2xl shadow-xl max-w-sm border border-[#bbb0a7]/10"
              style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.08)' }}
            >
              <p className="italic text-[#665e56] leading-relaxed text-sm">
                {about.clinicQuote}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-[1px] w-8 bg-[#166875]" />
                <span
                  className="font-bold text-sm text-[#166875]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {about.philosophyLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="bg-[#fcf2eb] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#38312b] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Our Core Tenets
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((val) => (
              <div
                key={val.title}
                className="bg-white p-10 rounded-2xl flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-300"
                style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.06)' }}
              >
                <span
                  className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform"
                  style={{ color: val.color, fontVariationSettings: "'FILL' 1" }}
                >
                  {val.icon}
                </span>
                <h3
                  className="text-2xl font-bold text-[#38312b]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {val.title}
                </h3>
                <p className="text-[#665e56] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-24 px-8 bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2
                className="font-bold text-[#38312b] tracking-tight mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                The Curators of Care
              </h2>
              <p className="text-lg text-[#665e56]">
                Meet the specialists, surgeons, and caregivers who make Kindred Paws the leading clinical sanctuary in the region.
              </p>
            </div>
            <Link
              href={`${baseHref}/contacto`}
              className="flex items-center gap-2 font-bold text-[#166875] group shrink-0"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              VIEW ALL SPECIALISTS
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={member.name} className={`group ${i === 1 ? 'md:mt-12' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6">
                  <img
                    src={(images as Record<string, string>)[member.image]}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, ${member.roleColor}66 0%, transparent 60%)` }}
                  />
                </div>
                <h3
                  className="text-2xl font-bold text-[#38312b] mb-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {member.name}
                </h3>
                <p className="font-medium mb-4" style={{ color: member.roleColor }}>{member.role}</p>
                <p className="text-[#665e56] text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FACILITY ─── */}
      <section className="relative py-32 px-8 overflow-hidden bg-[#166875]">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
        >
          <img
            src={images.facilityRoom}
            alt="Veterinary facility"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#edfcff] tracking-tight mb-8"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Clinical Precision.
                <br />Residential Warmth.
              </h2>
              <div className="flex flex-col gap-8">
                {about.facilityFeatures.map((feat) => (
                  <div key={feat.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#edfcff]/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#edfcff] text-xl">{feat.icon}</span>
                    </div>
                    <div>
                      <h4
                        className="font-bold text-[#edfcff] text-xl mb-1"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {feat.title}
                      </h4>
                      <p className="text-[#edfcff]/70">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facility image with glass frame */}
            <div className="bg-[#edfcff]/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={images.clinicInterior}
                alt="Modern veterinary exam room"
                className="rounded-xl shadow-inner w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-8 text-center bg-[#fcf2eb]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-extrabold text-[#38312b] mb-8 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready to experience the Sanctuary?
          </h2>
          <p className="text-xl text-[#665e56] mb-12">
            Join our family of pet owners who prioritize clinical excellence and emotional well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${baseHref}/contacto`}
              className="bg-[#166875] text-[#edfcff] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#005c68] transition-all shadow-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Book a Facility Tour
            </Link>
            <Link
              href={`${baseHref}/contacto`}
              className="border-2 border-[#bbb0a7]/30 text-[#38312b] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#fff8f4] transition-all"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              New Client Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
