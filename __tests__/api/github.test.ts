import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/github';

const mockFetchGitHubStats = jest.fn();
jest.mock('@/lib/github', () => ({
  fetchGitHubStats: (...args: unknown[]) => mockFetchGitHubStats(...args),
}));

function createMockReqRes(method = 'GET') {
  const req = { method } as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnThis();
  const setHeader = jest.fn();
  const res = { json, status, setHeader } as unknown as NextApiResponse;

  return { req, res, json, status, setHeader };
}

describe('API /api/github', () => {
  it('rejects non-GET', async () => {
    const { req, res, status } = createMockReqRes('POST');

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
