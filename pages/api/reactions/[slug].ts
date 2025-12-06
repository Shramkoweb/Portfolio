import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'lib/prisma';
import {
  VALID_REACTION_TYPES,
  ReactionType,
  ReactionsResponse,
  isValidReactionType,
} from '@/lib/types';

type ErrorResponse = {
  error: { message: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionsResponse | ErrorResponse>,
) {
  try {
    const slug = req.query.slug as string;

    if (req.method === 'GET') {
      const reactions = await prisma.reactions.findMany({
        where: { slug },
      });

      const reactionCounts = VALID_REACTION_TYPES.reduce(
        (acc, type) => {
          const reaction = reactions.find((r) => r.type === type);
          acc[type] = Number(reaction?.count ?? 0);
          return acc;
        },
        {} as Record<ReactionType, number>,
      );

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

      return res.status(200).json({ reactions: reactionCounts });
    }

    if (req.method === 'POST') {
      const { type } = req.body;

      if (!type || !isValidReactionType(type)) {
        return res.status(400).json({
          error: { message: 'Invalid reaction type' },
        });
      }

      await prisma.reactions.upsert({
        where: {
          slug_type: { slug, type },
        },
        create: {
          slug,
          type,
          count: 1,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      const reactions = await prisma.reactions.findMany({
        where: { slug },
      });

      const reactionCounts = VALID_REACTION_TYPES.reduce(
        (acc, reactionType) => {
          const reaction = reactions.find((r) => r.type === reactionType);
          acc[reactionType] = Number(reaction?.count ?? 0);
          return acc;
        },
        {} as Record<ReactionType, number>,
      );

      return res.status(200).json({ reactions: reactionCounts });
    }

    return res.status(405).json({
      error: { message: 'Method not allowed' },
    });
  } catch {
    return res.status(500).json({
      error: { message: 'Internal Server Error' },
    });
  }
}
