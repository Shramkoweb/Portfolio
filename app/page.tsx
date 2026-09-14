import { Atom, MoveRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { HoverAvatar } from '@/components/hover-avatar';
import { PostGrid, type PostGridItem } from '@/components/post-grid';
import { pageMetadata, SITE_TITLE } from '@/lib/metadata';
import { getHomePageData } from '@/lib/posts/page-data';
import { Routes } from '@/lib/routes';
import { generateWebSiteSchema, serializeJsonLd } from '@/lib/schema';
import type { PostMetadata } from '@/lib/types';
import { generateGradient } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: SITE_TITLE,
  keywords: [
    'dev engineer',
    'Learn React',
    'Learn JavaScript',
    'Learn TypeScript',
    'Technical Blog',
    'software developer',
    'front end developer',
    'web dev',
    'next js',
    'react developer',
  ],
});

const PLAIN_CARD =
  'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800';

const toGradientItems = (posts: PostMetadata[]): PostGridItem[] =>
  posts.map(({ data: { slug, heading } }) => ({
    slug,
    heading,
    classNames: generateGradient(slug),
  }));

export default async function HomePage() {
  const { featuredPosts, otherPosts, advancedReactPosts } =
    await getHomePageData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(generateWebSiteSchema()),
        }}
      />
      <section className="mx-auto flex max-w-3xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col pr-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
              Serhii Shramko
            </h1>
            <h2 className="mb-4 text-gray-700 dark:text-gray-200">
              Senior Software Engineer at&ensp;
              <a
                href="https://betterme.world/"
                rel="noopener noreferrer"
                target="_blank"
                className="underline decoration-gray-300 decoration-1 underline-offset-[3px] hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400 transition-[text-decoration-color] duration-150 ease-out-expo"
              >
                BetterMe
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Hi there 🖐 🇺🇦</p>
            <p className="text-gray-600 dark:text-gray-400">
              I am an experienced software engineer with extensive knowledge of
              front-end development, with laser-focus on &ensp;
              <abbr title="A JavaScript library for building user interfaces">
                React
              </abbr>
              &ensp;and&ensp;
              <abbr title="The React Framework for Production">Next.js</abbr>
            </p>
            <Link
              href="/about"
              className="group mt-6 gap-2 mb-8 flex h-6 items-center rounded-lg leading-7 text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-800 active:scale-[0.97] dark:text-gray-400 dark:hover:text-gray-200"
            >
              Read more about me
              <MoveRight
                size={24}
                className="transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </div>
          <HoverAvatar />
        </div>

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
          Featured Posts
        </h2>
        <PostGrid items={toGradientItems(featuredPosts)} />

        <div className="w-full">
          <h2 className="mt-12 mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl flex items-start gap-2">
            Advanced React{' '}
            <span aria-hidden="true" className="w-6 h-6">
              <Atom className="w-6 h-6" strokeWidth={1.5} />
            </span>
          </h2>
          <PostGrid items={toGradientItems(advancedReactPosts)} />
          <Link
            href="/blog/category/advanced-react"
            className="group mt-6 flex gap-2 h-6 items-center rounded-lg leading-10 text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-800 active:scale-[0.97] dark:text-gray-400 dark:hover:text-gray-200"
          >
            Read more about React
            <MoveRight
              size={24}
              className="transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="my-6 w-full">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Projects
          </h2>

          <div className="grid gap-8">
            <div className="flex flex-col gap-8 md:flex-row">
              <Link
                href={Routes.QuizletList()}
                className="w-full rounded-lg transition-transform duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.97]"
              >
                <div className="flex w-full items-end justify-start rounded-lg border border-gray-200 p-6 text-gray-100 h-48 md:h-64 bg-pattern dark:border-gray-800 dark:text-gray-900">
                  <h3 className="bg-gray-800 m-0 w-fit rounded-lg px-4 py-2 text-lg font-medium tracking-tight dark:text-gray-100 md:text-lg">
                    Quizlet QuickList
                  </h3>
                </div>
              </Link>

              <Link
                href={Routes.UdemyResetProgress()}
                className="w-full rounded-lg transition-transform duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.97]"
              >
                <div className="flex w-full items-end justify-start rounded-lg border border-gray-200 p-6 text-gray-100 h-48 md:h-64 bg-pattern-waves dark:border-gray-800 dark:text-gray-900">
                  <h3 className="bg-gray-800 m-0 w-fit rounded-lg px-4 py-2 text-lg font-medium tracking-tight dark:text-gray-100 md:text-lg">
                    Udemy Reset Progress
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <h2 className="mt-16 mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
          Latest posts
        </h2>
        <PostGrid
          items={otherPosts.map(({ data: { slug, heading } }) => ({
            slug,
            heading,
            classNames: PLAIN_CARD,
          }))}
        />
        <Link
          href="/blog"
          className="group mt-6 flex gap-2 h-6 items-center rounded-lg leading-10 text-gray-600 transition-[color,transform] duration-200 ease-out-expo hover:text-gray-800 active:scale-[0.97] dark:text-gray-400 dark:hover:text-gray-200"
        >
          Read more posts
          <MoveRight
            size={24}
            className="transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
          />
        </Link>
      </section>
    </>
  );
}
