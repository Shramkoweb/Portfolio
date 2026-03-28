import { useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher } from '@/lib/fetcher';
import { Views } from '@/lib/types';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;
  const cacheKey = `/api/views/${slug}`;
  const hasRegisteredView = useRef(false);

  const { data } = useSWR<Views>(cacheKey, fetcher);

  useEffect(() => {
    if (hasRegisteredView.current) {
      return;
    }

    hasRegisteredView.current = true;

    const register = () => {
      fetch(cacheKey, { method: 'POST' })
        .then((res) => res.json())
        .then((newData) => {
          mutate(cacheKey, newData, false);
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
  }, [cacheKey]);

  return <span>{`${data?.total?.toLocaleString() ?? '---'} views`}</span>;
}
