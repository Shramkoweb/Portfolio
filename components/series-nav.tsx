import Link from 'next/link';

import { SeriesPosition } from '@/lib/posts/utils';

const SERIES_NAME = 'Advanced React';
const SERIES_HREF = '/blog/category/advanced-react';

interface SeriesProps {
  series: SeriesPosition;
}

export function SeriesLabel({ series }: SeriesProps) {
  return (
    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      <Link
        href={SERIES_HREF}
        className="underline-offset-4 hover:text-gray-900 hover:underline dark:hover:text-gray-100"
      >
        {SERIES_NAME}
      </Link>
      {` · Part ${series.part} of ${series.total}`}
    </p>
  );
}

export function SeriesNav({ series }: SeriesProps) {
  const { part, prev, next } = series;

  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label={`${SERIES_NAME} series`}
      className="mt-12 grid gap-4 sm:grid-cols-2"
    >
      {prev && (
        <Link
          href={`/blog/${prev.slug}`}
          className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
        >
          <span className="block text-sm text-gray-600 dark:text-gray-400">
            ← Part {part - 1}
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {prev.heading}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-gray-400 sm:col-start-2 dark:border-gray-800 dark:hover:border-gray-600"
        >
          <span className="block text-sm text-gray-600 dark:text-gray-400">
            Part {part + 1} →
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {next.heading}
          </span>
        </Link>
      )}
    </nav>
  );
}
