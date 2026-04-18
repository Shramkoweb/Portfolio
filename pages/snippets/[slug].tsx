import { ParsedUrlQuery } from 'querystring';

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { MDXComponents } from '@/components/mdx-components';
import {
  generateTechArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';
import { compileMDX } from '@/lib/scripts/compiler';
import { getSnippetBySlug, getSnippetSlugs } from '@/lib/snippets/api';
import { Snippet } from '@/lib/types';

type SnippetPageProps = Pick<Snippet, 'data'> & {
  content: MDXRemoteSerializeResult;
  slug: string;
  shikiCSS: string;
};

function SnippetPage(props: SnippetPageProps) {
  const {
    content,
    slug,
    shikiCSS,
    data: { title, heading, description, createDate, updateDate, keywords },
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
        {shikiCSS && <style dangerouslySetInnerHTML={{ __html: shikiCSS }} />}
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
      </Head>
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
  const { mdx, shikiCSS } = await compileMDX(content);

  return {
    props: {
      data,
      slug: params?.slug as string,
      content: mdx,
      shikiCSS,
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
