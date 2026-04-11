---
title: "Understanding the Hidden Pitfalls of Custom Hooks in React"
heading: Custom Hooks Pitfalls
description: Learn about performance risks in React custom hooks, how they cause unexpected re-renders, and strategies to manage state efficiently.
createDate: 2025-05-31T09:01:43.973Z
keywords: [ custom hooks, react re-render, react state management, react performance, hooks best practices, avoiding unnecessary renders ]
categories: [ Advanced-React, Tutorial, JS, TS, React ]
featured: false
---

### Understanding the Hidden Pitfalls of Custom Hooks in React

In a previous post we covered [How React Re-Renders Work](/blog/react-rerender). But today, we'll take a closer look at
the hidden pitfalls of custom hooks in React.

<Image alt="Hand-drawn cover image with 'Custom React Hooks' title, useEffect() in blue, fishing hook illustrations, and the React logo" src="hooks.jpg" priority={true} />

When we handle state, component re-renders, and application performance in React, custom hooks are a powerful tool that
help us keep our components clean and manageable. However, this simplicity can sometimes hide performance issues that we
may not immediately notice.

Consider a basic custom hook for managing a dropdown menu:

```jsx
const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
  };
};
```

Using this hook in a component might look neat and clean:

```jsx
const App = () => {
  const { isOpen, toggle, close } = useDropdown();

  return (
    <div className="app-container">
      <button onClick={toggle}>Menu</button>
      {isOpen && <DropdownMenu onSelect={close} />}
      <ExpensiveChart />
      <DataGrid rows={1000} />
    </div>
  );
};
```

At first glance, this setup appears elegant—state logic neatly wrapped in the `useDropdown` hook. However, this
approach hides a subtle performance issue: whenever the dropdown visibility state changes, React re-renders the entire
`App` component, despite the state being limited to a small interaction.

> Why? You can read more about react rerenders [here](/blog/react-rerender).

### Hidden States and Re-rendering Pitfalls

Let's extend our custom hook to listen for window resize events:

```jsx
const useDropdown = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    // For example, this part of the code was simplified
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
  };
};
```

Now, every time the user resizes the window, this hook updates the state internally. Even though the window width isn't
returned or directly used, it **triggers state changes**, causing the entire `App` to re-render unnecessarily.

### Nested Hooks Can Multiply Issues

The problem worsens when custom hooks depend on other hooks indirectly. For example, consider another hook for tracking
keyboard input:

```jsx
const useKeyboardListener = () => {
  const [lastKey, setLastKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => setLastKey(e.key);
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return lastKey;
};

const useDropdown = () => {
  useKeyboardListener();

  return {
    // For example, this part of the code was simplified
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
  };
};
```

Even if `useDropdown` does not directly use the last key pressed, the `App` component still re-renders each time
a key is pressed, since the state is updated inside the nested hook.

> Hiding stateful logic within hooks doesn't remove their performance impact. The
> solution isn’t hiding complexity but smartly managing and isolating the state.

### How to Solve This

To avoid such issues, encapsulate state logic in smaller components:

```jsx
const Dropdown = () => {
  const { isOpen, toggle, close } = useDropdown();

  return (
    <>
      <button onClick={toggle}>Menu</button>
      {isOpen && <DropdownMenu onSelect={close} />}
    </>
  );
};
```

This ensures that the minimal required area re-renders, preventing unnecessary updates across the entire app.

> In this solution, the `Dropdown` logic moved down from `App` to its own component. I described this approach in
> [this article](/blog/react-rerender#moving-state-down).

### Key Takeaway

The key lesson: carefully handle state encapsulation within custom hooks. Keep state management local and focused to
optimize your React application's performance and responsiveness.

> P.S. Memoization and other performance optimizations will be covered in future posts. Meanwhile, you can read about [Elements, Children as Props, and Re-Renders](/blog/react-elements-children).

## Related

- [useClickOutside Hook](/snippets/use-click-outside) - a practical custom hook example that applies the patterns discussed above
- [useMediaQuery Hook](/snippets/use-media-query) - another commonly used custom hook with proper cleanup
