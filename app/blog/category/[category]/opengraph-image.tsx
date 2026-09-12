import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og-image';
import { getPostsCategories } from '@/lib/posts/api';
import { getCategoryPageData } from '@/lib/posts/page-data';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const categories = await getPostsCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = await getCategoryPageData(category);

  return renderOgImage(data?.seoTitle ?? 'Serhii Shramko');
}
