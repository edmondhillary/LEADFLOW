import Link from 'next/link';
import { business, values, images } from '../data';

export default function NosotrosPage() {
  const teamMembers = [
    { name: 'Eleanor Hartley', role: 'Lead Horticulturalist', cert: 'RHS Level 3' },
    { name: 'James Pemberton', role: 'Arboricultural Specialist', cert: 'ISA Certified' },
    { name: 'Saoirse Flynn', role: 'Landscape Designer', cert: 'LI Member' },
    { name: 'Tom Ashworth', role: 'Irrigation Engineer', cert: 'BALI Accredited' },
  ];

  const certifications = [
    'Royal Horticultural Society Registered',
    'British Association of Landscape Industries',
    'International Society of Arboriculture',
    'Chelsea Flower Show Exhibitor',
  ];

  const studioImages = [
    images.heroGarden,
    images.maintenance,
    images.afterGarden,
    images.projectDetail,
    images.nosotrosHero,
    images.landscaping,
  ];

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#fafaf5' }}>

      {/* Hero */}
      <section className="w-full py-24 px-6 md:px-10 relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#56642b' }}
            >
              Est. {business.foundedYear} — London
            </span>
            <h1
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#1a1c19',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                marginBottom: '24px',
              }}
            >
              A studio built on botanical conviction.
            </h1>
            <p style={{ fontSize: '17px', fontWeight: 300, color: '#444842', lineHeight: 1.75, maxWidth: '500px' }}>
              {business.name} was founded in {business.foundedYear} on the belief that a well-designed garden is one of the most enduring investments a homeowner can make. We combine horticultural science with design intelligence to create landscapes of genuine distinction.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ minHeight: '560px' }}>
            <img
              src={images.nosotrosHero}
              alt="The Botanical Editorial studio"
              className="w-full h-full object-cover"
              style={{ minHeight: '560px' }}
            />
          </div>
        </div>
      </section>

      {/* Founder Philosophy */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-16 items-start">
          <div className="md:col-span-2">
            <div className="rounded-3xl overflow-hidden" style={{ minHeight: '480px' }}>
              <img
                src={images.maintenance}
                alt="Studio at work"
                className="w-full h-full object-cover"
                style={{ minHeight: '480px' }}
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <span
              className="inline-block mb-6 text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#56642b' }}
            >
              Founding Philosophy
            </span>
            <h2
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: 'clamp(2rem, 3vw, 3.5rem)',
                fontWeight: 300,
                color: '#1a1c19',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '24px',
              }}
            >
              Gardens are not decorations. They are ecosystems authored with intent.
            </h2>
            <div className="flex flex-col gap-5">
              <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.8 }}>
                We started {business.name} because we believed that garden design was underserved by a market focused on speed rather than substance. Most landscaping businesses prioritise quick installations over long-term botanical coherence.
              </p>
              <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.8 }}>
                Our approach is different. Every planting scheme we propose is considered across a minimum five-year horizon. We account for how trees will grow, how perennials will naturalise, and how the space will evolve through every season.
              </p>
              <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.8 }}>
                We call this editorial thinking applied to horticulture — the same rigour a curator brings to an exhibition, directed at the living canvas of your garden.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { value: `${business.yearsExperience}+`, label: 'Years in Practice' },
                { value: '180+', label: 'Gardens Created' },
                { value: '12', label: 'Industry Awards' },
              ].map(stat => (
                <div key={stat.label}>
                  <p style={{ fontFamily: "'Newsreader', serif", fontSize: '40px', fontWeight: 300, color: '#283827', lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: '11px', fontWeight: 500, color: '#444842', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '8px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-24 px-6 md:px-10 max-w-[1920px] mx-auto">
        <div className="mb-16">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
            What We Stand For
          </span>
          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 300,
              color: '#1a1c19',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Our Values
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.num}
              className="rounded-3xl p-10"
              style={{ backgroundColor: '#f4f4ef', boxShadow: '0 20px 40px rgba(40,56,39,0.05)' }}
            >
              <p style={{ fontFamily: "'Newsreader', serif", fontSize: '48px', fontWeight: 300, color: '#d6e7a1', lineHeight: 1, marginBottom: '16px' }}>
                {v.num}
              </p>
              <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', fontWeight: 400, color: '#1a1c19', marginBottom: '12px' }}>
                {v.title}
              </h3>
              <p style={{ fontSize: '13px', fontWeight: 300, color: '#444842', lineHeight: 1.7 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
                The Team
              </span>
              <h2
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                  fontWeight: 300,
                  color: '#1a1c19',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                }}
              >
                Specialist Horticulturalists
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.75, marginBottom: '36px' }}>
                Our team is composed of RHS-qualified horticulturalists, ISA-certified arborists, and chartered landscape architects — each a specialist in their discipline.
              </p>
              <div className="flex flex-col gap-4">
                {teamMembers.map(member => (
                  <div
                    key={member.name}
                    className="flex items-center justify-between rounded-2xl px-6 py-4"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1c19' }}>{member.name}</p>
                      <p style={{ fontSize: '12px', color: '#444842', marginTop: '2px' }}>{member.role}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#d6e7a1', color: '#5a682f' }}
                    >
                      {member.cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
                Accreditations
              </span>
              <h3
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: '28px',
                  fontWeight: 300,
                  color: '#1a1c19',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  marginBottom: '24px',
                }}
              >
                Industry-Recognised Standards
              </h3>
              <div className="flex flex-col gap-4">
                {certifications.map(cert => (
                  <div
                    key={cert}
                    className="flex items-center gap-4 rounded-2xl px-6 py-4"
                    style={{ backgroundColor: '#ffffff', border: '1px solid #e3e3de' }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#283827',
                        flexShrink: 0,
                        display: 'block',
                      }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#1a1c19' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Gallery */}
      <section className="w-full py-24 px-6 md:px-10 max-w-[1920px] mx-auto">
        <div className="mb-12">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
            Our Work
          </span>
          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontWeight: 300,
              color: '#1a1c19',
              letterSpacing: '-0.02em',
            }}
          >
            Studio Gallery
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {studioImages.map((img, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ height: i === 0 || i === 5 ? '320px' : '260px' }}
            >
              <img
                src={img}
                alt={`Studio work ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 px-6 md:px-10">
        <div className="max-w-[1920px] mx-auto">
          <div
            className="rounded-[3rem] overflow-hidden relative py-20 px-10 md:px-20 flex flex-col items-center text-center"
            style={{ background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)' }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${images.heroGarden})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
              }}
            />
            <div className="relative z-10">
              <h2
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15,
                  marginBottom: '20px',
                }}
              >
                Begin a conversation.
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(173,192,168,0.9)', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 36px' }}>
                Our studio team is available for an initial consultation where we assess your site and discuss your vision.
              </p>
              <Link
                href="/template-jardineria/contacto"
                className="inline-block rounded-xl transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#283827',
                  padding: '16px 40px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
