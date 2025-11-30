import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher } from '@/lib/fetcher';
import { Views } from '@/lib/types';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;
  const cacheKey = `/api/views/${slug}`;

  const { data } = useSWR<Views>(cacheKey, fetcher);

  useEffect(() => {
    // Register view (fire-and-forget)
    fetch(cacheKey, { method: 'POST' })
      .then((res) => res.json())
      .then((newData) => {
        // Update SWR cache with new count
        mutate(cacheKey, newData, false);
      })
      .catch(() => {
        // Silently fail - view registration is non-critical
      });
  }, [cacheKey]);

  return <span>{`${data?.total?.toLocaleString() ?? '---'} views`}</span>;
}
