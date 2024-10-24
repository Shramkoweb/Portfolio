import Link from 'next/link';
import clsx from 'clsx';
import useSWR from 'swr';

import { Views } from '@/lib/types';
import { fetcher } from '@/lib/fetcher';

interface BlogPostPreviewProps {
  heading: string;
  slug: string;
  classNames: string;
}

export function BlogPostSquarePreview(props: BlogPostPreviewProps) {
  const { heading, slug, classNames } = props;

  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Link
      key={slug}
      href={`/blog/${slug}`}
      className={clsx(
        'w-full transform hover:scale-[1.025] transition-all rounded-xl bg-gradient-to-r p-1',
        classNames,
      )}
    >
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <h3 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
            {heading}
          </h3>
        </div>
        <div className="flex items-center text-gray-800 dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="ml-2 align-baseline">
            {views ? views.toLocaleString() : '---'}
          </span>
        </div>
      </div>
    </Link>
  );
}
