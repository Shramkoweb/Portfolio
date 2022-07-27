import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

// eslint-disable-next-line consistent-return
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
        total: views.count.toString(),
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug,
        },
      });

      return res.status(200).json({ total: views?.count.toString() });
    }
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}
