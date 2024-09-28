---
title: "React Hook Tutorial: How to Use the useHasMounted Hook"
heading: useHasMounted
description: Avert strange SSR problems with this useful React hook. Identify whether your rendering occurs on the client or server!
createDate: 2024-07-11
keywords: [
  React useEffect hook usage,
  Conditional rendering in React components,
  Managing component lifecycle states,
  Custom React hooks tutorial,
  useState and useEffect in React,
  Component mount lifecycle in React,
  Declarative React programming,
  Advanced React component rendering,
  Optimizing React component performance,
  React functional components
]
---

Hey there! Today, let's talk about a handy custom React hook called `useHasMounted`. This hook is quite useful when you
want to conditionally render components or perform actions based on whether your component has mounted or not.

After [React Server Components (RSC)](https://react.dev/reference/rsc/server-components) are released, this hook will be even more useful.

```jsx
import { useState, useEffect } from 'react';

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
```

## Why use it?

- Conditional rendering: You can conditionally render parts of your UI that depend on the component being fully mounted.
- Avoid premature actions: Use this hook to avoid triggering actions or fetching data before your component is ready.

Custom hooks like `useHasMounted` are great for managing component lifecycle states in a more declarative and reusable
way. Happy coding!

## Usage

```jsx
const Component = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return <div>Render only on client</div>
};
```
