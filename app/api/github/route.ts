import { errorResponse, SERVER_ERROR_MESSAGE } from '@/lib/api-response';
import { fetchGitHubStats } from '@/lib/github';

export const maxDuration = 60;

export async function GET() {
  try {
    const { stars, followers } = await fetchGitHubStats();

    // Cache for 1 hour, stale-while-revalidate for 24 hours
    return Response.json(
      { stars, followers },
      {
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch {
    return errorResponse(500, SERVER_ERROR_MESSAGE);
  }
}
