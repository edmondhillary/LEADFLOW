import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function ServiciosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const servicios = content?.pages?.servicios;
  const design = content?.design || {};

  return (
    <main className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {servicios?.title || 'Nuestros Servicios'}
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          {servicios?.intro || `Descubre todos los servicios que ${lead.businessName} ofrece en ${lead.city}.`}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {(servicios?.items || []).map((service: any, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{service.icon || '✅'}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  {service.price && (
                    <p className="text-sm font-medium" style={{ color: design.primaryColor || '#2563eb' }}>
                      {service.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`/${slug}/contacto`}
            className="inline-block text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition"
            style={{ backgroundColor: design.primaryColor || '#2563eb' }}
          >
            Solicitar presupuesto
          </a>
        </div>
      </div>
    </main>
  );
}
