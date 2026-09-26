---
title: 'useToggle React Hook: Toggle Boolean State in TypeScript'
heading: useToggle
description: Simple useToggle React hook for managing boolean state. Toggle between true and false with a clean API. Perfect for modals, dropdowns, and dark mode switches.
createDate: 2024-10-30
updateDate: 2026-09-26
keywords:
  [
    useToggle hook,
    useToggle React,
    React toggle boolean,
    useState toggle,
    custom React hook,
    React hook TypeScript,
  ]
---

A hook to toggle a boolean value. Call it with no arguments to flip the state, or pass `true`/`false` to set it
explicitly.

```tsx
import { useCallback, useState } from 'react';

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((nextValue?: unknown) => {
    // onClick passes the event object, so only a real boolean counts as "set"
    setValue((prev) => (typeof nextValue === 'boolean' ? nextValue : !prev));
  }, []);

  return [value, toggle] as const;
}
```

`as const` makes the return type the tuple `readonly [boolean, (nextValue?: unknown) => void]`. Without it TypeScript
infers `(boolean | Function)[]` and destructuring loses both types.

> Be careful with **any** custom React Hooks you write. They can trigger re-renders because under the hood they use **useState**.
> For more information, check out [article about re-renders](/blog/react-rerender).

## Usage

```tsx
const App = () => {
  const [isModalOpened, toggleModal] = useToggle();

  return (
    <>
      <p>The modal window is {isModalOpened ? 'opened' : 'closed'}.</p>

      <button onClick={toggleModal}>Toggle Modal State</button>
      <button onClick={() => toggleModal(false)}>Close</button>
    </>
  );
};
```

## Related

- [useClickOutside](/snippets/use-click-outside) — close the thing you just toggled open when the user clicks away
- [useLocalStorage](/snippets/use-local-storage) — persist the toggle, e.g. a dark mode switch, across reloads
- [usePrevious](/snippets/use-previous) — know what the value was before the last toggle
