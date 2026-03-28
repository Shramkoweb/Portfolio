import Head from 'next/head';
import Link from 'next/link';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { getSnippetBySlug, getSnippetSlugs, getSnippetsMetadata } from '@/lib/snippets/api';
import { compileMDX } from '@/lib/scripts/compiler';
import { Snippet } from '@/lib/types';
import {
  generateTechArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';

import { MDXComponents } from '@/components/mdx-components';
import React, { useEffect } from 'react';

type RelatedSnippet = {
  slug: string;
  heading: string;
  description: string;
};

type SnippetPageProps = Pick<Snippet, 'data'> & {
  content: MDXRemoteSerializeResult;
  slug: string;
  relatedSnippets: RelatedSnippet[];
};

function SnippetPage(props: SnippetPageProps) {
  const {
    content,
    slug,
    data: { title, heading, description, createDate, updateDate, keywords },
    relatedSnippets,
  } = props;

  const formatedCreateDate = new Date(createDate).toLocaleDateString('en-us', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  });

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      }).catch(() => {});

    registerView();
  }, [slug]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" key="description" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:site_name"
          content="Serhii Shramko"
          key="og:site_name"
        />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta
          property="og:image"
          content={`https://shramko.dev/api/og?title=${encodeURIComponent(title)}`}
          key="og:image"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://shramko.dev/api/og?title=${encodeURIComponent(title)}`}
          key="twitter:image"
        />
        <meta
          property="article:published_time"
          content={new Date(createDate).toISOString()}
          key="article:published_time"
        />
        {updateDate && (
          <meta
            property="article:modified_time"
            content={new Date(updateDate).toISOString()}
            key="article:modified_time"
          />
        )}

        <meta name="keywords" key="keywords" content={keywords.join(', ')} />
        <meta
          property="article:section"
          content="Technology"
          key="article:section"
        />
        <meta
          property="article:author"
          content="https://shramko.dev"
          key="article:author"
        />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateTechArticleSchema(props.data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://shramko.dev/' },
              { name: 'Snippets', url: 'https://shramko.dev/snippets' },
              { name: heading, url: `https://shramko.dev/snippets/${slug}` },
            ]),
          ),
        }}
      />
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {heading}
            </h1>
            <div className="text-xs text-gray-700 dark:text-gray-300">
              <p>
                Published on{' '}
                <time dateTime={new Date(createDate).toISOString()}>
                  {formatedCreateDate}
                </time>
              </p>
              {updateDate && (
                <p>
                  Last updated on{' '}
                  <strong className="font-medium">
                    <time dateTime={new Date(updateDate).toISOString()}>
                      {new Date(updateDate).toLocaleDateString('en-us', {
                        dateStyle: 'medium',
                        timeZone: 'UTC',
                      })}
                    </time>
                  </strong>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="prose dark:prose-dark w-full max-w-none">
          <MDXRemote {...content} components={MDXComponents} />
        </div>

        {relatedSnippets.length > 0 && (
          <div className="mt-16 w-full">
            <hr className="border-gray-200 border-1 dark:border-gray-800" />
            <section className="mt-12">
              <h2 className="text-xl font-bold mb-4 prose dark:prose-dark max-w-none">
                Related snippets:
              </h2>
              <ul className="grid grid-cols-1">
                {relatedSnippets.map((snippet) => (
                  <li key={snippet.slug} className="mb-4 last:mb-0">
                    <Link
                      href={`/snippets/${snippet.slug}`}
                      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {snippet.heading}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {snippet.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </article>
    </>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>): Promise<
  GetStaticPropsResult<SnippetPageProps>
> {
  const { data, content } = await getSnippetBySlug(params?.slug);
  const html = await compileMDX(content);

  const allSnippets = await getSnippetsMetadata();
  const currentKeywordSet = new Set(
    (data.keywords || []).map((k: string) => k.toLowerCase()),
  );

  const relatedSnippets = allSnippets
    .filter((s) => s.data.slug !== data.slug)
    .map((s) => {
      const overlapCount = (s.data.keywords || []).filter((k: string) =>
        currentKeywordSet.has(k.toLowerCase()),
      ).length;

      return {
        slug: s.data.slug,
        heading: s.data.heading,
        description: s.data.description,
        overlapCount,
      };
    })
    .filter((s) => s.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount)
    .slice(0, 3)
    .map(({ slug, heading, description }) => ({ slug, heading, description }));

  return {
    props: {
      data,
      slug: params?.slug as string,
      content: html,
      relatedSnippets,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const slugs = await getSnippetSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export default SnippetPage;
