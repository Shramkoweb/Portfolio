import type { Metadata } from 'next';

import { SITE_URL } from '@/lib/constants';

export const SITE_NAME = 'Serhii Shramko';
export const SITE_TITLE = 'Serhii Shramko – Developer, writer, creator.';
export const SITE_DESCRIPTION =
  'Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js. Practical tutorials, code snippets, and tips for web developers.';
export const SITE_IMAGE = `${SITE_URL}/static/images/twittersite.png`;
export const TWITTER_HANDLE = '@shramkoweb';
export const RSS_FEED_ALTERNATE = {
  'application/rss+xml': [
    { url: `${SITE_URL}/feed.xml`, title: "Serhii Shramko's Blog" },
  ],
};

type OpenGraph = NonNullable<Metadata['openGraph']>;
type Twitter = NonNullable<Metadata['twitter']>;

export interface PageMetadataInput {
  /** Route path such as `/about`; becomes the canonical URL and og:url. */
  path: string;
  title: string;
  description?: string;
  keywords?: string[];
  /**
   * Social image. Defaults to the site image. Pass `null` on routes that ship
   * an `opengraph-image.tsx`: Next applies the file-based image only when the
   * exported metadata has no `openGraph.images` key.
   */
  image?: string | null;
  authors?: Metadata['authors'];
  openGraph?: Partial<OpenGraph>;
  twitter?: Partial<Twitter>;
}

export function pageMetadata(input: PageMetadataInput): Metadata {
  const {
    path,
    title,
    description = SITE_DESCRIPTION,
    keywords,
    image = SITE_IMAGE,
    authors,
    openGraph,
    twitter,
  } = input;
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(authors ? { authors } : {}),
    alternates: { canonical: url, types: RSS_FEED_ALTERNATE },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url,
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
      ...openGraph,
    } as OpenGraph,
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      ...twitter,
    } as Twitter,
  };
}

export interface ArticleMetadataInput {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  createDate: number;
  updateDate: number | null;
  categories?: string[];
}

export function articleMetadata(input: ArticleMetadataInput): Metadata {
  const { createDate, updateDate, categories, ...page } = input;

  return pageMetadata({
    ...page,
    image: null,
    openGraph: {
      type: 'article',
      publishedTime: new Date(createDate).toISOString(),
      ...(updateDate
        ? { modifiedTime: new Date(updateDate).toISOString() }
        : {}),
      section: 'Technology',
      authors: [SITE_URL],
      ...(categories && categories.length > 0 ? { tags: categories } : {}),
    },
  });
}
