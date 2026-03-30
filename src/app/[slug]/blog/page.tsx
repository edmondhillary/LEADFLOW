import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const posts = content?.pages?.blog || [];
  const design = content?.design || {};

  return (
    <main className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600 mb-12">
          Consejos y artículos sobre {lead.sector} en {lead.city}
        </p>

        <div className="space-y-8">
          {posts.map((post: any, i: number) => (
            <article key={i} className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="prose prose-gray max-w-none text-sm">
                <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
              </div>
              {post.keywords && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {post.keywords.map((kw: string, j: number) => (
                    <span key={j} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            Próximamente publicaremos artículos.
          </p>
        )}
      </div>
    </main>
  );
}
