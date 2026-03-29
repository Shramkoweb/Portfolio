import Link from 'next/link';
import Head from 'next/head';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

function NotFoundPage() {
  useEffect(() => {
    // TODO refactor to some ErrorProvider
    Sentry.captureException(new Error('404'));
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
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Page Not Found | Serhii Shramko" key="og:title" />
        <meta
          property="og:description"
          content="Oops! The page you're looking for isn't here. Let's start by heading to the homepage."
          key="og:description"
        />
        <meta
          property="og:image"
          content="https://shramko.dev/api/og?title=Page%20Not%20Found"
          key="og:image"
        />
        <meta property="og:image:alt" content="Page Not Found – Serhii Shramko" key="og:image:alt" />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="630" key="og:image:height" />
        <meta name="twitter:title" content="Page Not Found | Serhii Shramko" key="twitter:title" />
        <meta
          name="twitter:description"
          content="Oops! The page you're looking for isn't here. Let's start by heading to the homepage."
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content="https://shramko.dev/api/og?title=Page%20Not%20Found"
          key="twitter:image"
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
          className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white"
        >
          Home
        </Link>
      </section>
    </>
  );
}

export default NotFoundPage;
