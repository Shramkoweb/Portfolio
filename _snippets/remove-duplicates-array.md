---
title: "Effective Ways to Remove Duplicates from Arrays in JavaScript"
heading: Remove Duplicates from an Array
description: Three simple ways to remove duplicate values from JavaScript arrays. Learn to use Set, filter with indexOf, and reduce methods with clear code examples.
createDate: 2023-01-26T20:45:06.788Z
keywords: [JS snippet, JS remove duplicates, JS Array, JS Examples]
---

Initial array:

```js
const numbers = [1, 1, 1, 3, 3, 2, 2, 5, 6, 7, 7];
```

## Using a Set

```js
const uniqueNumbers = [...new Set(numbers)];
```

## Array.prototype.reduce

```js
const uniqueNumbers = numbers.reduce((previousValue, currentValue) => {
  return previousValue.includes(currentValue) ? previousValue : [...previousValue, currentValue];
}, []);
```

If you are not familiar with `reduce`, use
this [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

## Array.prototype.filter

```js
const uniqueNumbers = numbers.filter((element, index) => {
  return numbers.indexOf(element) === index;
});
```
