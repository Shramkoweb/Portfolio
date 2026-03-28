import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { DashboardData } from 'lib/types';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

export function GithubFollowers() {
  const { data } = useSWR<DashboardData>('/api/dashboard', fetcher);

  return (
    <DashboardCard
      header="GitHub Followers"
      link="https://github.com/Shramkoweb"
      metric={data?.followers}
    />
  );
}
