---
title: 'Branded Types in TypeScript: Never Mix Up IDs Again'
heading: Branded Types
description: Use TypeScript branded types (nominal types) to prevent mixing up strings and numbers that represent different things. Stop userId/orderId bugs at compile time.
createDate: 2025-12-01
keywords:
  [
    TypeScript branded types,
    nominal types TypeScript,
    TypeScript opaque types,
    type branding,
    TypeScript ID types,
    prevent string mixup,
    TypeScript type safety,
    branded primitives,
    TypeScript advanced patterns,
    TypeScript utility types,
    phantom types TypeScript,
  ]
---

Ever passed a `userId` where you meant `orderId`? They're both strings, TypeScript doesn't care, and now you've got a
fun debugging session ahead. Branded types fix this by making structurally identical types incompatible.

```typescript
declare const __brand: unique symbol;

type Brand<T, B extends string> = T & { [__brand]: B };
```

Now you can create distinct types that TypeScript actually keeps apart:

```typescript
type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;
type ProductId = Brand<string, 'ProductId'>;
```

## The Problem

```typescript
function getOrder(orderId: string): Order {
  /* ... */
}

function getUser(userId: string): User {
  /* ... */
}

const order = getOrder(userId); // No error, but totally wrong!
```

Both functions accept `string`. TypeScript sees no issue. Your production database sees a big issue.

## The Solution

```typescript
function getOrder(orderId: OrderId): Order {
  /* ... */
}

function getUser(userId: UserId): User {
  /* ... */
}

const order = getOrder(userId);
// Error: Argument of type 'UserId' is not assignable to parameter of type 'OrderId'
```

TypeScript catches the bug at compile time. No runtime cost, just pure type magic.

## Creating Branded Values

You'll need constructor functions to create branded values:

```typescript
function createUserId(id: string): UserId {
  return id as UserId;
}

function createOrderId(id: string): OrderId {
  return id as OrderId;
}

// Usage
const userId = createUserId('user_123');
const orderId = createOrderId('order_456');

getUser(userId); // Works
getOrder(orderId); // Works
getUser(orderId); // Error!
```

## Usage

### API Response IDs

```typescript
type ApiUserId = Brand<number, 'ApiUserId'>;
type DbUserId = Brand<number, 'DbUserId'>;

// Can't accidentally use API IDs in database queries
function findInDb(id: DbUserId): User {
  /* ... */
}
```

> Branded types pair nicely with [type predicates](/snippets/type-predicates) for runtime validation that TypeScript
> understands.

## Related

- [Discriminated Unions](/blog/discriminated-unions) - another approach to type-safe variants in TypeScript
