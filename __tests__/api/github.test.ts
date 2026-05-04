import handler from '@/pages/api/github';

import { createMockReqRes } from '../helpers/api-mocks';

const mockFetchGitHubStats = jest.fn();
jest.mock('@/lib/github', () => ({
  fetchGitHubStats: (...args: unknown[]) => mockFetchGitHubStats(...args),
}));

describe('API /api/github', () => {
  it('rejects non-GET', async () => {
    const { req, res, status } = createMockReqRes({ method: 'POST' });

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(405);
  });

  it('returns stars and followers', async () => {
    mockFetchGitHubStats.mockResolvedValue({ stars: 50, followers: 200 });
    const { req, res, status, json, setHeader } = createMockReqRes();

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ stars: 50, followers: 200 });
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400',
    );
  });

  it('returns 500 on failure', async () => {
    mockFetchGitHubStats.mockRejectedValue(new Error('rate limited'));
    const { req, res, status } = createMockReqRes();

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(500);
  });
});
