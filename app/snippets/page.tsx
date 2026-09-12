import type { Metadata } from 'next';

import { ResourceCard } from '@/components/resource-card';
import { pageMetadata } from '@/lib/metadata';
import { serializeJsonLd } from '@/lib/schema';
import { getSnippetsPageData } from '@/lib/snippets/page-data';

export const metadata: Metadata = pageMetadata({
  path: '/snippets',
  title: 'Code Snippets | Serhii Shramko',
  description:
    'Reusable code snippets for JavaScript, TypeScript, React, Node.js, and CSS. Copy-paste solutions for common programming tasks and patterns.',
  keywords: [
    'JavaScript snippets',
    'CSS snippets',
    'Node.js snippets',
    'Next.js snippets',
    'JS code examples',
    'code examples',
    'codes snippet',
  ],
});

export default async function SnippetsPage() {
  const { snippets, jsonLd } = await getSnippetsPageData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
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
