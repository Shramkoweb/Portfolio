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
          content="A collection of code snippets – including serverless functions, Node.js scripts, CSS tricks and JS examples"
          name="description"
          key="description"
        />
        <meta
          property="og:title"
          content="Code Snippets | Serhii Shramko"
          key="og:title"
        />
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"WebPage","name":"Code Snippets | Serhii Shramko","url":"https://shramko.dev/snippets","description":"A collection of code snippets including JavaScript, Node.js, and CSS examples, shared by Serhii Shramko.","publisher":{"@type":"Person","name":"Serhii Shramko","url":"https://shramko.dev/about","sameAs":["https://github.com/shramkoweb","https://www.linkedin.com/in/shramko-dev/","https://www.instagram.com/serhii.shramko/"]},"mainEntityOfPage":{"@type":"WebPage","@id":"https://shramko.dev/snippets"},"potentialAction":{"@type":"SearchAction","target":"https://shramko.dev/search?query={search_term_string}","query-input":"required name=search_term_string"},"breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://shramko.dev/"},{"@type":"ListItem","position":2,"name":"Snippets","item":"https://shramko.dev/snippets"}]},"hasPart":[{"@type":"Article","headline":"Generating UUIDs in JavaScript","url":"https://shramko.dev/snippets/window-crypto","datePublished":"2024-09-28","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Check in which environment the code is running","url":"https://shramko.dev/snippets/environment","datePublished":"2024-09-13","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"How to Remove a Query String From a URL in JavaScript","url":"https://shramko.dev/snippets/how-to-remove-query","datePublished":"2024-09-06","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Deep Clone an Object in JavaScript","url":"https://shramko.dev/snippets/deep-clone","datePublished":"2024-09-04","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Range Function","url":"https://shramko.dev/snippets/generate-range","datePublished":"2024-07-11","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Visually Hidden","url":"https://shramko.dev/snippets/visually-hidden","datePublished":"2024-07-11","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Random number generator","url":"https://shramko.dev/snippets/random","datePublished":"2024-07-10","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"useHasMounted","url":"https://shramko.dev/snippets/use-has-mounted","datePublished":"2024-07-10","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"How to Check if an Element is in the Viewport in JavaScript","url":"https://shramko.dev/snippets/is-element-in-viewport","datePublished":"2024-05-20","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"How to get the current URL with JavaScript","url":"https://shramko.dev/snippets/how-to-get-the-current-url-with-javascript","datePublished":"2024-03-20","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Common CSS Class Names","url":"https://shramko.dev/snippets/common-css-classes","datePublished":"2023-10-24","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Installing PostgreSQL on macOS","url":"https://shramko.dev/snippets/postgres-install-macos","datePublished":"2023-10-04","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Move cursor to the end of input","url":"https://shramko.dev/snippets/move-cursor","datePublished":"2023-03-21","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Check if date is between two dates","url":"https://shramko.dev/snippets/compare-dates","datePublished":"2023-03-05","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"CSS - Custom text selection","url":"https://shramko.dev/snippets/css-selection","datePublished":"2023-03-05","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"SQL countries table","url":"https://shramko.dev/snippets/countries-sql","datePublished":"2023-02-15","author":{"@type":"Person","name":"Serhii Shramko"}},{"@type":"Article","headline":"Remove Duplicates from an Array","url":"https://shramko.dev/snippets/remove-duplicates-array","datePublished":"2023-01-26","author":{"@type":"Person","name":"Serhii Shramko"}}]}' }} />
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

  return {
    props: {
      snippets: sortedSnippets,
    },
  };
}

export default SnippetsPage;
