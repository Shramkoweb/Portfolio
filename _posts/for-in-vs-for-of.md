---
title: for...in vs for...of Loops
description: What is the difference between "for...in" and "for...of"
createDate: 2022-08-17T20:19:07.728Z
updateData: 2022-08-17T20:19:07.728Z
keywords: [arrays in js, How to iterate in JS, Loops in JS]
categories: [JS]
featured: false
---

## The For Loop

There are many ways to iterate in JavaScript, and probably one of the most common is for a loop.

The for statement is a type of loop that will use up to three optional expressions to implement the repeated execution
of a code block.
Let’s take a look at an example of what that means:

```js
for (initialization; condition; final expression
)
{
  // code to be executed
}
```

```js
// Initialize a for statement with 5 iterations
for (let i = 0; i < 5; i++) {
  // Print each iteration to the console
  console.log(`The number is ${i}`);
}
```

```shell:Output
The number is 0
The number is 1
The number is 2
The number is 3
The number is 4
```

But in addition to this `for` loop, there are two other types of for iteration methods we can use: `for...in`
and `for...of`.

## The for...in Statement

The `for...in` statement iterates over
all [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
of an object that is keyed by strings (ignoring one keyed by Symbols), including inherited enumerable properties.

The syntax `for...in` looks like this:

```js
for (const variable in enumerable) {
  // Do something
}
```

For example, to loop through and `console.log` all the values in this `user` Object:

```js
const user = {
  name: 'Serhii',
  age: 29,
  email: 'shramko.dev@gmail.com',
  country: 'Ukraine',
  city: 'Kyiv'
}

for (const key in user) {
  console.log(`user.${key} = ${user[key]}`)
}
```

```shell:Output
user.name = Serhii
user.age = 29
user.email = shramko.dev@gmail.com
user.country = Ukraine
user.city = Kyiv
```

We iterate through each `key` of the `user` Object, and then through this key we get the value
with [Bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors#bracket_notation)
.

### for...in and Objects

`for...in` is probably the easiest way to go through the object and use the key to get the value from it.

### for...in and Arrays

The keys in the array are indexes (numbers).

```js
const creatures = [
  "octopus",
  "squid",
  "shark",
  "seahorse",
  "starfish",
];

for (const index in creatures) {
  // We need access to creatures value by index
  console.log(creatures[index])
}
```

```shell:Output
octopus
squid
shark
seahorse
starfish
```

### for...in and Strings

```js
const oceanCreature = 'Shark';

for (const index in oceanCreature) {
  console.log(oceanCreature[index])
}
```

```shell:Output
S
h
a
r
k
```

## The for...of Statement

The `for...in` statement is useful for iterating over object properties, but to iterate over iterable objects like
arrays and strings, we can use the for...of statement. The `for...of` statement is a newer feature as of ECMAScript 6.

In this example of a `for...of` loop, we will create an array and print each item in the array to the console.

```js
const sharks = ["tiger", "great white", "hammerhead"];

// Print out each type of shark
for (const shark of sharks) {
  // Unlike for...in, we don't need an index now
  // we have immediate access to the element of the array
  console.log(shark);
}
```

```shell:Output
tiger
great white
hammerhead
```

### for...of and Objects

The `for...of` loop doesn't work with Objects because they don't have a [Symbol.iterator] property.
You can try but you will get an error:

```js
"Uncaught TypeError: Object is not iterable"
```

### Iterating over a DOM collection

Iterating over DOM collections like [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList):

```js
const paragraphElements = document.querySelectorAll('p');

for (const paragraph of paragraphElements) {
  // Make all paragraphs red
  paragraph.style.color = 'red';
}
```

## Conclusion

In this post, we understood how for loops work and the difference between `for...of` and `for...in` statements.

Loops are an integral part of any programming language, as they are constantly used in places where you need to perform
the same type of tasks several times.
