import Head from 'next/head';
import { useState, useMemo, useCallback, useEffect, ChangeEvent } from 'react';
import { Search } from 'lucide-react';

import { getPostsMetadata, getPostsCategories } from '@/lib/posts/api';
import { BlogPostPreview } from '@/components/blog-post-preview';
import { filterByHeading, sortByBirthtime, addYearSeparators, isYearSeparator } from '@/lib/posts/utils';
import { PostMetadata, PostCategory } from '@/lib/types';
import { Categories } from '@/components/categories';
import { NoResults } from '@/components/no-results';
import { YearSeparator } from '@/components/year-separator';

interface BlogPageProps {
  posts: PostMetadata[];
  categories: PostCategory[];
  jsonLd?: {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    blogPost: Array<{
      '@type': string;
      headline: string;
      description: string;
      url: string;
    }>;
  };
}

function BlogPage(props: BlogPageProps) {
  const { posts, categories } = props;
  const postsLength = posts.length;

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Memoize filtered results
  const filteredBlogPosts = useMemo(
    () => posts.filter((post) => filterByHeading(post, debouncedSearchValue)),
    [posts, debouncedSearchValue],
  );

  const isSearching = debouncedSearchValue.length > 0;
  const postsWithSeparators = useMemo(
    () => (isSearching ? filteredBlogPosts : addYearSeparators(filteredBlogPosts)),
    [isSearching, filteredBlogPosts],
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>
          What&apos;s New at Software Engineering? | The Serhii Shramko&apos;s Blog
        </title>
        <meta
          content="Join me on a journey through the world of software engineering. Learn about TypeScript, JavaScript, and Next.js, and discover new ways to improve your code."
          name="description"
          key="description"
        />
        <meta
          content="
          JavaScript blog,
          Tech Blog, Code snippets,
          Software blog,
          web dev blog"
          name="keywords"
          key="keywords"
        />
        <meta
          property="og:site_name"
          content="Serhii Shramko"
          key="og:site_name"
        />
        {props.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(props.jsonLd),
            }}
          />
        )}
      </Head>
      <div className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white flex self-center w-full items-center">
          Blog
          <span className="ml-auto inline-block text-sm font-medium">
            {postsLength} {postsLength === 1 ? 'article' : 'articles'}
          </span>
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          In recent years, I&apos;ve poured a lot of time into writing, mostly
          on tech but occasionally venturing into other areas.{' '}
          <strong>Over 2000 people </strong>read my articles every month, and
          I&apos;m thrilled to share my knowledge with you.
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            placeholder="Search articles"
            value={searchValue}
            onChange={handleSearchChange}
            className="pr-10 block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg transition-[border-color] duration-150 ease-out-expo dark:border-gray-800 dark:bg-gray-800 dark:text-gray-100"
          />
          <Search
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
          />
        </div>
        <Categories categories={categories} />
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Articles
        </h2>
        {filteredBlogPosts.length === 0 && isSearching ? (
          <NoResults searchValue={searchValue} />
        ) : (
          <ul className="w-full">
            {isSearching ? (
              filteredBlogPosts.map((post) => (
                <li key={post.data.title} className='mb-8 last:mb-0'>
                  <BlogPostPreview
                    slug={post.data.slug}
                    heading={post.data.heading}
                    excerpt={post.data.description}
                  />
                </li>
              ))
            ) : (
              postsWithSeparators.map((item) => {
                if (isYearSeparator(item)) {
                  return (
                    <li key={`year-${item.year}`} className="mb-8">
                      <YearSeparator year={item.year} />
                    </li>
                  );
                }

                return (
                  <li key={item.data.title} className='mb-8 last:mb-0'>
                    <BlogPostPreview
                      slug={item.data.slug}
                      heading={item.data.heading}
                      excerpt={item.data.description}
                    />
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPostsMetadata();
  const categories = await getPostsCategories();
  const sortedPosts = posts.sort(sortByBirthtime);

  // Generate JSON-LD dynamically to reduce HTML size and improve maintainability
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://shramko.dev/blog/#blog',
    'name': "Serhii Shramko's Blog",
    'url': 'https://shramko.dev/blog',
    'description': 'A blog featuring articles on tech topics, including TypeScript, Astro.js, React, and more.',
    'inLanguage': 'en',
    'publisher': {
      '@type': 'Person',
      '@id': 'https://shramko.dev/#person',
      'name': 'Serhii Shramko',
      'url': 'https://shramko.dev/about'
    },
    'blogPost': sortedPosts.slice(0, 25).map((post) => ({
      '@type': 'BlogPosting',
      'headline': post.data.heading,
      'description': post.data.description,
      'url': `https://shramko.dev/blog/${post.data.slug}`,
      'author': {
        '@type': 'Person',
        '@id': 'https://shramko.dev/#person',
        'name': 'Serhii Shramko'
      }
    })),
  };

  return {
    props: {
      posts: sortedPosts,
      categories,
      jsonLd,
    },
  };
}

export default BlogPage;
