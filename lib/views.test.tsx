import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

import {
  formatViewCount,
  formatViews,
  registerView,
  useViewCounts,
  whenVisible,
} from '@/lib/views';

function mapResponse(views: Record<string, number>) {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ views }),
  });
}

function withCache(cache = new Map()) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <SWRConfig value={{ provider: () => cache }}>{children}</SWRConfig>;
  };
}

describe('formatting', () => {
  test.each([
    [0, '0'],
    [999, '999'],
    [1299, '1.2K'],
    [1999, '1.9K'],
    [1_000_000, '1M'],
  ])('formatViewCount(%d) is %s, never rounded up', (count, text) => {
    expect(formatViewCount(count)).toBe(text);
  });

  test('formatViews pluralises', () => {
    expect(formatViews(1)).toBe('1 view');
    expect(formatViews(2)).toBe('2 views');
  });
});

describe('registerView', () => {
  beforeEach(() => window.localStorage.clear());

  test('posts once and remembers the total for a day', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ total: 7 }),
    });

    await expect(registerView('post')).resolves.toBe(7);
    await expect(registerView('post')).resolves.toBeUndefined();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(JSON.parse(window.localStorage.getItem('views:seen')!)).toEqual({
      post: { at: expect.any(Number), total: 7 },
    });
  });

  test('drops expired and malformed entries when it writes', async () => {
    window.localStorage.setItem(
      'views:seen',
      JSON.stringify({
        old: { at: Date.now() - 25 * 60 * 60 * 1000, total: 1 },
        broken: { at: 'x' },
        empty: null,
      }),
    );
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ total: 2 }),
    });

    await registerView('new');

    expect(
      Object.keys(JSON.parse(window.localStorage.getItem('views:seen')!)),
    ).toEqual(['new']);
  });

  test.each(['not json', '"a string"'])(
    'treats an unreadable store (%s) as empty',
    async (stored) => {
      window.localStorage.setItem('views:seen', stored);
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ total: 3 }),
      });

      await expect(registerView('post')).resolves.toBe(3);
    },
  );

  test('still counts when storage is blocked', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ total: 4 }),
    });

    await expect(registerView('post')).resolves.toBe(4);
    jest.restoreAllMocks();
  });

  test('resolves undefined on a failed or rejected POST', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(registerView('post')).resolves.toBeUndefined();

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('offline'));
    await expect(registerView('post')).resolves.toBeUndefined();

    expect(window.localStorage.getItem('views:seen')).toBeNull();
  });
});

describe('whenVisible', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete (document as { prerendering?: boolean }).prerendering;
  });

  test('runs immediately on a visible page', () => {
    const callback = jest.fn();
    whenVisible(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('waits for a prerendered page to activate', () => {
    Object.defineProperty(document, 'prerendering', {
      configurable: true,
      value: true,
    });
    const callback = jest.fn();
    whenVisible(callback);
    expect(callback).not.toHaveBeenCalled();

    Object.defineProperty(document, 'prerendering', {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event('prerenderingchange'));
    document.dispatchEvent(new Event('prerenderingchange'));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('cancel stops a pending callback', () => {
    const state = { value: 'hidden' };
    jest
      .spyOn(document, 'visibilityState', 'get')
      .mockImplementation(() => state.value as DocumentVisibilityState);
    const callback = jest.fn();

    const cancel = whenVisible(callback);
    document.dispatchEvent(new Event('visibilitychange'));
    cancel();
    state.value = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));

    expect(callback).not.toHaveBeenCalled();
  });
});

describe('useViewCounts', () => {
  beforeEach(() => window.localStorage.clear());

  test('reports loading and no counts before the map arrives', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useViewCounts(), {
      wrapper: withCache(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.getViews('post')).toBeUndefined();
  });

  test('returns the shared count, or undefined for an unknown slug', async () => {
    mapResponse({ post: 12 });

    const { result } = renderHook(() => useViewCounts(), {
      wrapper: withCache(),
    });

    await waitFor(() => expect(result.current.getViews('post')).toBe(12));
    expect(result.current.getViews('missing')).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  test('floors the shared count with what this browser registered', async () => {
    window.localStorage.setItem(
      'views:seen',
      JSON.stringify({ stored: { at: Date.now(), total: 56 } }),
    );
    const cache = new Map();
    cache.set('/api/views/tab', { data: { total: 30 } });
    mapResponse({ stored: 46, tab: 20, ahead: 99 });

    const { result } = renderHook(() => useViewCounts(), {
      wrapper: withCache(cache),
    });

    await waitFor(() => expect(result.current.getViews('stored')).toBe(56));
    expect(result.current.getViews('tab')).toBe(30);
    expect(result.current.getViews('ahead')).toBe(99);
  });

  test('stops loading and shows nothing when the map request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Unavailable',
    });

    const { result } = renderHook(() => useViewCounts(), {
      wrapper: withCache(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => {});
    expect(result.current.getViews('post')).toBeUndefined();
  });
});
