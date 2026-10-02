import { act, render, screen, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';

import { ViewCounter } from '@/components/view-counter';

const DAY_MS = 24 * 60 * 60 * 1000;

function mockApi({
  map = {},
  posted = 0,
  postOk = true,
}: {
  map?: Record<string, number>;
  posted?: number;
  postOk?: boolean;
}) {
  (global.fetch as jest.Mock).mockImplementation(
    (url: string, init?: RequestInit) => {
      if (init?.method === 'POST')
        return Promise.resolve(
          postOk
            ? { ok: true, json: () => Promise.resolve({ total: posted }) }
            : { ok: false, status: 500, statusText: 'boom' },
        );
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(url === '/api/views' ? { views: map } : { total: 0 }),
      });
    },
  );
}

function posts() {
  return (global.fetch as jest.Mock).mock.calls.filter(
    ([, init]) => init?.method === 'POST',
  );
}

function renderCounter(slug: string) {
  const ui = (s: string) => (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ViewCounter key={s} slug={s} />
    </SWRConfig>
  );
  const result = render(ui(slug));
  return { ...result, rerenderSlug: (s: string) => result.rerender(ui(s)) };
}

async function flushIdle() {
  await act(async () => {
    jest.advanceTimersByTime(150);
  });
}

describe('ViewCounter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
    delete (window as unknown as { requestIdleCallback?: unknown })
      .requestIdleCallback;
    delete (window as unknown as { cancelIdleCallback?: unknown })
      .cancelIdleCallback;
  });

  afterEach(async () => {
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('renders nothing until the shared views map arrives', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { container } = renderCounter('loading');

    expect(container).toBeEmptyDOMElement();
  });

  test('reads the count from the shared map in compact notation', async () => {
    mockApi({ map: { compact: 1234 }, posted: 1235 });

    await act(async () => {
      renderCounter('compact');
    });

    expect(await screen.findByText('1.2K views')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/views', undefined);
    expect(global.fetch).not.toHaveBeenCalledWith(
      '/api/views/compact',
      undefined,
    );
  });

  test('registers one view on idle and shows the fresh total', async () => {
    mockApi({ map: { fresh: 46 }, posted: 56 });

    await act(async () => {
      renderCounter('fresh');
    });
    expect(await screen.findByText('46 views')).toBeInTheDocument();

    await flushIdle();

    expect(await screen.findByText('56 views')).toBeInTheDocument();
    expect(posts()).toEqual([['/api/views/fresh', { method: 'POST' }]]);
  });

  test('never shows less than the shared map', async () => {
    mockApi({ map: { floor: 80 }, posted: 56 });

    await act(async () => {
      renderCounter('floor');
    });
    await flushIdle();

    await waitFor(() => expect(posts()).toHaveLength(1));
    expect(screen.getByText('80 views')).toBeInTheDocument();
  });

  test('uses the singular for one view', async () => {
    mockApi({ map: {}, posted: 1 });

    await act(async () => {
      renderCounter('first-view');
    });
    await flushIdle();

    expect(await screen.findByText('1 view')).toBeInTheDocument();
  });

  test('hides the separator and count when there are no views', async () => {
    mockApi({ map: {}, postOk: false });

    const { container } = renderCounter('no-views');
    await flushIdle();

    await waitFor(() => expect(posts()).toHaveLength(1));
    expect(container).toBeEmptyDOMElement();
  });

  test('counts a browser once per post per day', async () => {
    window.localStorage.setItem(
      'views:seen',
      JSON.stringify({ seen: { at: Date.now(), total: 60 } }),
    );
    mockApi({ map: { seen: 50 }, posted: 61 });

    await act(async () => {
      renderCounter('seen');
    });
    await flushIdle();

    expect(await screen.findByText('60 views')).toBeInTheDocument();
    expect(posts()).toHaveLength(0);
  });

  test('counts the browser again after a day', async () => {
    window.localStorage.setItem(
      'views:seen',
      JSON.stringify({ stale: { at: Date.now() - DAY_MS - 1, total: 60 } }),
    );
    mockApi({ map: { stale: 50 }, posted: 61 });

    await act(async () => {
      renderCounter('stale');
    });
    await flushIdle();

    expect(await screen.findByText('61 views')).toBeInTheDocument();
    expect(posts()).toHaveLength(1);
  });

  test('skips registration in a browser that opted out', async () => {
    window.localStorage.setItem('views:ignore', '1');
    mockApi({ map: { ignored: 5 }, posted: 6 });

    await act(async () => {
      renderCounter('ignored');
    });
    await flushIdle();

    expect(await screen.findByText('5 views')).toBeInTheDocument();
    expect(posts()).toHaveLength(0);
  });

  test('retries on the next visit when registration fails', async () => {
    mockApi({ map: { retry: 5 }, postOk: false });

    let unmount!: () => void;
    await act(async () => {
      ({ unmount } = renderCounter('retry'));
    });
    await flushIdle();
    await waitFor(() => expect(posts()).toHaveLength(1));
    unmount();

    (global.fetch as jest.Mock).mockClear();
    mockApi({ map: { retry: 5 }, posted: 6 });
    await act(async () => {
      renderCounter('retry');
    });
    await flushIdle();

    expect(await screen.findByText('6 views')).toBeInTheDocument();
    expect(posts()).toHaveLength(1);
  });

  test('registers each post when navigating between posts', async () => {
    mockApi({ map: { a: 1, b: 1 }, posted: 2 });

    let rerenderSlug!: (slug: string) => void;
    await act(async () => {
      ({ rerenderSlug } = renderCounter('a'));
    });
    await flushIdle();
    await act(async () => {
      rerenderSlug('b');
    });
    await flushIdle();

    await waitFor(() =>
      expect(posts().map(([url]) => url)).toEqual([
        '/api/views/a',
        '/api/views/b',
      ]),
    );
  });

  test('registers exactly once across re-renders', async () => {
    mockApi({ map: { same: 1 }, posted: 2 });

    let rerenderSlug!: (slug: string) => void;
    await act(async () => {
      ({ rerenderSlug } = renderCounter('same'));
    });
    await flushIdle();
    await act(async () => {
      rerenderSlug('same');
      rerenderSlug('same');
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => expect(posts()).toHaveLength(1));
  });

  test('waits until a hidden or prerendered page is shown', async () => {
    const state = { value: 'hidden' };
    jest
      .spyOn(document, 'visibilityState', 'get')
      .mockImplementation(() => state.value as DocumentVisibilityState);
    mockApi({ map: { hidden: 1 }, posted: 2 });

    await act(async () => {
      renderCounter('hidden');
    });
    await flushIdle();
    expect(posts()).toHaveLength(0);

    state.value = 'visible';
    await act(async () => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    await waitFor(() => expect(posts()).toHaveLength(1));
  });

  test('uses requestIdleCallback when available and cancels it on unmount', async () => {
    const requestIdleCallback = jest.fn(() => 42);
    const cancelIdleCallback = jest.fn();
    Object.assign(window, { requestIdleCallback, cancelIdleCallback });
    mockApi({ map: {} });

    let unmount!: () => void;
    await act(async () => {
      ({ unmount } = renderCounter('idle'));
    });

    expect(requestIdleCallback).toHaveBeenCalledTimes(1);
    unmount();
    expect(cancelIdleCallback).toHaveBeenCalledWith(42);
  });

  test('does not carry a registered count over to the next post', async () => {
    window.localStorage.setItem(
      'views:seen',
      JSON.stringify({ b: { at: Date.now(), total: 3 } }),
    );
    mockApi({ map: { a: 1, b: 3 }, posted: 500 });
    const ui = (slug: string) => (
      <SWRConfig value={{ provider: () => new Map() }}>
        <ViewCounter slug={slug} />
      </SWRConfig>
    );

    let rerender!: (next: React.ReactElement) => void;
    await act(async () => {
      ({ rerender } = render(ui('a')));
    });
    await flushIdle();
    expect(await screen.findByText('500 views')).toBeInTheDocument();

    await act(async () => {
      rerender(ui('b'));
    });
    await flushIdle();

    expect(await screen.findByText('3 views')).toBeInTheDocument();
    expect(posts().map(([url]) => url)).toEqual(['/api/views/a']);
  });

  test('counts a slug that shadows an Object.prototype name', async () => {
    mockApi({ map: { constructor: 1 }, posted: 2 });

    await act(async () => {
      renderCounter('constructor');
    });
    await flushIdle();

    expect(await screen.findByText('2 views')).toBeInTheDocument();
    expect(posts()).toHaveLength(1);
  });

  test('keeps a spoken space between the read time and the count', async () => {
    mockApi({ map: { spaced: 4 }, posted: 5 });

    const { container } = renderCounter('spaced');
    await flushIdle();

    await screen.findByText('5 views');
    expect(container.textContent).toBe(' • 5 views');
    expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe(
      '•',
    );
  });
});
