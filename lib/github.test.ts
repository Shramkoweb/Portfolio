import { fetchGitHubStats } from '@/lib/github';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('fetchGitHubStats', () => {
  it('sums stargazerCount across repos and returns followers', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            user: {
              followers: { totalCount: 42 },
              repositories: {
                nodes: [
                  { stargazerCount: 10 },
                  { stargazerCount: 5 },
                  { stargazerCount: 3 },
                ],
              },
            },
          },
        }),
    });

    const result = await fetchGitHubStats();

    expect(result).toEqual({ stars: 18, followers: 42 });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/graphql',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 401 });

    await expect(fetchGitHubStats()).rejects.toThrow(
      'GitHub API responded with 401',
    );
  });

  it('throws on GraphQL errors', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          errors: [{ message: 'rate limit exceeded' }],
        }),
    });

    await expect(fetchGitHubStats()).rejects.toThrow('rate limit exceeded');
  });

  it('throws generic message when errors array empty and no data', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ errors: [], data: null }),
    });

    await expect(fetchGitHubStats()).rejects.toThrow(
      'GitHub GraphQL request failed',
    );
  });

  it('handles zero repos', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            user: {
              followers: { totalCount: 10 },
              repositories: { nodes: [] },
            },
          },
        }),
    });

    const result = await fetchGitHubStats();

    expect(result).toEqual({ stars: 0, followers: 10 });
  });
});
