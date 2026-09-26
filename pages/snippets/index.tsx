import Head from 'next/head';

import { ResourceCard } from '@/components/resource-card';
import { sortByBirthtime } from '@/lib/posts/utils';
import { serializeJsonLd } from '@/lib/schema';
import { getSnippets } from '@/lib/snippets/api';
import { Snippet } from '@/lib/types';

const PAGE_TITLE =
  'JavaScript, TypeScript, React & CSS Code Snippets | Serhii Shramko';
const PAGE_DESCRIPTION =
  'Copy-paste code snippets for JavaScript, TypeScript, React hooks, CSS, and Node.js. Each one with a usage example and the gotchas to watch for.';

interface SnippetsPageProps {
  snippets: Snippet[];
  jsonLd: object;
}

function SnippetsPage(props: SnippetsPageProps) {
  const { snippets } = props;

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta
          content="JavaScript snippets, TypeScript snippets, React hooks, CSS snippets, Node.js snippets, code examples"
          name="keywords"
          key="keywords"
        />
        <meta
          property="og:site_name"
          content="Serhii Shramko"
          key="og:site_name"
        />
        <meta content={PAGE_DESCRIPTION} name="description" key="description" />
        <meta property="og:title" content={PAGE_TITLE} key="og:title" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(props.jsonLd),
          }}
        />
      </Head>
      <section className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white flex self-center w-full items-center">
          Code Snippets
        </h1>
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          <p>
            Small, copy-paste solutions I actually use: React hooks, TypeScript
            utility types, JavaScript helpers, modern CSS and a bit of Node.js
            and SQL. Each one comes with a usage example and the gotchas I ran
            into.
          </p>
        </div>
        <ul className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2">
          {snippets.map(({ data: { heading, slug, createDate } }) => (
            <ResourceCard
              key={heading}
              title={heading}
              url={`/snippets/${slug}`}
              description={new Date(createDate).toLocaleDateString('en-us', {
                dateStyle: 'medium',
                timeZone: 'UTC',
              })}
            />
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
    name: PAGE_TITLE,
    url: 'https://shramko.dev/snippets',
    description: PAGE_DESCRIPTION,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      '@id': 'https://shramko.dev/#person',
      name: 'Serhii Shramko',
      url: 'https://shramko.dev/about',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://shramko.dev/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Snippets',
          item: 'https://shramko.dev/snippets',
        },
      ],
    },
    hasPart: sortedSnippets.map((snippet) => ({
      '@type': 'TechArticle',
      headline: snippet.data.heading,
      description: snippet.data.description,
      url: `https://shramko.dev/snippets/${snippet.data.slug}`,
      datePublished: new Date(snippet.data.createDate)
        .toISOString()
        .split('T')[0],
      author: {
        '@type': 'Person',
        '@id': 'https://shramko.dev/#person',
        name: 'Serhii Shramko',
      },
    })),
  };

  return {
    props: {
      snippets: sortedSnippets,
      jsonLd,
    },
  };
}

export default SnippetsPage;
