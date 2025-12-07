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

In a previous post we covered [How React Rerenders Works](/blog/react-rerender). But today, we'll take a closer look at
the hidden pitfalls of custom hooks in React.

<Image alt="Hand-drawn diagram showing 'Custom React Hooks' as the main title with small hook illustrations, 'useEffect ( )' written in blue text on the left, and the React logo (atomic symbol) in blue on the bottom right." src="hooks.jpg" priority={true} />

When we handle state, component re-renders, and application performance in React, custom hooks are a powerful tool that
help us keep our components clean and manageable. However, this simplicity can sometimes hide performance issues that we
may not immediately notice.

Consider a basic custom hook for toggling the visibility of a tooltip:

```jsx
const useTooltipToggle = () => {
  const [visible, setVisible] = useState(false);

  return {
    visible,
    show: () => setVisible(true),
    hide: () => setVisible(false),
  };
};
```

Using this hook in a component might look neat and clean:

```jsx
const App = () => {
  const {
    visible,
    show,
    hide
  } = useTooltipToggle();

  return (
    <div className="app-container">
      <button onMouseEnter={show} onMouseLeave={hide}>Hover me!</button>
      {visible && <Tooltip text="Hello, Tooltip!" />}
      <HeavyComputationComponent />
      <AnotherIntensiveComponent />
    </div>
  );
};
```

At first glance, this setup appears elegant—state logic neatly wrapped in the `useTooltipToggle` hook. However, this
approach hides a subtle performance issue: whenever the tooltip visibility state changes, React re-renders the entire
`App` component, despite the state being limited to a small interaction.

> Why? You can read more about react rerenders [here](/blog/react-rerender).

### Hidden States and Re-rendering Pitfalls

Let's extend our custom hook to listen for a scroll event:

```jsx
const useTooltipToggle = () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    // For example, this part of the code was simplified
    visible: false,
    show: () => {},
    hide: () => {},
  };
};
```

Now, every time the user scrolls, this hook updates the state internally. Even though the scrolling position isn't
returned or directly used, it **triggers state changes**, causing the entire `App` to re-render unnecessarily.

### Nested Hooks Can Multiply Issues

The problem worsens when custom hooks depend on other hooks indirectly. For example, consider another hook for tracking
mouse movement:

```jsx
const useMouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return null;
};

const useTooltipToggle = () => {
  useMouseTracker();

  return {
    // For example, this part of the code was simplified
    visible: false,
    show: () => {},
    hide: () => {},
  };
};
```

Even if `useTooltipToggle` does not directly use mouse position state, the `App` component still re-renders each time
the mouse moves, since the state is updated inside the nested hook.

> Hiding stateful logic within hooks doesn't remove their performance impact. The
> solution isn’t hiding complexity but smartly managing and isolating the state.

### How to Solve This

To avoid such issues, encapsulate state logic in smaller components:

```jsx
const Tooltip = () => {
  const {
    visible,
    show,
    hide
  } = useTooltipToggle();

  return (
    <>
      <button onMouseEnter={show} onMouseLeave={hide}>Hover me!</button>
      {visible && <Tooltip text="Hello, Tooltip!" />}
    </>
  );
};
```

This ensures that the minimal required area re-renders, preventing unnecessary updates across the entire app.

> In this solution, the `Tooltip` logic moved down from `App` to the own component. I described this approach in
> [this article](/blog/react-rerender#moving-state-down).

### Key Takeaway

The key lesson: carefully handle state encapsulation within custom hooks. Keep state management local and focused to
optimize your React application's performance and responsiveness.

> P.S Memoization and other performance optimizations will be covered in future posts. Meanwhile, you can read about [Elements, Children as Props, and Re-Renders](/blog/react-elements-children).
