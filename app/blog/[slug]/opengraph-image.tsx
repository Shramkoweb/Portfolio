import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';
import { getPostBySlug, getPostSlugs } from '@/lib/posts/api';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getPostBySlug(slug);

  return renderOgImage(data.title);
}
