import { useEffect } from 'react';
import useSWR from 'swr';

import { Views } from '@/lib/types';
import { fetcher } from '@/lib/fetcher';
import { isProduction } from '@/lib/utils';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;

  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  useEffect(() => {
    const registerView = () => fetch(`/api/views/${slug}`, {
      method: 'POST',
    });

    if (isProduction()) {
      registerView();
    }
  }, [slug]);

  return <span>{`${views ? views.toLocaleString() : '---'} views`}</span>;
}
