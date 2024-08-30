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
      <section className="flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              Serhii Shramko
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
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
              className="flex items-center mt-8 mb-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
            >
              Read more about me
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-2"
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
            className="w-[150px] sm:w-[300px] min-h-[150px] relative mb-8 sm:mb-0 mr-auto relative"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            <Image
              role="presentation"
              alt=""
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
              alt=""
              src={tongue}
              width={150}
              height={150}
              className={clsx('absolute', {
                'opacity-0': !isAvatarHovered,
              })}
            />
          </div>
        </div>
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
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
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white mt-16">
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
          className="flex items-center mt-8 text-gray-600 dark:text-gray-400 leading-10 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
        >
          Read more posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 ml-2"
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
