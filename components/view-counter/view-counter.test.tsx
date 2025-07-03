import { render, waitFor } from '@testing-library/react';
import { fetcher } from '@/lib/fetcher';

import { ViewCounter } from '@/components/view-counter';

describe('ViewCounter component', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ total: 100 }),
      });
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Fetch views with SWC', () => {
    const slug = 'test-slug';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ total: '100' }),
      }),
    ) as jest.Mock;
    render(<ViewCounter slug={slug} />);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/views?slug=${slug}`,
      expect.anything(),
    );
  });

  it('should register a view', async () => {
    const slug = 'test-slug';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ total: '100' }),
      }),
    ) as jest.Mock;
    render(<ViewCounter slug={slug} />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      `/api/views?slug=${slug}`,
      fetcher,
    );
    expect(global.fetch).toHaveBeenNthCalledWith(2, `/api/views?slug=${slug}`, {
      method: 'POST',
    });
  });
});
