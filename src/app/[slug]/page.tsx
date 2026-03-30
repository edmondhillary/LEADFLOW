import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';

// ISR: regenera cada hora
export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BusinessHome({ params }: Props) {
  const { slug } = await params;
  await connectDB();

  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const home = content?.pages?.home;
  const design = content?.design || {};

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-24 px-4" style={{ backgroundColor: design.primaryColor || '#2563eb' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {home?.heroTitle || lead.businessName}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            {home?.heroSubtitle || `Servicios profesionales en ${lead.city}`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${slug}/contacto`}
              className="bg-white font-bold py-3 px-8 rounded-lg text-lg transition-transform hover:scale-105 shadow-lg"
              style={{ color: design.primaryColor || '#2563eb' }}
            >
              {home?.heroCTA || 'Pide presupuesto gratis'}
            </a>
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white/10 transition"
              >
                📞 Llamar ahora
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {home?.featuredServices && home.featuredServices.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nuestros Servicios
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {home.featuredServices.map((service: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-3xl mb-4">{service.icon || '⭐'}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href={`/${slug}/servicios`}
                className="text-sm font-medium hover:underline"
                style={{ color: design.primaryColor || '#2563eb' }}
              >
                Ver todos los servicios →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {home?.testimonials && home.testimonials.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {home.testimonials.map((testimonial: any, i: number) => (
                <div key={i} className="bg-white border border-gray-100 p-6 rounded-xl">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, j) => (
                      <span key={j} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ backgroundColor: design.primaryColor || '#2563eb' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas nuestros servicios?</h2>
          <p className="text-lg opacity-90 mb-8">
            Contacta con nosotros y te daremos un presupuesto sin compromiso
          </p>
          <a
            href={`/${slug}/contacto`}
            className="inline-block bg-white font-bold py-3 px-8 rounded-lg text-lg hover:scale-105 transition-transform shadow-lg"
            style={{ color: design.primaryColor || '#2563eb' }}
          >
            Contactar ahora
          </a>
        </div>
      </section>
    </main>
  );
}
