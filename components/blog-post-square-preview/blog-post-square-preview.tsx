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
        'w-full hover:scale-[1.02] transition-transform duration-200 ease-out-expo rounded-lg bg-linear-to-r p-1 active:scale-[0.97]',
        classNames,
      )}
    >
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-900 rounded p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <h3 className="text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
            {heading}
          </h3>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Eye size={24} aria-hidden="true" />
          <span className="ml-2 align-baseline">
            {views ? views.toLocaleString() : '---'}
          </span>
        </div>
      </div>
    </Link>
  );
}
