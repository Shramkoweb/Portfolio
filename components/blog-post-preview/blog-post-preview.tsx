import Link from 'next/link';
import useSWR from 'swr';

import { Views } from '@/lib/types';
import { fetcher } from '@/lib/fetcher';

interface BlogPostPreviewProps {
  slug: string;
  heading: string;
  excerpt: string;
}

export function BlogPostPreview(props: BlogPostPreviewProps) {
  const { slug, heading, excerpt } = props;

  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Link href={`/blog/${slug}`} className="w-full">
      <div className="mb-8 w-full">
        <div className="flex flex-col justify-between md:flex-row">
          <h3 className="mb-2 w-full text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl">
            {heading}
          </h3>
          <p className="mb-4 w-32 text-left text-gray-500 md:mb-0 md:text-right">
            {`${views ? views.toLocaleString() : '---'} views`}
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
      </div>
    </Link>
  );
}
