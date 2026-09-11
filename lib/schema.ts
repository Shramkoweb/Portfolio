import { SITE_URL } from '@/lib/constants';
import { BaseFrontmatter } from '@/lib/types';
const AUTHOR_ID = `${SITE_URL}/#person`;

const author = {
  '@type': 'Person' as const,
  '@id': AUTHOR_ID,
  name: 'Serhii Shramko',
  url: `${SITE_URL}/about`,
};

/**
 * Serialize a schema object for injection into a
 * `<script type="application/ld+json">` tag.
 *
 * `JSON.stringify` does not escape `<`, so a value containing `</script>` (or
 * `<!--`) would terminate the script element and drop the parser into HTML
 * context. Escaping `<` neutralises both breakout sequences; nothing else can
 * terminate a `<script>` element. `&` needs no escaping because script content
 * is raw text and is not entity-decoded.
 *
 * U+2028/U+2029 are deliberately NOT escaped: this output is parsed as JSON,
 * not as JavaScript, because the tag is `type="application/ld+json"`. If this
 * helper is ever used to inline data into a JS bundle, that exemption no longer
 * holds and those two code points must be escaped as well.
 *
 * `<` is a valid RFC 8259 escape that decodes back to `<`, so every
 * conformant JSON parser (Google's included) sees the original value.
 */
export function serializeJsonLd(schema: unknown): string {
  // `JSON.stringify` returns `undefined` for `undefined`, functions and
  // symbols, so guard the result before calling `.replace` on it.
  const json: string | undefined = JSON.stringify(schema);

  if (json === undefined) return 'null';

  return json.replace(/</g, '\\u003c');
}

function toIsoDate(value?: number | null): string | null {
  if (value == null) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function generateBlogPostingSchema(
  post: BaseFrontmatter & { categories?: string[] },
) {
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
