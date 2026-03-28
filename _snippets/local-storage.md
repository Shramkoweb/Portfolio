---
title: "Type-Safe localStorage Wrapper in TypeScript"
heading: Type-Safe localStorage
description: A type-safe localStorage wrapper with JSON parsing, error handling, and expiry support. Drop-in replacement for raw localStorage calls in TypeScript projects.
createDate: 2026-02-09
keywords: [
  localStorage TypeScript,
  localStorage wrapper,
  type-safe localStorage,
  localStorage JSON parse,
  localStorage helper,
  localStorage utility,
  localStorage get set,
  localStorage with expiry,
  JavaScript localStorage,
  persist state localStorage,
  localStorage error handling,
  web storage API TypeScript,
]
---

Raw `localStorage` calls are error-prone: no type safety, manual `JSON.parse` everywhere, and silent failures when
storage is full or disabled. This wrapper fixes all of that.

```typescript
function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Failed to save "${key}" to localStorage`);
  }
}

function removeItem(key: string): void {
  localStorage.removeItem(key);
}
```

## Usage

```typescript
interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  fontSize: number;
}

// Set
setItem<UserPreferences>('preferences', {
  theme: 'dark',
  language: 'en',
  fontSize: 16
});

// Get — returns UserPreferences | null
const prefs = getItem<UserPreferences>('preferences');

// Remove
removeItem('preferences');
```

## With Expiry

Store values that automatically expire after a given duration:

```typescript
interface StorageItem<T> {
  value: T;
  expiry: number;
}

function setItemWithExpiry<T>(key: string, value: T, ttlMs: number): void {
  const item: StorageItem<T> = {
    value,
    expiry: Date.now() + ttlMs
  };

  setItem(key, item);
}

function getItemWithExpiry<T>(key: string): T | null {
  const item = getItem<StorageItem<T>>(key);

  if (!item) return null;

  if (Date.now() > item.expiry) {
    removeItem(key);
    return null;
  }

  return item.value;
}
```

```typescript
// Cache API response for 5 minutes
setItemWithExpiry('user-profile', userData, 5 * 60 * 1000);

// Returns null after expiry
const cached = getItemWithExpiry<UserData>('user-profile');
```

## Related Content

- [Common React Hooks Pitfalls](/blog/react-hooks-pitfalls) - best practices for custom hooks that use localStorage
