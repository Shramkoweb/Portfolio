import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

import {
  formatViews,
  registerView,
  useViewCounts,
  whenVisible,
} from '@/lib/views';

interface ViewCounterProps {
  slug: string;
}

// Pages Router reuses the page component on client-side navigation between
// posts, so the registered total is tied to its slug and never carries over.
export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;
  const { mutate } = useSWRConfig();
  const { getViews } = useViewCounts();
  const [registered, setRegistered] = useState<{
    slug: string;
    total: number;
  }>();

  useEffect(() => {
    let stopWaiting = () => {};
    const register = () => {
      stopWaiting = whenVisible(() => {
        void registerView(slug).then((total) => {
          if (total === undefined) return;
          setRegistered({ slug, total });
          // Seeds the per-slug key that list cards floor their count with.
          void mutate(`/api/views/${slug}`, { total }, false);
        });
      });
    };

    // Defer to idle time to avoid blocking INP
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(register);
      return () => {
        cancelIdleCallback(id);
        stopWaiting();
      };
    }

    const id = setTimeout(register, 150);
    return () => {
      clearTimeout(id);
      stopWaiting();
    };
  }, [mutate, slug]);

  const shared = getViews(slug);
  const views =
    registered?.slug === slug
      ? Math.max(shared ?? 0, registered.total)
      : shared;

  if (!views) return null;

  return (
    <>
      {' '}
      <span aria-hidden="true">•</span>{' '}
      <span className="tabular-nums">{formatViews(views)}</span>
    </>
  );
}
