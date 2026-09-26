---
title: 'Fix Hydration Mismatch in React and Next.js with useHasMounted'
heading: useHasMounted
description: Fix "Text content does not match server-rendered HTML" hydration errors in React and Next.js. A tiny useHasMounted hook that renders browser-only UI after mount.
createDate: 2024-07-11
updateDate: 2026-09-26
keywords:
  [
    useHasMounted,
    React hydration mismatch,
    Next.js hydration error,
    text content does not match server-rendered HTML,
    render only on client React,
    useIsClient hook,
    SSR window is not defined,
  ]
---

The server has no `window`, no `localStorage` and no idea what time zone your user is in. Render something that depends
on them, and the HTML from the server won't match the first client render. React calls that a hydration mismatch and
throws a warning like _"Text content does not match server-rendered HTML"_.

`useHasMounted` fixes it by rendering the browser-only part one tick later, after hydration is done.

```tsx
import { useEffect, useState } from 'react';

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
```

Effects never run on the server, so the server and the first client render both see `false`. They match, hydration
succeeds, and then the effect flips it to `true`.

## Usage

```tsx
const LocalTime = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null; // or a skeleton with the same size, to avoid layout shift
  }

  return <p>Your time: {new Date().toLocaleTimeString()}</p>;
};
```

> Be careful with **any** custom React Hooks you write. They can trigger re-renders because under the hood they use **useState**.
> For more information, check out [article about re-renders](/blog/react-rerender).

## When Not to Use It

- **For a browser value you can subscribe to**, like screen size or online status, use
  [useSyncExternalStore](/snippets/use-sync-external-store) with a `getServerSnapshot`. You get the real value right
  after hydration, without the extra render.
- **For the whole page.** Hiding everything until mount throws away the point of SSR. Wrap only the part that needs the
  browser.

## Related

- [Check in Which Environment the Code Is Running](/snippets/environment) — the non-React version of the same question
- [useMediaQuery](/snippets/use-media-query) — a browser-only value that needs exactly this care during SSR
