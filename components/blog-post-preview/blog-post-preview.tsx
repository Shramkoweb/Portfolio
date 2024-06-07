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
      <div className="w-full mb-8">
        <div className="flex flex-col justify-between md:flex-row">
          <h3 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
            {heading}
          </h3>
          <p className="w-32 mb-4 text-left text-gray-500 md:text-right md:mb-0">
            {`${views ? views.toLocaleString() : '---'} views`}
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
      </div>
    </Link>
  );
}
