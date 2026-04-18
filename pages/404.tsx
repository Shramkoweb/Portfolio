import Link from 'next/link';
import Head from 'next/head';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

function NotFoundPage() {
  useEffect(() => {
    Sentry.captureMessage(`404: ${window.location.pathname}`, {
      level: 'info',
      tags: { referrer: document.referrer || 'direct' },
    });
  }, []);

  return (
    <>
      <Head>
        <title>404 | Serhii Shramko</title>
        <meta
          content="Oops! The page you're looking for isn't here. But don't worry, we'll help you find your way back. Let's start by heading to the homepage."
          name="description"
          key="description"
        />
      </Head>
      <section className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 text-black dark:text-white">
          YOU&apos;RE IN THE WRONG PLACE
        </h1>
        <video
          loop
          autoPlay
          muted
          playsInline
          aria-label="Animated illustration of a confused traveler, representing a page not found"
          className="mb-8 w-full"
        >
          <source src="/static/images/404.mp4" type="video/mp4" />
          Your browser does not support the video tag. The page you are looking
          for was not found.
        </video>
        <Link
          href="/"
          className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-lg text-black dark:text-white transition-[background-color,transform] duration-200 ease-out-expo hover:bg-gray-300 dark:hover:bg-gray-700 active:scale-[0.97]"
        >
          Home
        </Link>
      </section>
    </>
  );
}

export default NotFoundPage;
