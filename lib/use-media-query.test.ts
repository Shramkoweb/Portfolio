import { act, renderHook } from '@testing-library/react';

import { useMediaQuery } from '@/lib/use-media-query';

function mockMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    media: query,
    get matches() {
      return matches;
    },
    addEventListener: (_: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) =>
      listeners.delete(listener),
  }));
  return (next: boolean) => {
    matches = next;
    listeners.forEach((listener) => listener());
  };
}

describe('useMediaQuery', () => {
  it('reports the current match and follows changes', () => {
    const change = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));
    expect(result.current).toBe(false);

    act(() => change(true));

    expect(result.current).toBe(true);
  });
});
