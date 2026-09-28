import handler from '@/pages/api/views';

import { createMockReqRes } from '../helpers/api-mocks';

const mockFindMany = jest.fn();

jest.mock('@/lib/prisma', () => ({
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
  it.each(['POST', 'PUT', 'DELETE'])('returns 405 for %s', async (method) => {
    const { req, res, status, json } = createMockReqRes({ method });

    await handler(req, res);

    expect(mockFindMany).not.toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith({
      error: { message: 'Method not allowed' },
    });
  });

  it('maps every row to a slug-keyed number map', async () => {
    mockFindMany.mockResolvedValue([
      { slug: 'a', count: 10n },
      { slug: 'b', count: 0n },
    ]);
    const { req, res, status, json, setHeader } = createMockReqRes();

    await handler(req, res);

    expect(mockFindMany).toHaveBeenCalledWith({
      select: { slug: true, count: true },
    });
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ views: { a: 10, b: 0 } });
    expect(setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      's-maxage=60, stale-while-revalidate=120',
    );
  });

  it('serialises BigInt counts, which JSON.stringify would reject', async () => {
    mockFindMany.mockResolvedValue([{ slug: 'a', count: 9007199254740993n }]);
    const { req, res, json } = createMockReqRes();

    await handler(req, res);

    const [body] = json.mock.calls[0];
    expect(() => JSON.stringify(body)).not.toThrow();
    expect(typeof body.views.a).toBe('number');
  });

  it('returns an empty map when there are no rows', async () => {
    mockFindMany.mockResolvedValue([]);
    const { req, res, json } = createMockReqRes();

    await handler(req, res);

    expect(json).toHaveBeenCalledWith({ views: {} });
  });

  it('returns 500 without caching when the database fails', async () => {
    mockFindMany.mockRejectedValue(new Error('DB down'));
    const { req, res, status, json, setHeader } = createMockReqRes();

    await handler(req, res);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      error: { message: 'Internal Server Error' },
    });
    expect(setHeader).not.toHaveBeenCalled();
  });
});
