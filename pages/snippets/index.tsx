import Head from 'next/head';
import { Snippet } from '@/lib/types';
import { sortByBirthtime } from '@/lib/posts/utils';

import { getSnippets } from '@/lib/snippets/api';

import { SnippetCard } from '@/components/snippet-card';

interface SnippetsPageProps {
  snippets: Snippet[];
  jsonLd: object;
}

function SnippetsPage(props: SnippetsPageProps) {
  const { snippets } = props;

  return (
    <>
      <Head>
        <title>Code Snippets | Serhii Shramko</title>
        <meta
          content="JavaScript snippets, CSS snippets, Node.js snippets, Next.js snippets, JS code examples, code examples, codes snippet"
          name="keywords"
          key="keywords"
        />
        <meta
          property="og:site_name"
          content="Serhii Shramko Snippets"
          key="og:site_name"
        />
        <meta
          content="Reusable code snippets for JavaScript, TypeScript, React, Node.js, and CSS. Copy-paste solutions for common programming tasks and patterns."
          name="description"
          key="description"
        />
        <meta
          property="og:title"
          content="Code Snippets | Serhii Shramko"
          key="og:title"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(props.jsonLd),
          }}
        />
      </Head>
      <section className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white flex self-center w-full items-center">
          Code Snippets
        </h1>
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          <p>
            These are a collection of code snippets I have used in the past and
            want to share with you.
          </p>
        </div>
        <ul className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2">
          {snippets.map(({ data: { heading, slug, createDate } }) => (
            <li key={heading}>
              <SnippetCard
                slug={slug}
                title={heading}
                createDate={createDate}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const snippets = await getSnippets();
  const sortedSnippets = snippets.sort(sortByBirthtime);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://shramko.dev/snippets/#collection',
    'name': 'Code Snippets | Serhii Shramko',
    'url': 'https://shramko.dev/snippets',
    'description': 'A collection of code snippets including JavaScript, Node.js, and CSS examples, shared by Serhii Shramko.',
    'inLanguage': 'en',
    'author': {
      '@type': 'Person',
      '@id': 'https://shramko.dev/#person',
      'name': 'Serhii Shramko',
      'url': 'https://shramko.dev/about'
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://shramko.dev/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Snippets',
          'item': 'https://shramko.dev/snippets'
        }
      ]
    },
    'hasPart': sortedSnippets.slice(0, 25).map((snippet) => ({
      '@type': 'TechArticle',
      'headline': snippet.data.heading,
      'description': snippet.data.description,
      'url': `https://shramko.dev/snippets/${snippet.data.slug}`,
      'datePublished': new Date(snippet.data.createDate).toISOString().split('T')[0],
      'author': {
        '@type': 'Person',
        '@id': 'https://shramko.dev/#person',
        'name': 'Serhii Shramko'
      }
    }))
  };

  return {
    props: {
      snippets: sortedSnippets,
      jsonLd,
    },
  };
}

export default SnippetsPage;
