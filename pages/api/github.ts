import { NextApiRequest, NextApiResponse } from 'next';

import { fetchGitHubStats } from '@/lib/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    const { stars, followers } = await fetchGitHubStats();

    // Cache for 1 hour, stale-while-revalidate for 24 hours
    res.setHeader(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400',
    );

    return res.status(200).json({ stars, followers });
  } catch {
    return res.status(500).json({
      error: { message: 'Internal Server Error' },
    });
  }
}
