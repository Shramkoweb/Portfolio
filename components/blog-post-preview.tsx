import Link from 'next/link';

import { Routes } from '@/lib/routes';
import { formatViews } from '@/lib/views';

interface BlogPostPreviewProps {
  slug: string;
  heading: string;
  excerpt: string;
  views?: number;
}

export function BlogPostPreview(props: BlogPostPreviewProps) {
  const { slug, heading, excerpt, views } = props;

  return (
    <Link
      href={Routes.BlogPost(slug)}
      className="group block rounded-lg border border-gray-200 bg-white p-4 transition-[border-color,transform] duration-150 ease-out-expo hover:border-gray-300 active:scale-[0.97] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
    >
      <div className="flex flex-col justify-between gap-1 md:flex-row md:items-start">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 md:text-lg">
          {heading}
        </h3>
        {/* Reserves the line and the widest compact count ("1.2K views") so
            the heading doesn't re-wrap when the count arrives. */}
        <p className="min-h-5 shrink-0 text-sm tabular-nums text-gray-500 dark:text-gray-400 md:min-w-[10ch] md:text-right">
          {views ? formatViews(views) : null}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {excerpt}
      </p>
    </Link>
  );
}
