import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function NosotrosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const nosotros = content?.pages?.nosotros;
  const design = content?.design || {};

  return (
    <main className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {nosotros?.title || 'Sobre Nosotros'}
        </h1>

        {/* Historia */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-600 text-lg leading-relaxed">
            {nosotros?.story || `${lead.businessName} es una empresa con amplia experiencia en el sector, ofreciendo servicios de calidad en ${lead.city} y alrededores.`}
          </p>
        </div>

        {/* Años de experiencia */}
        {nosotros?.yearsExperience && (
          <div className="text-center py-12 rounded-xl mb-12" style={{ backgroundColor: `${design.primaryColor}10` || '#2563eb10' }}>
            <div className="text-5xl font-bold mb-2" style={{ color: design.primaryColor || '#2563eb' }}>
              +{nosotros.yearsExperience}
            </div>
            <div className="text-gray-600">años de experiencia</div>
          </div>
        )}

        {/* Valores */}
        {nosotros?.values && nosotros.values.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {nosotros.values.map((value: any, i: number) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={`/${slug}/contacto`}
            className="inline-block text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition"
            style={{ backgroundColor: design.primaryColor || '#2563eb' }}
          >
            Contactar con nosotros
          </a>
        </div>
      </div>
    </main>
  );
}
