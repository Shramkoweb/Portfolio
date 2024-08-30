import Head from 'next/head';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { getSnippetBySlug, getSnippetSlugs } from '@/lib/snippets/api';
import { compileMDX } from '@/lib/scripts/compiler';
import { Snippet } from '@/lib/types';

import { MDXComponents } from '@/components/mdx-components';

type SnippetPageProps = Pick<Snippet, 'data'> & {
  content: MDXRemoteSerializeResult;
};

function SnippetPage(props: SnippetPageProps) {
  const {
    content,
    data: {
      title, description, createDate, updateData, keywords,
    },
  } = props;

  const formattedDate = new Date(createDate).toLocaleDateString('en-us', {
    dateStyle: 'medium',
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
          content="Serhii Shramko Snippets"
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
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Serhii Shramko /
              <time dateTime={new Date(createDate).toISOString()}>
                {' '}
                {formattedDate}
              </time>
            </p>
          </div>
        </div>
        <div className="prose dark:prose-dark w-full">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
  const html = await compileMDX(content);

  return {
    props: {
      data,
      content: html,
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const slugs = await getSnippetSlugs();

  return {
    paths: slugs.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export default SnippetPage;
