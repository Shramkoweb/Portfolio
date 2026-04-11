import { act, render, screen, waitFor } from '@testing-library/react';

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

  afterEach(async () => {
    // Flush all pending microtasks/timers to avoid act warnings
    await act(async () => {
      jest.runAllTimers();
    });
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Fetches views with GET via SWR', async () => {
    const slug = 'test-article-slug';

    await act(async () => {
      render(<ViewCounter slug={slug} />);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/views/${slug}`,
      undefined,
    );
  });

  test('Registers view with POST via useEffect', async () => {
    const slug = 'test-article-slug';

    await act(async () => {
      render(<ViewCounter slug={slug} />);
    });

    // Trigger the deferred setTimeout(register, 150)
    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/views/${slug}`, {
        method: 'POST',
      });
    });
  });

  test('Displays formatted view count after fetch', async () => {
    const slug = 'test-views-display';

    await act(async () => {
      render(<ViewCounter slug={slug} />);
    });

    await waitFor(() => {
      expect(screen.getByText('100 views')).toBeInTheDocument();
    });
  });

  test('Shows fallback while loading', async () => {
    // Delay fetch so data is undefined during initial render
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}), // never resolves
    );
    const slug = 'test-loading';

    await act(async () => {
      render(<ViewCounter slug={slug} />);
    });

    expect(screen.getByText('--- views')).toBeInTheDocument();
  });
});
