import useSWR from 'swr';

import { Views } from '@/lib/types';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter(props: ViewCounterProps) {
  const { slug } = props;

  const { data } = useSWR<Views>(
    `/api/views/${slug}`,
    (url) => fetch(url, { method: 'POST' }).then((res) => res.json()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return <span>{`${data?.total?.toLocaleString() ?? '---'} views`}</span>;
}
