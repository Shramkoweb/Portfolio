import { ParsedUrlQuery } from 'querystring';

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { ArticleDates } from '@/components/article-dates';
import { ArticleMeta } from '@/components/article-meta';
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
        <ArticleMeta
          title={title}
          description={description}
          createDate={createDate}
          updateDate={updateDate}
          keywords={keywords}
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
            <ArticleDates createDate={createDate} updateDate={updateDate} />
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
