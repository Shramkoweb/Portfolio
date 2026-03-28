---
title: "JavaScript Deep Clone: How to Safely Copy Objects"
heading: Deep Clone an Object in JavaScript
description: Create deep clones of JavaScript objects including nested structures. Copy-paste function using structuredClone for reliable object duplication.
createDate: 2024-09-04T22:06:42.844Z
updateDate: 2026-02-21
keywords: [
  deep clone object,
  deep clone in JavaScript,
  deep clone object in JavaScript,
  structuredClone,
  structuredClone JavaScript,
  deep clone object example,
  deep clone object function,
  deep copy vs shallow copy,
  JavaScript copy nested object,
]
---

## structuredClone (recommended)

The built-in `structuredClone()` handles nested objects, arrays, `Date`, `Map`, `Set`, `RegExp`, and circular references out of the box:

```javascript
const original = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4]
  },
  date: new Date(),
};

const cloned = structuredClone(original);

console.log(cloned.b === original.b); // false
console.log(cloned.date instanceof Date); // true
```

> `structuredClone` does not copy functions, DOM nodes, or prototype chains. If your object contains those, use the manual approach below.

## Manual Fallback

A recursive approach for environments without `structuredClone` or when you need custom logic:

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => [key, deepClone(value)])
  );
}
```

> This manual version does not handle `Date`, `Map`, `Set`, or circular references. Prefer `structuredClone()` when possible.

## Related Content

- [JavaScript Arrays](/blog/js-arrays) - working with JavaScript data structures including cloning arrays
