import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { isCrossSiteRequest, isJsonRequest } from '@/lib/same-origin';
import {
  isValidReactionType,
  ReactionsResponse,
  ReactionType,
  VALID_REACTION_TYPES,
} from '@/lib/types';
import { isKnownSlug } from '@/lib/valid-slugs';

type ErrorResponse = {
  error: { message: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionsResponse | ErrorResponse>,
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

    if (req.method === 'GET') {
      const reactions = await prisma.reactions.findMany({
        where: { slug },
        select: {
          type: true,
          count: true,
        },
      });

      const reactionMap = new Map(
        reactions.map((r) => [r.type as ReactionType, Number(r.count)]),
      );

      const reactionCounts = VALID_REACTION_TYPES.reduce(
        (acc, type) => {
          acc[type] = reactionMap.get(type) ?? 0;
          return acc;
        },
        {} as Record<ReactionType, number>,
      );

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

      return res.status(200).json({ reactions: reactionCounts });
    }

    if (req.method === 'POST') {
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
        }),
        prisma.reactions.findMany({
          where: { slug },
          select: {
            type: true,
            count: true,
          },
        }),
      ]);

      const reactionMap = new Map(
        reactions.map((r) => [r.type as ReactionType, Number(r.count)]),
      );

      const reactionCounts = VALID_REACTION_TYPES.reduce(
        (acc, reactionType) => {
          acc[reactionType] = reactionMap.get(reactionType) ?? 0;
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
