import { useSyncExternalStore } from 'react';

export function storedToggle(key: string, fallback: boolean) {
  const flipped = fallback ? 'off' : 'on';
  const listeners = new Set<() => void>();

  function get(): boolean {
    try {
      return localStorage.getItem(key) === flipped ? !fallback : fallback;
    } catch {
      return fallback;
    }
  }

  function set(enabled: boolean) {
    try {
      if (enabled === fallback) localStorage.removeItem(key);
      else localStorage.setItem(key, flipped);
    } catch {}
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) listener();
    };
    listeners.add(listener);
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }

  function use(): boolean {
    return useSyncExternalStore(subscribe, get, () => false);
  }

  return { get, set, use };
}
