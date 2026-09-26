---
title: 'Debounce Function in TypeScript (with useDebounce Hook)'
heading: Debounce
description: Copy-paste debounce function in TypeScript with cancel support, plus a useDebounce React hook. Wait until the user stops typing before running expensive code.
createDate: 2025-05-15
updateDate: 2026-09-26
keywords:
  [
    debounce,
    debounce function,
    debounce function in JavaScript,
    debounce function in TypeScript,
    useDebounce hook,
    useDebounce React,
    debounce search input,
    debounce cancel,
    debounce vs throttle,
  ]
---

Debounce waits until things calm down. Every new call resets the timer, and the callback runs only once nobody has
called it for `wait` milliseconds. Perfect for search inputs, auto-save, and resize handlers that do heavy work.

```typescript
function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  wait: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), wait);
  };

  debounced.cancel = () => clearTimeout(timeoutId);

  return debounced;
}
```

`Args` is inferred from your callback, so the debounced function keeps the same parameter types.
`ReturnType<typeof setTimeout>` works in both the browser and Node.js.

## Usage

```typescript
const save = debounce((text: string) => {
  fetch('/api/draft', { method: 'POST', body: text });
}, 500);

save('H');
save('He');
save('Hello'); // only this one hits the network, 500ms later

save.cancel(); // or drop the pending call entirely
```

## useDebounce Hook

In React you usually want to debounce a **value**, not a function. The hook keeps the latest value and hands it back
only after it has stopped changing:

```tsx
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, wait = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), wait);

    return () => clearTimeout(timeoutId);
  }, [value, wait]);

  return debouncedValue;
}
```

The cleanup function is the debounce: every keystroke cancels the previous timer before a new one starts.

```tsx
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) return;

    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

The input stays instant because `query` updates on every keystroke. Only the request waits.

> If you debounce a handler inside a component instead, create it once with `useMemo` or `useRef`. A new debounced
> function on every render means a new timer on every render, and nothing gets debounced. More on that in
> [React re-renders](/blog/react-rerender) and [custom hooks pitfalls](/blog/react-hooks-pitfalls).

## Related

- [Throttle](/snippets/throttle) — run at most once every N ms instead of waiting for silence
- [Sleep in JavaScript](/snippets/sleep) — the other small timer utility worth keeping around
