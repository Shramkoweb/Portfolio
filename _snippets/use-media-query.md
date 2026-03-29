---
title: "useMediaQuery React Hook: Responsive Design in JavaScript"
heading: useMediaQuery
description: React hook for responsive breakpoints in JavaScript. Detect screen size changes, dark mode preference, and other CSS media queries in React components.
createDate: 2026-01-21
keywords: [
  useMediaQuery,
  useMediaQuery React hook,
  React responsive hook,
  media query JavaScript,
  detect screen size React,
  responsive breakpoints React,
  window matchMedia React,
  React mobile detection,
  prefers-color-scheme JavaScript,
  responsive design hook,
  CSS media query in JS,
  React breakpoint hook,
]
---

Subscribe to any CSS media query from React and re-render when it changes. Works for responsive breakpoints, dark mode
detection, reduced motion preferences, and more.

```typescript
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
```

## Usage

### Responsive Breakpoints

```tsx
function Layout() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  if (isMobile) return <MobileNav />;
  if (isTablet) return <TabletNav />;

  return <DesktopNav />;
}
```

### Dark Mode Detection

```tsx
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className={prefersDark ? 'dark' : 'light'}>
      {children}
    </div>
  );
}
```

### Reduced Motion

```tsx
function AnimatedComponent() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div
      style={{
        transition: prefersReducedMotion ? 'none' : 'transform 0.3s ease'
      }}
    >
      Content
    </div>
  );
}
```

> The initial state returns `false` during SSR to avoid hydration mismatches. The correct value is set on the client
> after mount. If you need to avoid layout shift, see [useHasMounted](/snippets/use-has-mounted).

## Related

- [Understanding React Re-renders](/blog/react-rerender) - learn how hooks like this trigger re-renders and how to optimize them
