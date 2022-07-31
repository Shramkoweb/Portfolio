import Image from 'next/future/image';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

import smile from 'public/static/images/smile.webp';
import tongue from 'public/static/images/tongue.webp';
import { BlogPostSquarePreview } from '@/components/blog-post-square-preview';

function IndexPage() {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const handleHover = () => {
    setIsAvatarHovered((prevValue) => !prevValue);
  };

  return (
    <div
      className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16"
    >
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
              rel="noreferrer"
              className="font-semibold underline"
            >
              MacPaw
            </a>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hi there 🖐 🇺🇦
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            I am an experienced software engineer with extensive knowledge of front-end development,
            with laser-focus on
            &ensp;
            <abbr title="A JavaScript library for building user interfaces">React</abbr>
            &ensp;and&ensp;
            <abbr title="The React Framework for Production">Next.JS</abbr>
          </p>
          <Link href="/about">
            <a
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
            </a>
          </Link>
        </div>
        <div
          className="w-[150px] sm:w-[300px] min-h-[150px] relative mb-8 sm:mb-0 mr-auto relative"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <Image
            alt=""
            quality={100}
            src={smile}
            className={clsx('absolute', {
              'opacity-0': isAvatarHovered,
            })}
            priority
          />
          <Image
            alt=""
            quality={100}
            src={tongue}
            className={clsx('absolute', {
              'opacity-0': !isAvatarHovered,
            })}
          />
        </div>
      </div>
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
        Featured Posts
      </h3>
      <div className="flex gap-6 flex-col md:flex-row w-full">
        <BlogPostSquarePreview
          title="How to fix '__dirname is not defined in ES module scope'"
          slug="dirname-error"
          gradient="from-[#D8B4FE] to-[#818CF8]"
        />
        <BlogPostSquarePreview
          title="Expressions vs Statements"
          slug="expressions-statements"
          gradient="from-pink-500 via-red-500 to-yellow-500"
        />
      </div>
    </div>
  );
}

export default IndexPage;
