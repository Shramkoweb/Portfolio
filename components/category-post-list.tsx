'use client';

import { useState } from 'react';

import { BlogPostPreview } from '@/components/blog-post-preview';
import { Categories } from '@/components/categories';
import { NoResults } from '@/components/no-results';
import { SearchInput } from '@/components/search-input';
import { filterByHeading } from '@/lib/posts/utils';
import type { PostCategory, PostMetadata } from '@/lib/types';

interface CategoryPostListProps {
  posts: PostMetadata[];
  categories: PostCategory[];
}

export function CategoryPostList(props: CategoryPostListProps) {
  const { posts, categories } = props;
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    filterByHeading(post, searchValue),
  );

  return (
    <>
      <SearchInput placeholder="Search articles" onChange={setSearchValue} />
      <Categories categories={categories} />
      <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
        Articles
      </h2>
      {!filteredBlogPosts.length ? (
        <NoResults searchValue={searchValue} />
      ) : (
        <ul className="w-full">
          {filteredBlogPosts.map(({ data }) => (
            <li key={data.title} className="mb-8 last:mb-0">
              <BlogPostPreview
                slug={data.slug}
                heading={data.heading}
                excerpt={data.description}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
