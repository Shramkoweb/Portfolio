---
title: How to Capitalize the First Letter of a String in JavaScript
heading: Capitalize the First Letter of a String in JavaScript
description: Learn how to capitalize the first letter of a string in JavaScript using various methods and best practices.
createDate: 2024-10-13
keywords: [ JavaScript, String manipulation, Capitalize first letter, Programming, Coding tips ]
---

String manipulation is a fundamental aspect of programming in JavaScript. 

One common task is capitalizing the first letter of a string. Whether you’re formatting user input or displaying dynamic content, knowing how to manipulate strings effectively is essential.

```javascript
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Example usage:
const originalString = "hello world";
const capitalizedString = capitalizeFirstLetter(originalString);
console.log(capitalizedString); // Output: "Hello world"
```
