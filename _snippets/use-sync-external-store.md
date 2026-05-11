---
title: 'useSyncExternalStore: Subscribe to Browser APIs in React'
heading: useSyncExternalStore
description: Subscribe to Browser APIs in React with useSyncExternalStore — online status, matchMedia, ResizeObserver, IntersectionObserver. No useEffect, no stale closures.
createDate: 2026-05-10
updateDate: 2026-05-10
keywords:
  [
    useSyncExternalStore,
    React 19 hooks,
    subscribe to Browser API in React,
    useMediaQuery hook,
    useResizeObserver hook,
    useIntersectionObserver hook,
    React concurrent rendering,
    React useEffect alternative,
  ]
---

Subscribing to `online`/`offline`, `matchMedia`, or `ResizeObserver` with `useState` + `useEffect` is a stale-closure
factory. React 18 shipped [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) to fix it —
one call handles the subscribe/read/cleanup cycle with no forgotten cleanups, no wasted renders, and no tearing under
concurrent rendering.

```ts
function useSyncExternalStore<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot,
): Snapshot;
```

`subscribe` registers a callback and returns a cleanup function. `getSnapshot` reads the current value. The optional
third argument provides a fallback for SSR.

> Any Browser API that lets you **add a listener** and **read a current value** is a candidate for this hook.

## Network Status (Online/Offline)

```typescript
import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
```

`subscribe` and `getSnapshot` are defined outside the component — this guarantees stable references so React never
re-subscribes unnecessarily.

## Responsive Design with matchMedia

[`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) emits change events for CSS
media queries — a perfect fit. Replaces
[the older `useMediaQuery` pattern with `useState` + `useLayoutEffect`](/snippets/use-media-query):

```typescript
import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot);
}
```

`subscribe` depends on `query`, so `useCallback` ensures React re-subscribes only when the query string changes.

## Element Sizing with ResizeObserver

[`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) watches a specific DOM node, so the
hook pairs `useSyncExternalStore` with a `useRef` that caches the latest snapshot.

```typescript
import { useCallback, useRef, useSyncExternalStore } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const dimensionsRef = useRef<Dimensions>({ width: 0, height: 0 });

  const subscribe = useCallback((callback: () => void) => {
    const element = ref.current;
    if (!element) return () => {};

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.target.getBoundingClientRect();
        if (
          width !== dimensionsRef.current.width ||
          height !== dimensionsRef.current.height
        ) {
          dimensionsRef.current = { width, height };
          callback();
        }
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getSnapshot = () => dimensionsRef.current;

  const dimensions = useSyncExternalStore(subscribe, getSnapshot);
  return { ref, dimensions };
}
```

Returns both the `ref` (attach to your element) and the current `dimensions`. The cached snapshot ref keeps reads stable
between renders, so React only re-renders when the size actually changes.

## Element Visibility with IntersectionObserver

Same shape as the `ResizeObserver` hook —
[`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) writes to a snapshot
ref, then notifies React only when the intersection state flips.

```typescript
import { useCallback, useRef, useSyncExternalStore } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
}

export function useInView(options: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const isIntersectingRef = useRef(false);

  const subscribe = useCallback(
    (callback: () => void) => {
      const element = ref.current;
      if (!element) return () => {};

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting !== isIntersectingRef.current) {
              isIntersectingRef.current = entry.isIntersecting;
              callback();
            }
          }
        },
        {
          threshold: options.threshold,
          rootMargin: options.rootMargin,
        },
      );

      observer.observe(element);
      return () => observer.disconnect();
    },
    [options.threshold, options.rootMargin],
  );

  const getSnapshot = () => isIntersectingRef.current;

  const isIntersecting = useSyncExternalStore(subscribe, getSnapshot);
  return { ref, isIntersecting };
}
```

Works for lazy loading, scroll-triggered animations, or firing analytics events when a section becomes visible.

## Cross-Tab Sync with localStorage

See [the full useLocalStorage implementation built on useSyncExternalStore](/snippets/use-local-storage) for SSR
support, functional updates, and quota handling. The key idea: listen to the `storage` event, check `event.key` to
avoid redundant re-renders, and dispatch a manual `StorageEvent` for same-tab updates.

## Usage

```tsx
function App() {
  const isOnline = useOnlineStatus();
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const { ref, dimensions } = useElementSize<HTMLDivElement>();
  const { ref: sectionRef, isIntersecting } = useInView({ threshold: 0.5 });

  return (
    <>
      {!isOnline && <Banner>You are offline</Banner>}

      {isLargeScreen ? <DesktopNav /> : <MobileNav />}

      <div ref={ref}>
        {Math.round(dimensions.width)}px × {Math.round(dimensions.height)}px
      </div>

      <section
        ref={sectionRef}
        style={{ background: isIntersecting ? '#10b981' : '#ef4444' }}
      >
        {isIntersecting ? '👋 Visible' : '👻 Not visible'}
      </section>
    </>
  );
}
```

## Related

- [Building useLocalStorage with useSyncExternalStore](/snippets/use-local-storage) — cross-tab persistence and SSR-safe reads
- [The legacy useMediaQuery pattern with useEffect](/snippets/use-media-query) — what this hook replaces
- [How React re-renders work](/blog/react-rerender) — why concurrent-safe subscriptions matter
- [Custom hooks pitfalls](/blog/react-hooks-pitfalls) — common mistakes when building reusable hooks
