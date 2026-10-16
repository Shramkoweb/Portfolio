import { ParsedUrlQuery } from 'querystring';

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { ArticleDates } from '@/components/article-dates';
import { ArticleMeta } from '@/components/article-meta';
import { InlineText } from '@/components/inline-text';
import { InstallLinks } from '@/components/install-links';
import { WordListConverter } from '@/components/word-list-converter';
import { QUIZLET_APP_STORES, SITE_URL } from '@/lib/constants';
import {
  FLASHCARD_APP_SLUGS,
  FLASHCARD_APPS,
  isFlashcardAppSlug,
} from '@/lib/flashcard-apps';
import { formatPostDate, parsePostDate } from '@/lib/posts/utils';
import { Routes } from '@/lib/routes';
import {
  generateBreadcrumbSchema,
  generateGuideSchema,
  serializeJsonLd,
} from '@/lib/schema';
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
  const createDate = parsePostDate(app.checkedAt) ?? 0;
  const brands = app.name === 'Quizlet' ? 'Quizlet' : `Quizlet or ${app.name}`;

  return (
    <>
      <ArticleMeta
        title={app.title}
        heading={app.heading}
        description={app.description}
        createDate={createDate}
        updateDate={null}
        keywords={app.keywords}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              generateGuideSchema({
                path: Routes.FlashcardImport(app.slug),
                heading: app.heading,
                description: app.description,
                createDate,
                keywords: app.keywords,
              }),
            ),
          }}
        />
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
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {app.heading}
            </h1>
            <ArticleDates createDate={createDate} updateDate={null} />
          </div>
        </div>
        <div className="prose dark:prose-dark w-full max-w-none">
          <p>
            <InlineText text={app.intro} />
          </p>

          <WordListConverter
            format={app.slug}
            appName={app.name}
            download={app.download}
          />

          <h2>How to import into {app.name}</h2>
          <p>
            I checked these steps against {app.name}&#39;s official help on{' '}
            {formatPostDate(createDate)}.
          </p>
          <ol>
            {app.steps.map((step) => (
              <li key={step}>
                <InlineText text={step} />
              </li>
            ))}
          </ol>

          <h2>Before you import</h2>
          {app.notes.map((note) => (
            <div key={note.title}>
              <h3>{note.title}</h3>
              <p>
                <InlineText text={note.body} />
              </p>
            </div>
          ))}

          <h2>Collect the words while you read</h2>
          <p>
            I built <Link href={Routes.QuizletList()}>Quizlet QuickList</Link>{' '}
            for exactly this. Select a word on any page, right-click, choose{' '}
            <strong>Add to Quizlet QuickList</strong>, and copy the whole list
            when you are done. It is free, keeps the list in your browser, and
            is my own extension, not an official {brands} tool.
          </p>
          <InstallLinks
            name="Quizlet QuickList"
            stores={QUIZLET_APP_STORES}
            medium="guide"
            campaign={`to-${app.slug}`}
          />

          <h2>Related</h2>
          <ul>
            {otherApps.map((slug) => (
              <li key={slug}>
                <Link href={Routes.FlashcardImport(slug)}>
                  {FLASHCARD_APPS[slug].heading}
                </Link>
              </li>
            ))}
          </ul>

          <h2>Further reading</h2>
          <ul>
            {app.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
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
