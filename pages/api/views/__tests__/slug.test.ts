import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/views/[slug]';

const mockUpsert = jest.fn();
const mockFindUnique = jest.fn();

jest.mock('lib/prisma', () => ({
  __esModule: true,
  default: {
    views: {
      get upsert() {
        return mockUpsert;
      },
      get findUnique() {
        return mockFindUnique;
      },
    },
  },
}));

function createMockReqRes(overrides: Partial<NextApiRequest> = {}) {
  const req = {
    method: 'GET',
    query: { slug: 'test-post' },
    ...overrides,
  } as unknown as NextApiRequest;

  const json = jest.fn();
  const status = jest.fn().mockReturnThis();
  const setHeader = jest.fn();
  const res = { json, status, setHeader } as unknown as NextApiResponse;

  return { req, res, json, status, setHeader };
}

describe('API /api/views/[slug]', () => {
  describe('POST — increment view', () => {
    it('upserts and returns total count', async () => {
      mockUpsert.mockResolvedValue({ count: 42n });
      const { req, res, status, json } = createMockReqRes({ method: 'POST' });

      await handler(req, res);

      expect(mockUpsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: 'test-post' },
          create: { slug: 'test-post' },
          update: { count: { increment: 1 } },
          select: { count: true },
        }),
      );
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({ total: 42 });
    });
  });

  describe('GET — read views', () => {
    it('returns count when record exists', async () => {
      mockFindUnique.mockResolvedValue({ count: 100n });
      const { req, res, status, json, setHeader } = createMockReqRes();

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({ total: 100 });
      expect(setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        's-maxage=60, stale-while-revalidate=120',
      );
    });

    it('returns 0 when record not found', async () => {
      mockFindUnique.mockResolvedValue(null);
      const { req, res, json } = createMockReqRes();

      await handler(req, res);

      expect(json).toHaveBeenCalledWith({ total: 0 });
    });
  });

  describe('unsupported method', () => {
    it('returns 405 for PUT', async () => {
      const { req, res, status, json } = createMockReqRes({ method: 'PUT' });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(405);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Method not allowed' },
      });
    });
  });

  describe('error handling', () => {
    it('returns 500 on DB failure', async () => {
      mockFindUnique.mockRejectedValue(new Error('DB down'));
      const { req, res, status, json } = createMockReqRes();

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Internal Server Error' },
      });
    });
  });
});
