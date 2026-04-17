import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/dashboard';

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

function createMockReqRes(method = 'GET') {
  const req = { method } as NextApiRequest;
  const json = jest.fn();
  const status = jest.fn().mockReturnThis();
  const setHeader = jest.fn();
  const res = { json, status, setHeader } as unknown as NextApiResponse;

  return { req, res, json, status, setHeader };
}

describe('API /api/dashboard', () => {
  it('rejects non-GET methods', async () => {
    const { req, res, status } = createMockReqRes('POST');

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(405);
  });

  it('aggregates views + github stats on success', async () => {
    mockAggregate.mockResolvedValue({ _sum: { count: 5000n } });
    mockFetchGitHubStats.mockResolvedValue({ stars: 42, followers: 100 });
    const { req, res, status, json, setHeader } = createMockReqRes();

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      totalViews: 5000,
      stars: 42,
      followers: 100,
    });
    // Both succeeded → long cache
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      's-maxage=300, stale-while-revalidate=3600',
    );
  });

  it('uses short cache when one source fails', async () => {
    mockAggregate.mockRejectedValue(new Error('DB down'));
    mockFetchGitHubStats.mockResolvedValue({ stars: 10, followers: 5 });
    const { req, res, setHeader, json } = createMockReqRes();

    await handler(req, res);

    // Views fallback to 0
    expect(json).toHaveBeenCalledWith({
      totalViews: 0,
      stars: 10,
      followers: 5,
    });
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      's-maxage=30, stale-while-revalidate=60',
    );
  });

  it('falls back gracefully when both sources fail', async () => {
    mockAggregate.mockRejectedValue(new Error('DB'));
    mockFetchGitHubStats.mockRejectedValue(new Error('GH'));
    const { req, res, json } = createMockReqRes();

    await handler(req, res);

    expect(json).toHaveBeenCalledWith({
      totalViews: 0,
      stars: 0,
      followers: 0,
    });
  });
});
