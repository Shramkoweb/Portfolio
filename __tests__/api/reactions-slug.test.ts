/**
 * @jest-environment node
 */
import { GET, POST } from '@/app/api/reactions/[slug]/route';

import { jsonRequest, routeContext } from '../helpers/route';

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

const ctx = (slug = 'my-post') => routeContext({ slug });
const post = (slug: string, body: unknown) =>
  POST(
    jsonRequest(`/api/reactions/${slug}`, { method: 'POST', body }),
    ctx(slug),
  );

describe('API /api/reactions/[slug]', () => {
  describe('GET', () => {
    it('returns all reaction types with defaults', async () => {
      mockFindMany.mockResolvedValue([
        { type: 'heart', count: 5n },
        { type: 'trophy', count: 2n },
      ]);

      const res = await GET(jsonRequest('/api/reactions/my-post'), ctx());

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        reactions: { heart: 5, beer: 0, trophy: 2 },
      });
      expect(res.headers.get('Cache-Control')).toBe(
        's-maxage=60, stale-while-revalidate=120',
      );
    });

    it('returns all zeros when no reactions exist', async () => {
      mockFindMany.mockResolvedValue([]);

      const res = await GET(jsonRequest('/api/reactions/my-post'), ctx());

      expect(await res.json()).toEqual({
        reactions: { heart: 0, beer: 0, trophy: 0 },
      });
    });

    it('still returns zeros for an unknown slug — reads are not gated', async () => {
      mockFindMany.mockResolvedValue([]);

      const res = await GET(
        jsonRequest('/api/reactions/not-a-real-post'),
        ctx('not-a-real-post'),
      );

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        reactions: { heart: 0, beer: 0, trophy: 0 },
      });
    });
  });

  describe('POST', () => {
    it('validates reaction type — rejects invalid', async () => {
      const res = await post('my-post', { type: 'thumbsup' });

      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({
        error: { message: 'Invalid reaction type' },
      });
    });

    it('validates reaction type — rejects missing', async () => {
      const res = await post('my-post', {});

      expect(res.status).toBe(400);
    });

    it('rejects a malformed JSON body with 400', async () => {
      const res = await post('my-post', '{not json');

      expect(res.status).toBe(400);
      expect(mock$transaction).not.toHaveBeenCalled();
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

      const res = await post('my-post', { type: 'heart' });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        reactions: { heart: 6, beer: 1, trophy: 0 },
      });
    });

    it('zero-fills types missing from the DB (first reaction on a post)', async () => {
      mock$transaction.mockResolvedValue([
        { slug: 'my-post', type: 'heart', count: 1n },
        [{ type: 'heart', count: 1n }],
      ]);

      const res = await post('my-post', { type: 'heart' });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        reactions: { heart: 1, beer: 0, trophy: 0 },
      });
    });

    it('rejects an unknown slug with 404 and never writes', async () => {
      const res = await post('not-a-real-post', { type: 'heart' });

      expect(mock$transaction).not.toHaveBeenCalled();
      expect(mockUpsert).not.toHaveBeenCalled();
      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ error: { message: 'Unknown slug' } });
    });
  });

  describe('error handling', () => {
    it('returns 500 on DB failure', async () => {
      mockFindMany.mockRejectedValue(new Error('connection lost'));

      const res = await GET(jsonRequest('/api/reactions/my-post'), ctx());

      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({
        error: { message: 'Internal Server Error' },
      });
    });
  });
});
