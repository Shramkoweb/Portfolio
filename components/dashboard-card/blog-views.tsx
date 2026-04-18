import { DashboardData } from 'lib/types';
import useSWR from 'swr';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';
import { fetcher } from '@/lib/fetcher';

export function BlogViewsCard() {
  const { data } = useSWR<DashboardData>('/api/dashboard', fetcher);

  return (
    <DashboardCard
      header="Total blog views"
      link="https://shramko.dev/blog"
      metric={data?.totalViews}
    />
  );
}
