import useSWR from 'swr';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';
import { fetcher } from '@/lib/fetcher';
import { DashboardData } from '@/lib/types';

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
