---
title: How to Sort an Array of Objects by Multiple Properties in JavaScript
heading: Sort an Array of Objects by Multiple Properties
description: Learn how to sort an array of objects by multiple properties in JavaScript using the Array.prototype.sort() method with a custom compare function.
createDate: 2024-10-13
keywords: [
  JavaScript,
  Array,
  Object,
  Sorting,
  Programming,
  Coding tips,
  Array.prototype.sort,
  Custom compare function,
  Sort by multiple properties,
  Sort array of objects
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
