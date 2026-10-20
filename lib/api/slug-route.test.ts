import type { NextApiRequest, NextApiResponse } from 'next';

import { validateSlugRouteRequest } from '@/lib/api/slug-route';
import { isKnownSlug } from '@/lib/valid-slugs';

jest.mock('@/lib/valid-slugs', () => ({
  isKnownSlug: jest.fn(),
}));

const mockIsKnownSlug = jest.mocked(isKnownSlug);

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

describe('validateSlugRouteRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsKnownSlug.mockResolvedValue(true);
  });

  it('returns a known slug and disables caching before validation', async () => {
    const { req, res, setHeader } = createMockReqRes();

    await expect(validateSlugRouteRequest(req, res)).resolves.toBe('test-post');

    expect(setHeader).toHaveBeenCalledWith('Cache-Control', 'no-store');
    expect(mockIsKnownSlug).toHaveBeenCalledWith('test-post');
  });

  it('rejects unsupported methods and advertises the allowed methods', async () => {
    const { req, res, status, json, setHeader } = createMockReqRes({
      method: 'PUT',
    });

    await expect(validateSlugRouteRequest(req, res)).resolves.toBeNull();

    expect(setHeader).toHaveBeenCalledWith('Allow', 'GET, POST');
    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith({
      error: { message: 'Method not allowed' },
    });
    expect(mockIsKnownSlug).not.toHaveBeenCalled();
  });

  it('rejects unknown or malformed slugs before checking extra parameters', async () => {
    mockIsKnownSlug.mockResolvedValue(false);
    const { req, res, status, json } = createMockReqRes({
      query: { slug: ['test-post', 'other'], extra: 'value' },
    });

    await expect(validateSlugRouteRequest(req, res)).resolves.toBeNull();

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: { message: 'Unknown slug' } });
  });

  it('rejects unexpected query parameters after validating the slug', async () => {
    const { req, res, status, json } = createMockReqRes({
      query: { slug: 'test-post', extra: 'value' },
    });

    await expect(validateSlugRouteRequest(req, res)).resolves.toBeNull();

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: { message: 'Unexpected query parameter' },
    });
  });
});
