/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/views/[slug]/route';

import { jsonRequest, routeContext } from '../helpers/route';

const mockUpsert = jest.fn();
const mockFindUnique = jest.fn();

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

const ctx = (slug: string) => routeContext({ slug });

describe('API /api/views/[slug]', () => {
  describe('POST — increment view', () => {
    it('upserts and returns total count', async () => {
      mockUpsert.mockResolvedValue({ count: 42n });

      const res = await POST(
        jsonRequest('/api/views/test-post', { method: 'POST' }),
        ctx('test-post'),
      );

      expect(mockUpsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { slug: 'test-post' },
          create: { slug: 'test-post' },
          update: { count: { increment: 1 } },
          select: { count: true },
        }),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ total: 42 });
    });

    it('accepts the synthetic, non-MDX page slugs', async () => {
      mockUpsert.mockResolvedValue({ count: 7n });

      const res = await POST(
        jsonRequest('/api/views/quizlet-page', { method: 'POST' }),
        ctx('quizlet-page'),
      );

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ total: 7 });
    });

    it('rejects an unknown slug with 404 and never writes', async () => {
      const res = await POST(
        jsonRequest('/api/views/not-a-real-post', { method: 'POST' }),
        ctx('not-a-real-post'),
      );

      expect(mockUpsert).not.toHaveBeenCalled();
      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ error: { message: 'Unknown slug' } });
    });
  });

  describe('GET — read views', () => {
    it('returns count when record exists', async () => {
      mockFindUnique.mockResolvedValue({ count: 100n });

      const res = await GET(
        jsonRequest('/api/views/test-post'),
        ctx('test-post'),
      );

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ total: 100 });
      expect(res.headers.get('Cache-Control')).toBe(
        's-maxage=60, stale-while-revalidate=120',
      );
    });

    it('returns 0 when record not found', async () => {
      mockFindUnique.mockResolvedValue(null);

      const res = await GET(
        jsonRequest('/api/views/test-post'),
        ctx('test-post'),
      );

      expect(await res.json()).toEqual({ total: 0 });
    });

    it('still returns 0 for an unknown slug — reads are not gated', async () => {
      mockFindUnique.mockResolvedValue(null);

      const res = await GET(
        jsonRequest('/api/views/not-a-real-post'),
        ctx('not-a-real-post'),
      );

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ total: 0 });
    });
  });

  describe('error handling', () => {
    it('returns 500 on DB failure', async () => {
      mockFindUnique.mockRejectedValue(new Error('DB down'));

      const res = await GET(
        jsonRequest('/api/views/test-post'),
        ctx('test-post'),
      );

      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({
        error: { message: 'Internal Server Error' },
      });
    });
  });
});
