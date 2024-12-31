---
title: "TypeScript Guide for beginners"
heading: "TypeScript: A Friendly Guide"
description: Learn the fundamentals of TypeScript including static typing, basic types, functions, and type casting
keywords: [ TypeScript, JavaScript, Static Typing, Programming, Web Development ]
categories: [ TypeScript, JavaScript, Programming-Basics ]
createDate: 2024-12-31T00:00:00Z
updateDate: 2024-12-31T00:00:00Z
featured: false
---

TypeScript is JavaScript's bigger, more organized sibling created by Microsoft back in 2012.

It takes everything cool from ES6 and adds some neat features like optional static typing.
When you're done writing your code, it compiles down to regular JavaScript that browsers can understand.

## Static Typing: What's the Deal?

JavaScript is pretty laid-back when it comes to types - it's **dynamically typed**, meaning variables can change their type
whenever they want. While this flexibility is nice, it can sometimes lead to unexpected bugs that'll give you headaches
later.

That's where TypeScript comes in with its optional static typing. If you specify a type for a variable and then try to
do something that doesn't match that type, TypeScript will let you know right away during compilation. Many modern IDEs
will even catch these mistakes as you type - pretty handy, right?

## The Basic Types You'll Need

TypeScript gives you three primitive types to work with:

- `boolean` - your good old true/false
- `number` - for all your numeric needs
- `string` - for text

These primitive types are passed by value. For more complex stuff, you've got reference types that are passed by
reference:

- `array` - for collections of items
- `object` - for more complex data structures
- `tuple` - for arrays with a fixed number of elements

There are also `undefined` and `null` types, but you probably won't use them much.

## How to Use Types

To give a variable a type in TypeScript, you use a colon after the variable name:

```typescript
const x: number;
const name: string;
const isActive: boolean;
```

For arrays, you've got two ways to write it:

```typescript
const numbers: number[];
const otherNumbers: Array<number>;
```

And here's how you'd use a tuple (an array with fixed types in specific positions):

```typescript
const tuple: [number, boolean];
```

This means the first element must be a number, and the second a boolean.

## Type Inference: TypeScript's Smart Feature

Don't worry - TypeScript isn't going to make you write super verbose code by forcing you to declare types everywhere.
It's actually pretty smart about figuring out types on its own. For example:

```typescript
const title: string = `2 + 2 equals 4`;
```

Can be written simply as:

```typescript
const title = `2 + 2 equals 4`;
```

TypeScript will figure out it's a string. If it can't determine the type, and you don't specify one, it'll default to
`any`.

## The 'any' Type: Use with Caution

Variables of type `any` work just like regular JavaScript variables - they can hold any value and change types whenever.
While this gives you flexibility, it kind of defeats the purpose of using TypeScript. Try to avoid it if you can!

## Functions in TypeScript

Here's how you type functions:

```typescript
function multiply(a: number, b: number): number {
  return a * b;
}
```

This tells TypeScript that `multiply` takes two numbers and returns a number. If your function doesn't return anything,
use `void`:

```typescript
function log(msg: string): void {
  console.log(msg);
}
```

There's also the `never` type for functions that never finish (like infinite loops) or always throw errors:

```typescript
function infinity(): never {
  while (true) {
  }
}
```

## Type Casting

Sometimes you need to tell TypeScript that you know more about a type than it does. That's where type casting comes in.
Unlike other languages, it doesn't actually change the variable's structure - it just helps TypeScript understand what
you're trying to do.

You can do it two ways:

```typescript
const someValue: any = "this is a string";
const strLength: number = (<string>someValue).length;
```

Or:

```typescript
const someValue: any = "this is a string";
const strLength: number = (someValue as string).length;
```

## What's Next?

This covers the basics of typing in TypeScript. In the next part, we'll dive into creating your own types using `enums`,
`classes`, and `interfaces`. Stay tuned! 🚀

> P.S I have good article about [Discriminated Unions in TypeScript](./discriminated-unions), this data type can be useful for some cases. Check it out!
