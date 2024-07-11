---
title: Random number generator
description: Generate a random number in a range using JavaScript.
createDate: 2024-07-11
keywords: [
  JavaScript getRandom function,
  random number generator JavaScript,
  generate random float JavaScript,
  Math.random JavaScript
]
---

```javascript
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

> This random function includes the lower bound and upper bound.
> For example, `getRandom(1, 10)` will generate a random number between 1 and 10 (inclusive).

## Usage:

```javascript
const randomNumber = getRandom(1, 10); // Generates a random number between 1 and 10
console.log(randomNumber); // Example output: 7
```
