import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSectorImages } from '@/lib/images';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

// ─── Star Rating ─────────────────────────────────────────────────────────────
function Stars({ rating, primary }: { rating: number; primary: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} aria-hidden="true" className="w-4 h-4" viewBox="0 0 20 20" fill={i < rating ? '#fbbf24' : '#d1d5db'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function BusinessHome({ params }: Props) {
  const { slug } = await params;
  await connectDB();

  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const home    = content?.pages?.home;
  const d       = content?.design || {};
  const seo     = content?.seo || {};
  const imgs    = getSectorImages(lead.sector);

  const primary   = d.primaryColor   || '#2563eb';
  const primaryDk = d.primaryDark    || '#1d4ed8';
  const accent    = d.accentColor    || '#f59e0b';
  const surface   = d.surfaceColor   || '#f8fafc';
  const textColor = d.textColor      || '#1f2937';
  const textMuted = '#6b7280';

  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-[90vh] flex items-center" aria-label="Hero">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imgs.hero}
            alt={`${lead.sector} profesional en ${lead.city}`}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${primary}ee 0%, ${primaryDk}cc 60%, transparent 100%)` }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
              Profesionales en {lead.sector} · {lead.city}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-pretty mb-6">
              {home?.heroTitle || seo?.h1 || lead.businessName}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-lg">
              {home?.heroSubtitle || `Servicios profesionales de ${lead.sector} en ${lead.city}. Presupuesto sin compromiso.`}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${slug}/contacto`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold rounded-xl transition-opacity duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-lg"
                style={{ backgroundColor: accent, color: '#fff', '--tw-ring-color': accent } as any}
              >
                {home?.heroCTA || 'Pedir Presupuesto Gratis'}
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  Llamar Ahora
                </a>
              )}
            </div>
          </div>

          {/* Hero card (desktop) */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primary}20` }}>
                  <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={primary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{lead.businessName}</p>
                  <p className="text-sm text-gray-500">{lead.city}</p>
                </div>
              </div>
              {home?.trustBadges?.slice(0, 3).map((b: any, i: number) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                  <svg aria-hidden="true" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={primary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  <span className="text-sm font-medium text-gray-700">{b.text}</span>
                </div>
              ))}
              {(!home?.trustBadges || home.trustBadges.length === 0) && (
                <>
                  {['Presupuesto sin compromiso', 'Respuesta en menos de 2h', 'Más de 200 clientes satisfechos'].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                      <svg aria-hidden="true" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={primary} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      <span className="text-sm font-medium text-gray-700">{t}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TRUST BADGES ══════════════════ */}
      <section className="py-10 border-b border-gray-100" style={{ backgroundColor: surface }} aria-label="Datos de confianza">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: '+200', label: 'Clientes satisfechos', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
              { n: '+10', label: 'Años de experiencia', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { n: '100%', label: 'Garantía de satisfacción', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
              { n: '2h', label: 'Tiempo de respuesta', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
            ].map(({ n, label, icon }, i) => (
              <div key={i} className="p-4" style={{ color: primary }}>
                {icon}
                <p className="text-3xl font-extrabold" style={{ color: primary, fontVariantNumeric: 'tabular-nums' }}>{n}</p>
                <p className="text-sm text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      {home?.featuredServices?.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Servicios destacados">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Lo que hacemos</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-pretty">Nuestros Servicios</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Soluciones profesionales de {lead.sector} adaptadas a cada cliente en {lead.city}.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {home.featuredServices.map((service: any, i: number) => (
                <div key={i} className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200" style={{ backgroundColor: `${primary}15` }}>
                    <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={primary} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href={`/${slug}/servicios`} className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity duration-150 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded" style={{ color: primary, '--tw-ring-color': primary } as any}>
                Ver todos los servicios
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section className="py-20" style={{ backgroundColor: surface }} aria-label="Sobre nosotros">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src={imgs.about}
                  alt={`Equipo de ${lead.businessName} en ${lead.city}`}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 hidden sm:block bg-white rounded-2xl shadow-lg px-6 py-4 text-center">
                <p className="text-3xl font-extrabold" style={{ color: primary }}>+10</p>
                <p className="text-sm text-gray-600 font-medium">Años de<br/>experiencia</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Quiénes Somos</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-pretty mb-6">
                {lead.businessName}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {home?.aboutSnippet || `Somos especialistas en ${lead.sector} en ${lead.city} con más de 10 años de experiencia. Nuestro compromiso es ofrecer el mejor servicio con la máxima profesionalidad.`}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {['Presupuesto gratuito', 'Garantía de calidad', 'Respuesta rápida', 'Precios competitivos'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${primary}20` }}>
                      <svg aria-hidden="true" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={primary} strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link href={`/${slug}/nosotros`} className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border-2 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderColor: primary, color: primary, '--tw-ring-color': primary } as any}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = primary; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = primary; }}
              >
                Conocer el equipo
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      {home?.testimonials?.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Testimonios">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Opiniones</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-pretty">Lo que dicen nuestros clientes</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {home.testimonials.map((t: any, i: number) => (
                <article key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col">
                  <Stars rating={t.rating || 5} primary={primary} />
                  <blockquote className="mt-4 text-gray-600 text-sm leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <footer className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: primary }}>
                      {t.name?.charAt(0) || 'C'}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: primary }} aria-label="Llamada a la acción">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full" style={{ backgroundColor: '#ffffff' }} />
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full" style={{ backgroundColor: '#ffffff' }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold text-pretty mb-4">
            ¿Necesitas un {lead.sector} en {lead.city}?
          </h2>
          <p className="text-lg text-white/85 mb-8">
            Contacta ahora y recibe un presupuesto sin compromiso en menos de 2 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${slug}/contacto`} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl transition-opacity duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 shadow-lg" style={{ backgroundColor: accent, color: '#fff', '--tw-ring-color': accent } as any}>
              Solicitar Presupuesto Gratis
              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                Llamar Ahora
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
