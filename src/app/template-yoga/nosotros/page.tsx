import Image from 'next/image';
import Link from 'next/link';
import { about, business, images } from '../data';

export default function NosotrosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '70vh' }}>
        <div className="absolute inset-0 z-0">
          <Image
            src={images.nosotrosHero}
            alt="Breath of Silence Studio"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(27,28,25,0.7) 40%, transparent 100%)' }}
          />
        </div>
        <div className="relative z-10 flex items-center min-h-[70vh] px-6 md:px-16 max-w-[1920px] mx-auto">
          <div className="max-w-xl">
            <span
              className="inline-block mb-5 px-4 py-2 rounded-full"
              style={{ backgroundColor: 'rgba(163,177,138,0.25)', color: '#becca3', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(163,177,138,0.3)' }}
            >
              {about.badge}
            </span>
            <h1
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {about.heroTitle.split(' ').slice(0, -2).join(' ')}{' '}
              <em style={{ fontStyle: 'italic', color: '#becca3' }}>
                {about.heroTitle.split(' ').slice(-2).join(' ')}
              </em>
            </h1>
            <p className="mt-6" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '460px' }}>
              {about.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Aria Morant — Instructor */}
      <section className="w-full py-24 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: '560px' }}>
              <Image
                src={images.instructorPortrait}
                alt={business.headInstructor}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span
                className="inline-block mb-4 px-3 py-1 rounded-full"
                style={{ backgroundColor: '#dae8be', color: '#566342', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Lead Instructor
              </span>
              <h2
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: '#1b1c19',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {business.headInstructor}
              </h2>
              <p style={{ fontSize: '13px', color: '#566342', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '8px', marginBottom: '24px' }}>
                {business.instructorCredentials}
              </p>
              {about.storyParagraphs.map((para, i) => (
                <p key={i} className="mb-5" style={{ fontSize: '15px', color: '#45483f', lineHeight: 1.75 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Studio Story */}
      <section className="w-full py-20 px-6 md:px-16" style={{ backgroundColor: '#f5f3ee' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1b1c19',
              fontWeight: 700,
            }}
          >
            {about.storyTitle}
          </h2>
          <div
            className="mt-8"
            style={{ width: '48px', height: '2px', backgroundColor: '#a3b18a', margin: '0 auto 32px' }}
          />
          <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '1.2rem', fontStyle: 'italic', color: '#45483f', lineHeight: 1.75 }}>
            &ldquo;Natural oak floors, filtered afternoon light, and the kind of silence that allows you to actually hear your breath.&rdquo;
          </p>
          <p className="mt-4" style={{ fontSize: '12px', color: '#566342', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            — {business.headInstructor}, Founder
          </p>
        </div>
      </section>

      {/* Philosophy — 3 Values */}
      <section className="w-full py-24 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <h2
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#1b1c19',
                fontWeight: 700,
              }}
            >
              Our <em style={{ fontStyle: 'italic', color: '#566342' }}>Philosophy</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {about.values.map((val, i) => (
              <div
                key={i}
                className="text-center p-10"
                style={{ backgroundColor: '#f0eee9', borderRadius: '16px' }}
              >
                <div
                  className="inline-flex items-center justify-center mb-6"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: '#dae8be',
                    fontSize: '32px',
                  }}
                >
                  {val.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1b1c19',
                    marginBottom: '12px',
                  }}
                >
                  {val.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#45483f', lineHeight: 1.75 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Images Gallery */}
      <section className="w-full py-20 px-6 md:px-16" style={{ backgroundColor: '#f5f3ee' }}>
        <div className="max-w-[1920px] mx-auto">
          <h2
            className="mb-10"
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#1b1c19',
              fontWeight: 700,
            }}
          >
            The <em style={{ fontStyle: 'italic', color: '#566342' }}>Studio</em>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative rounded-2xl overflow-hidden col-span-2" style={{ height: '380px' }}>
              <Image src={images.studioWide} alt="Studio wide view" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden flex-1">
                <Image src={images.hatha} alt="Hatha class" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden flex-1">
                <Image src={images.restorative} alt="Restorative session" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="w-full py-24 px-6 md:px-16" style={{ backgroundColor: '#566342' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {about.stats.map((stat, i) => (
              <div key={i}>
                <p
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    fontWeight: 700,
                    color: '#becca3',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontSize: '12px',
                    color: 'rgba(218,232,190,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Join the Community */}
      <section className="w-full py-28 px-6 md:px-16 text-center" style={{ backgroundColor: '#fbf9f4' }}>
        <h2
          style={{
            fontFamily: "'Noto Serif', serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            color: '#1b1c19',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {about.ctaTitle}
        </h2>
        <p className="mt-5 mb-10 max-w-lg mx-auto" style={{ fontSize: '16px', color: '#45483f', lineHeight: 1.7 }}>
          {about.ctaSubtitle}
        </p>
        <Link
          href="/template-yoga/contacto"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 600,
            padding: '16px 40px',
            borderRadius: '12px',
            textDecoration: 'none',
            letterSpacing: '0.03em',
          }}
        >
          Reservar Clase
        </Link>
      </section>
    </>
  );
}
