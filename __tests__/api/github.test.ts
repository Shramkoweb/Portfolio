/**
 * @jest-environment node
 */
import { GET } from '@/app/api/github/route';

const mockFetchGitHubStats = jest.fn();
jest.mock('@/lib/github', () => ({
  fetchGitHubStats: (...args: unknown[]) => mockFetchGitHubStats(...args),
}));

describe('API /api/github', () => {
  it('returns stars and followers', async () => {
    mockFetchGitHubStats.mockResolvedValue({ stars: 50, followers: 200 });

    const res = await GET();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ stars: 50, followers: 200 });
    expect(res.headers.get('Cache-Control')).toBe(
      's-maxage=3600, stale-while-revalidate=86400',
    );
  });

  it('returns 500 on failure', async () => {
    mockFetchGitHubStats.mockRejectedValue(new Error('rate limited'));

    const res = await GET();

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      error: { message: 'Internal Server Error' },
    });
  });
});
