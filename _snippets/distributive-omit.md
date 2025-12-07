---
title: DistributiveOmit Type for Union Types
heading: Distributive Omit in TS
description: Custom TypeScript utility type that properly distributes Omit across union type members. Fixes the standard Omit behavior with discriminated unions.
createDate: 2025-03-10T22:10:08.330Z
updateDate: 2025-12-07
keywords: [TypeScript, utility types, distributive types, conditional types, Omit, union types, TypeScript snippets]
---

Custom omit type that omits a property from all members, preserving union types.

```typescript
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
```

This utility type is especially useful when working with [discriminated unions](/blog/discriminated-unions) where the standard `Omit` doesn't distribute properly across union members.
