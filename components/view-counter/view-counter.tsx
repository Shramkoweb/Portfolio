import { useEffect } from 'react';
import useSWR from 'swr';
import * as Sentry from '@sentry/nextjs';

import { Views } from '@/lib/types';
import { fetcher } from '@/lib/fetcher';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;

  const { data } = useSWR<Views>(`/api/views?slug=${slug}`, fetcher);
  const views = data?.total;

  useEffect(() => {
    const registerView = async () => {
      try {
        await fetch(`/api/views?slug=${slug}`, {
          method: 'POST',
        });
      } catch (error: unknown) {
        console.error(error);
        Sentry.captureException(
          {
            error,
            endpoint: `/api/views?slug=${slug}`,
          },
          {
            tags: {
              section: 'view-counter',
              slug,
            },
            extra: {
              error: JSON.stringify(error),
              timestamp: new Date().toISOString(),
            },
          },
        );
      }
    };

    registerView();
  }, [slug]);

  return <span>{`${views ? views.toLocaleString() : '---'} views`}</span>;
}
