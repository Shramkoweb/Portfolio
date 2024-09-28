---
title: "How to Use the Range Function in JavaScript: A Simple Guide"
heading: Range Function
description: Generate an array of numbers in a range using JavaScript.
createDate: 2024-07-12
keywords: [
  JavaScript range function,
  generate sequence of numbers in JavaScript,
  JavaScript array creation,
  JavaScript programming tips,
  efficient JavaScript coding,
  JavaScript utility functions,
  how to create a range function in JavaScript,
  JavaScript code snippets,
  JavaScript for beginners,
  JavaScript tutorials
]
---

```javascript
const range = (start, end, step = 1) => {
  const numbers = [];

  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    numbers.push(i);
  }

  return numbers;
};
```

JavaScript's developers often need a quick and efficient way to generate a sequence of numbers. Whether you're creating
an
array of values for a loop or generating a series of steps, a range function can be incredibly useful.

> Many popular solutions, even Lodash's `_.range,` are not efficient if we read the V8 blog and understand how Arrays
> work. I will describe these topics in a future post.

## Examples

```javascript
range(5); // Output: [0, 1, 2, 3, 4]
```

```javascript
range(2, 8); // Output: [2, 3, 4, 5, 6, 7]
```

```javascript
range(1, 10, 2); // Output: [1, 3, 5, 7, 9]
```
