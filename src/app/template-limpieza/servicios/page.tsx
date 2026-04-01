import Link from 'next/link';
import { services, pricingPlans, process, images, serviciosPage } from '../data';

export default function ServiciosPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#80f98b] mb-6">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#007327' }}>cleaning_services</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#007327' }}>{serviciosPage.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', marginBottom: '20px', lineHeight: 1.05 }}>
            {serviciosPage.title}
          </h1>
          <p style={{ fontSize: '17px', color: '#414754', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            {serviciosPage.intro}
          </p>
        </div>
      </section>

      {/* Service Cards Bento */}
      <section className="w-full bg-[#f3f4f5] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.name} className="bg-white rounded-xl overflow-hidden group" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.06)' }}>
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={s.name === 'Residential Cleaning' ? images.heroClean : s.name === 'Commercial Cleaning' ? images.officeClean : s.name === 'Industrial Cleaning' ? images.freshRoom : s.name === 'Post-Construction' ? images.cleanerWorking : s.name === 'Medical / Clinical' ? images.officeClean : images.freshRoom}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#edeeef' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#0059bb' }}>{s.icon}</span>
                    </div>
                    {s.urgent && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#80f98b', color: '#007327' }}>Eco-Certified</span>
                    )}
                  </div>

                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '18px', fontWeight: 700, color: '#191c1d', marginBottom: '8px' }}>{s.name}</h3>
                  <p style={{ fontSize: '14px', color: '#414754', lineHeight: 1.7, marginBottom: '16px' }}>{s.desc}</p>

                  <Link href="/template-limpieza/contacto" className="flex items-center gap-1 transition-all hover:gap-2 duration-200" style={{ fontSize: '13px', fontWeight: 600, color: '#0059bb', textDecoration: 'none' }}>
                    Request Quote
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Transparent Pricing</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d' }}>
              Simple, Clear Plans
            </h2>
            <p style={{ fontSize: '15px', color: '#414754', marginTop: '12px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              No hidden fees. Every plan includes eco-friendly products and our 100% satisfaction guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map(plan => (
              <div key={plan.name} className="rounded-xl p-8 flex flex-col" style={{
                backgroundColor: plan.highlighted ? '#0059bb' : '#ffffff',
                boxShadow: plan.highlighted ? '0 20px 60px -15px rgba(0,89,187,0.4)' : '0 10px 40px -10px rgba(25,28,29,0.06)',
                transform: plan.highlighted ? 'scale(1.03)' : 'scale(1)',
              }}>
                {plan.highlighted && (
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#80f98b', color: '#007327' }}>Most Popular</span>
                  </div>
                )}
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: plan.highlighted ? '#ffffff' : '#191c1d', marginBottom: '4px' }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: plan.highlighted ? 'rgba(255,255,255,0.7)' : '#414754', marginBottom: '16px' }}>{plan.desc}</p>

                <div className="mb-6">
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '40px', fontWeight: 800, color: plan.highlighted ? '#ffffff' : '#0059bb', letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ fontSize: '14px', color: plan.highlighted ? 'rgba(255,255,255,0.7)' : '#414754', marginLeft: '6px' }}>{plan.period}</span>
                </div>

                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: plan.highlighted ? '#80f98b' : '#006e25', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span style={{ fontSize: '14px', color: plan.highlighted ? 'rgba(255,255,255,0.85)' : '#414754' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/template-limpieza/contacto" className="block text-center rounded-lg py-3 transition-all hover:opacity-90 active:scale-[0.98]" style={{
                  backgroundColor: plan.highlighted ? '#ffffff' : '#0059bb',
                  color: plan.highlighted ? '#0059bb' : '#ffffff',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                }}>
                  {plan.cta === 'Most Popular' ? 'Get Started' : plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full bg-[#f3f4f5] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>How It Works</p>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d' }}>
              Four Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, idx) => (
              <div key={step.step} className="bg-white rounded-xl p-8 relative" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.04)' }}>
                {idx < process.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-3 z-10">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c1c6d7' }}>chevron_right</span>
                  </div>
                )}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#edeeef' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#0059bb' }}>{step.icon}</span>
                </div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Step {step.step}</p>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '17px', fontWeight: 700, color: '#191c1d', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 px-6 md:px-8 relative overflow-hidden" style={{ backgroundColor: '#0059bb' }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: '16px' }}>
            Find Your Perfect Plan
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Not sure which service fits best? Contact us for a custom quote tailored to your exact needs.
          </p>
          <Link href="/template-limpieza/contacto" className="inline-block rounded-lg transition-all hover:opacity-90 active:scale-[0.98]" style={{ backgroundColor: '#ffffff', color: '#0059bb', fontSize: '15px', fontWeight: 700, padding: '14px 32px', textDecoration: 'none' }}>
            Request a Custom Quote
          </Link>
        </div>
      </section>

    </div>
  );
}
