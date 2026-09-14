'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <main className="flex flex-col items-start max-w-3xl mx-auto px-8 py-16">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-8">
            Something went wrong
          </h1>
          <button
            type="button"
            onClick={reset}
            className="p-1 sm:p-4 w-64 font-bold bg-gray-200 dark:bg-gray-800 text-center rounded-lg transition-[background-color,transform] duration-200 ease-out-expo hover:bg-gray-300 dark:hover:bg-gray-700 active:scale-[0.97]"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
