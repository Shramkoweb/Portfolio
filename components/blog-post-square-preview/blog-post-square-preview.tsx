import clsx from 'clsx';
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface BlogPostPreviewProps {
  heading: string;
  slug: string;
  classNames: string;
  views?: number;
}

export function BlogPostSquarePreview(props: BlogPostPreviewProps) {
  const { heading, slug, classNames, views } = props;

  return (
    <Link
      key={slug}
      href={`/blog/${slug}`}
      className={clsx(
        'w-full rounded-lg bg-linear-to-r p-1 transition-transform duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.97]',
        classNames,
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
            {views !== undefined ? (
              <>
                {views.toLocaleString()}
                <span className="sr-only"> views</span>
              </>
            ) : (
              <span className="inline-block h-4 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
