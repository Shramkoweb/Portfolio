import useSWR from 'swr';

import { DashboardData } from 'lib/types';
import { fetcher } from '@/lib/fetcher';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

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
