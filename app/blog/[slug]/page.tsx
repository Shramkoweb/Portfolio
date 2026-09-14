import type { Metadata } from 'next';

import { ArticleDates } from '@/components/article-dates';
import { FloatingReactions } from '@/components/floating-reactions';
import { MDXComponents } from '@/components/mdx-components/mdx-components';
import { FacebookShare } from '@/components/share-button/facebook-share';
import { LinkedInShare } from '@/components/share-button/linkedin-share';
import { TelegramShare } from '@/components/share-button/telegram-share';
import { TwitterShare } from '@/components/share-button/twitter-share';
import { TableOfContent } from '@/components/table-of-content';
import { Tag } from '@/components/tag';
import { ViewCounter } from '@/components/view-counter';
import { articleMetadata } from '@/lib/metadata';
import { getPostBySlug, getPostSlugs } from '@/lib/posts/api';
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  serializeJsonLd,
} from '@/lib/schema';
import {
  compileMDX,
  extractHeadingsFromMarkdown,
} from '@/lib/scripts/compiler';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getPostBySlug(slug);

  return articleMetadata({
    path: `/blog/${slug}`,
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    createDate: data.createDate,
    updateDate: data.updateDate,
    categories: data.categories,
  });
}

export default async function ArticlePage({
  params,
}: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const { data, content } = await getPostBySlug(slug);
  const { heading, updateDate, readTime, createDate, categories = [] } = data;
  const { content: body, shikiCSS } = await compileMDX(content, MDXComponents);
  const headings = extractHeadingsFromMarkdown(content);

  return (
    <>
      {shikiCSS && <style dangerouslySetInnerHTML={{ __html: shikiCSS }} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateBlogPostingSchema({ ...data })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://shramko.dev/' },
              { name: 'Blog', url: 'https://shramko.dev/blog' },
              { name: heading, url: `https://shramko.dev/blog/${slug}` },
            ]),
          ),
        }}
      />
      <article className="flex w-full max-w-3xl mx-auto mb-16 relative">
        <div>
          <aside className="share text-gray-600 dark:text-gray-400 hidden lg:flex flex-col items-center justify-center">
            <ul className="flex flex-col gap-2">
              <FloatingReactions slug={slug} />
            </ul>
            <div className="w-8 border-t border-gray-300 dark:border-gray-700 my-4" />
            <ul className="flex flex-col gap-2">
              <li>
                <TwitterShare />
              </li>
              <li>
                <LinkedInShare />
              </li>
              <li>
                <FacebookShare />
              </li>
              <li>
                <TelegramShare />
              </li>
            </ul>
          </aside>
        </div>

        <section className="lg:-ml-11 w-full">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            {heading}
          </h1>
          <TableOfContent headings={headings} />
          <ul className="text-sm flex gap-2 mt-4 mb-4 flex-wrap">
            {categories.map((category) => (
              <li key={category}>
                <Tag
                  variant="inline"
                  label={`#${category.toLowerCase()}`}
                  href={`/blog/category/${category.toLowerCase()}`}
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row">
            <div className="flex flex-col items-start">
              <ArticleDates createDate={createDate} updateDate={updateDate} />
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
              {`${readTime}`}
              {' • '}
              <ViewCounter slug={slug} />
            </p>
          </div>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {body}
          </div>

          <div className="flex lg:hidden text-gray-600 dark:text-gray-400 items-center mt-16">
            <p>Share it:</p>
            <ul className="flex gap-2">
              <li>
                <TwitterShare />
              </li>
              <li>
                <LinkedInShare />
              </li>
              <li>
                <FacebookShare />
              </li>
              <li>
                <TelegramShare />
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
