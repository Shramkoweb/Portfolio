---
title: "JavaScript 101: Arrays"
description: Guide to javascript array methods
createDate: 2022-11-25T17:39:11.486Z
updateData: 2022-11-25T17:39:11.486Z
keywords: [javascript arrays, javascript array replace, js array concat, js array includes, javascript concatenate arrays, array includes javascript]
categories: [JS, How-To]
featured: false
---

<Image src="fruits.png" alt="ES modules structure diagram" priority={true} />

## Syntax

Arrays are zero-indexed ordered lists of values. They are a convenient way to store a set of related elements of the
same type (such as numbers or strings), although an array can contain multiple types of elements, including other
arrays.

```js
// An array containing numbers
const numberArray = [0, 1, 2, 3, 4, 5];

// An array containing different data types
const mixedArray = [1, 'chicken', false];
```

## Creating an Array

The easiest way to create an array is to use array literals - `[]`, as in the example above.

```js
const fruits = ['🍎', '🍐', '🍊', '🍋', '🍉', '🍓'];
```

With the Array class by using the new keyword and passing in the elements as arguments:

```js
const fruits = new Array('🍎', '🍐', '🍊', '🍋', '🍉', '🍓');
```

Though, because the effect is exactly the same, it
is [preferable to use the literal method](https://google.github.io/styleguide/jsguide.html#features-arrays-ctor) for
simplicity

## Accessing the Elements of an Array

Array elements are ordered by index values, starting at 0:

- Index 0 has the first element
- Index 1 has the second element
- Index n-1 has the nth element
- Index array.length-1 has the last element

```js
//              [0]   [1]   [2]  [3]   [4]   [5]
const fruits = ['🍎', '🍐', '🍊', '🍋', '🍉', '🍓'];

// Get first element of array
console.log(fruits[0]); // 🍎

// Get third element of array n-1
console.log(fruits[2]); // 🍊

// Get last element of array
console.log(fruits[fruits.length]); // 🍓
```

## Array methods and properties

Arrays provide a lot of methods and properties.

### Array properties

The Array does not have a lot of property 😂.

#### Array length

The `length` property is used to know the amount of items in your array.

```js
const apples = ['🍎', '🍎', '🍎'];

// Length of an array
console.log(apples.length); // logs 3
```

### Array methods

For these examples I use this sample data:

```js:DATA_SAMPLE
const employees = [
  {
    name: 'Serhii',
    age: 29
  },
  {
    name: 'Anna',
    age: 20
  },
  {
    name: 'Roman',
    age: 27
  },
  {
    name: 'Julia',
    age: 25
  },
  {
    name: 'Mykola',
    age: 35
  }
];
```

[//]: # (TODO ADD EXAMPLE OF MY ARR)

#### Add & remove items from array

Methods that add and remove items from the beginning or the end:

- employees.push(...items) – adds items to the end
- employees.pop() – extracts an item from the end
- employees.shift() – extracts an item from the beginning
- employees.unshift(...items) – adds items to the beginning

#### Find element in array

The `.find()` method will return the **_first element_** in the array that matches a test you provide.

```js
const employees = [/* See DATA_SAMPLE */]

// Find employe with name 'Serhii'
const serhii = employees.find((employe) => employe.name === 'Serhii');

// or with object destructuring
const serhii = employees.find(({ name }) => name === 'Serhii');
```

#### Transform elements in array

The `.map()` method will apply a given function to every item in your array and give you a **_new array with those
values_**.

```js
// Transform employees array to new array of names.
// I use object destructuring in this and future examples
const names = employees.map(({ name }) => name);
```

#### Filter elements in array

The `.filter()` method takes your array and removes items that don't pass a test you give it, and return new array.

```js
// Keep employees who are younger than 25
const youngEmployees = employees.filter(({ age }) => age < 25);
```

#### Merge two arrays to one

The `.concat()` method is used to merge two or more arrays, or concat new array to old. This method does not change the
existing arrays, but instead returns a new array.

```js
const evenNumbers = [2, 4, 6];
const oddNumbers = [1, 3, 5];

const allNumbers = evenNumbers.concat(oddNumbers); // [ 2, 4, 6, 1, 3, 5 ]
```

#### Join each element in array

The `.join()` method creates and returns a new string by concatenating all elements in an array.

```js
// Before .join() we must transform each object in array to string
const foematedOutput = employees
  .map(({ name }) => name) // Transform employee object to name string
  .join("\n"); // "\n" – add newline after each element
```

```shell:Output
Serhii
Anna
Roman
Julia
Mykola
```

#### Check if every element in array matches some criteria

The `.every()` method checks that every single item in your array matches some criteria.

```js

const isAdult = (employe) => employe.age > 18;

// Check is every our employe older than 18 age
const isEveryEmployeeYoung = employees.every(isAdult); // true
```

#### Check if at least one item in array matches some criteria.

The `.some()` method checks that at least one item in your array matches some criteria by compare function.

```js

const isAdult = (employe) => employe.age > 18;

// Check is every our employe older than 18 age
const isEveryEmployeeYoung = employees.every(isAdult); // true
```

#### Check if at least one item includes in your array

The `.includes()` method checks that at least one item in your array matches some value.

```js
// Check is name "Serhii" includes in employees array
const isSerhiiNameExist = employees
  .map(({ name }) => name) // Transform employee object to name string
  .includes('Serhii'); // true
```

#### Loop through an array

The `.forEach()` method executes a provided function once for each array element.

It doesn't return a value though. It's useful for side effects.

```js
// Print to console name of each employe
employees.forEach((employe) => console.log(employe.name))
```

## Conclusion

The array has many methods, in this article I have shown the most used in my opinion.

Further, you can learn more methods on the pages of MDN Web Docs, so I wish you inspiration and hope this article will
be useful to you.
