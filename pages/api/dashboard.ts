import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { fetchGitHubStats } from '@/lib/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    const [viewsResult, github] = await Promise.allSettled([
      prisma.views.aggregate({ _sum: { count: true } }),
      fetchGitHubStats(),
    ]);

    const views =
      viewsResult.status === 'fulfilled' ? viewsResult.value._sum.count : 0;
    const gh =
      github.status === 'fulfilled'
        ? github.value
        : { stars: 0, followers: 0 };

    const allSucceeded =
      viewsResult.status === 'fulfilled' && github.status === 'fulfilled';

    res.setHeader(
      'Cache-Control',
      allSucceeded
        ? 's-maxage=300, stale-while-revalidate=3600'
        : 's-maxage=30, stale-while-revalidate=60',
    );

    return res.status(200).json({
      totalViews: Number(views ?? 0),
      stars: gh.stars,
      followers: gh.followers,
    });
  } catch {
    return res.status(500).json({
      error: { message: 'Internal Server Error' },
    });
  }
}
