'use client';

import { Search } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { BlogPostPreview } from '@/components/blog-post-preview';
import { Categories } from '@/components/categories';
import { NoResults } from '@/components/no-results';
import { YearSeparator } from '@/components/year-separator';
import {
  addYearSeparators,
  filterByHeading,
  isYearSeparator,
} from '@/lib/posts/utils';
import type { PostCategory, PostMetadata } from '@/lib/types';

interface BlogListProps {
  posts: PostMetadata[];
  categories: PostCategory[];
}

export function BlogList(props: BlogListProps) {
  const { posts, categories } = props;

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const filteredBlogPosts = useMemo(
    () => posts.filter((post) => filterByHeading(post, debouncedSearchValue)),
    [posts, debouncedSearchValue],
  );

  const isSearching = debouncedSearchValue.length > 0;
  const postsWithSeparators = useMemo(
    () =>
      isSearching ? filteredBlogPosts : addYearSeparators(filteredBlogPosts),
    [isSearching, filteredBlogPosts],
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  return (
    <>
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
          aria-hidden="true"
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
          {isSearching
            ? filteredBlogPosts.map((post) => (
                <li key={post.data.title} className="mb-8 last:mb-0">
                  <BlogPostPreview
                    slug={post.data.slug}
                    heading={post.data.heading}
                    excerpt={post.data.description}
                  />
                </li>
              ))
            : postsWithSeparators.map((item) => {
                if (isYearSeparator(item)) {
                  return (
                    <li key={`year-${item.year}`} className="mb-8">
                      <YearSeparator year={item.year} />
                    </li>
                  );
                }

                return (
                  <li key={item.data.title} className="mb-8 last:mb-0">
                    <BlogPostPreview
                      slug={item.data.slug}
                      heading={item.data.heading}
                      excerpt={item.data.description}
                    />
                  </li>
                );
              })}
        </ul>
      )}
    </>
  );
}
