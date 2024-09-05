---
title: Deep Clone an Object in JavaScript
description: A JavaScript function to create a deep clone of an object, including nested objects and arrays.
createDate: 2024-09-04T22:06:42.844Z
keywords: [
  deep clone object,
  deep clone in JavaScript,
  deep clone object in JavaScript,
  deep clone object example,
  deep clone object function
]
---

A JavaScript function to create a deep clone of an object, including nested objects and arrays.

```javascript
function deepClone(obj) {
  // Return the input if it's not an object
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Clone arrays
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  // Clone objects
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => [key, deepClone(value)])
  );
}
```

## Usage example

```javascript
const original = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4]
  }
};

const cloned = deepClone(original);

console.log(cloned);
console.log(cloned.b === original.b); // false
console.log(cloned.b.d === original.b.d); // false
 ```
