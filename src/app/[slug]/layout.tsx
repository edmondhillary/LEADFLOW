import { notFound } from 'next/navigation';
import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { getSectorImages } from '@/lib/images';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }>; children: React.ReactNode };

// ─── Metadata (SEO) ──────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) return { title: 'No encontrado' };
  const content = await WebsiteContent.findById(lead.contentRef);
  const imgs = getSectorImages(lead.sector);

  return {
    title: content?.seo?.metaTitle || `${lead.businessName} | ${lead.sector} en ${lead.city}`,
    description: content?.seo?.metaDesc || `${lead.businessName} - Servicios profesionales de ${lead.sector} en ${lead.city}.`,
    keywords: content?.seo?.keywords?.join(', '),
    openGraph: {
      title: content?.seo?.metaTitle || lead.businessName,
      description: content?.seo?.metaDesc,
      type: 'website',
      images: [{ url: imgs.og, width: 1200, height: 630 }],
    },
  };
}

export default async function BusinessLayout({ params, children }: Props) {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead || lead.status === 'expired') notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const d = content?.design || {};

  const primary   = d.primaryColor   || '#2563eb';
  const primaryDk = d.primaryDark    || '#1d4ed8';
  const accent    = d.accentColor    || '#f59e0b';
  const surface   = d.surfaceColor   || '#f8fafc';
  const textColor = d.textColor      || '#1f2937';
  const font      = d.font           || 'Inter';

  const schema = {
    '@context': 'https://schema.org',
    '@type': content?.seo?.schemaType || 'LocalBusiness',
    name: lead.businessName,
    description: content?.seo?.metaDesc,
    telephone: lead.phone,
    address: { '@type': 'PostalAddress', addressLocality: lead.city, addressCountry: lead.country },
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app'}/${slug}`,
    image: getSectorImages(lead.sector).og,
  };

  const navLinks = [
    { href: `/${slug}`,          label: 'Inicio' },
    { href: `/${slug}/servicios`, label: 'Servicios' },
    { href: `/${slug}/nosotros`,  label: 'Nosotros' },
    { href: `/${slug}/blog`,      label: 'Blog' },
    { href: `/${slug}/contacto`,  label: 'Contacto' },
  ];

  const waNumber = lead.phone?.replace(/\D/g, '');

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: `'${font}', system-ui, sans-serif`, color: textColor }}>
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Skip link */}
      <a href="#main-content" className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-lg focus-visible:shadow-lg focus-visible:text-sm focus-visible:font-medium">
        Saltar al contenido
      </a>

      {/* Urgency Banner */}
      <div className="text-white text-center py-2.5 px-4 text-sm font-medium" style={{ backgroundColor: primaryDk }}>
        Oferta especial — Demo gratuita disponible solo{' '}
        <strong><span id="countdown" className="font-mono tabular-nums">48:00:00</span></strong>
      </div>

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${slug}`} className="font-bold text-lg truncate max-w-[220px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded" style={{ color: primary, '--tw-ring-color': primary } as any}>
              {lead.businessName}
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-7">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded" style={{ '--tw-ring-color': primary } as any}>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {lead.phone && (
                <a href={`tel:${lead.phone}`} className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded" style={{ '--tw-ring-color': primary } as any} aria-label={`Llamar al ${lead.phone}`}>
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  <span className="hidden xl:inline">{lead.phone}</span>
                </a>
              )}
              <Link href={`/${slug}/contacto`} className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-opacity duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: accent, color: '#fff', '--tw-ring-color': accent } as any}>
                Pedir Presupuesto
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile nav scrollable */}
        <nav aria-label="Navegación móvil" className="lg:hidden border-t border-gray-100 px-4 py-1.5 flex gap-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-gray-600 whitespace-nowrap py-1 focus-visible:outline-none focus-visible:ring-2 rounded" style={{ '--tw-ring-color': primary } as any}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Page Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400" aria-label="Pie de página">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <p className="font-bold text-white text-lg mb-2">{lead.businessName}</p>
              <p className="text-sm leading-relaxed mb-4">Servicios profesionales de {lead.sector} en {lead.city}.</p>
              {lead.phone && (
                <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 text-sm font-medium hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded" style={{ color: accent, '--tw-ring-color': accent } as any}>
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  {lead.phone}
                </a>
              )}
            </div>

            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Páginas</p>
              <ul className="space-y-2.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded" style={{ '--tw-ring-color': accent } as any}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <svg aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  <span>{lead.city}, {lead.country === 'ES' ? 'España' : lead.country === 'AR' ? 'Argentina' : 'Uruguay'}</span>
                </li>
                {lead.phone && (
                  <li className="flex items-center gap-2.5">
                    <svg aria-hidden="true" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors duration-150">{lead.phone}</a>
                  </li>
                )}
                <li className="flex items-center gap-2.5">
                  <svg aria-hidden="true" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Lun–Vie 9:00–18:00</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} {lead.businessName}. Todos los derechos reservados.</p>
            <p>Desarrollado por LeadFlow</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      {waNumber && (
        <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-[#25d366] hover:bg-[#22c55e] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25d366] focus-visible:ring-offset-2" style={{ touchAction: 'manipulation' }}>
          <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.059 23.57a.5.5 0 00.611.611l5.713-1.473A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 01-5.068-1.38l-.362-.215-3.748.965.985-3.607-.235-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
        </a>
      )}

      {/* Tracking pixel */}
      <img src={`/api/track/${lead._id}`} alt="" width={1} height={1} style={{ position: 'absolute', opacity: 0 }} />

      {/* Countdown */}
      <script dangerouslySetInnerHTML={{ __html: `(function(){const e=new Date("${lead.createdAt.toISOString()}"),x=new Date(e.getTime()+48*3600000),el=document.getElementById('countdown');if(!el)return;function u(){const d=x-Date.now();if(d<=0){el.textContent='¡Expirado!';return;}const h=Math.floor(d/3600000),m=Math.floor(d%3600000/60000),s=Math.floor(d%60000/1000);el.textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}u();setInterval(u,1000);})();` }} />
    </div>
  );
}
