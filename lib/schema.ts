import { SITE_URL, type StoreRating } from '@/lib/constants';
import { getSocialImage } from '@/lib/seo';
import { BaseFrontmatter, PostCategory } from '@/lib/types';

const PERSON_ID = `${SITE_URL}/#person`;

export const person = {
  '@type': 'Person' as const,
  '@id': PERSON_ID,
  name: 'Serhii Shramko',
  url: `${SITE_URL}/about`,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/static/images/about.jpeg`,
    width: 1269,
    height: 846,
  },
  jobTitle: 'Senior Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'BetterMe',
    url: 'https://betterme.world/',
  },
  sameAs: [
    'https://github.com/shramkoweb',
    'https://www.linkedin.com/in/shramko-dev',
    'https://www.producthunt.com/@shramko_dev',
  ],
};

export const personReference = { '@id': PERSON_ID };

const CATEGORY_NAMES: Record<PostCategory, string> = {
  [PostCategory.JS]: 'JavaScript',
  [PostCategory.Vercel]: 'Vercel',
  [PostCategory.Tutorial]: 'Tutorial',
  [PostCategory.TS]: 'TypeScript',
  [PostCategory.CSS]: 'CSS',
  [PostCategory.Astro]: 'Astro',
  [PostCategory.HTML]: 'HTML',
  [PostCategory.CleanCode]: 'Clean Code',
  [PostCategory.ProjectSetup]: 'Project Setup',
  [PostCategory.Node]: 'Node.js',
  [PostCategory.React]: 'React',
  [PostCategory.Opinion]: 'Opinion',
  [PostCategory.Productivity]: 'Productivity',
  [PostCategory.Tools]: 'Tools',
  [PostCategory.AdvancedReact]: 'Advanced React',
  [PostCategory.SEO]: 'SEO',
  [PostCategory.AI]: 'AI',
};

// Blocks a `</script>` breakout from the ld+json tag. Not sufficient for
// inlining into a JS bundle — that also needs U+2028/U+2029 escaped.
export function serializeJsonLd(schema: unknown): string {
  const json: string | undefined = JSON.stringify(schema);

  if (json === undefined) return 'null';

  return json.replace(/</g, '\\u003c');
}

function toIsoDate(value?: number | null): string | null {
  if (value == null) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function requireIsoDate(value: number, label: string): string {
  const date = toIsoDate(value);

  if (!date) {
    throw new Error(`Invalid createDate for ${label}`);
  }

  return date;
}

function articleImage(heading: string) {
  const { url, width, height } = getSocialImage(heading);

  return { '@type': 'ImageObject', url, width, height };
}

function articleSection(categories: string[] = []): string {
  const [first] = categories;
  const name = first && CATEGORY_NAMES[first.toLowerCase() as PostCategory];

  return name || 'Technology';
}

type PostSchemaInput = BaseFrontmatter & { categories?: string[] };

export function generateBlogPostingSummary(post: PostSchemaInput) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    '@type': 'BlogPosting' as const,
    '@id': `${url}/#article`,
    headline: post.heading,
    description: post.description,
    url,
    datePublished: requireIsoDate(post.createDate, `blog post "${post.slug}"`),
    image: articleImage(post.heading),
    articleSection: articleSection(post.categories),
    author: personReference,
  };
}

export function generateBlogPostingSchema(post: PostSchemaInput) {
  const summary = generateBlogPostingSummary(post);
  const dateModified = toIsoDate(post.updateDate);

  return {
    '@context': 'https://schema.org',
    ...summary,
    ...(dateModified && { dateModified }),
    author: person,
    publisher: person,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': summary.url,
    },
    keywords: post.keywords,
    inLanguage: 'en',
  };
}

export function generateTechArticleSummary(snippet: BaseFrontmatter) {
  const url = `${SITE_URL}/snippets/${snippet.slug}`;

  return {
    '@type': 'TechArticle' as const,
    '@id': `${url}/#article`,
    headline: snippet.heading,
    description: snippet.description,
    url,
    datePublished: requireIsoDate(
      snippet.createDate,
      `snippet "${snippet.slug}"`,
    ),
    image: articleImage(snippet.heading),
    author: personReference,
  };
}

export function generateTechArticleSchema(snippet: BaseFrontmatter) {
  const summary = generateTechArticleSummary(snippet);
  const dateModified = toIsoDate(snippet.updateDate);

  return {
    '@context': 'https://schema.org',
    ...summary,
    ...(dateModified && { dateModified }),
    author: person,
    publisher: person,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': summary.url,
    },
    keywords: snippet.keywords,
    inLanguage: 'en',
  };
}

export function generateGuideSchema(guide: {
  path: string;
  heading: string;
  description: string;
  createDate: number;
  keywords: string[];
}) {
  const url = `${SITE_URL}${guide.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${url}/#article`,
    headline: guide.heading,
    description: guide.description,
    url,
    datePublished: requireIsoDate(guide.createDate, `guide "${guide.path}"`),
    author: person,
    publisher: person,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: articleImage(guide.heading),
    keywords: guide.keywords,
    inLanguage: 'en',
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

export function generateHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Serhii Shramko',
        description:
          'Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js.',
        publisher: personReference,
        inLanguage: 'en',
      },
    ],
  };
}

export function generateAggregateRatingSchema(rating: StoreRating) {
  return {
    '@type': 'AggregateRating',
    ratingValue: rating.ratingValue.toFixed(1),
    ratingCount: rating.ratingCount,
    bestRating: '5',
    worstRating: '1',
  };
}
