import type { Metadata } from 'next';

import { ArticleDates } from '@/components/article-dates';
import { MDXComponents } from '@/components/mdx-components/mdx-components';
import { RegisterView } from '@/components/register-view';
import { articleMetadata } from '@/lib/metadata';
import {
  generateBreadcrumbSchema,
  generateTechArticleSchema,
  serializeJsonLd,
} from '@/lib/schema';
import { compileMDX } from '@/lib/scripts/compiler';
import { getSnippetBySlug, getSnippetSlugs } from '@/lib/snippets/api';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getSnippetSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/snippets/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getSnippetBySlug(slug);

  return articleMetadata({
    path: `/snippets/${slug}`,
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    createDate: data.createDate,
    updateDate: data.updateDate,
  });
}

export default async function SnippetPage({
  params,
}: PageProps<'/snippets/[slug]'>) {
  const { slug } = await params;
  const { data, content } = await getSnippetBySlug(slug);
  const { heading, createDate, updateDate } = data;
  const { content: body, shikiCSS } = await compileMDX(content, MDXComponents);

  return (
    <>
      <RegisterView slug={slug} />
      {shikiCSS && <style dangerouslySetInnerHTML={{ __html: shikiCSS }} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateTechArticleSchema(data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://shramko.dev/' },
              { name: 'Snippets', url: 'https://shramko.dev/snippets' },
              { name: heading, url: `https://shramko.dev/snippets/${slug}` },
            ]),
          ),
        }}
      />
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {heading}
            </h1>
            <ArticleDates createDate={createDate} updateDate={updateDate} />
          </div>
        </div>
        <div className="prose dark:prose-dark w-full max-w-none">{body}</div>
      </article>
    </>
  );
}
