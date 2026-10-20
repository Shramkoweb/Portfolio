import type { NextApiRequest, NextApiResponse } from 'next';

import { validateSlugRouteRequest } from '@/lib/api/slug-route';
import prisma from '@/lib/prisma';
import { isCrossSiteRequest, isJsonRequest } from '@/lib/same-origin';
import {
  isValidReactionType,
  ReactionsResponse,
  ReactionType,
  VALID_REACTION_TYPES,
} from '@/lib/types';

type ErrorResponse = {
  error: { message: string };
};

const reactionSelect = { type: true, count: true } as const;

function toReactionCounts(
  rows: { type: string; count: bigint }[],
): Record<ReactionType, number> {
  const counts = new Map(rows.map((row) => [row.type, Number(row.count)]));

  return Object.fromEntries(
    VALID_REACTION_TYPES.map((type) => [type, counts.get(type) ?? 0]),
  ) as Record<ReactionType, number>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionsResponse | ErrorResponse>,
) {
  try {
    const slug = await validateSlugRouteRequest(req, res);
    if (!slug) return;

    if (req.method === 'GET') {
      const reactions = await prisma.reactions.findMany({
        where: { slug },
        select: reactionSelect,
      });

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

      return res.status(200).json({ reactions: toReactionCounts(reactions) });
    }

    if (isCrossSiteRequest(req)) {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }

    if (!isJsonRequest(req)) {
      return res
        .status(415)
        .json({ error: { message: 'Unsupported Media Type' } });
    }

    const { type } = req.body ?? {};

    if (!type || !isValidReactionType(type)) {
      return res.status(400).json({
        error: { message: 'Invalid reaction type' },
      });
    }

    const [, reactions] = await prisma.$transaction([
      prisma.reactions.upsert({
        where: { slug_type: { slug, type } },
        create: { slug, type, count: 1 },
        update: { count: { increment: 1 } },
      }),
      prisma.reactions.findMany({
        where: { slug },
        select: reactionSelect,
      }),
    ]);

    return res.status(200).json({ reactions: toReactionCounts(reactions) });
  } catch {
    return res.status(500).json({
      error: { message: 'Internal Server Error' },
    });
  }
}
