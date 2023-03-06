import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getPostBySlug, getPostSlugs } from '@/lib/posts/api';
import { compileMDX } from '@/lib/scripts/compiler';
import { Post } from '@/lib/types';

import { MDXComponents } from '@/components/mdx-components';
import { ViewCounter } from '@/components/view-counter/view-counter';
import {
  FacebookShare,
  LinkedInShare,
  TelegramShare,
  TwitterShare,
} from '@/components/share-button';

type ArticlePageProps = Pick<Post, 'data'> & {
  content: MDXRemoteSerializeResult;
};

function ArticlePage(props: ArticlePageProps) {
  const {
    content,
    data: {
      title,
      slug,
      updateData,
      readTime,
      description,
      createDate,
      categories = [],
      keywords,
    },
  } = props;

  const formattedDate = new Date(createDate).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  return (
    <>
      <Head>
        <title>{`${title}`}</title>
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
        {updateData && (
          <meta
            property="article:modified_time"
            content={new Date(updateData).toISOString()}
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
      <article className="flex w-full max-w-2xl mx-auto mb-16 relative">
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
          </aside>
        </div>

        <section className="lg:ml-[-44px] w-full">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {title}
          </h1>
          <ul className="text-gray-700 dark:text-gray-300 text-sm flex gap-4 mt-4 mb-4 flex-wrap">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  href={`/blog/category/${category.toLowerCase()}`}
                >
                  #
                  {category.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
            <div className="flex items-center">
              <Image
                alt="Serhii Shramko"
                height={32}
                width={32}
                src="/static/images/avatar.jpeg"
                className="rounded-full"
              />
              <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Serhii Shramko /
                <time dateTime={new Date(createDate).toISOString()}>
                  {' '}
                  {formattedDate}
                </time>
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
              {`${readTime}`}
              {' • '}
              <ViewCounter slug={slug} />
            </p>
          </div>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
  const html = await compileMDX(content);

  return {
    props: {
      data,
      content: html,
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
