import type { NextApiRequest, NextApiResponse } from 'next';

import { validateSlugRouteRequest } from '@/lib/api/slug-route';
import prisma from '@/lib/prisma';
import { isCrossSiteRequest } from '@/lib/same-origin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const slug = await validateSlugRouteRequest(req, res);
    if (!slug) return;

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: { slug },
        select: { count: true },
      });

      res.setHeader(
        'Cache-Control',
        's-maxage=60, stale-while-revalidate=120, stale-if-error=86400',
      );

      return res.status(200).json({ total: Number(views?.count ?? 0) });
    }

    if (isCrossSiteRequest(req)) {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }

    const views = await prisma.views.upsert({
      where: { slug },
      create: { slug },
      update: { count: { increment: 1 } },
      select: { count: true },
    });

    return res.status(200).json({ total: Number(views.count) });
  } catch {
    return res.status(500).json({
      error: { message: 'Internal Server Error' },
    });
  }
}
