import { errorResponse, SERVER_ERROR_MESSAGE } from '@/lib/api-response';
import prisma from '@/lib/prisma';
import {
  isValidReactionType,
  ReactionsResponse,
  ReactionType,
  VALID_REACTION_TYPES,
} from '@/lib/types';
import { isKnownSlug } from '@/lib/valid-slugs';

export const maxDuration = 60;

const CACHE_HEADERS = {
  'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
};

function toReactionCounts(
  rows: Array<{ type: string; count: bigint }>,
): ReactionsResponse {
  const reactionMap = new Map(
    rows.map((row) => [row.type as ReactionType, Number(row.count)]),
  );

  const reactions = VALID_REACTION_TYPES.reduce(
    (acc, type) => {
      acc[type] = reactionMap.get(type) ?? 0;
      return acc;
    },
    {} as Record<ReactionType, number>,
  );

  return { reactions };
}

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/reactions/[slug]'>,
) {
  try {
    const { slug } = await ctx.params;
    const rows = await prisma.reactions.findMany({
      where: { slug },
      select: { type: true, count: true },
    });

    return Response.json(toReactionCounts(rows), { headers: CACHE_HEADERS });
  } catch {
    return errorResponse(500, SERVER_ERROR_MESSAGE);
  }
}

export async function POST(
  request: Request,
  ctx: RouteContext<'/api/reactions/[slug]'>,
) {
  try {
    const { slug } = await ctx.params;
    const body: unknown = await request.json().catch(() => null);
    const type =
      body && typeof body === 'object' && 'type' in body
        ? (body as { type?: unknown }).type
        : undefined;

    if (typeof type !== 'string' || !isValidReactionType(type)) {
      return errorResponse(400, 'Invalid reaction type');
    }

    if (!(await isKnownSlug(slug))) {
      return errorResponse(404, 'Unknown slug');
    }

    const [, rows] = await prisma.$transaction([
      prisma.reactions.upsert({
        where: { slug_type: { slug, type } },
        create: { slug, type, count: 1 },
        update: { count: { increment: 1 } },
      }),
      prisma.reactions.findMany({
        where: { slug },
        select: { type: true, count: true },
      }),
    ]);

    return Response.json(toReactionCounts(rows));
  } catch {
    return errorResponse(500, SERVER_ERROR_MESSAGE);
  }
}
