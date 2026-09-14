import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/constants';
import type { PostMetadata, Snippet } from '@/lib/types';

export const STATIC_PATHS = [
  '/',
  '/about',
  '/blog',
  '/bookmarks',
  '/dashboard',
  '/gear',
  '/learning',
  '/quizlet-list',
  '/quizlet-list/privacy-policy',
  '/snippets',
  '/udemy-reset-progress',
] as const;

const PRIORITY_BY_DEPTH: Record<number, number> = {
  0: 1,
  1: 0.9,
  2: 0.8,
  3: 0.7,
};

export function priorityForPath(path: string): number {
  const depth = path === '/' ? 0 : path.split('/').length - 1;
  return PRIORITY_BY_DEPTH[depth] ?? 0.7;
}

interface SitemapSource {
  posts: PostMetadata[];
  snippets: Pick<Snippet, 'data'>[];
  categories: string[];
}

function entry(
  path: string,
  lastModified?: number | null,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    priority: priorityForPath(path),
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
  };
}

export function buildSitemap(source: SitemapSource): MetadataRoute.Sitemap {
  const { posts, snippets, categories } = source;

  return [
    ...STATIC_PATHS.map((path) => entry(path)),
    ...posts.map((post) =>
      entry(
        `/blog/${post.data.slug}`,
        post.data.updateDate ?? post.data.createDate,
      ),
    ),
    ...categories.map((category) =>
      entry(`/blog/category/${category.toLowerCase()}`),
    ),
    ...snippets.map((snippet) =>
      entry(
        `/snippets/${snippet.data.slug}`,
        snippet.data.updateDate ?? snippet.data.createDate,
      ),
    ),
  ];
}
