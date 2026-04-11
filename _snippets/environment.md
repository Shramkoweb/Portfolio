---
title: How to Check in Which Environment Your Code is Running
heading: Check in which environment the code is running
description: Find out how to check if your JavaScript or TypeScript code is running in a browser or Node.js environment using simple code snippets
createDate: 2024-09-13T20:35:42.844Z
updateDate: 2026-02-21
keywords: [
  check environment,
  check if code is running in browser,
  check if code is running in Node.js,
  check if code is running in browser or Node.js,
  check if code is running in browser or Node.js in JavaScript,
  check if code is running in browser or Node.js in TypeScript,
  check if code is running in browser or Node.js in Node.js,
  check if code is running in browser or Node.js in React,
  check if code is running in browser or Node.js in Angular,
  check if code is running in browser or Node.js in Vue.js
]
---

This snippet shows how to check in which environment the code is running.
It's useful when you need to run different code based on the environment, for example, to use different configurations,
APIs or Frameworks.

```typescript
const isBrowser: boolean =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined";
```

```typescript
const isNode: boolean =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;
```

```typescript
if (isBrowser) {
  // do browser only code
}

if (isNode) {
  // do Node.js only code
}
```

> I have a great example where it can be used in another snippet - [Generating UUIDs in JavaScript](/snippets/window-crypto).
