---
title: "React Elements, Children as Props, and Re-Renders"
heading: "Elements & Children Props"
description: "Learn how React elements work and how passing children as props can optimize performance by preventing unnecessary re-renders."
createDate: 2025-12-07T10:00:00.000Z
keywords: [ react elements, children prop, react performance, re-renders, react optimization, composition ]
categories: [ Advanced-React, Tutorial, React ]
featured: false
---

Hi, React developers!

In my previous [post](/blog/react-rerender), we explored the mechanics of re-renders and how to fix performance issues
by "moving state down." We solved the "slow modal" problem by isolating the state into a smaller component, leaving the
rest of the heavy app alone.

But what happens when you can't move the state down?

Imagine you are that same developer at a FAANG company. You’ve just optimized the modal, but now your PM asks for a new
feature: a "scroll progress" block that wraps the entire main content area.

## The Problem

The requirements are strict:

* A block that tracks the scroll position.
* It wraps `VerySlowComponent`, `BunchOfStuff`, and `OtherStuffAlsoComplicated`.
* As you scroll, a small UI element inside the wrapper needs to move/animate based on that scroll position.

Your first instinct might be to wrap everything in a div with an onScroll handler (or maybe try to hide the logic in
a [custom hook](/blog/react-hooks-pitfalls), which often doesn't help):

```jsx
const App = () => {
  // We need this state for the moving block
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollTop);
  };

  return (
    <div className="scrollable-block" onScroll={handleScroll}>
      <MovingBlock position={scrollPosition} />

      {/* 😱 These will re-render on EVERY scroll event! */}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

If you run this, the app will crawl. Every pixel you scroll triggers a state update in `App`. Since `App` re-renders,
React re-renders everything inside it. The "moving state down" trick won't work easily here because the `div` wraps the
content. The state needs to be high up.

Is `React.memo` the only escape hatch? No. There is a more elegant composition pattern that relies on understanding the
difference between a Component and an Element.

## The Solution: Children as Props

Let’s extract that scroll logic into its own component, but with a twist. Instead of hard-coding the slow components
inside, we accept them as children.

```jsx
const ScrollableWithMovingBlock = ({ children }) => {
  const [position, setPosition] = useState(0);

  const handleScroll = (e) => {
    setPosition(e.target.scrollTop);
  };

  return (
    <div className="scrollable-block" onScroll={handleScroll}>
      <MovingBlock position={position} />
      {children}
    </div>
  );
};
```

Now, we rewrite our `App`:

```jsx
const App = () => {
  return (
    <ScrollableWithMovingBlock>
      {/* These are now passed as props! */}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </ScrollableWithMovingBlock>
  );
};
```

Result: The scroll animation is buttery smooth. The heavy components do not re-render, even though they appear "inside"
the component that is updating 60 times a second.

## Why does this work? (The Deep Dive)

To understand this, we need to distinguish between a **Component** and an **Element**.

A **Component** is a function (e.g., `App` or `ScrollableWithMovingBlock`).

An **Element** is an object that describes what to render (e.g., `{ type: 'div', props: ... }`).

When `App` renders, it creates the elements for `<VerySlowComponent />` and its friends. It passes these Element objects
to `ScrollableWithMovingBlock` via the `children` prop.

Now, look at the render timeline:

1. **User Scrolls**: `ScrollableWithMovingBlock` updates its position state.
2. **Re-render**: `ScrollableWithMovingBlock` re-executes its function.
3. **The Return**: It returns a new `div` with the new `MovingBlock`. But for `{children}`, it uses the exact same
   reference it received from `App`.
4. **Reconciliation**: React looks at the `children` prop. It asks: "Did this object change?"
5. **The Check**: Since `App` (the owner) didn't re-render, the children object is referentially identical (`===`).
   React sees this and says, "Okay, no need to touch this subtree."

## Syntax Sugar

It's important to remember that `children` is just a prop like any other. The "nesting" syntax is just JSX sugar.
Creating an element is just a [JavaScript expression](/blog/expressions-statements), not a statement. This code:

```jsx
<Parent>
  <Child />
</Parent>
```

Is strictly equivalent to this:

```jsx
<Parent children={<Child />} />
```

You could even name the prop `content` or `body` if you wanted. As long as the Element object is created in the parent
scope (which isn't re-rendering) and passed down, the child will be preserved.

## Summary

In the previous article, we fixed performance by [moving state down](/blog/react-rerender#moving-state-down) into a
child. Today we fixed it by passing the heavy UI down as props.

Both strategies achieve the same goal: separating the part that changes from the part that remains static.

