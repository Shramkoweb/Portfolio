import type { NextApiRequest } from 'next';

import handler from '@/pages/api/views/[slug]';

import { createMockReqRes as createBaseMockReqRes } from '../helpers/api-mocks';

const mockUpsert = jest.fn();
const mockFindUnique = jest.fn();

// The slug allow-list is built from these helpers; stub the disk reads but let
// lib/valid-slugs itself run for real.
jest.mock('@/lib/posts/api', () => ({
  __esModule: true,
  getPostSlugs: () => Promise.resolve(['test-post', 'another-post']),
}));

jest.mock('@/lib/snippets/api', () => ({
  __esModule: true,
  getSnippetSlugs: () => Promise.resolve(['a-snippet']),
}));

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
  return createBaseMockReqRes({
    query: { slug: 'test-post' },
    ...overrides,
  });
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

    it('accepts the synthetic, non-MDX page slugs', async () => {
      mockUpsert.mockResolvedValue({ count: 7n });
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        query: { slug: 'quizlet-page' },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({ total: 7 });
    });

    it('rejects an unknown slug with 404 and never writes', async () => {
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        query: { slug: 'not-a-real-post' },
      });

      await handler(req, res);

      expect(mockUpsert).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Unknown slug' },
      });
    });

    it('rejects an array slug with 404 and never writes', async () => {
      const { req, res, status, json } = createMockReqRes({
        method: 'POST',
        query: { slug: ['test-post', 'evil'] },
      });

      await handler(req, res);

      expect(mockUpsert).not.toHaveBeenCalled();
      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        error: { message: 'Unknown slug' },
      });
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

    it('still returns 0 for an unknown slug — reads are not gated', async () => {
      mockFindUnique.mockResolvedValue(null);
      const { req, res, status, json } = createMockReqRes({
        query: { slug: 'not-a-real-post' },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(200);
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
