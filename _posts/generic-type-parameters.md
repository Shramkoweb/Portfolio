---
heading: Generic Type Parameters in TypeScript
title: What is a generic type parameter T in TypeScript?
description: Understanding Generics Parameters naming conventions.
createDate: 2025-05-31T15:01:43.973Z
keywords: [ git info exclude, git assume unchanged, git local ignore, gitignore alternatives, git file management, git exclude files locally, git update-index, git ignore tracked files ]
categories: [TS, Clean-Code, Opinion, tutorial]
featured: true
---

<Image alt="A hand-drawn diagram showing Generic Type Parameters on the left and a browser window with TypeScript code for a generic identity function on the right, plus two boxes labeled U and V" src="generic.jpg" priority={true} />

When you first encounter TypeScript generics, you'll likely see something
like [this](https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics):

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

That lonely **T** sitting there might seem mysterious.

Why T? What if you need more than one? And when should you graduate from single letters to something more descriptive?
Let's dive into the world of generic naming conventions and figure out what actually makes sense.

## The Classic Lineup: T, U, V, W

The **T** convention comes from mathematics and early programming languages. It simply stands for "Type" – nothing
fancy.
When you need multiple generic parameters, the tradition is to march through the alphabet:

```typescript
// Two types? Add U
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Three types? Bring in V
function triple<T, U, V>(first: T, second: U, third: V): [T, U, V] {
  return [first, second, third];
}
```

This alphabetical progression isn't arbitrary – it creates a clear, predictable pattern that developers can follow
easily. Plus, these single letters are visually distinct and don't clutter your code.

> This naming convention is common in different languages,
> like [Java](https://docs.oracle.com/javase/tutorial/java/generics/types.html) and others.

## When Single Letters Work Perfectly

For simple, general-purpose functions and utilities, single letters are your best friend:

```typescript
// Array mapping - crystal clear what T and U represent
function map<T, U>(items: T[], transform: (item: T) => U): U[] {
  return items.map(transform);
}

// Key-value pairs - K and V are intuitive
interface Dictionary<K, V> {
  [key: K]: V;
}
```

> Notice how TypeScript's own built-in utilities follow this pattern. `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>` – they
> stick with meaningful single letters because the context makes their purpose obvious.

## The Case for Descriptive Names

Sometimes, though, single letters leave your future self (and your teammates) scratching their heads. That's when
descriptive names shine:

```typescript
// What are T and U supposed to represent here?
interface ApiClient<T, U> {
  get(endpoint: string): Promise<T>;
  handleError(error: U): void;
}

// Much clearer!
interface ApiClient<ResponseData, ErrorType> {
  get(endpoint: string): Promise<ResponseData>;
  handleError(error: ErrorType): void;
}
```

This is especially valuable in domain - specific code where the generic types have special meaning in your business logic.

## The Repository Pattern Example

Here's where descriptive naming really pays off:

```typescript

interface Repository<Entity, Key> {
  findById(id: Key): Promise<Entity | null>;
  save(entity: Entity): Promise<Key>;
  delete(id: Key): Promise<void>;
  findAll(): Promise<Entity[]>;
}


class UserRepository implements Repository<User, string> {
  // Implementation details...
}
```

Anyone reading this code immediately understands what **Entity** and **Key** represent.
Compare that to `Repository<T, U>` – you'd need to dig into the implementation to figure out which is which.

## The T Prefix Debate

You'll sometimes see generic parameters prefixed with T:

```typescript
interface Repository<TEntity, TKey> {
  findById(id: TKey): Promise<TEntity>;
}
```

This convention comes from [C#](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-9.0) and serves a purpose – it clearly marks something as a **type parameter** rather than a
**regular variable**. But it's not universally loved.

TypeScript's own standard library doesn't use the T prefix.
React components rarely use it. Many JavaScript and TypeScript projects skip it entirely:

```typescript
// Both are perfectly valid
interface Props<User, Settings> {}
interface Props<TUser, TSettings> {}
```

The choice often comes down to team preference and consistency with your existing codebase. Pick one style and stick
with it.

## Practical Guidelines

Here's what I've learned from years of writing TypeScript:

### Use single letters when:

- Writing utility functions that work with any type 
- The generic's role is obvious from context 
- You're following established patterns (like `map<T, U>`)

### Use descriptive names when:

- The generics have a specific domain meaning 
- You have multiple related type parameters 
- Code clarity would suffer with single letters

### Stay consistent:

- Whatever convention your team chooses, apply it everywhere 
- Don't mix T prefixes with non-prefixed names randomly 
- Document your team's preferred style

## Common Single-Letter Conventions

```typescript
T // Primary type parameter
U, V, W // Additional type parameters (alphabetical order)
K // Key type (in mappings, records)
V // Value type (in key-value structures)
E // Element type (in collections)
R // Return type
P // Properties/Props type
```

## Wrapping Up

- **Consistency beats perfection** – pick a style and stick with it 
- **Context is king – choose names** that make sense for your specific use case 
- **When in doubt, be descriptive** – clarity trumps brevity in complex code 
- **Follow your team's conventions** – consistency across the codebase matters most

> I love conventions and wrote a lot of articles about them.
> Check out about [conventional commits](/blog/conventional-commits) and [JavaScript Naming](/blog/javascript-naming-conventions) for more.
