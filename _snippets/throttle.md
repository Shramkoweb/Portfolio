---
title: Throttle Function in TypeScript with React Example
heading: Throttle
description: Copy-paste throttle function in TypeScript. Limit how often a function fires during scroll, resize, or mousemove events. Includes React usage example.
createDate: 2026-01-24
updateDate: 2026-09-26
keywords:
  [
    throttle,
    throttle function,
    throttle function in JavaScript,
    throttle function in TypeScript,
    throttle vs debounce,
    scroll throttle,
    resize throttle,
    rate limit function calls,
    throttle function in JS,
    throttle function in TS,
    throttle event handler,
    JavaScript performance optimization,
    TypeScript code snippet,
  ]
---

While [debounce](/snippets/debounce) waits until the user **stops** doing something, throttle ensures a function runs
**at most once** every N milliseconds — no matter how many times the event fires. Perfect for scroll, resize, and
mousemove handlers.

```typescript
function throttle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  limit: number,
): (...args: Args) => void {
  let waiting = false;

  return (...args: Args) => {
    if (waiting) return;

    callback(...args);
    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, limit);
  };
}
```

## Usage

Track scroll position at most once every 200ms — smooth enough for UI updates, light enough to keep the page responsive:

```tsx
function ScrollTracker() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <p>Scroll position: {scrollY}px</p>;
}
```

## When to Use Throttle vs Debounce

| Scenario                                | Use                            |
| --------------------------------------- | ------------------------------ |
| Search input, form validation           | [Debounce](/snippets/debounce) |
| Scroll position tracking, resize layout | Throttle                       |
| Button click (prevent double submit)    | Throttle                       |
| Auto-save after typing stops            | [Debounce](/snippets/debounce) |

## Related

- [Debounce](/snippets/debounce) — wait until events stop, with a `useDebounce` hook for React
- [useMediaQuery](/snippets/use-media-query) — react to viewport changes without a resize listener at all
