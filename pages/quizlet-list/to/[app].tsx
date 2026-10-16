import { ParsedUrlQuery } from 'querystring';

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { InlineText } from '@/components/inline-text';
import { InstallLinks } from '@/components/install-links';
import { PageMeta } from '@/components/page-meta';
import { WordListConverter } from '@/components/word-list-converter';
import { QUIZLET_APP_STORES, SITE_URL } from '@/lib/constants';
import {
  FLASHCARD_APP_SLUGS,
  FLASHCARD_APPS,
  isFlashcardAppSlug,
} from '@/lib/flashcard-apps';
import { formatPostDate, parsePostDate } from '@/lib/posts/utils';
import { Routes } from '@/lib/routes';
import { generateBreadcrumbSchema, serializeJsonLd } from '@/lib/schema';
import type { ImportFormat } from '@/lib/word-list';

interface Params extends ParsedUrlQuery {
  app: string;
}

interface FlashcardImportPageProps {
  slug: ImportFormat;
}

function FlashcardImportPage(props: FlashcardImportPageProps) {
  const app = FLASHCARD_APPS[props.slug];
  const otherApps = FLASHCARD_APP_SLUGS.filter((slug) => slug !== app.slug);
  const checkedAt = parsePostDate(app.checkedAt) ?? 0;
  const brands = app.name === 'Quizlet' ? 'Quizlet' : `Quizlet or ${app.name}`;

  return (
    <>
      <PageMeta title={app.title} description={app.description} />
      <Head>
        <meta name="author" key="author" content="Serhii Shramko" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              generateBreadcrumbSchema([
                { name: 'Home', url: SITE_URL },
                {
                  name: 'Quizlet QuickList',
                  url: `${SITE_URL}${Routes.QuizletList()}`,
                },
                {
                  name: app.heading,
                  url: `${SITE_URL}${Routes.FlashcardImport(app.slug)}`,
                },
              ]),
            ),
          }}
        />
      </Head>

      <section className="prose dark:prose-dark flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {app.heading}
        </h1>

        <p className="not-prose -mt-6 mb-4 text-xs text-gray-600 dark:text-gray-400">
          Steps checked against {app.name}&#39;s official help on{' '}
          <time dateTime={app.checkedAt}>{formatPostDate(checkedAt)}</time>
        </p>

        <p>
          <InlineText text={app.intro} />
        </p>

        <WordListConverter
          format={app.slug}
          appName={app.name}
          download={app.download}
        />

        <h2>How to Import into {app.name}</h2>
        <ol>
          {app.steps.map((step) => (
            <li key={step}>
              <InlineText text={step} />
            </li>
          ))}
        </ol>

        <h2>Before You Import</h2>
        {app.notes.map((note) => (
          <div key={note.title}>
            <h3>{note.title}</h3>
            <p>
              <InlineText text={note.body} />
            </p>
          </div>
        ))}

        <h2>Collect the Words While You Read</h2>
        <p>
          The list can come from anywhere. If it comes from what you read
          online, <Link href={Routes.QuizletList()}>Quizlet QuickList</Link>{' '}
          builds it as you go: select a word, right-click, choose{' '}
          <strong>Add to Quizlet QuickList</strong>, and copy the whole list
          when you are done. It is free and stores the list in your browser.
        </p>
        <InstallLinks
          name="Quizlet QuickList"
          stores={QUIZLET_APP_STORES}
          medium="guide"
          campaign={`to-${app.slug}`}
        />

        <h2>Other Flashcard Apps</h2>
        <ul>
          {otherApps.map((slug) => (
            <li key={slug}>
              <Link href={Routes.FlashcardImport(slug)}>
                {FLASHCARD_APPS[slug].heading}
              </Link>
            </li>
          ))}
        </ul>

        <h2>Sources</h2>
        <ul>
          {app.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs text-gray-600 dark:text-gray-400">
          Quizlet QuickList is an independent extension, not affiliated with or
          endorsed by {brands}.
        </p>
      </section>
    </>
  );
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>): Promise<
  GetStaticPropsResult<FlashcardImportPageProps>
> {
  const slug = params?.app;

  if (!isFlashcardAppSlug(slug)) {
    return { notFound: true };
  }

  return { props: { slug } };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  return {
    paths: FLASHCARD_APP_SLUGS.map((app) => ({ params: { app } })),
    fallback: false,
  };
}

export default FlashcardImportPage;
