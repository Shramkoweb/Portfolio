---
title: How to Sort an Array of Objects by Multiple Properties in JavaScript
heading: Sort an Array of Objects by Multiple Properties
description: Learn how to sort an array of objects by multiple properties in JavaScript using the Array.prototype.sort() method with a custom compare function.
createDate: 2024-10-13
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

Sorting an array of objects by multiple properties can be achieved using the `Array.prototype.sort()` method with a custom compare function.

Below are code snippets demonstrating various ways to accomplish this task.

## Sample Data
Let’s start with an example array of objects:

```javascript
const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Anna', age: 22, city: 'London' },
  { name: 'John', age: 25, city: 'Paris' },
  { name: 'Mike', age: 32, city: 'New York' },
];
```

## Sorting by Multiple Properties

```javascript

data.sort((a, b) => {
  if (a.name !== b.name) {
    return a.name.localeCompare(b.name);
  } else if (a.age !== b.age) {
    return a.age - b.age;
  } else {
    return a.city.localeCompare(b.city);
  }
});

console.log(data);
```

```javascript
// Output:
[
  { "name": "Anna", "age": 22, "city": "London" },
  { "name": "John", "age": 25, "city": "Paris" },
  { "name": "John", "age": 30, "city": "New York" },
  { "name": "Mike", "age": 32, "city": "New York" }
]
```
