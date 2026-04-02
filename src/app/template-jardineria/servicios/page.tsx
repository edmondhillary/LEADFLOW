import Link from 'next/link';
import { services, tailoredPrograms, processSteps, portfolio, images } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-jardineria';
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#fafaf5' }}>

      {/* Header */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[1920px] mx-auto">
          <span
            className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#56642b' }}
          >
            What We Offer
          </span>
          <h1
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 300,
              color: '#1a1c19',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              maxWidth: '700px',
            }}
          >
            Our Services
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.75, maxWidth: '560px', marginTop: '20px' }}>
            From ground-up landscape design to ongoing horticultural stewardship — every service is delivered by a dedicated specialist team.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service.num}
          className="w-full py-20 px-6 md:px-10"
          style={{ backgroundColor: i % 2 === 0 ? '#fafaf5' : '#f4f4ef' }}
        >
          <div className="max-w-[1920px] mx-auto">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:[&>div:first-child]:order-2' : ''}`}>
              {/* Image */}
              <div className="rounded-3xl overflow-hidden" style={{ minHeight: '480px' }}>
                <img
                  src={images[service.image as keyof typeof images]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '480px' }}
                />
              </div>

              {/* Content */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#56642b', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
                  {service.num}
                </p>
                <h2
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: 'clamp(2rem, 3vw, 3rem)',
                    fontWeight: 300,
                    color: '#1a1c19',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginBottom: '20px',
                  }}
                >
                  {service.name}
                </h2>
                <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.75, marginBottom: '28px' }}>
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#d6e7a1', color: '#5a682f' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`${baseHref}/contacto`}
                  className="inline-block rounded-xl transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)',
                    color: '#ffffff',
                    padding: '14px 32px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  Enquire About This Service
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Tailored Programs */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#283827' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#adc0a8' }}
            >
              Ongoing Care
            </span>
            <h2
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Tailored Programmes
            </h2>
            <p style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(173,192,168,0.8)', lineHeight: 1.75, maxWidth: '500px', margin: '20px auto 0' }}>
              Every garden is different. Choose a programme structured around your estate&apos;s specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tailoredPrograms.map((program) => (
              <div
                key={program.name}
                className="rounded-3xl p-10 flex flex-col"
                style={{
                  backgroundColor: program.featured ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                  border: program.featured ? '1.5px solid rgba(173,192,168,0.4)' : '1px solid rgba(173,192,168,0.15)',
                }}
              >
                <div className="mb-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                    style={{ backgroundColor: program.featured ? '#d6e7a1' : 'rgba(173,192,168,0.15)', color: program.featured ? '#5a682f' : '#adc0a8' }}
                  >
                    {program.frequency}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: '24px',
                    fontWeight: 400,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    marginBottom: '12px',
                  }}
                >
                  {program.name}
                </h3>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(173,192,168,0.8)', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                  {program.desc}
                </p>
                <ul className="flex flex-col gap-2 mb-8">
                  {program.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#adc0a8', flexShrink: 0, display: 'block' }} />
                      <span style={{ fontSize: '12px', color: 'rgba(173,192,168,0.9)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${baseHref}/contacto`}
                  className="block text-center rounded-xl transition-all hover:opacity-90"
                  style={{
                    backgroundColor: program.featured ? '#ffffff' : 'transparent',
                    border: program.featured ? 'none' : '1.5px solid rgba(173,192,168,0.4)',
                    color: program.featured ? '#283827' : '#ffffff',
                    padding: '14px 24px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  Enquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="w-full py-24 px-6 md:px-10 max-w-[1920px] mx-auto">
        <div className="mb-16">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
            Recent Work
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
            Selected Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'The Oakridge Estate', location: 'Surrey', year: '2024', img: images.heroGarden },
            { title: 'Harrington Walled Garden', location: 'Hampshire', year: '2024', img: images.maintenance },
            { title: 'The Old Rectory', location: 'Oxfordshire', year: '2023', img: images.afterGarden },
            { title: 'Belgravia Roof Terrace', location: 'London SW1', year: '2023', img: images.projectDetail },
          ].map((project) => (
            <div key={project.title} className="rounded-3xl overflow-hidden relative" style={{ minHeight: '340px' }}>
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover absolute inset-0"
                style={{ minHeight: '340px' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(28,40,27,0.85) 0%, transparent 55%)' }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '22px', fontWeight: 400, color: '#ffffff', lineHeight: 1.2, marginBottom: '8px' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '11px', color: 'rgba(173,192,168,0.9)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  {project.location} &mdash; {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
              How We Work
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
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl p-8"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(40,56,39,0.06)' }}
              >
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '48px', fontWeight: 300, color: '#d6e7a1', lineHeight: 1, marginBottom: '16px' }}>
                  {step.num}
                </p>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', fontWeight: 400, color: '#1a1c19', marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', fontWeight: 300, color: '#444842', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
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
                  fontWeight: 300,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                }}
              >
                Ready to begin?
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(173,192,168,0.9)', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 36px' }}>
                Contact our studio today and a senior horticulturalist will be in touch within 48 hours.
              </p>
              <Link
                href={`${baseHref}/contacto`}
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
