# useLocalStorage Snippet Design

## Goal

Add a `useLocalStorage` React hook snippet to the `_snippets/` collection. Target high-volume SEO queries around persisting React state in localStorage while differentiating from competing articles through a modern `useSyncExternalStore` implementation.

## Implementation Approach

Use `useSyncExternalStore` instead of the naive `useState + useEffect` pattern. This solves three real problems the naive approach has:

1. **SSR hydration mismatch** — `getServerSnapshot` returns the initial value on the server; no `typeof window` guards needed
2. **Cross-tab sync** — the `storage` event listener keeps all tabs in sync automatically
3. **Concurrency safety** — works correctly with React 19 transitions and concurrent features

The hook is generic (`<T>`), handles JSON serialization/deserialization, and catches storage quota errors.

## Snippet Structure

### Frontmatter

```yaml
title: "useLocalStorage React Hook: Persist State Across Sessions"
heading: useLocalStorage
description: React hook for localStorage with TypeScript, cross-tab sync, and SSR support. Drop-in replacement for react-use or usehooks-ts. Uses useSyncExternalStore.
createDate: 2026-04-25
keywords:
  [
    useLocalStorage,
    useLocalStorage React hook,
    React localStorage hook,
    persist state React,
    localStorage React TypeScript,
    useSyncExternalStore localStorage,
    cross-tab sync React,
    React hook localStorage SSR,
    localStorage custom hook,
    replace react-use useLocalStorage,
    React state persistence,
    localStorage hook TypeScript,
  ]
```

### Content Sections

1. **Intro paragraph** — "You reach for react-use or usehooks-ts just to persist a form field. You don't need a library." Establishes the "native replaces library" angle.

2. **Main code block** (~30 lines) — The `useLocalStorage<T>` hook:
   - `useSyncExternalStore` with `subscribe` function that listens to `storage` events
   - `getSnapshot` reads from localStorage, parses JSON, returns typed value
   - `getServerSnapshot` returns the `initialValue` (SSR-safe)
   - `setValue` function that writes to localStorage and dispatches a `StorageEvent` on `window` for same-tab reactivity (the native `storage` event only fires in other tabs, so we dispatch manually to notify the current tab's subscribers)
   - Generic type parameter `<T>` for type safety
   - try/catch around JSON parse and localStorage access

3. **## Usage** — Three examples:
   - **Theme preference** — `useLocalStorage<'light' | 'dark'>('theme', 'light')` — ties to existing dark mode content
   - **Form draft saving** — persist a textarea value so it survives page refresh
   - **User settings object** — `useLocalStorage<Settings>('settings', defaultSettings)` — shows complex object storage

4. **## Gotchas** — 3-4 bullets:
   - Server snapshot returns `initialValue`; correct value appears after hydration. Pair with `useHasMounted` if you need to avoid layout shift.
   - `localStorage.setItem` throws `QuotaExceededError` when storage is full — the hook catches this silently.
   - The `storage` event only fires across tabs. The hook dispatches a custom event for same-tab updates.
   - Stored objects are compared by JSON string, not reference — avoid storing values that stringify identically but differ by reference.

5. **## Related** — interlinks:
   - [Type-Safe localStorage](/snippets/local-storage) — the raw wrapper without React state
   - [React Re-Renders](/blog/react-rerender) — why state hooks trigger re-renders
   - [useHasMounted](/snippets/use-has-mounted) — for SSR-sensitive rendering

### Omitted (intentionally)

- **No "With Expiry" section** — already covered in `local-storage.md`
- **No `useEffect`-based alternative** — the `useSyncExternalStore` version is strictly better; showing both would dilute the message
- **No library comparison table** — keep it snippet-focused, not article-focused

## SEO Strategy

### Target Queries
- Primary: "useLocalStorage react hook", "react localStorage hook"
- Secondary: "persist state react", "localStorage react typescript"
- Differentiator: "useSyncExternalStore localStorage", "cross-tab sync react"
- Migration: "replace react-use useLocalStorage"

### Differentiation
Most competing articles use `useState + useEffect`. This snippet uses `useSyncExternalStore` — the approach the React team recommends for external store subscriptions. This is a genuine technical advantage, not just a different wrapper.

### Internal Links
- FROM this snippet TO: `local-storage`, `use-has-mounted`, blog posts (react-rerender)
- FROM `local-storage.md` TO this snippet (add a Related link after publishing)

## File

`_snippets/use-local-storage.md`
