import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function ContactoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const contacto = content?.pages?.contacto;
  const design = content?.design || {};

  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {contacto?.title || 'Contacto'}
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {contacto?.subtitle || `Ponte en contacto con ${lead.businessName}`}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario */}
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': design.primaryColor } as any} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:outline-none" />
              </div>
              <button
                type="submit"
                className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
                style={{ backgroundColor: design.primaryColor || '#2563eb' }}
              >
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Info de contacto */}
          <div className="space-y-6">
            {lead.phone && (
              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Teléfono</h3>
                  <a href={`tel:${lead.phone}`} className="text-gray-600 hover:underline">{lead.phone}</a>
                </div>
              </div>
            )}

            {lead.email && (
              <div className="flex items-start gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href={`mailto:${lead.email}`} className="text-gray-600 hover:underline">{lead.email}</a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <h3 className="font-semibold text-gray-900">Dirección</h3>
                <p className="text-gray-600">{lead.address || lead.city}</p>
              </div>
            </div>

            {lead.phone && (
              <a
                href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition w-fit"
              >
                <span>💬</span> WhatsApp
              </a>
            )}

            {/* Google Maps embed */}
            <div className="rounded-xl overflow-hidden h-64 bg-gray-100">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&q=${encodeURIComponent(contacto?.mapQuery || `${lead.businessName} ${lead.city}`)}`}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
