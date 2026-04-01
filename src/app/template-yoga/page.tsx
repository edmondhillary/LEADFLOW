import Image from 'next/image';
import Link from 'next/link';
import { business, hero, images, classes, benefits, testimonials } from './data';

export default function YogaHome() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.heroBg}
            alt="Breath of Silence Yoga Studio"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #fbf9f4 35%, rgba(251,249,244,0.40) 65%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6 md:px-16 max-w-[1920px] mx-auto py-32">
          <div className="max-w-xl">
            <span
              className="inline-block mb-6 px-4 py-2 rounded-full"
              style={{ backgroundColor: '#dae8be', color: '#566342', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {hero.badge}
            </span>

            <h1
              className="mb-6 leading-[1.05]"
              style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: '#1b1c19', fontWeight: 700 }}
            >
              {hero.title}{' '}
              <em style={{ fontStyle: 'italic', color: '#566342' }}>{hero.titleItalic}</em>
            </h1>

            <p className="mb-10 leading-relaxed" style={{ fontSize: '16px', color: '#45483f', maxWidth: '440px', lineHeight: 1.7 }}>
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/template-yoga/contacto"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '14px 32px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                }}
              >
                {hero.ctaPrimary}
              </Link>
              <Link
                href="/template-yoga/servicios"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#eae8e3',
                  color: '#566342',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '14px 32px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                }}
              >
                {hero.ctaSecondary}
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-10 mt-14">
              <div>
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '28px', fontWeight: 700, color: '#566342' }}>{business.membersCount}</p>
                <p style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Members</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '28px', fontWeight: 700, color: '#566342' }}>6</p>
                <p style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Days / Week</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '28px', fontWeight: 700, color: '#566342' }}>2019</p>
                <p style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Founded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="w-full py-24 px-6 md:px-16 max-w-[1920px] mx-auto">
        <div className="text-center mb-16">
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#566342', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Our Offerings
          </span>
          <h2
            className="mt-3"
            style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1b1c19', fontWeight: 700 }}
          >
            Classes for Every Body
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map(cls => {
            const imgMap: Record<string, string> = {
              hatha: images.hatha,
              vinyasa: images.vinyasa,
              restorative: images.restorative,
            };
            return (
              <div
                key={cls.key}
                className="group transition-all duration-500 hover:-translate-y-2"
                style={{ backgroundColor: '#f5f3ee', borderRadius: '16px', overflow: 'hidden' }}
              >
                <div className="relative w-full" style={{ height: '300px' }}>
                  <Image
                    src={imgMap[cls.key] ?? images.hatha}
                    alt={cls.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,28,25,0.4) 0%, transparent 60%)' }} />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#566342',
                        backgroundColor: '#dae8be',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {cls.level}
                    </span>
                    <span style={{ fontSize: '11px', color: '#45483f' }}>{cls.duration}</span>
                  </div>
                  <h3
                    className="mb-3"
                    style={{ fontFamily: "'Noto Serif', serif", fontSize: '22px', fontWeight: 700, color: '#1b1c19' }}
                  >
                    {cls.name}
                  </h3>
                  <p className="mb-6" style={{ fontSize: '13px', color: '#45483f', lineHeight: 1.7 }}>
                    {cls.desc}
                  </p>
                  <p style={{ fontSize: '11px', color: '#566342', fontWeight: 600 }}>{cls.schedule}</p>
                  <Link
                    href="/template-yoga/servicios"
                    className="inline-block mt-4"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#566342',
                      textDecoration: 'none',
                      borderBottom: '1px solid #a3b18a',
                      paddingBottom: '2px',
                    }}
                  >
                    View Schedule →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Us — 4-col icon grid */}
      <section className="w-full py-24" style={{ backgroundColor: '#f5f3ee' }}>
        <div className="px-6 md:px-16 max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <h2
              style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1b1c19', fontWeight: 700 }}
            >
              Why Students Choose{' '}
              <em style={{ fontStyle: 'italic', color: '#566342' }}>Breath of Silence</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="text-center">
                <div
                  className="inline-flex items-center justify-center mb-5"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#dae8be',
                    fontSize: '28px',
                  }}
                >
                  {b.icon}
                </div>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Noto Serif', serif", fontSize: '18px', fontWeight: 700, color: '#1b1c19' }}
                >
                  {b.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#45483f', lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Atmosphere — cinematic full-width */}
      <section className="w-full" style={{ aspectRatio: '21/9', position: 'relative', overflow: 'hidden' }}>
        <Image
          src={images.studioWide}
          alt="Breath of Silence Studio Interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(27,28,25,0.35)' }}>
          <div
            className="text-center px-12 py-10"
            style={{
              background: 'rgba(251,249,244,0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '16px',
              maxWidth: '600px',
            }}
          >
            <p
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontStyle: 'italic',
                color: '#ffffff',
                lineHeight: 1.4,
              }}
            >
              {business.studioQuote}
            </p>
            <p className="mt-4" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              — Elena R., Monthly Member
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-24" style={{ backgroundColor: '#f0eee9' }}>
        <div className="px-6 md:px-16 max-w-[1920px] mx-auto text-center">
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#566342', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Student Stories
          </span>
          <h2
            className="mt-3 mb-16"
            style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1b1c19', fontWeight: 700 }}
          >
            What Our Community Says
          </h2>

          <div className="max-w-3xl mx-auto flex flex-col gap-12">
            {testimonials.map((t, i) => (
              <div key={i}>
                <p
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    fontStyle: 'italic',
                    color: '#1b1c19',
                    lineHeight: 1.6,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5">
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#566342' }}>{t.name}</p>
                  <p style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.role}</p>
                </div>
                {i < testimonials.length - 1 && (
                  <hr className="mt-10" style={{ border: 'none', borderTop: '1px solid #c6c8bb' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-28 px-6 md:px-16 text-center" style={{ backgroundColor: '#fbf9f4' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#566342', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Take the First Step
        </span>
        <h2
          className="mt-4 mb-6"
          style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#1b1c19', fontWeight: 700, lineHeight: 1.1 }}
        >
          Begin Your{' '}
          <em style={{ fontStyle: 'italic', color: '#566342' }}>Journey</em>
        </h2>
        <p className="mb-10 max-w-lg mx-auto" style={{ fontSize: '16px', color: '#45483f', lineHeight: 1.7 }}>
          Your first class is always the hardest step. After that, the studio has a way of becoming home.
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
