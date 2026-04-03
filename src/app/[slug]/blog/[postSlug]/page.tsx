import { notFound } from 'next/navigation';

import { getTemplateName } from '@/config/sectors';
import { getLeadOverrides } from '@/lib/lead-template-data';
import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { hasTemplate, loadTemplateBlogPost } from '@/lib/template-registry';
import { shouldUseOverrideV2 } from '@/lib/override-rollout';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string; postSlug: string }> };

export default async function LeadBlogPostPage({ params }: Props) {
  const { slug, postSlug } = await params;

  await connectDB();
  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const templateName = lead.templateUsed && hasTemplate(lead.templateUsed)
    ? lead.templateUsed
    : getTemplateName(lead.sector);
  const useOverrideV2 = shouldUseOverrideV2('blogPost');
  const TemplateBlogPost = useOverrideV2 ? null : await loadTemplateBlogPost(templateName);
  const overrides = await getLeadOverrides(slug);

  if (TemplateBlogPost) {
    return <TemplateBlogPost params={Promise.resolve({ slug: postSlug })} overrides={overrides || undefined} />;
  }

  const content = await WebsiteContent.findById(lead.contentRef).lean() as any;
  const post = (content?.pages?.blog || []).find((p: any) => p.slug === postSlug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-sm text-gray-500 mb-4">{overrides?.businessName} · {overrides?.city}</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">{post.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{post.excerpt}</p>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>{post.content || post.excerpt}</p>
      </div>
    </article>
  );
}
