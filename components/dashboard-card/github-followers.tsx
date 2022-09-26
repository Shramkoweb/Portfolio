import useSWR from 'swr';

import { fetcher } from 'lib/fetcher';
import { GitHub } from 'lib/types';
import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

export function GithubFollowers() {
  const { data } = useSWR<GitHub>('/api/github', fetcher);

  const followers = data?.followers;

  const link = 'https://github.com/Shramkoweb';

  return (
    <DashboardCard header="GitHub Followers" link={link} metric={followers} />
  );
}
