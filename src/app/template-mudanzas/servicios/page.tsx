import Link from 'next/link';
import { services, pricingTiers, faqs, images, business } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-mudanzas';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa' }}>

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="max-w-2xl">
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#44474e',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '14px',
            }}
          >
            Our Services
          </p>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#191c1d',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              marginBottom: '20px',
            }}
          >
            Every kind of move,<br />handled with care.
          </h1>
          <p style={{ fontSize: '16px', color: '#44474e', lineHeight: 1.7, maxWidth: '540px' }}>
            From a studio apartment to a 50-person office, we bring the same certified crew, quality materials, and white-glove approach to every job.
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS ────────────────────────────────────────── */}
      <section className="pb-20 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: svc.dark ? '#002046' : '#ffffff',
                boxShadow: '0 4px 24px rgba(0,32,70,0.06)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: svc.dark ? 'rgba(255,255,255,0.10)' : '#f3f4f5' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={svc.dark ? '#87a0cd' : '#002046'} aria-hidden="true">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </div>

              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '19px',
                  fontWeight: 700,
                  color: svc.dark ? '#ffffff' : '#191c1d',
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                }}
              >
                {svc.name}
              </h2>

              <p
                style={{
                  fontSize: '14px',
                  color: svc.dark ? '#87a0cd' : '#44474e',
                  lineHeight: 1.7,
                  flex: 1,
                  marginBottom: '20px',
                }}
              >
                {svc.desc}
              </p>

              <div className="flex gap-2 flex-wrap">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: svc.dark ? 'rgba(255,255,255,0.10)' : '#f3f4f5',
                      color: svc.dark ? '#87a0cd' : '#44474e',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING TIERS ────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#44474e',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              Pricing
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#191c1d',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Transparent pricing.<br />No surprise charges.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl p-8 flex flex-col relative"
                style={{
                  backgroundColor: tier.recommended ? '#002046' : '#ffffff',
                  boxShadow: tier.recommended
                    ? '0 24px 48px rgba(0,32,70,0.22)'
                    : '0 4px 24px rgba(0,32,70,0.06)',
                  border: tier.recommended ? 'none' : '1px solid rgba(0,32,70,0.06)',
                }}
              >
                {tier.recommended && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                    style={{
                      backgroundColor: '#ef8300',
                      fontSize: '10px',
                      fontWeight: 700,
                      fontFamily: "'Manrope', sans-serif",
                      color: '#ffffff',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: tier.recommended ? '#87a0cd' : '#44474e',
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                    marginBottom: '8px',
                  }}
                >
                  {tier.name}
                </h3>

                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '30px',
                    fontWeight: 800,
                    color: tier.recommended ? '#ffffff' : '#191c1d',
                    letterSpacing: '-0.03em',
                    marginBottom: '8px',
                  }}
                >
                  {tier.price}
                </p>

                <p
                  style={{
                    fontSize: '13px',
                    color: tier.recommended ? 'rgba(255,255,255,0.55)' : '#44474e',
                    marginBottom: '28px',
                    lineHeight: 1.5,
                  }}
                >
                  {tier.desc}
                </p>

                <div className="flex flex-col gap-3 flex-1">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: tier.recommended ? 'rgba(255,255,255,0.15)' : '#f3f4f5' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill={tier.recommended ? '#87a0cd' : '#002046'} aria-hidden="true">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: '13px',
                          color: tier.recommended ? 'rgba(255,255,255,0.80)' : '#44474e',
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`${baseHref}/contacto`}
                  className="mt-8 text-center transition-opacity hover:opacity-90"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: tier.recommended ? '#552b00' : '#002046',
                    color: '#ffffff',
                    padding: '13px 0',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  Pedir presupuesto
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center mt-8" style={{ fontSize: '13px', color: '#44474e' }}>
            All prices are starting rates. Final quotes depend on distance, volume, and services selected.
          </p>
        </div>
      </section>

      {/* ── SERVICE AREA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#44474e',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '12px',
              }}
            >
              Service Area
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 800,
                color: '#191c1d',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Bay Area and beyond.
            </h2>
            <p style={{ fontSize: '15px', color: '#44474e', lineHeight: 1.7, marginBottom: '28px' }}>
              We serve the entire San Francisco Bay Area locally, including San Francisco, Oakland, Berkeley, San Jose, and Marin County. For long-distance moves, we operate nationwide across the continental US.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                'San Francisco',
                'Oakland',
                'Berkeley',
                'San Jose',
                'Marin County',
                'Peninsula',
                'East Bay',
                'Nationwide',
              ].map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 rounded-xl px-4 py-3"
                  style={{ backgroundColor: '#f3f4f5' }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#002046' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#191c1d' }}>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 20px 40px rgba(0,32,70,0.08)' }}>
            <img
              src={images.contactMap}
              alt="San Francisco service area"
              className="w-full h-full object-cover"
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#44474e',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: '12px',
                }}
              >
                FAQ
              </p>
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#191c1d',
                  letterSpacing: '-0.03em',
                }}
              >
                Common questions answered.
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-8"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 12px rgba(0,32,70,0.05)' }}
                >
                  <h3
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#191c1d',
                      marginBottom: '10px',
                    }}
                  >
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#44474e', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div
          className="rounded-[2rem] px-10 py-16 text-center"
          style={{ backgroundColor: '#002046' }}
        >
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Ready to get started?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.60)', marginBottom: '36px' }}>
            Get your free, no-obligation quote in 2 hours. Call us at{' '}
            <a href={`tel:${business.phoneIntl}`} style={{ color: '#ef8300', textDecoration: 'none' }}>
              {business.phone}
            </a>{' '}
            or fill out the form.
          </p>
          <Link
            href={`${baseHref}/contacto`}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              backgroundColor: '#552b00',
              color: '#ffffff',
              padding: '15px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Request Free Quote
          </Link>
        </div>
      </section>

    </div>
  );
}
