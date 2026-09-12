import type { MetadataRoute } from 'next';

import { getPostsCategories, getPostsMetadata } from '@/lib/posts/api';
import { buildSitemap } from '@/lib/sitemap';
import { getSnippets } from '@/lib/snippets/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, snippets, categories] = await Promise.all([
    getPostsMetadata(),
    getSnippets(),
    getPostsCategories(),
  ]);

  return buildSitemap({ posts, snippets, categories });
}
