import { fetcher } from '@/lib/fetcher';

describe('fetcher', () => {
  test('returns the parsed body of a successful response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ total: 3 }),
    });

    await expect(fetcher('/api/views/x')).resolves.toEqual({ total: 3 });
  });

  test('throws on an error status so SWR does not cache the error body', async () => {
    const json = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
      json,
    });

    await expect(fetcher('/api/views')).rejects.toThrow('503');
    expect(json).not.toHaveBeenCalled();
  });
});
