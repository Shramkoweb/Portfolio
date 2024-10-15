import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import clsx from 'clsx';
import { GetStaticPropsResult } from 'next';

import { getPosts } from '@/lib/posts/api';
import {
  filterByFeatured,
  filterByNotFeatured,
  sortByBirthtime,
} from '@/lib/posts/utils';
import { Post } from '@/lib/types';

import { BlogPostSquarePreview } from '@/components/blog-post-square-preview';

import smile from 'public/static/images/smile.webp';
import tongue from 'public/static/images/tongue.webp';

const GRADIENTS = [
  'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
  'bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400',
  'bg-gradient-to-r from-purple-400 to-yellow-400',
  'bg-gradient-to-r from-purple-200 to-purple-800',
  'bg-gradient-to-r from-purple-400 to-blue-600',
  'bg-gradient-to-r from-green-300 to-purple-400',
];

interface IndexPageProps {
  featuredPosts: Post[];
  otherPosts: Post[];
}

function IndexPage(props: IndexPageProps) {
  const { featuredPosts, otherPosts } = props;

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
      </Head>
      <section className="mx-auto flex max-w-3xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col pr-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
              Serhii Shramko
            </h1>
            <h2 className="mb-4 text-gray-700 dark:text-gray-200">
              Senior Developer at&ensp;
              <a
                href="https://macpaw.com/"
                target="_blank"
                rel="noopener"
                className="font-semibold underline"
              >
                MacPaw
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
              className="mt-8 mb-8 flex h-6 items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Read more about me
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="ml-2 h-6 w-6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </Link>
          </div>
          <div
            className="relative mr-auto mb-8 w-[150px] min-h-[150px] sm:w-[300px] sm:mb-0"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            <Image
              role="presentation"
              alt="Serhii Shramko's avatar - smile iOS emoji"
              src={smile}
              width={150}
              height={150}
              className={clsx('absolute', {
                'opacity-0': isAvatarHovered,
              })}
              priority
            />
            <Image
              role="presentation"
              alt="Serhii Shramko's avatar - tongue iOS emoji"
              src={tongue}
              width={150}
              height={150}
              className={clsx('absolute', {
                'opacity-0': !isAvatarHovered,
              })}
            />
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
          Featured Posts
        </h2>
        <div className="grid w-full auto-rows-fr gap-6 md:grid-cols-3">
          {featuredPosts.map(({ data: { slug, heading } }, index) => (
            <BlogPostSquarePreview
              heading={heading}
              slug={slug}
              classNames={GRADIENTS[index]}
              key={slug}
            />
          ))}
        </div>

        <section className="my-6 w-full">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Projects
          </h2>

          <Link href="/quizlet-list">
            <div className="hover:scale-[1.025] transition-all flex w-full items-center justify-center rounded-lg border-2 border-gray-200 p-4 text-center text-gray-100 h-[300px] bg-pattern dark:text-gray-900">
              <h3 className="bg-gray-800 m-0 w-fit rounded-lg p-4 text-lg font-medium tracking-tight dark:text-gray-100 md:text-lg">
                Quizlet QuickList
              </h3>
            </div>
          </Link>
        </section>

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
          className="mt-8 flex h-6 items-center rounded-lg leading-10 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Read more posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="ml-2 h-6 w-6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
            />
          </svg>
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

  return {
    props: {
      featuredPosts,
      otherPosts,
    },
  };
}

export default IndexPage;
