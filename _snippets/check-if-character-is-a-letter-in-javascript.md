---
title: Efficient Methods to Validate Alphabetic Characters in JavaScript
heading: How to check if character is a letter in Javascript?
description: Check if a character is a letter in JavaScript using regex patterns and ASCII codes. Reliable methods for character validation including Unicode support.
createDate: 2024-12-31
updateDate: 2026-02-21
keywords:
  [
    JavaScript character validation,
    Check if letter JavaScript,
    JavaScript isLetter,
    JavaScript regex letters,
    ASCII validation JavaScript,
    Unicode character check,
    String validation JavaScript,
    JavaScript character methods,
    Validate alphabetic characters,
    JavaScript string patterns,
    Character type checking,
    JavaScript text validation,
    Letter detection JavaScript,
    JavaScript character manipulation,
    String character validation,
  ]
---

Here are my favorite and reliable methods to check if a character is a letter.

## Using ASCII Code Values

Another common method is checking ASCII code values using `charCodeAt()`:

```js
function isLetter(char) {
  const code = char.charCodeAt(0);
  return (
    (code >= 65 && code <= 90) || // uppercase letters
    (code >= 97 && code <= 122)
  ); // lowercase letters
}

console.log(isLetter('A')); // true
console.log(isLetter('z')); // true
console.log(isLetter('5')); // false
```

> Why it works: [ASCII](https://en.wikipedia.org/wiki/ASCII)

## Using String Methods

A simple but less performant method uses a combination of `toUpperCase()` and `toLowerCase()`:

```js
function isLetter(char) {
  return char.toLowerCase() !== char.toUpperCase();
}

console.log(isLetter('A')); // true
console.log(isLetter('!')); // false
```

> This method is the most marvelous 🦄
>
> Letters have different uppercase and lowercase versions, while non-letters (like numbers and special characters)
> remain unchanged when using these case conversion methods.

## Related

- [JavaScript Naming Conventions](/blog/javascript-naming-conventions) — best practices for naming variables and functions in JS
- [Email Validation with Regex](/snippets/is-email-valid-regex) — another common validation pattern in JavaScript
