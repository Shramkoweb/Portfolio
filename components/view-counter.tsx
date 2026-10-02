import { useEffect, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { fetcher } from '@/lib/fetcher';
import { Views } from '@/lib/types';
import type { AllViewsResponse } from '@/pages/api/views';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;
  const cacheKey = `/api/views/${slug}`;
  const hasRegisteredView = useRef(false);
  const { cache, mutate } = useSWRConfig();

  const { data } = useSWR<Views>(cacheKey, fetcher);

  useEffect(() => {
    if (hasRegisteredView.current) {
      return;
    }

    hasRegisteredView.current = true;

    const register = () => {
      fetch(cacheKey, { method: 'POST' })
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((newData: Views) => {
          mutate(cacheKey, newData, false);
          // Blog cards read the shared /api/views map, so patch it too or they
          // show the pre-visit count until the CDN copy expires. Only patch a
          // map that is already cached: any mutate on the key makes SWR discard
          // an in-flight GET, which would leave every card blank.
          const allViews = (
            cache.get('/api/views')?.data as AllViewsResponse | undefined
          )?.views;
          if (allViews) {
            mutate<AllViewsResponse>(
              '/api/views',
              { views: { ...allViews, [slug]: newData.total } },
              { revalidate: false },
            );
          }
        })
        .catch(() => {
          hasRegisteredView.current = false;
        });
    };

    // Defer to idle time to avoid blocking INP
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(register);
      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(register, 150);
    return () => clearTimeout(id);
  }, [cache, cacheKey, mutate, slug]);

  return (
    <span className="tabular-nums">{`${data?.total?.toLocaleString() ?? '---'} views`}</span>
  );
}
