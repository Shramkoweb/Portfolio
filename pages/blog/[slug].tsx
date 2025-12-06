import Head from 'next/head';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MDXComponents } from '@/components/mdx-components';
import React from 'react';

import { getPostBySlug, getPosts, getPostSlugs } from '@/lib/posts/api';
import {
  compileMDX,
  extractHeadingsFromMarkdown,
} from '@/lib/scripts/compiler';
import { Post } from '@/lib/types';
import { TableOfContent } from '@/components/table-of-content';
import { ViewCounter } from '@/components/view-counter/view-counter';
import {
  FacebookShare,
  LinkedInShare,
  TelegramShare,
  TwitterShare,
} from '@/components/share-button';
import { AlsoBlock } from '@/components/also-block';
import { FloatingReactions } from '@/components/floating-reactions';

type ArticlePageProps = Pick<Post, 'data'> & {
  content: MDXRemoteSerializeResult;
  headings: { text: string; level: number; id: string }[];
  relatedPosts: Array<{
    slug: string;
    heading: string;
    excerpt: string;
    overlapCount: number;
  }>;
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
    relatedPosts,
  } = props;

  const formatedCreateDate = new Date(createDate).toLocaleDateString('en-us', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" key="description" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:site_name"
          content="Serhii Shramko Blog"
          key="og:site_name"
        />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
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
        <meta name="keywords" key="keywords" content={keywords.join(', ')} />
        {categories.map((category) => (
          <meta
            key={`article:${category}`}
            property="article:tag"
            content={category}
          />
        ))}
      </Head>
      <article className="flex w-full max-w-3xl mx-auto mb-16 relative">
        <div>
          <aside className="share text-gray-600 dark:text-gray-400 hidden lg:flex flex-col items-center justify-center">
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
            <div className="w-8 border-t border-gray-300 dark:border-gray-700 my-4" />
            <ul className="flex flex-col gap-2">
              <FloatingReactions slug={slug} />
            </ul>
          </aside>
        </div>

        <section className="lg:ml-[-44px] w-full">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {heading}
          </h1>
          <TableOfContent headings={headings} />
          <ul className="text-gray-700 dark:text-gray-300 text-sm flex gap-4 mt-4 mb-4 flex-wrap">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  href={`/blog/category/${category.toLowerCase()}`}
                >
                  #{category.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row">
            <div className="flex flex-col items-start">
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
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
              {`${readTime}`}
              {' • '}
              <ViewCounter slug={slug} />
            </p>
          </div>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            <MDXRemote {...content} components={MDXComponents} />
          </div>

          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16 w-full">
              <hr className="border-gray-200 border-1 dark:border-gray-800" />
              <AlsoBlock relatedPosts={relatedPosts} />
            </div>
          )}

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
  const html = await compileMDX(content);
  const headings = extractHeadingsFromMarkdown(content);
  const posts = await getPosts();

  // Related posts by overlapping categories
  const relatedPosts = posts
    .filter((post) => post.data.slug !== data.slug)
    .map((post) => {
      const postCategories = post.data.categories;
      const currentCategories = data.categories;
      const categorySet = new Set(currentCategories);
      const overlapCount = postCategories.filter((cat) =>
        categorySet.has(cat),
      ).length;

      return {
        slug: post.data.slug,
        heading: post.data.heading,
        excerpt: post.data.description,
        overlapCount,
      };
    })
    .filter((post) => post.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount)
    .slice(0, 3);

  return {
    props: {
      data,
      content: html,
      headings,
      relatedPosts,
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
