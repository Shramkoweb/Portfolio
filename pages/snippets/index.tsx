import Head from 'next/head';
import { Snippet } from '@/lib/types';
import { sortByBirthtime } from '@/lib/posts/utils';

import { getSnippets } from '@/lib/snippets/api';

import { SnippetCard } from '@/components/snippet-card';

interface SnippetsPageProps {
  snippets: Snippet[];
}

function SnippetsPage(props: SnippetsPageProps) {
  const { snippets } = props;

  return (
    <>
      <Head>
        <title>Code Snippets - Serhii Shramko</title>
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
          content="A collection of code snippets – including serverless functions, Node.js scripts, CSS tricks and JS examples"
          name="description"
          key="description"
        />
        <meta
          property="og:title"
          content="Code Snippets - Serhii Shramko"
          key="og:title"
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
          {snippets.map(({ data: { title, slug, createDate } }) => (
            <li key={title}>
              <SnippetCard
                slug={slug}
                title={title}
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

  return {
    props: {
      snippets: sortedSnippets,
    },
  };
}

export default SnippetsPage;
