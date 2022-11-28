import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { GitHub } from 'lib/types';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

export function GitHubStars() {
  const { data } = useSWR<GitHub>('/api/github', fetcher);

  const stars = data?.stars;

  return (
    <DashboardCard
      header="GitHub Stars"
      link="https://github.com/Shramkoweb"
      metric={stars}
    />
  );
}
