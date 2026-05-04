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
    delete (window as unknown as { requestIdleCallback?: unknown })
      .requestIdleCallback;
    delete (window as unknown as { cancelIdleCallback?: unknown })
      .cancelIdleCallback;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Fetches views with GET via SWR', async () => {
    const slug = 'test-article-slug';

    await act(async () => {
      render(<ViewCounter slug={slug} />);
    });

    expect(global.fetch).toHaveBeenCalledWith(`/api/views/${slug}`, undefined);
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

  test('Does not double-register when the slug prop changes after registration', async () => {
    let rerender!: (ui: React.ReactElement) => void;

    await act(async () => {
      ({ rerender } = render(<ViewCounter slug="a" />));
    });
    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    // First registration done. Now change the slug — effect re-runs, but
    // the ref guard must short-circuit to avoid a second POST.
    await act(async () => {
      rerender(<ViewCounter slug="b" />);
      jest.advanceTimersByTime(500);
    });

    const postCalls = (global.fetch as jest.Mock).mock.calls.filter(
      ([, init]) => init?.method === 'POST',
    );
    expect(postCalls).toHaveLength(1);
  });

  test('Registers exactly once across re-renders (idempotent)', async () => {
    const slug = 'idempotent';
    let rerender!: (ui: React.ReactElement) => void;

    await act(async () => {
      ({ rerender } = render(<ViewCounter slug={slug} />));
    });

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await act(async () => {
      rerender(<ViewCounter slug={slug} />);
      rerender(<ViewCounter slug={slug} />);
      jest.advanceTimersByTime(1000);
    });

    const postCalls = (global.fetch as jest.Mock).mock.calls.filter(
      ([, init]) => init?.method === 'POST',
    );
    expect(postCalls).toHaveLength(1);
  });

  test('Resets the registration guard when POST fails so retry can succeed', async () => {
    const slug = 'retry-on-fail';

    // First call (GET) ok, second call (POST) fails
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ total: 1 }),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ ok: false, statusText: 'boom' }),
      );

    let unmount!: () => void;
    await act(async () => {
      ({ unmount } = render(<ViewCounter slug={slug} />));
    });

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    // Allow the rejected promise + .catch to flush
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    unmount();

    // Re-mount: ref was reset, so a fresh POST attempt should occur
    (global.fetch as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ total: 2 }) }),
    );

    await act(async () => {
      render(<ViewCounter slug={slug} />);
    });

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    const postCalls = (global.fetch as jest.Mock).mock.calls.filter(
      ([, init]) => init?.method === 'POST',
    );
    expect(postCalls.length).toBeGreaterThanOrEqual(1);
  });

  test('Uses requestIdleCallback when available and cleans it up on unmount', async () => {
    const requestIdleCallback = jest.fn(() => 42);
    const cancelIdleCallback = jest.fn();
    Object.assign(window, { requestIdleCallback, cancelIdleCallback });

    const slug = 'idle';
    let unmount!: () => void;

    await act(async () => {
      ({ unmount } = render(<ViewCounter slug={slug} />));
    });

    expect(requestIdleCallback).toHaveBeenCalledTimes(1);

    unmount();
    expect(cancelIdleCallback).toHaveBeenCalledWith(42);
  });

  test('POST result is fed back into the SWR cache (no extra GET refetch)', async () => {
    const slug = 'mutate-after-post';
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ total: 9 }),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ total: 10 }),
        }),
      );

    await act(async () => {
      render(<ViewCounter slug={slug} />);
    });

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(screen.getByText('10 views')).toBeInTheDocument();
    });
  });
});
