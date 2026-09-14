import { fetchGitHubStats } from '@/lib/github';
import prisma from '@/lib/prisma';
import type { DashboardData } from '@/lib/types';

export const maxDuration = 60;

export async function GET() {
  const [viewsResult, github] = await Promise.allSettled([
    prisma.views.aggregate({ _sum: { count: true } }),
    fetchGitHubStats(),
  ]);

  const views =
    viewsResult.status === 'fulfilled' ? viewsResult.value._sum.count : 0;
  const gh =
    github.status === 'fulfilled' ? github.value : { stars: 0, followers: 0 };

  const allSucceeded =
    viewsResult.status === 'fulfilled' && github.status === 'fulfilled';

  const body: DashboardData = {
    totalViews: Number(views ?? 0),
    stars: gh.stars,
    followers: gh.followers,
  };

  return Response.json(body, {
    headers: {
      'Cache-Control': allSucceeded
        ? 's-maxage=300, stale-while-revalidate=3600'
        : 's-maxage=30, stale-while-revalidate=60',
    },
  });
}
