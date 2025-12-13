---
title: "TypeScript satisfies Operator: Keep Your Types Precise"
heading: The satisfies Operator
description: Learn when to use TypeScript's satisfies operator instead of type annotations. Validate object shapes while preserving literal types and autocomplete.
createDate: 2025-12-13
keywords: [
  TypeScript satisfies,
  satisfies operator,
  TypeScript 4.9,
  type inference TypeScript,
  satisfies vs type annotation,
  TypeScript literal types,
  TypeScript config objects,
  TypeScript type checking,
  satisfies keyword,
  TypeScript best practices
]
---

Here's a thing that used to annoy me: you define a nice config object, slap a type on it for safety, and boom — TypeScript forgets all the specific values you just wrote. Your autocomplete goes from helpful to useless.

## The Problem

```typescript
type Theme = Record<string, string>;

const colors: Theme = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
};

colors.primary // type is `string` — we lost the literal!
colors.typo    // no error, TypeScript has no idea what keys exist
```

By annotating `colors` with `: Theme`, we told TypeScript "trust me, it's some Record" — and it did. A bit too much.

## The Fix

The `satisfies` operator (TypeScript 4.9+) validates that your object matches a type without widening the inferred type:

```typescript
type Theme = Record<string, string>;

const colors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
} satisfies Theme;

colors.primary // type is "#3b82f6" — literal preserved!
colors.typo    // Error: Property 'typo' does not exist
```

Best of both worlds: TypeScript checks the shape but keeps the precise types you wrote.

## Usage

### Route Maps

```typescript
const routes = {
  home: '/',
  about: '/about',
  blog: '/blog',
} satisfies Record<string, string>;

// Full autocomplete for route keys
routes.home  // "/"
routes.aboot // Error: did you mean 'about'?
```

### Config with Constraints

```typescript
interface FeatureFlags {
  darkMode: boolean;
  betaFeatures: boolean;
  maxRetries: number;
}

const config = {
  darkMode: true,
  betaFeatures: false,
  maxRetries: 3,
} satisfies FeatureFlags;

// TypeScript knows maxRetries is exactly 3, not just `number`
```

### Event Handlers

```typescript
type EventMap = Record<string, (...args: unknown[]) => void>;

const handlers = {
  onClick: (e: MouseEvent) => console.log(e.clientX),
  onKeyDown: (e: KeyboardEvent) => console.log(e.key),
} satisfies EventMap;

// Each handler keeps its specific event type
handlers.onClick // (e: MouseEvent) => void
```

> If you're working with discriminated unions, check out how [type predicates](/snippets/type-predicates) can help narrow types at runtime.

