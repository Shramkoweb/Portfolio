import { useEffect } from 'react';
import useSWR from 'swr';
import * as Sentry from '@sentry/react';

import { Views } from '@/lib/types';
import { fetcher } from '@/lib/fetcher';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;

  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  useEffect(() => {
    const registerView = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`, {
          method: 'POST',
        });

        if (!response.ok) {
          const error = new Error(`HTTP error! status: ${response.status}`) as Error & { status: number; url: string };
          error.status = response.status;
          error.url = `/api/views/${slug}`;
          throw error;
        }
      } catch (error) {
        Sentry.captureException(error, {
          tags: {
            section: 'view-counter',
            slug,
          },
          extra: {
            endpoint: `/api/views/${slug}`,
            timestamp: new Date().toISOString(),
          },
        });

        // eslint-disable-next-line
        console.error('Failed to register view:', error);
      }
    };

    registerView();
  }, [slug]);

  return <span>{`${views ? views.toLocaleString() : '---'} views`}</span>;
}
