import { errorResponse, SERVER_ERROR_MESSAGE } from '@/lib/api-response';
import prisma from '@/lib/prisma';
import { isKnownSlug } from '@/lib/valid-slugs';

export const maxDuration = 60;

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/views/[slug]'>,
) {
  try {
    const { slug } = await ctx.params;
    const views = await prisma.views.findUnique({
      where: { slug },
      select: { count: true },
    });

    // Cache for 1 minute, stale-while-revalidate for 2 minutes
    return Response.json(
      { total: Number(views?.count ?? 0) },
      {
        headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' },
      },
    );
  } catch {
    return errorResponse(500, SERVER_ERROR_MESSAGE);
  }
}

export async function POST(
  _request: Request,
  ctx: RouteContext<'/api/views/[slug]'>,
) {
  try {
    const { slug } = await ctx.params;

    if (!(await isKnownSlug(slug))) {
      return errorResponse(404, 'Unknown slug');
    }

    const views = await prisma.views.upsert({
      where: { slug },
      create: { slug },
      update: { count: { increment: 1 } },
      select: { count: true },
    });

    return Response.json({ total: Number(views.count) });
  } catch {
    return errorResponse(500, SERVER_ERROR_MESSAGE);
  }
}
