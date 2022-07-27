import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { _sum: { count } } = await prisma.views.aggregate({
      _sum: {
        count: true,
      },
    });

    return res.status(200).json({ total: count?.toString() });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}
