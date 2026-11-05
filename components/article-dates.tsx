import Link from 'next/link';

import { formatPostDate } from '@/lib/posts/utils';

interface ArticleDatesProps {
  createDate: number;
  updateDate: number | null;
}

export function ArticleDates(props: ArticleDatesProps) {
  const { createDate, updateDate } = props;

  return (
    <div className="text-xs text-gray-700 dark:text-gray-300">
      <p>
        By{' '}
        <Link
          href="/about"
          rel="author"
          className="font-medium underline decoration-gray-300 decoration-1 underline-offset-[3px] transition-[text-decoration-color] duration-150 ease-out-expo hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400"
        >
          Serhii Shramko
        </Link>
      </p>
      <p>
        Published on{' '}
        <time dateTime={new Date(createDate).toISOString()}>
          {formatPostDate(createDate)}
        </time>
      </p>
      {updateDate && (
        <p>
          Last updated on{' '}
          <strong className="font-medium">
            <time dateTime={new Date(updateDate).toISOString()}>
              {formatPostDate(updateDate)}
            </time>
          </strong>
        </p>
      )}
    </div>
  );
}
