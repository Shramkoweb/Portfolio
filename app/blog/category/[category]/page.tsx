import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CategoryPostList } from '@/components/category-post-list';
import { pageMetadata } from '@/lib/metadata';
import { getPostsCategories } from '@/lib/posts/api';
import { getCategoryPageData } from '@/lib/posts/page-data';
import { generateBreadcrumbSchema, serializeJsonLd } from '@/lib/schema';
import { formatCategoryName } from '@/lib/utils';

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getPostsCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/category/[category]'>): Promise<Metadata> {
  const { category } = await params;
  const data = await getCategoryPageData(category);

  if (!data) {
    return {};
  }

  return pageMetadata({
    path: `/blog/category/${category}`,
    title: `${data.seoTitle} | Serhii Shramko`,
    description: data.seoDescription,
    keywords: data.seoKeywords.split(',').map((keyword) => keyword.trim()),
    image: null,
    openGraph: { title: data.seoTitle },
    twitter: { title: data.seoTitle },
  });
}

export default async function CategoryPage({
  params,
}: PageProps<'/blog/category/[category]'>) {
  const { category } = await params;
  const data = await getCategoryPageData(category);

  if (!data) {
    notFound();
  }

  const { posts, categories, seoDescription } = data;
  const postsLength = posts.length;
  const displayCategory = formatCategoryName(data.category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://shramko.dev/' },
              { name: 'Blog', url: 'https://shramko.dev/blog' },
              {
                name: displayCategory,
                url: `https://shramko.dev/blog/category/${data.category.toLowerCase()}`,
              },
            ]),
          ),
        }}
      />
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
        <CategoryPostList posts={posts} categories={categories} />
      </div>
    </>
  );
}
