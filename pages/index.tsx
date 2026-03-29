import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import clsx from 'clsx';
import { GetStaticPropsResult } from 'next';
import { Atom, MoveRight } from 'lucide-react';

import { Routes } from '@/lib/routes';
import { generateGradient } from '@/lib/utils';
import { generateWebSiteSchema } from '@/lib/schema';
import { getPosts } from '@/lib/posts/api';
import {
  filterByAdvanceReact,
  filterByFeatured,
  filterByNotFeatured,
  sortByBirthtime,
} from '@/lib/posts/utils';
import { Post } from '@/lib/types';

import { BlogPostSquarePreview } from '@/components/blog-post-square-preview';

import smile from 'public/static/images/smile.webp';
import tongue from 'public/static/images/tongue.webp';

interface IndexPageProps {
  featuredPosts: Post[];
  otherPosts: Post[];
  advancedReactPosts: Post[];
}

function IndexPage(props: IndexPageProps) {
  const { featuredPosts, otherPosts, advancedReactPosts } = props;

  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const handleHover = () => {
    setIsAvatarHovered((prevValue) => !prevValue);
  };

  return (
    <>
      <Head>
        <meta
          content="
        dev engineer,
        Learn React,
        Learn JavaScript,
        Learn TypeScript,
        Technical Blog,
        software developer,
        front end developer,
        web dev,
        next js,
        react developer"
          key="keywords"
          name="keywords"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />
      </Head>
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
                className="underline decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300"
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
              className="mt-8 gap-2 mb-8 flex h-6 items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Read more about me
              <MoveRight size={24} />
            </Link>
          </div>
          <div
            className="shrink-0 block relative mr-auto mb-8 w-32 h-32 sm:mb-0"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            <Image
              alt="Serhii Shramko's avatar - smile iOS emoji"
              src={smile}
              quality={75}
              width={128}
              height={128}
              className={clsx('absolute', {
                'opacity-0': isAvatarHovered,
              })}
              priority
            />
            <Image
              alt="Serhii Shramko's avatar - tongue iOS emoji"
              src={tongue}
              quality={75}
              width={128}
              height={128}
              className={clsx('absolute', {
                'opacity-0': !isAvatarHovered,
              })}
              priority
            />
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
          Featured Posts
        </h2>
        <div className="grid w-full auto-rows-fr gap-6 md:grid-cols-3">
          {featuredPosts.map(({ data: { slug, heading } }) => (
            <BlogPostSquarePreview
              heading={heading}
              slug={slug}
              classNames={generateGradient(slug)}
              key={slug}
            />
          ))}
        </div>

        <div className="w-full">
          <h2 className="mt-12 mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl flex items-start gap-2">
            Advanced React{' '}
            <span aria-hidden="true" className="w-6 h-6">
              <Atom className="w-6 h-6" strokeWidth={1.5} />
            </span>
          </h2>

          <div className="grid w-full auto-rows-fr gap-6 md:grid-cols-3">
            {advancedReactPosts.map(({ data: { slug, heading } }) => (
              <BlogPostSquarePreview
                heading={heading}
                slug={slug}
                classNames={generateGradient(slug)}
                key={slug}
              />
            ))}
          </div>

          <Link
            href="/blog/category/advanced-react"
            className="mt-8 flex gap-2 h-6 items-center rounded-lg leading-10 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Read more about React
            <MoveRight size={24} />
          </Link>
        </div>

        <div className="my-6 w-full">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Projects
          </h2>

          <div className="grid gap-8">
            <div className="flex flex-col gap-8 md:flex-row">
              <Link href={Routes.QuizletList()} className="w-full">
                <div className="hover:scale-[1.025] transition-all flex w-full items-center justify-center rounded-lg border-2 border-gray-200 p-4 text-center text-gray-100 h-75 bg-pattern dark:text-gray-900">
                  <h3 className="bg-gray-800 m-0 w-fit rounded-lg p-4 text-lg font-medium tracking-tight dark:text-gray-100 md:text-lg">
                    Quizlet QuickList
                  </h3>
                </div>
              </Link>

              <Link href={Routes.UdemyResetProgress()} className="w-full">
                <div className="hover:scale-[1.025] transition-all flex w-full items-center justify-center rounded-lg border-2 border-gray-200 p-4 text-center text-gray-100 h-75 bg-pattern-waves dark:text-gray-900">
                  <h3 className="bg-gray-800 m-0 w-fit rounded-lg p-4 text-lg font-medium tracking-tight dark:text-gray-100 md:text-lg">
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
        <div className="grid w-full auto-rows-fr gap-6 md:grid-cols-3">
          {otherPosts.map(({ data: { slug, heading } }) => (
            <BlogPostSquarePreview
              heading={heading}
              slug={slug}
              classNames="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              key={slug}
            />
          ))}
        </div>

        <Link
          href="/blog"
          className="mt-8 flex gap-2 h-6 items-center rounded-lg leading-10 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Read more posts
          <MoveRight size={24} />
        </Link>
      </section>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<IndexPageProps>
> {
  const posts = await getPosts();
  const otherPosts = posts
    .filter(filterByNotFeatured)
    .sort(sortByBirthtime)
    .slice(0, 3);
  const featuredPosts = posts.filter(filterByFeatured).sort(sortByBirthtime);
  const advancedReactPosts = posts
    .filter(filterByAdvanceReact)
    .sort(sortByBirthtime)
    .reverse();

  return {
    props: {
      featuredPosts,
      otherPosts,
      advancedReactPosts,
    },
  };
}

export default IndexPage;
