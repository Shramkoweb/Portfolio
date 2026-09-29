import type { NextApiRequest } from 'next';

import handler from '@/pages/api/reactions/[slug]';

import { createMockReqRes as createBaseMockReqRes } from '../helpers/api-mocks';

const mockFindMany = jest.fn();
const mockUpsert = jest.fn();
const mock$transaction = jest.fn();

jest.mock('@/lib/posts/api', () => ({
  __esModule: true,
  getPostSlugs: () => Promise.resolve(['my-post', 'another-post']),
}));

jest.mock('@/lib/snippets/api', () => ({
  __esModule: true,
  getSnippetSlugs: () => Promise.resolve(['a-snippet']),
}));

jest.mock('@/lib/prisma', () => ({
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
  return createBaseMockReqRes({
    query: { slug: 'my-post' },
    headers: { 'content-type': 'application/json' },
    body: {},
    ...overrides,
  });
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

    it.each(['not-a-real-post', ['my-post', 'evil'], undefined])(
      'rejects unknown or malformed read slugs (%j) before querying the DB',
      async (slug) => {
        const { req, res, status, json, setHeader } = createMockReqRes({
          query: { slug },
        });

        await handler(req, res);

        expect(mockFindMany).not.toHaveBeenCalled();
        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({
          error: { message: 'Unknown slug' },
        });
        expect(setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store');
      },
    );

    it('rejects cache-busting query parameters before querying the DB', async () => {
      const { req, res, status } = createMockReqRes({
        query: { slug: 'my-post', cacheBust: 'random' },
      });

      await handler(req, res);

      expect(mockFindMany).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(400);
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

    it('zero-fills types missing from the DB (first reaction on a post)', async () => {
      mock$transaction.mockResolvedValue([
        { slug: 'my-post', type: 'heart', count: 1n },
        [{ type: 'heart', count: 1n }],
      ]);
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        body: { type: 'heart' },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        reactions: { heart: 1, beer: 0, trophy: 0 },
      });
    });

    it('rejects a cross-site browser request with 403 and never writes', async () => {
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'sec-fetch-site': 'cross-site',
        },
        body: { type: 'heart' },
      });

      await handler(req, res);

      expect(mock$transaction).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(403);
      expect(json).toHaveBeenCalledWith({ error: { message: 'Forbidden' } });
    });

    it('rejects a form-encoded body with 415 and never writes', async () => {
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: { type: 'heart' },
      });

      await handler(req, res);

      expect(mock$transaction).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(415);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Unsupported Media Type' },
      });
    });

    it('accepts a same-origin JSON request', async () => {
      mock$transaction.mockResolvedValue([
        { slug: 'my-post', type: 'heart', count: 1n },
        [{ type: 'heart', count: 1n }],
      ]);
      const { req, res, status } = createMockReqRes({
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'sec-fetch-site': 'same-origin',
        },
        body: { type: 'heart' },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(200);
    });

    it('rejects an unknown slug with 404 and never writes', async () => {
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        query: { slug: 'not-a-real-post' },
        body: { type: 'heart' },
      });

      await handler(req, res);

      expect(mock$transaction).not.toHaveBeenCalled();
      expect(mockUpsert).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Unknown slug' },
      });
    });

    it('rejects an array slug with 404 and never writes', async () => {
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        query: { slug: ['my-post', 'evil'] },
        body: { type: 'heart' },
      });

      await handler(req, res);

      expect(mock$transaction).not.toHaveBeenCalled();
      expect(mockUpsert).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Unknown slug' },
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
