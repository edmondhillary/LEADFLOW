import { notFound } from 'next/navigation';
import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) return { title: 'No encontrado' };

  const content = await WebsiteContent.findById(lead.contentRef);

  return {
    title: content?.seo?.metaTitle || `${lead.businessName} | ${lead.city}`,
    description: content?.seo?.metaDesc || `${lead.businessName} - Servicios profesionales en ${lead.city}`,
    keywords: content?.seo?.keywords?.join(', '),
    openGraph: {
      title: content?.seo?.metaTitle || lead.businessName,
      description: content?.seo?.metaDesc,
      type: 'website',
    },
  };
}

export default async function BusinessLayout({ params, children }: Props) {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });

  if (!lead || lead.status === 'expired') {
    notFound();
  }

  const content = await WebsiteContent.findById(lead.contentRef);
  const design = content?.design || {};

  return (
    <div
      className="min-h-screen"
      style={{
        '--color-primary': design.primaryColor || '#2563eb',
        '--color-secondary': design.secondaryColor || '#1e40af',
        '--color-accent': design.accentColor || '#f59e0b',
      } as React.CSSProperties}
    >
      {/* Countdown Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-medium">
        🔥 Oferta especial: <span className="line-through opacity-75">
          {lead.currency === 'EUR' ? '60€/mes' : '$60/mes'}
        </span>{' '}
        → <span className="font-bold text-yellow-300">
          {lead.currency === 'EUR' ? '25€/mes' : '$25/mes'}
        </span>{' '}
        · Expira en: <span id="countdown" className="font-mono font-bold">48:00:00</span>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href={`/${slug}`} className="text-xl font-bold" style={{ color: design.primaryColor || '#2563eb' }}>
            {lead.businessName}
          </a>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href={`/${slug}`} className="hover:text-gray-900">Inicio</a>
            <a href={`/${slug}/servicios`} className="hover:text-gray-900">Servicios</a>
            <a href={`/${slug}/nosotros`} className="hover:text-gray-900">Nosotros</a>
            <a href={`/${slug}/blog`} className="hover:text-gray-900">Blog</a>
            <a href={`/${slug}/contacto`} className="hover:text-gray-900 font-semibold" style={{ color: design.primaryColor || '#2563eb' }}>
              Contacto
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      {children}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">{lead.businessName}</h3>
            <p className="text-sm">{lead.address || lead.city}</p>
            {lead.phone && <p className="text-sm mt-2">📞 {lead.phone}</p>}
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Navegación</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`/${slug}`} className="hover:text-white">Inicio</a>
              <a href={`/${slug}/servicios`} className="hover:text-white">Servicios</a>
              <a href={`/${slug}/nosotros`} className="hover:text-white">Nosotros</a>
              <a href={`/${slug}/contacto`} className="hover:text-white">Contacto</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Horario</h4>
            <p className="text-sm">Lunes a Viernes: 9:00 - 20:00</p>
            <p className="text-sm">Sábados: 10:00 - 14:00</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {lead.businessName}. Todos los derechos reservados.
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      {lead.phone && (
        <a
          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 transition-transform hover:scale-110"
          aria-label="WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
        </a>
      )}

      {/* Tracking Pixel */}
      <img
        src={`/api/track/${lead._id}`}
        alt=""
        width={1}
        height={1}
        style={{ position: 'absolute', opacity: 0 }}
      />

      {/* Countdown Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const created = new Date("${lead.createdAt.toISOString()}");
              const expires = new Date(created.getTime() + 48 * 60 * 60 * 1000);
              const el = document.getElementById('countdown');
              if (!el) return;
              function update() {
                const now = new Date();
                const diff = expires.getTime() - now.getTime();
                if (diff <= 0) { el.textContent = '¡Expirado!'; return; }
                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                el.textContent = h.toString().padStart(2,'0') + ':' + m.toString().padStart(2,'0') + ':' + s.toString().padStart(2,'0');
              }
              update();
              setInterval(update, 1000);
            })();
          `,
        }}
      />
    </div>
  );
}
