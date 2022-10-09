import Head from 'next/head';
import { useState } from 'react';

import { getPostsByCategory, getPostsCategories } from '@/lib/posts/api';
import { BlogPostPreview } from '@/components/blog-post-preview';
import { Post } from '@/lib/types';
import { GetStaticPathsResult, GetStaticPropsContext } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { Categories } from '@/components/categories';

interface CategoryPageProps {
  posts: Post[];
  categories: string[];
  category: string;
}

function CategoryPage(props: CategoryPageProps) {
  const { posts, categories, category } = props;

  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = posts.filter((post) => post.data.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      <Head>
        {/*  TODO REFACTOR TO CORRECT SEO */}
        <title>{`${category} articles - Serhii Shramko`}</title>
        <meta
          content={`Articles on web dev and software engineering by ${category}`}
          name="description"
          key="description"
        />
        <meta
          content={`javascript blog, tech blog, code snippets, software blog, web dev blog, ${category}`}
          name="keywords"
          key="keywords"
        />
        <meta
          property="og:site_name"
          content="Serhii Shramko Blog"
          key="og:site_name"
        />
      </Head>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white flex self-center w-full items-center">
          {category}
          <span className="ml-auto inline-block text-sm">
            {posts.length}
            {' '}
            articles
          </span>
        </h1>
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          <p>
            On this page you can find interesting articles on the topic -
            {' '}
            <b>{category}</b>
            .
            <br />
            Use the search below to filter by article title.
          </p>
        </div>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            placeholder="Search articles"
            onChange={(e) => setSearchValue(e.target.value)}
            className="pr-10 block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Categories categories={categories} />
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Articles
        </h2>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No articles found.
          </p>
        )}
        {filteredBlogPosts.map(({ data }) => (
          <BlogPostPreview
            key={data.title}
            slug={data.slug}
            title={data.title}
            excerpt={data.description}
          />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
  const tags = await getPostsCategories();

  return {
    paths: tags.map((tag: string) => ({
      params: {
        category: tag.toLowerCase(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = await getPostsByCategory(context.params?.category as string);
  const categories = await getPostsCategories();

  return {
    props: {
      posts,
      category: categories.find(
        (item) => item.toLowerCase() === context.params?.category,
      ),
      categories,
    },
  };
}

export default CategoryPage;
