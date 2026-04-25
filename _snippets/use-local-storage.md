---
title: 'useLocalStorage React Hook: Persist State Across Sessions'
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
---

You reach for [react-use](https://github.com/streamich/react-use) or
[usehooks-ts](https://usehooks-ts.com/react-hook/use-local-storage) just to persist a form field. You don't need a
library. [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) gives you SSR safety,
cross-tab sync, and concurrency support — all in one hook.

```typescript
import { useCallback, useMemo, useSyncExternalStore } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const fallback = JSON.stringify(initialValue);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) onStoreChange();
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  }, [key, fallback]);

  const getServerSnapshot = useCallback(() => fallback, [fallback]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<T>(() => {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return JSON.parse(fallback) as T;
    }
  }, [raw, fallback]);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      try {
        const prev = JSON.parse(localStorage.getItem(key) ?? fallback) as T;
        const next = typeof updater === 'function' ? updater(prev) : updater;
        localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch (error) {
        console.warn(`Failed to save "${key}" to localStorage`, error);
      }
    },
    [key, fallback],
  );

  return [value, setValue];
}
```

The snapshot is a raw JSON string — `useSyncExternalStore` compares it with `Object.is`, so objects don't trigger
infinite re-renders. `useMemo` deserializes only when the string actually changes.

## Usage

### Theme Preference

```tsx
function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <button onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>
      Current: {theme}
    </button>
  );
}
```

### Form Draft

Persist a textarea so the user never loses work on a page refresh:

```tsx
function FeedbackForm() {
  const [draft, setDraft] = useLocalStorage('feedback-draft', '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(draft);
    setDraft('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Your feedback..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

### User Settings

```tsx
interface Settings {
  notifications: boolean;
  language: string;
  fontSize: number;
}

const defaults: Settings = { notifications: true, language: 'en', fontSize: 16 };

function SettingsPanel() {
  const [settings, setSettings] = useLocalStorage<Settings>('settings', defaults);

  return (
    <label>
      <input
        type="checkbox"
        checked={settings.notifications}
        onChange={() =>
          setSettings((prev) => ({ ...prev, notifications: !prev.notifications }))
        }
      />
      Enable notifications
    </label>
  );
}
```

## Gotchas

- **Server returns `initialValue`.** `getServerSnapshot` always returns the fallback — the real value appears after
  hydration. If that causes a layout shift, gate the UI with [useHasMounted](/snippets/use-has-mounted).
- **Storage quota.** `localStorage.setItem` throws `QuotaExceededError` when full. The hook catches this and logs a
  warning instead of crashing.
- **Same-tab updates.** The native `storage` event only fires in _other_ tabs. The hook dispatches a `StorageEvent`
  manually so every `useLocalStorage(key)` call in the current tab stays in sync.
- **Serialization.** Values are compared as JSON strings. Two objects that stringify to the same result are treated as
  equal — that's almost always what you want.

> Pair with [Type-Safe localStorage](/snippets/local-storage) for non-React code that touches the same keys, or
> [useMediaQuery](/snippets/use-media-query) to combine persisted preferences with system defaults.

## Related

- [Type-Safe localStorage](/snippets/local-storage) — the raw wrapper without React state
- [React Re-Renders](/blog/react-rerender) — how state hooks trigger re-renders
- [useHasMounted](/snippets/use-has-mounted) — gate SSR-sensitive UI until client hydration
