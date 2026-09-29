import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { isCrossSiteRequest } from '@/lib/same-origin';
import { isKnownSlug } from '@/lib/valid-slugs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET' && req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ error: { message: 'Method not allowed' } });
    }

    const slug = req.query.slug;
    res.setHeader('Cache-Control', 'no-store');

    if (typeof slug !== 'string' || !(await isKnownSlug(slug))) {
      return res.status(404).json({ error: { message: 'Unknown slug' } });
    }

    if (Object.keys(req.query).some((key) => key !== 'slug')) {
      return res
        .status(400)
        .json({ error: { message: 'Unexpected query parameter' } });
    }

    if (req.method === 'POST') {
      if (isCrossSiteRequest(req)) {
        return res.status(403).json({ error: { message: 'Forbidden' } });
      }

      const views = await prisma.views.upsert({
        where: { slug },
        create: {
          slug,
        },
        update: {
          count: {
            increment: 1,
          },
        },
        select: { count: true },
      });

      return res.status(200).json({
        total: Number(views.count),
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug,
        },
        select: { count: true },
      });

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

      return res.status(200).json({ total: Number(views?.count ?? 0) });
    }
    return res.status(405).json({
      error: { message: 'Method not allowed' },
    });
  } catch {
    return res.status(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
}
