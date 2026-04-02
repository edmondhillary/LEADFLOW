import Image from 'next/image';
import Link from 'next/link';
import { business, serviciosPage, images } from '../data';

export default function ServiciosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-aire';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <section className="py-24" style={{ backgroundColor: '#f6f3f5' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(141,75,0,0.1)', border: '1px solid rgba(141,75,0,0.2)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{serviciosPage.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', maxWidth: '720px', lineHeight: 1.1, marginBottom: '20px' }}>
            {serviciosPage.title}
          </h1>
          <p style={{ fontSize: '16px', color: '#414754', lineHeight: 1.7, maxWidth: '640px' }}>{serviciosPage.intro}</p>
        </div>
      </section>

      {/* Service deep-dive sections */}
      {serviciosPage.items.map((item, i) => (
        <section key={item.num} className="py-20" style={{ backgroundColor: i % 2 === 0 ? '#fcf8fb' : '#f6f3f5' }}>
          <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '72px', fontWeight: 800, color: 'rgba(141,75,0,0.08)', lineHeight: 1, marginBottom: '-16px' }}>{item.num}</p>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '16px' }}>
                  {item.name}
                </h2>
                <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, marginBottom: '24px' }}>{item.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full"
                      style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'rgba(5,100,126,0.08)', color: '#05647e', border: '1px solid rgba(5,100,126,0.2)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`${baseHref}/contacto`}
                  className="inline-flex items-center gap-2 rounded-md transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)', color: '#ffffff', fontSize: '14px', fontWeight: 600, padding: '12px 28px', textDecoration: 'none' }}
                >
                  Pedir presupuesto for {item.name}
                </Link>
              </div>
              <div className={`rounded-2xl overflow-hidden ${i % 2 !== 0 ? 'lg:order-1' : ''}`} style={{ boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}>
                <Image
                  src={images[item.image as keyof typeof images]}
                  alt={item.name}
                  width={800}
                  height={500}
                  className="w-full object-cover"
                  style={{ height: '420px' }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing tiers */}
      <section className="py-24" style={{ backgroundColor: '#eae7ea' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Transparent Pricing</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em' }}>
              Simple, no-surprise pricing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviciosPage.pricing.map(plan => (
              <div
                key={plan.tier}
                className="rounded-xl p-8 flex flex-col gap-6 relative"
                style={{
                  backgroundColor: plan.highlight ? '#1b1b1d' : '#ffffff',
                  boxShadow: plan.highlight ? '0 20px 60px rgba(27,27,29,0.2)' : '0 12px 40px rgba(27,27,29,0.05)',
                  transform: plan.highlight ? 'scale(1.03)' : 'none',
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Most Popular</span>
                  </div>
                )}
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, color: plan.highlight ? 'rgba(255,220,195,0.7)' : '#717786', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{plan.tier}</p>
                  <div className="flex items-end gap-2">
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '40px', fontWeight: 800, color: plan.highlight ? '#ffdcc3' : '#1b1b1d', letterSpacing: '-0.04em', lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.5)' : '#717786', paddingBottom: '6px' }}>{plan.period}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.65)' : '#414754', marginTop: '12px', lineHeight: 1.6 }}>{plan.desc}</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: plan.highlight ? '#ffdcc3' : '#8d4b00', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span style={{ fontSize: '13px', color: plan.highlight ? 'rgba(255,255,255,0.8)' : '#414754' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${baseHref}/contacto`}
                  className="inline-flex items-center justify-center rounded-md mt-auto transition-all hover:opacity-90"
                  style={{
                    background: plan.highlight ? 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' : 'transparent',
                    backgroundColor: plan.highlight ? undefined : 'transparent',
                    border: plan.highlight ? 'none' : '2px solid #3a5f94',
                    color: plan.highlight ? '#ffffff' : '#3a5f94',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '12px 24px',
                    textDecoration: 'none',
                  }}
                >
                  Empezar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical specs */}
      <section className="py-20" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Technical Standards</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '16px' }}>
                Every job meets federal and local compliance standards
              </h2>
              <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7 }}>
                We install to ACCA Manual J, S, and D specifications. All systems meet or exceed current Department of Energy SEER-2 minimums. Permits filed where required by city ordinance.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #c1c6d7' }}>
              {serviciosPage.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className="flex justify-between items-center px-6 py-4"
                  style={{ borderBottom: i < serviciosPage.specs.length - 1 ? '1px solid #e4e2e4' : 'none', backgroundColor: i % 2 === 0 ? '#ffffff' : '#f6f3f5' }}
                >
                  <span style={{ fontSize: '13px', color: '#414754' }}>{spec.label}</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, color: '#1b1b1d' }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-20" style={{ backgroundColor: '#f6f3f5' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto text-center">
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Service Area</p>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '24px' }}>
            Serving the greater Austin metro
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {serviciosPage.serviceArea.map(city => (
              <span
                key={city}
                className="px-5 py-2.5 rounded-full"
                style={{ fontSize: '13px', fontWeight: 600, backgroundColor: '#ffffff', color: '#1b1b1d', border: '1px solid #c1c6d7', boxShadow: '0 2px 8px rgba(27,27,29,0.04)' }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="rounded-2xl p-12 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)' }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
              Free site assessment and no-obligation quote within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`${baseHref}/contacto`}
                className="inline-flex items-center justify-center rounded-md transition-all hover:bg-white/90"
                style={{ backgroundColor: '#ffffff', color: '#8d4b00', fontSize: '14px', fontWeight: 700, padding: '14px 36px', textDecoration: 'none' }}
              >
                Pedir presupuesto gratis
              </Link>
              <a
                href={`tel:${business.phoneIntl}`}
                className="inline-flex items-center justify-center rounded-md"
                style={{ border: '2px solid rgba(255,255,255,0.5)', color: '#ffffff', fontSize: '14px', fontWeight: 600, padding: '14px 36px', textDecoration: 'none' }}
              >
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
