import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {
      _sum: { count },
    } = await prisma.views.aggregate({
      _sum: {
        count: true,
      },
    });

    // Cache for 5 minutes, stale-while-revalidate for 10 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    return res.status(200).json({ total: Number(count ?? 0) });
  } catch {
    return res.status(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
}
