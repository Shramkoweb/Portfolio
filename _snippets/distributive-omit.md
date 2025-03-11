---
title: DistributiveOmit Type for Union Types
heading: Distributive Omit in TS
description: A TypeScript utility type that properly distributes Omit across all members of a union type
createDate: 2025-03-10T22:10:08.330Z
keywords: [TypeScript, utility types, distributive types, conditional types, Omit, union types, TypeScript snippets]
---

Custom omit type that omits a property from all members, preserving union types.

```typescript
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
```
