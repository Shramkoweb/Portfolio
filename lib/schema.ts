import { BaseFrontmatter } from '@/lib/types';

const SITE_URL = 'https://shramko.dev';
const AUTHOR_ID = `${SITE_URL}/#person`;

const author = {
  '@type': 'Person' as const,
  '@id': AUTHOR_ID,
  name: 'Serhii Shramko',
  url: `${SITE_URL}/about`,
};

export function generateBlogPostingSchema(post: BaseFrontmatter & { categories?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}/#article`,
    headline: post.heading,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: new Date(post.createDate).toISOString(),
    ...(post.updateDate && {
      dateModified: new Date(post.updateDate).toISOString(),
    }),
    author,
    publisher: author,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    image: `${SITE_URL}/api/og?title=${encodeURIComponent(post.heading)}`,
    keywords: post.keywords,
    articleSection: 'Technology',
    inLanguage: 'en',
  };
}

export function generateTechArticleSchema(
  snippet: BaseFrontmatter,
  proficiencyLevel: 'Beginner' | 'Expert' = 'Beginner',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_URL}/snippets/${snippet.slug}/#article`,
    headline: snippet.heading,
    description: snippet.description,
    url: `${SITE_URL}/snippets/${snippet.slug}`,
    datePublished: new Date(snippet.createDate).toISOString(),
    ...(snippet.updateDate && {
      dateModified: new Date(snippet.updateDate).toISOString(),
    }),
    author,
    publisher: author,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/snippets/${snippet.slug}`,
    },
    keywords: snippet.keywords,
    inLanguage: 'en',
    proficiencyLevel,
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Serhii Shramko',
    description:
      'Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js.',
    author,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
