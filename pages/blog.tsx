import Head from 'next/head';
import { useState } from 'react';

import { getPosts } from '@/lib/posts/api';
import { BlogPostPreview } from '@/components/blog-post-preview';
import { sortByBirthtime } from '@/lib/posts/utils';
import { Post } from '@/lib/types';

interface BlogPageProps {
  posts: Post[];
}

function BlogPage(props: BlogPageProps) {
  const { posts } = props;
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts
    .filter((post) => post.data.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      <Head>
        <title>Blog - Serhii Shramko</title>
        <meta
          content="Thoughts on the software industry, tech, programming and my personal life."
          name="description"
          key="description"
        />
        <meta content="JavaScript blog, Tech Blog, Code snippets" name="keywords" key="keywords" />
      </Head>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Hi there. Posts will be here. I promise 🫡
        </p>
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
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Posts
        </h2>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
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

export async function getStaticProps() {
  const posts = await getPosts();
  const sortedPosts = posts
    .sort(sortByBirthtime);

  return { props: { posts: sortedPosts } };
}

export default BlogPage;
