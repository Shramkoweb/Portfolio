import prisma from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export type AllViewsResponse = {
  views: Record<string, number>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  try {
    const allViews = await prisma.views.findMany({
      select: { slug: true, count: true },
    });

    const views: Record<string, number> = {};
    for (const row of allViews) {
      views[row.slug] = Number(row.count);
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

    return res.status(200).json({ views });
  } catch {
    return res.status(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
}
