---
title: 'usePrevious React Hook: Get the Previous Value of State or Props'
heading: usePrevious
description: A usePrevious React hook in TypeScript that returns the previous value of state or props. Why the classic useRef version breaks, and the React 19-safe fix.
createDate: 2026-09-26
keywords:
  [
    usePrevious,
    usePrevious React,
    usePrevious hook TypeScript,
    React previous state,
    React previous props,
    get previous value React,
    usePrevious useRef,
    componentDidUpdate prevProps hooks,
  ]
---

Class components got `prevProps` for free in `componentDidUpdate`. Hooks didn't, so everyone writes `usePrevious`. Most
copies online have a subtle bug, so here's the version I use:

```tsx
import { useState } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  if (!Object.is(value, current)) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
```

Calling `setState` during render looks illegal, but it's the pattern
[the React docs recommend](https://react.dev/reference/react/useState#storing-information-from-previous-renders) for
exactly this. React throws away the render in progress and re-runs the component with the new state before it touches
the DOM, so there's no extra paint.

## Usage

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <>
      <p>
        Now: {count}, before: {previousCount ?? '—'}
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
}
```

It works for props too. Compare `previousStatus` with `status` to fire an animation only when an order goes from
`'pending'` to `'paid'`.

## The Classic useRef Version

This is the one you'll find everywhere:

```tsx
function usePrevious<T>(value: T) {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
```

It has two problems:

- **It returns the value from the last render, not the last different value.** Any unrelated re-render (a parent
  update, another piece of state) makes "previous" equal to "current", and your `previous !== current` check silently
  stops firing.
- **It reads `ref.current` during render.** React says not to, the React Compiler can't optimize a component that does
  it, and the `react-hooks` ESLint rules flag it.

> Refs are great for values that don't affect what's on screen. The previous value usually does, which is why it
> belongs in state. More on that split in [useRef in React: Refs vs State](/blog/react-useref).

## Related

- [React Re-Renders: What Triggers Them and Why](/blog/react-rerender) — why the ref version goes stale on unrelated renders
- [useToggle](/snippets/use-toggle-react-hook) — another tiny state hook worth keeping around
