import { render, waitFor } from '@testing-library/react';

import { ViewCounter } from '@/components/view-counter';

describe('ViewCounter component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ total: 100 }),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Fetches views with GET via SWR', () => {
    const slug = 'test-article-slug';
    render(<ViewCounter slug={slug} />);

    // SWR fetcher uses GET (no method specified)
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/views/${slug}`,
      undefined,
    );
  });

  test('Registers view with POST via useEffect', async () => {
    const slug = 'test-article-slug';
    render(<ViewCounter slug={slug} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/views/${slug}`, {
        method: 'POST',
      });
    });
  });
});
