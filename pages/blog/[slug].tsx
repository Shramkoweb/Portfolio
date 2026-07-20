import { ParsedUrlQuery } from 'querystring';

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

import { ArticleDates } from '@/components/article-dates';
import { ArticleMeta } from '@/components/article-meta';
import { MDXComponents } from '@/components/mdx-components/mdx-components';
import { FacebookShare } from '@/components/share-button/facebook-share';
import { LinkedInShare } from '@/components/share-button/linkedin-share';
import { TelegramShare } from '@/components/share-button/telegram-share';
import { TwitterShare } from '@/components/share-button/twitter-share';
import { TableOfContent } from '@/components/table-of-content';
import { Tag } from '@/components/tag';
import { ViewCounter } from '@/components/view-counter';
import { getPostBySlug, getPostSlugs } from '@/lib/posts/api';
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';
import {
  compileMDX,
  extractHeadingsFromMarkdown,
} from '@/lib/scripts/compiler';
import { Post } from '@/lib/types';

const FloatingReactions = dynamic(() =>
  import('@/components/floating-reactions').then(
    (mod) => mod.FloatingReactions,
  ),
);

type ArticlePageProps = Pick<Post, 'data'> & {
  content: MDXRemoteSerializeResult;
  headings: { text: string; level: number; id: string }[];
  shikiCSS: string;
};

function ArticlePage(props: ArticlePageProps) {
  const {
    content,
    data: {
      title,
      heading,
      slug,
      updateDate,
      readTime,
      description,
      createDate,
      categories = [],
      keywords,
    },
    headings,
    shikiCSS,
  } = props;

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
        {categories.map((category) => (
          <meta
            key={`article:${category}`}
            property="article:tag"
            content={category}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateBlogPostingSchema({ ...props.data }),
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateBreadcrumbSchema([
                { name: 'Home', url: 'https://shramko.dev/' },
                { name: 'Blog', url: 'https://shramko.dev/blog' },
                { name: heading, url: `https://shramko.dev/blog/${slug}` },
              ]),
            ),
          }}
        />
      </Head>
      <article className="flex w-full max-w-3xl mx-auto mb-16 relative">
        <div>
          <aside className="share text-gray-600 dark:text-gray-400 hidden lg:flex flex-col items-center justify-center">
            <ul className="flex flex-col gap-2">
              <FloatingReactions slug={slug} />
            </ul>
            <div className="w-8 border-t border-gray-300 dark:border-gray-700 my-4" />
            <ul className="flex flex-col gap-2">
              <li>
                <TwitterShare />
              </li>
              <li>
                <LinkedInShare />
              </li>
              <li>
                <FacebookShare />
              </li>
              <li>
                <TelegramShare />
              </li>
            </ul>
          </aside>
        </div>

        <section className="lg:-ml-11 w-full">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {heading}
          </h1>
          <TableOfContent headings={headings} />
          <ul className="text-sm flex gap-2 mt-4 mb-4 flex-wrap">
            {categories.map((category) => (
              <li key={category}>
                <Tag
                  variant="inline"
                  label={`#${category.toLowerCase()}`}
                  href={`/blog/category/${category.toLowerCase()}`}
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row">
            <div className="flex flex-col items-start">
              <ArticleDates createDate={createDate} updateDate={updateDate} />
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
              {`${readTime}`}
              {' • '}
              <ViewCounter slug={slug} />
            </p>
          </div>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            <MDXRemote {...content} components={MDXComponents} />
          </div>

          <div className="flex lg:hidden text-gray-600 dark:text-gray-400 items-center mt-16">
            <p>Share it:</p>
            <ul className="flex gap-2">
              <li>
                <TwitterShare />
              </li>
              <li>
                <LinkedInShare />
              </li>
              <li>
                <FacebookShare />
              </li>
              <li>
                <TelegramShare />
              </li>
            </ul>
          </div>
        </section>
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
  GetStaticPropsResult<ArticlePageProps>
> {
  const { data, content } = await getPostBySlug(params?.slug);
  const { mdx, shikiCSS } = await compileMDX(content);
  const headings = extractHeadingsFromMarkdown(content);

  return {
    props: {
      data,
      content: mdx,
      headings,
      shikiCSS,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const slugs = await getPostSlugs();

  return {
    paths: slugs.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export default ArticlePage;
