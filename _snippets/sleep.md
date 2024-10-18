---
title: "Sleep in JavaScript: How to Pause Execution"
heading: Sleep in JavaScript
description: Learn how to pause the execution of a JavaScript program for a given number of seconds.
createDate: 2024-10-18
keywords: [
  sleep in JavaScript,
  pause execution in JavaScript,
  delay in JavaScript,
  sleep function in JavaScript,
  JavaScript sleep example
]
---

Many programming languages have a built-in sleep function that pauses a program’s execution for a given number of
seconds, often making it easier to add delays. However, JavaScript, being an asynchronous and non-blocking language,
doesn’t come with such a built-in feature.

This is simple code snippet that demonstrates how to create a `sleep` function in JavaScript that pauses the execution.

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

```javascript:Example usage of sleep function
console.log("Task 1 started");
await sleep(2000);  // Wait for 2 seconds (2000 milliseconds)
console.log("Task 1 finished after 2 seconds");

console.log("Task 2 started");
await sleep(1000);  // Wait for 1 second (1000 milliseconds)
console.log("Task 2 finished after 1 second");
```
