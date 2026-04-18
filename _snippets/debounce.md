---
title: Debounce snippet function in modern TypeScript
heading: Debounce
description: Copy-paste debounce function in TypeScript. Delay function execution until user stops typing or triggering events. Includes React usage example.
createDate: 2025-05-15
updateDate: 2025-12-07
keywords:
  [
    debounce,
    debounce function,
    debounce function in Javascript,
    debounce function in TypeScript,
    code snippet,
    JS snippet,
    JS code snippet,
    debounce function in JS,
    debounce function in TS,
  ]
---

```typescript
const debounce = (callback: TimerHandler, wait: number) => {
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
```

## Usage

In this example, nothing will happen until the user starts moving the mouse, and then stops moving it for at least
250ms.

```tsx
interface MousePosition {
  x: number | null;
  y: number | null;
}

function MouseTracker() {
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({
    x: null,
    y: null,
  });

  const handleMouseMove = React.useMemo(
    () =>
      debounce((event: React.MouseEvent) => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      }, 250),
    [],
  );

  return (
    <div onMouseMove={handleMouseMove} className="w-full h-screen bg-gray-100">
      <p>
        Mouse X: {mousePosition.x}
        <br />
        Mouse Y: {mousePosition.y}
      </p>
    </div>
  );
}
```

> When using debounce in React, be mindful of performance. Learn more about [React re-renders](/blog/react-rerender) and [custom hooks pitfalls](/blog/react-hooks-pitfalls).
