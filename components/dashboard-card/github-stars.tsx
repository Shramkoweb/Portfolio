import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { GitHub } from 'lib/types';
import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

export function GitHubStars() {
  const { data } = useSWR<GitHub>('/api/github', fetcher);

  const stars = data?.stars;

  const link = 'https://github.com/Shramkoweb';

  return (
    <DashboardCard
      header="GitHub Stars"
      link={link}
      metric={stars}
    />
  );
}
