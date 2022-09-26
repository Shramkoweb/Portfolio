import useSWR from 'swr';

import { Views } from 'lib/types';
import { fetcher } from '@/lib/fetcher';
import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

export function BlogViewsCard() {
  const { data } = useSWR<Views>('/api/views', fetcher);

  const blogViews = data?.total;
  const link = 'https://shramko.dev/blog';

  return (
    <DashboardCard header="Total blog views" link={link} metric={blogViews} />
  );
}
