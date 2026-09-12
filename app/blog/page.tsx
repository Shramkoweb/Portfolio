import { Rss } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { BlogList } from '@/components/blog-list';
import { pageMetadata } from '@/lib/metadata';
import { getBlogPageData } from '@/lib/posts/page-data';
import { serializeJsonLd } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/blog',
  title: "What's New at Software Engineering? | The Serhii Shramko's Blog",
  description:
    'Join me on a journey through the world of software engineering. Learn about TypeScript, JavaScript, and Next.js, and discover new ways to improve your code.',
  keywords: [
    'JavaScript blog',
    'Tech Blog',
    'Code snippets',
    'Software blog',
    'web dev blog',
  ],
});

export default async function BlogPage() {
  const { posts, categories, jsonLd } = await getBlogPageData();
  const postsLength = posts.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <div className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white flex self-center w-full items-center">
          Blog
          <span className="ml-auto inline-block text-sm font-medium">
            {postsLength} {postsLength === 1 ? 'article' : 'articles'}
          </span>
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Guides and deep dives on JavaScript, TypeScript, React, and Next.js —
          from practical patterns to production pitfalls.{' '}
          <Link
            href="/feed.xml"
            className="inline-flex items-center gap-1 text-gray-900 dark:text-white underline decoration-gray-300 decoration-1 underline-offset-[3px] hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400 transition-[text-decoration-color] duration-150 ease-out-expo"
          >
            <Rss size={14} aria-hidden="true" />
            RSS
          </Link>
        </p>
        <BlogList posts={posts} categories={categories} />
      </div>
    </>
  );
}
