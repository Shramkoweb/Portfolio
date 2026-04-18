import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { BlogPostPreview } from '@/components/blog-post-preview';
import { Categories } from '@/components/categories';
import { NoResults } from '@/components/no-results';
import { SearchInput } from '@/components/search-input';
import { getPostsByCategory, getPostsCategories } from '@/lib/posts/api';
import { filterByHeading, sortByBirthtime } from '@/lib/posts/utils';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Post, PostCategory } from '@/lib/types';
import { categoryToSeoData, formatCategoryName } from '@/lib/utils';

interface CategoryPageProps {
  posts: Post[];
  categories: PostCategory[];
  category: PostCategory;
  seoDescription: string;
  seoKeywords: string;
  seoTitle: string;
}

function CategoryPage(props: CategoryPageProps) {
  const { posts, categories, category, seoDescription, seoKeywords, seoTitle } =
    props;
  const postsLength = posts.length;
  const displayCategory = formatCategoryName(category);

  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    filterByHeading(post, searchValue),
  );

  return (
    <>
      <Head>
        <title>{`${seoTitle} | Serhii Shramko`}</title>
        <meta content={seoDescription} name="description" key="description" />
        <meta content={seoKeywords} name="keywords" key="keywords" />
        <meta
          property="og:site_name"
          content="Serhii Shramko"
          key="og:site_name"
        />
        <meta
          property="og:description"
          content={seoDescription}
          key="og:description"
        />
        <meta property="og:title" content={seoTitle} key="og:title" />
        <meta
          property="og:image"
          content={`https://shramko.dev/api/og?title=${encodeURIComponent(seoTitle)}`}
          key="og:image"
        />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="630" key="og:image:height" />
        <meta name="twitter:title" content={seoTitle} key="twitter:title" />
        <meta
          name="twitter:description"
          content={seoDescription}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`https://shramko.dev/api/og?title=${encodeURIComponent(seoTitle)}`}
          key="twitter:image"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateBreadcrumbSchema([
                { name: 'Home', url: 'https://shramko.dev/' },
                { name: 'Blog', url: 'https://shramko.dev/blog' },
                {
                  name: displayCategory,
                  url: `https://shramko.dev/blog/category/${category.toLowerCase()}`,
                },
              ]),
            ),
          }}
        />
      </Head>
      <div className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white flex self-center w-full items-center">
          {displayCategory}
          <span className="ml-auto inline-block text-sm">
            {postsLength} {postsLength === 1 ? 'article' : 'articles'}
          </span>
        </h1>
        <div className="mb-4 text-gray-600 dark:text-gray-400">
          <p>{seoDescription}</p>
        </div>
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
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const categories = await getPostsCategories();

  return {
    paths: categories.map((category: string) => ({
      params: {
        category: category.toLowerCase(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<CategoryPageProps>> {
  const posts = await getPostsByCategory(context.params?.category as string);
  const categories = await getPostsCategories();
  const sortedPosts = posts.sort(sortByBirthtime);
  const postCategory = categories.find(
    (item) => item.toLowerCase() === context.params?.category,
  );
  const seoDescription =
    categoryToSeoData[postCategory?.toLowerCase() as PostCategory].description;
  const seoKeywords =
    categoryToSeoData[postCategory?.toLowerCase() as PostCategory].keywords;
  const seoTitle =
    categoryToSeoData[postCategory?.toLowerCase() as PostCategory].title;

  return {
    props: {
      posts: sortedPosts,
      category: postCategory!,
      categories,
      seoDescription,
      seoTitle,
      seoKeywords,
    },
  };
}

export default CategoryPage;
