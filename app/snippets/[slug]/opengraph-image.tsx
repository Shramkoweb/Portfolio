import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';
import { getSnippetBySlug, getSnippetSlugs } from '@/lib/snippets/api';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const slugs = await getSnippetSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getSnippetBySlug(slug);

  return renderOgImage(data.title);
}
