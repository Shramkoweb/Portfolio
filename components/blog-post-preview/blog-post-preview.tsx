import Link from 'next/link';
import { Routes } from '@/lib/routes';
import useSWR from 'swr';

import { Views } from '@/lib/types';
import { fetcher } from '@/lib/fetcher';

interface BlogPostPreviewProps {
  slug: string;
  heading: string;
  excerpt: string;
}

/**
 * Displays a preview of a blog post with its heading, excerpt, and view count.
 *
 * Renders a link to the full blog post, showing the post's heading, a formatted view count (or "---" if unavailable), and an excerpt.
 *
 * @param props - Contains the blog post's slug, heading, and excerpt.
 */
export function BlogPostPreview(props: BlogPostPreviewProps) {
  const { slug, heading, excerpt } = props;

  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Link href={Routes.BlogPost(slug)} className="w-full">
      <div className="mb-8 w-full">
        <div className="font-medium flex flex-col justify-between md:flex-row">
          <h3 className="mb-2 w-full text-lg text-gray-900 dark:text-gray-100 md:text-xl">
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
