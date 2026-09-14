import { SITE_URL } from '@/lib/constants';
import { sortByBirthtime } from '@/lib/posts/utils';
import { getSnippets } from '@/lib/snippets/api';
import { Snippet } from '@/lib/types';

const author = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Serhii Shramko',
};

export interface SnippetsJsonLd {
  '@context': string;
  '@type': string;
  '@id': string;
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  author: typeof author & { url: string };
  breadcrumb: object;
  hasPart: Array<{
    '@type': string;
    headline: string;
    description: string;
    url: string;
    datePublished: string;
    author: typeof author;
  }>;
}

export interface SnippetsPageData {
  snippets: Snippet[];
  jsonLd: SnippetsJsonLd;
}

export async function getSnippetsPageData(): Promise<SnippetsPageData> {
  const snippets = await getSnippets();
  const sortedSnippets = snippets.sort(sortByBirthtime);

  const jsonLd: SnippetsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/snippets/#collection`,
    name: 'Code Snippets | Serhii Shramko',
    url: `${SITE_URL}/snippets`,
    description:
      'A collection of code snippets including JavaScript, Node.js, and CSS examples, shared by Serhii Shramko.',
    inLanguage: 'en',
    author: { ...author, url: `${SITE_URL}/about` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Snippets',
          item: `${SITE_URL}/snippets`,
        },
      ],
    },
    hasPart: sortedSnippets.slice(0, 25).map((snippet) => ({
      '@type': 'TechArticle',
      headline: snippet.data.heading,
      description: snippet.data.description,
      url: `${SITE_URL}/snippets/${snippet.data.slug}`,
      datePublished: new Date(snippet.data.createDate)
        .toISOString()
        .split('T')[0],
      author,
    })),
  };

  return { snippets: sortedSnippets, jsonLd };
}
