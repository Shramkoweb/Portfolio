import Head from 'next/head';
import Image from 'next/future/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getPostBySlug, getPostSlugs } from '@/lib/posts/api';
import { compileMDX } from '@/lib/posts/compiler';
import { MDXComponents } from '@/components/mdx-components';
import { ViewCounter } from '@/components/view-counter/view-counter';
import { PostReaction } from '@/components/post-reaction';
import { Post } from '@/lib/types';

type ArticlePageProps = Pick<Post, 'data'> & { content: MDXRemoteSerializeResult };

function ArticlePage(props: ArticlePageProps) {
  const {
    content, data: {
      title,
      slug,
      updateData,
      readTime,
      description,
      createDate,
      tags = [],
    },
  } = props;

  const formattedDate = new Date(createDate).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day:'2-digit'
  });

  return (
    <>
      <Head>
        <title>
          {`${title} - Serhii Shramko`}
        </title>
        <meta content={description} name="description" key="description" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        <meta
          property="article:published_time"
          content={new Date(createDate).toISOString()}
          key="article:published_time"
        />
        <meta
          property="article:modified_time"
          content={new Date(updateData).toISOString()}
          key="article:modified_time"
        />
        <meta property="article:section" content="Technology" key="article:section" />
        <meta property="article:author" content="https://shramko.dev" key="article:author" />
        <meta name="keywords" content={tags.join(', ')} />
        {
          tags.map((tag) => <meta key={`article:${tag}`} property="article:tag" content={tag} />)
        }
      </Head>
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {title}
        </h1>
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
        <PostReaction />
      </article>
    </>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export async function getStaticProps(
  { params }: GetStaticPropsContext<Params>,
): Promise<GetStaticPropsResult<ArticlePageProps>> {
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
