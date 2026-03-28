import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { DashboardData } from 'lib/types';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

export function GitHubStars() {
  const { data } = useSWR<DashboardData>('/api/dashboard', fetcher);

  return (
    <DashboardCard
      header="GitHub Stars"
      link="https://github.com/Shramkoweb"
      metric={data?.stars}
    />
  );
}
