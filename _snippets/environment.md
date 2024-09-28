---
title: Check in which environment the code is running
description: Find out how to check if your JavaScript or TypeScript code is running in a browser or Node.js environment using simple code snippets
createDate: 2024-09-13T20:35:42.844Z
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
  process.versions.node != null &&
process.versions != null;
```

```typescript
if (isBrowser) {
  // do browser only code
}

if (isNode) {
  // do Node.js only code
}
```
