---
title: "Dispatch Tables in JavaScript: A Clean Code Approach"
heading: Dispatch table in javascript
description: Replace messy switch statements with dispatch tables in JavaScript. Learn this clean code pattern for handling multiple conditions with maintainable code.
createDate: 2022-08-28T08:04:18.720Z
updateDate: 2025-12-01
keywords: [ Switch statement in javascript, Dynamic Dispatch, Dispatch Tables, Conditionals in JavaScript, Polymorphism in JavaScript ]
categories: [ JS, Clean-Code ]
featured: false
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
configure [next.config.js](https://nextjs.org/docs/pages/api-reference/config/next-config-js) and the code there looks
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

Will it look and read much better? I use [dispatch tables](/blog/introducing-the-new-shramko.dev#monitoring-with-sentry)
in my projects, and I can say that it is a very convenient.

## Production example: CSP headers per environment

Here's a more advanced real-world example. Imagine you need to
configure [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers differently for each
environment — local development needs relaxed rules, while production should be locked down.

Without a dispatch table, you might end up with a chain of `if/else` blocks checking the environment for every
directive. Instead, we can define per-environment config as a lookup object:

```ts
type TEnv = 'development' | 'stage' | 'production' | 'local';

const ENV = process.env.NEXT_PUBLIC_NODE_ENV as TEnv;

interface EnvConfig {
  imageSrc: string[];
  connectSrc: string[];
  scriptSrc?: string[];
}

const envConfig: Record<TEnv, EnvConfig> = {
  local: {
    imageSrc: [
      'https://dev.cdn.example.com',
      'https://stage.cdn.example.com',
      'https://cdn.example.com',
      'https://images.example.com',
    ],
    connectSrc: [
      'http://localhost:3001',
      'https://api.dev.example.com',
      'https://api-1.dev.example.com',
      'https://api.stage.example.com',
      'https://api.example.com',
    ],
    scriptSrc: ["'unsafe-eval'"],
  },
  development: {
    imageSrc: ['https://dev.cdn.example.com', 'https://images.example.com'],
    connectSrc: [
      'https://api.dev.example.com',
      'https://api-1.dev.example.com',
    ],
  },
  stage: {
    imageSrc: ['https://stage.cdn.example.com', 'https://images.example.com'],
    connectSrc: ['https://api.stage.example.com'],
  },
  production: {
    imageSrc: ['https://cdn.example.com', 'https://images.example.com'],
    connectSrc: ['https://api.example.com'],
  },
};

const { imageSrc, connectSrc, scriptSrc = [] } = envConfig[ENV];
```

The key line is `envConfig[ENV]` — a single lookup replaces what could be four separate `if` branches with duplicated
destructuring logic.

Then we compose the full CSP header by spreading the environment-specific values into the shared directives:

```ts
const CSP_DIRECTIVES: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://www.googletagmanager.com',
    'https://cdn.analytics.example.com',
    ...scriptSrc,
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", ...imageSrc],
  'font-src': ["'self'"],
  'frame-src': ["'self'", 'https://embed.example.com'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'connect-src': [
    "'self'",
    'https://sentry.example.com',
    'https://analytics.example.com',
    ...connectSrc,
  ],
  'frame-ancestors': ["'none'"],
};
```

Notice how the dispatch table cleanly separates **what varies** (per-environment URLs) from **what's shared** (the CSP
structure). Adding a new environment is just adding a new key to `envConfig` — no control flow to touch.

## Useful links

- [Example in CLI parser app](https://github.com/Shramkoweb/CLI-diff-generator/blob/develop/src/parsers.js#L31)
- [Naming Conventions for Key-Value Maps](https://softwareas.com/naming-conventions-for-key-value-maps/)
- [Dispatch table](https://en.wikipedia.org/wiki/Dispatch_table)
- [The Early Return Pattern](/blog/the-early-return-pattern-in-javascript) - another clean code pattern for simplifying
  conditionals
