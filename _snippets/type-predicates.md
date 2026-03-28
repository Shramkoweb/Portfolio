---
title: "TypeScript Type Predicates: Smart Type Guards for Safer Code"
heading: Type Predicates
description: Learn how to use TypeScript type predicates to create powerful type guards that help the compiler understand your code better.
createDate: 2025-10-16
keywords: [
  TypeScript type predicates,
  type guards TypeScript,
  TypeScript type narrowing,
  TypeScript type checking,
  is operator TypeScript,
  user-defined type guards,
  TypeScript filter type,
  type predicate function,
  TypeScript type safety,
  TypeScript best practices,
  type guards example,
  TypeScript advanced types,
  type narrowing function
]
---

## The Problem

Let's say you have an array of mixed types, and you want to filter it down to just the strings:

```typescript
const mixed = [1, 'hello', true, 'world', 42];

const strings = mixed.filter(item => typeof item === 'string');
// Type: (string | number | boolean)[]
```

If you check the type of `strings`, you'll see that it's `(string | number | boolean)[]`. TypeScript isn't smart enough
to know that the filter function has narrowed the type of the array.

## The Solution

You can define a function that returns a type predicate, which tells the TypeScript compiler that if the function
returns `true`, the value is of a certain type:

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

const mixed = [1, 'hello', true, 'world', 42];

const strings = mixed.filter(isString); // string[]
```

Now, the type of `strings` is `string[]`, which is exactly what we want.

## Usage

### Filtering Arrays

```typescript
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

const mixed = [1, 'hello', true, 'world', 42];
const numbers = mixed.filter(isNumber); // number[]
```

### Checking Object Properties

```typescript
interface User {
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}

const data: unknown = { name: 'John', email: 'john@example.com' };

if (isUser(data)) {
  console.log(data.name); // TypeScript knows data is User
  console.log(data.email);
}
```

### Narrowing Union Types

```typescript
type Cat = { type: 'cat'; meow: () => void };
type Dog = { type: 'dog'; bark: () => void };
type Animal = Cat | Dog;

function isCat(animal: Animal): animal is Cat {
  return animal.type === 'cat';
}

function handleAnimal(animal: Animal) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows animal is Cat
  } else {
    animal.bark(); // TypeScript knows animal is Dog
  }
}
```

### Filtering Null/Undefined Values

```typescript
function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

const values = [1, undefined, 2, null, 3];
const definedValues = values.filter(isDefined); // number[]
```

## Related

- [Discriminated Unions in TypeScript](/blog/discriminated-unions) — another powerful type narrowing technique using tagged unions
- [Branded Types](/snippets/branded-types) — enforce type safety at compile time with nominal typing patterns
