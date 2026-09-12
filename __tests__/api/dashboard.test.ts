/**
 * @jest-environment node
 */
import { GET } from '@/app/api/dashboard/route';

const mockAggregate = jest.fn();

jest.mock('lib/prisma', () => ({
  __esModule: true,
  default: {
    views: {
      get aggregate() {
        return mockAggregate;
      },
    },
  },
}));

const mockFetchGitHubStats = jest.fn();
jest.mock('@/lib/github', () => ({
  fetchGitHubStats: (...args: unknown[]) => mockFetchGitHubStats(...args),
}));

describe('API /api/dashboard', () => {
  it('aggregates views + github stats on success', async () => {
    mockAggregate.mockResolvedValue({ _sum: { count: 5000n } });
    mockFetchGitHubStats.mockResolvedValue({ stars: 42, followers: 100 });

    const res = await GET();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      totalViews: 5000,
      stars: 42,
      followers: 100,
    });
    expect(res.headers.get('Cache-Control')).toBe(
      's-maxage=300, stale-while-revalidate=3600',
    );
  });

  it('uses short cache when one source fails', async () => {
    mockAggregate.mockRejectedValue(new Error('DB down'));
    mockFetchGitHubStats.mockResolvedValue({ stars: 10, followers: 5 });

    const res = await GET();

    expect(await res.json()).toEqual({
      totalViews: 0,
      stars: 10,
      followers: 5,
    });
    expect(res.headers.get('Cache-Control')).toBe(
      's-maxage=30, stale-while-revalidate=60',
    );
  });

  it('falls back gracefully when both sources fail', async () => {
    mockAggregate.mockRejectedValue(new Error('DB'));
    mockFetchGitHubStats.mockRejectedValue(new Error('GH'));

    const res = await GET();

    expect(await res.json()).toEqual({ totalViews: 0, stars: 0, followers: 0 });
  });

  it('treats fulfilled views with null aggregate as 0', async () => {
    mockAggregate.mockResolvedValue({ _sum: { count: null } });
    mockFetchGitHubStats.mockResolvedValue({ stars: 1, followers: 2 });

    const res = await GET();

    expect(await res.json()).toEqual({ totalViews: 0, stars: 1, followers: 2 });
  });
});
