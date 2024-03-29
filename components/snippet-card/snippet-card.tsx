import Link from 'next/link';

import { Snippet } from '@/lib/types';

type SnippetCardProps = Pick<Snippet['data'], 'title' | 'slug' | 'createDate'>;

export function SnippetCard(props: SnippetCardProps) {
  const { createDate, title, slug } = props;

  const formattedDate = new Date(createDate).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <Link
      href={`/snippets/${slug}`}
      className="border border-grey-200 dark:border-gray-800 rounded p-4 w-full bg-white dark:bg-gray-900"
    >
      <h2 className="text-lg font-bold text-left text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-1 text-gray-700 dark:text-gray-400">{formattedDate}</p>
    </Link>
  );
}
