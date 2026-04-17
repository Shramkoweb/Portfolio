import { BaseFrontmatter, FAQItem } from '@/lib/types';
import { SITE_URL } from '@/lib/constants';
const AUTHOR_ID = `${SITE_URL}/#person`;

const author = {
  '@type': 'Person' as const,
  '@id': AUTHOR_ID,
  name: 'Serhii Shramko',
  url: `${SITE_URL}/about`,
};

function toIsoDate(value?: number | null): string | null {
  if (value == null) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function generateBlogPostingSchema(post: BaseFrontmatter & { categories?: string[] }) {
  const datePublished = toIsoDate(post.createDate);

  if (!datePublished) {
    throw new Error(`Invalid createDate for blog post "${post.slug}"`);
  }

  const dateModified = toIsoDate(post.updateDate);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}/#article`,
    headline: post.heading,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished,
    ...(dateModified && { dateModified }),
    author,
    publisher: author,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    image: `${SITE_URL}/api/og?title=${encodeURIComponent(post.heading)}`,
    keywords: post.keywords,
    articleSection: post.categories?.[0] || 'Technology',
    inLanguage: 'en',
  };
}

export function generateTechArticleSchema(
  snippet: BaseFrontmatter & { programmingLanguage?: string },
  proficiencyLevel: 'Beginner' | 'Expert' = 'Beginner',
) {
  const datePublished = toIsoDate(snippet.createDate);

  if (!datePublished) {
    throw new Error(`Invalid createDate for snippet "${snippet.slug}"`);
  }

  const dateModified = toIsoDate(snippet.updateDate);

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_URL}/snippets/${snippet.slug}/#article`,
    headline: snippet.heading,
    description: snippet.description,
    url: `${SITE_URL}/snippets/${snippet.slug}`,
    datePublished,
    ...(dateModified && { dateModified }),
    author,
    publisher: author,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/snippets/${snippet.slug}`,
    },
    keywords: snippet.keywords,
    inLanguage: 'en',
    proficiencyLevel,
    about: {
      '@type': 'SoftwareSourceCode',
      programmingLanguage: snippet.programmingLanguage || 'JavaScript',
    },
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

export function generateFAQPageSchema(faq: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
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
  };
}
