'use client';

import useSWR from 'swr';

import { BlogPostSquarePreview } from '@/components/blog-post-square-preview';
import { fetcher } from '@/lib/fetcher';
import type { AllViewsResponse } from '@/lib/types';

export interface PostGridItem {
  slug: string;
  heading: string;
  classNames: string;
}

interface PostGridProps {
  items: PostGridItem[];
}

export function PostGrid(props: PostGridProps) {
  const { items } = props;
  const { data } = useSWR<AllViewsResponse>('/api/views', fetcher);

  return (
    <div className="grid w-full auto-rows-fr gap-6 md:grid-cols-3">
      {items.map(({ slug, heading, classNames }) => (
        <BlogPostSquarePreview
          key={slug}
          heading={heading}
          slug={slug}
          classNames={classNames}
          views={data?.views?.[slug]}
        />
      ))}
    </div>
  );
}
