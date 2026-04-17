import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/reactions/[slug]';

const mockFindMany = jest.fn();
const mockUpsert = jest.fn();
const mock$transaction = jest.fn();

jest.mock('lib/prisma', () => ({
  __esModule: true,
  default: {
    reactions: {
      get findMany() {
        return mockFindMany;
      },
      get upsert() {
        return mockUpsert;
      },
    },
    get $transaction() {
      return mock$transaction;
    },
  },
}));

function createMockReqRes(overrides: Partial<NextApiRequest> = {}) {
  const req = {
    method: 'GET',
    query: { slug: 'my-post' },
    body: {},
    ...overrides,
  } as unknown as NextApiRequest;

  const json = jest.fn();
  const status = jest.fn().mockReturnThis();
  const setHeader = jest.fn();
  const res = { json, status, setHeader } as unknown as NextApiResponse;

  return { req, res, json, status, setHeader };
}

describe('API /api/reactions/[slug]', () => {
  describe('GET', () => {
    it('returns all reaction types with defaults', async () => {
      mockFindMany.mockResolvedValue([
        { type: 'heart', count: 5n },
        { type: 'trophy', count: 2n },
      ]);
      const { req, res, status, json, setHeader } = createMockReqRes();

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        reactions: { heart: 5, beer: 0, trophy: 2 },
      });
      expect(setHeader).toHaveBeenCalledWith(
        'Cache-Control',
        's-maxage=60, stale-while-revalidate=120',
      );
    });

    it('returns all zeros when no reactions exist', async () => {
      mockFindMany.mockResolvedValue([]);
      const { req, res, json } = createMockReqRes();

      await handler(req, res);

      expect(json).toHaveBeenCalledWith({
        reactions: { heart: 0, beer: 0, trophy: 0 },
      });
    });
  });

  describe('POST', () => {
    it('validates reaction type — rejects invalid', async () => {
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        body: { type: 'thumbsup' },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Invalid reaction type' },
      });
    });

    it('validates reaction type — rejects missing', async () => {
      const { req, res, status } = createMockReqRes({
        method: 'POST',
        body: {},
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(400);
    });

    it('upserts and returns updated counts', async () => {
      mock$transaction.mockResolvedValue([
        { slug: 'my-post', type: 'heart', count: 6n },
        [
          { type: 'heart', count: 6n },
          { type: 'beer', count: 1n },
          { type: 'trophy', count: 0n },
        ],
      ]);
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        body: { type: 'heart' },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        reactions: { heart: 6, beer: 1, trophy: 0 },
      });
    });
  });

  describe('unsupported method', () => {
    it('returns 405 for DELETE', async () => {
      const { req, res, status } = createMockReqRes({ method: 'DELETE' });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(405);
    });
  });

  describe('error handling', () => {
    it('returns 500 on DB failure', async () => {
      mockFindMany.mockRejectedValue(new Error('connection lost'));
      const { req, res, status, json } = createMockReqRes();

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Internal Server Error' },
      });
    });
  });
});
