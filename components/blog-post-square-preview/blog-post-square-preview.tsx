import Link from 'next/link';
import clsx from 'clsx';
import useSWR from 'swr';
import { Eye } from 'lucide-react';

import { Views } from '@/lib/types';
import { fetcher } from '@/lib/fetcher';

interface BlogPostPreviewProps {
  heading: string;
  slug: string;
  classNames: string;
  animationDelay?: number;
}

export function BlogPostSquarePreview(props: BlogPostPreviewProps) {
  const { heading, slug, classNames, animationDelay } = props;

  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  const staggerClass = animationDelay !== undefined
    ? `animate-fade-in-up-${animationDelay}`
    : undefined;

  return (
    <Link
      key={slug}
      href={`/blog/${slug}`}
      className={clsx(
        'w-full rounded-lg bg-linear-to-r p-1 will-change-transform transition-transform duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.97]',
        classNames,
        staggerClass,
      )}
    >
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <h3 className="text-lg font-medium mb-4 sm:mb-6 w-full text-gray-900 dark:text-gray-100 tracking-tight">
            {heading}
          </h3>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Eye size={24} aria-hidden="true" />
          <span className="ml-2 align-baseline">
            {views ? views.toLocaleString() : (
              <span className="inline-block h-4 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
