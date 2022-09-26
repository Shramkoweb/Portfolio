---
title: Dispatch table in javascript
description: Polymorphism and Dispatch Tables in JS
createDate: 2022-08-28T08:04:18.720Z
updateData: 2022-08-28T10:28:54.920Z
keywords: [Switch statement in javascript, Dynamic Dispatch, Dispatch Tables, Conditionals in JavaScript, Polymorphism in JavaScript]
categories: [JS, Clean Code]
featured: true
---

## ❌ Problem

In my opinion, one of the most important tasks when writing code is to make it as simple and understandable as possible.
There are even principles in programming aimed at this - [KISS](https://en.wikipedia.org/wiki/KISS_principle).

You can often see such code with a lot of `if`, and `switch` statements in tutorials or answers on StackOverflow:

```js
function handleUserMove(direction) {
  if (direction === 'north') {
    movePlayerTo("north");
  } else if (direction === 'east') {
    movePlayerTo("east");
  } else if (direction === 'south') {
    movePlayerTo("south");
  } else if (direction === 'west') {
    movePlayerTo("west");
  } else {
    console.error("Unknown direction");
  }
}
```

If we had more conditionals who know how long this `if/else` statement could get 🤯, and it's not very dynamic.

We can use a `switch` statement:

```js
function handleUserMove(direction) {
  switch (direction) {
    case "north":
      movePlayerTo("north");
      break;
    case "east":
      movePlayerTo("east");
      break;
    case "south":
      movePlayerTo("south");
      break;
    case "west":
      movePlayerTo("west");
      break;
    default:
      console.error("Unknown direction");
  }
}
```

Although there is a little more code, `switch` itself describes the dispatching process more explicitly, but we write a
lot of static (control) code, and we must not forget about `break`. Too complicated for such a simple task.

## ✅ Solution

So what can we do to simplify it?

```js
const userInputToDirection = {
  north: movePlayer("north"),
  east: movePlayer("east"),
  south: movePlayer("south"),
  west: movePlayer("west")
}

function handleUserMove(direction) {
  userInputToDirection[direction]();
}
```

This option is better than the previous two for several reasons:

- It is shorter
- It is more flexible. Conditional constructs are static code that cannot be changed without rewriting the program
  itself.
- With
  the [Single Responsibility Principle (SRP)](https://www.freecodecamp.org/news/solid-principles-single-responsibility-principle-explained)
  , we have separated the execution function of our `handleUserMove` business logic from the direction determination
  logic.

Conditional constructs are static code that cannot be changed without rewriting the program itself.
But data is a completely different matter.
With this approach, it is easy to add new behavior without changing the application code `handleUserMove` itself.

## Real example

For example, in Next.js applications, you can
configure [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) and the code there looks
like this:

```js
const nextConfig = {
  /* Next.js config options here */
}

let resultConfig;

if (process.env.NODE_ENV === 'development') {
  resultConfig = withBundleAnalyzer(nextConfig);
} else if (process.env.NODE_ENV === 'production') {
  resultConfig = withSentryConfig(nextConfig);
} else if (process.env.NODE_ENV === 'test') {
  resultConfig = nextConfig;
}

module.exports = resultConfig;
```

With new knowledge, we can rewrite it like this:

```js
const nextConfigByEnv = {
  development: withBundleAnalyzer(nextConfig),
  production: withSentryConfig(nextConfig),
  test: nextConfig,
};

module.exports = nextConfigByEnv[process.env.NODE_ENV];
```

Will it look and read much better?

## Useful links

- [Example in CLI parser app](https://github.com/Shramkoweb/CLI-diff-generator/blob/develop/src/parsers.js#L31)
- [Naming Conventions for Key-Value Maps](https://softwareas.com/naming-conventions-for-key-value-maps/)
- [Dispatch table](https://en.wikipedia.org/wiki/Dispatch_table)
