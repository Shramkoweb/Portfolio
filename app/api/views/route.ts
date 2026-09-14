import { errorResponse, SERVER_ERROR_MESSAGE } from '@/lib/api-response';
import prisma from '@/lib/prisma';
import type { AllViewsResponse } from '@/lib/types';

export const maxDuration = 60;

export async function GET() {
  try {
    const allViews = await prisma.views.findMany({
      select: { slug: true, count: true },
    });

    const views: Record<string, number> = {};
    for (const row of allViews) {
      views[row.slug] = Number(row.count);
    }

    const body: AllViewsResponse = { views };

    return Response.json(body, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' },
    });
  } catch {
    return errorResponse(500, SERVER_ERROR_MESSAGE);
  }
}
