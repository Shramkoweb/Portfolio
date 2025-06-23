import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const slug = req.query.slug as string;

    if (req.method === 'POST') {
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
      });

      return res.status(200).json({
        total: views.count,
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json({ total: views?.count });
    }
  } catch {
    return res.status(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
}
