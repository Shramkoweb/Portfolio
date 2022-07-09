import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/future/image';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

import notFound from '../public/static/images/404.gif';

function NotFound() {
  useEffect(() => {
    Sentry.captureException(new Error('404'));
  }, []);

  return (
    <>
      <Head>
        <title>404 - Serhii Shramko</title>
      </Head>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 text-black dark:text-white">
          YOU&apos;RE IN THE WRONG PLACE
        </h1>
        <Image className="mb-8 w-full" src={notFound} alt="" />
        <Link href="/">
          <a
            className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white"
          >
            Home
          </a>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
