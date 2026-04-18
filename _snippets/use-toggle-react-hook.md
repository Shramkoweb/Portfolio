---
title: useToggle React Hook
heading: useToggle
description: Simple useToggle React hook for managing boolean state. Toggle between true and false with a clean API. Perfect for modals, dropdowns, and dark mode switches.
createDate: 2024-10-30
keywords:
  [
    useToggle hook,
    React useToggle snippet,
    Boolean toggle hook,
    React hook tutorial,
    React state management,
    Reusable React hook,
    React hook example,
    useState toggle hook,
    React functional component,
    React toggle Boolean,
    React hook for toggling,
    JavaScript toggle hook,
    Boolean toggle React,
    React hooks tutorial,
    Custom hook pattern React,
    Boolean state toggle,
    useToggle example,
    React hook library,
    Simplify Boolean toggle,
  ]
---

A hook to toggle a boolean value with useToggle.

```tsx
import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleToggle = useCallback((newValue) => {
    // If 'newValue' is explicitly provided as a boolean, set 'value' to 'newValue'
    if (typeof newValue === 'boolean') {
      return setValue(newValue);
    }

    // Otherwise, toggle the current state
    return setValue((prev) => !prev);
  }, []);

  return [value, handleToggle];
}
```

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
    </>
  );
};
```
