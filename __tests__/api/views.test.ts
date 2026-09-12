/**
 * @jest-environment node
 */
import { GET } from '@/app/api/views/route';

const mockFindMany = jest.fn();

jest.mock('lib/prisma', () => ({
  __esModule: true,
  default: {
    views: {
      get findMany() {
        return mockFindMany;
      },
    },
  },
}));

describe('API /api/views', () => {
  it('maps rows to a slug → count record with cache headers', async () => {
    mockFindMany.mockResolvedValue([
      { slug: 'a', count: 3n },
      { slug: 'b', count: 10n },
    ]);

    const res = await GET();

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ views: { a: 3, b: 10 } });
    expect(res.headers.get('Cache-Control')).toBe(
      's-maxage=60, stale-while-revalidate=120',
    );
  });

  it('returns 500 on DB failure', async () => {
    mockFindMany.mockRejectedValue(new Error('DB down'));

    const res = await GET();

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      error: { message: 'Internal Server Error' },
    });
  });
});
