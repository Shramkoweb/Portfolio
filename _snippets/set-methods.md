---
title: 'Set Methods in JavaScript: union, intersection, difference & More'
heading: Set Methods
description: Use native Set methods — union, intersection, difference, symmetricDifference, isSubsetOf, isSupersetOf, and isDisjointFrom — in JavaScript. No polyfill needed.
createDate: 2026-04-19
keywords:
  [
    Set methods JavaScript,
    Set union JavaScript,
    Set intersection JavaScript,
    Set difference JavaScript,
    symmetricDifference Set,
    isSubsetOf JavaScript,
    isSupersetOf JavaScript,
    isDisjointFrom JavaScript,
    ES2024 Set methods,
    compare two Sets JavaScript,
    JavaScript set operations,
    Set-like object JavaScript,
  ]
---

You spread into arrays, filter, then wrap in a new `Set` just to find the overlap between two collections. That ritual
is over. `Set` now has seven built-in methods — `union`, `intersection`, `difference`, `symmetricDifference`,
`isSubsetOf`, `isSupersetOf`, and `isDisjointFrom` — shipping in every modern browser since mid-2024.

## The seven methods

```ts
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

a.union(b); // Set {1, 2, 3, 4, 5, 6}
a.intersection(b); // Set {3, 4}
a.difference(b); // Set {1, 2}
a.symmetricDifference(b); // Set {1, 2, 5, 6}

a.isSubsetOf(b); // false
a.isSupersetOf(b); // false
a.isDisjointFrom(b); // false
```

## Usage

```ts
const adminPerms = new Set(['read', 'write', 'delete', 'manage-users']);
const editorPerms = new Set(['read', 'write', 'publish']);

// Shared permissions
adminPerms.intersection(editorPerms);
// Set {"read", "write"}

// Every permission across both roles
adminPerms.union(editorPerms);
// Set {"read", "write", "delete", "manage-users", "publish"}

// Admin-only permissions
adminPerms.difference(editorPerms);
// Set {"delete", "manage-users"}

// Does editor have everything admin has?
editorPerms.isSubsetOf(adminPerms); // false

// Tag matching — quick "any overlap?" check
const userInterests = new Set(['react', 'typescript', 'go']);
const postTags = new Set(['rust', 'wasm']);
userInterests.isDisjointFrom(postTags); // true — no match, skip this post
```

## Gotchas

- **No chaining shortcut.** `a.union(b).intersection(c)` works, but each call creates an intermediate `Set`. For complex
  expressions on large collections, store intermediates explicitly.
- **Comparison is SameValueZero.** Same rule `Set` has always used — `NaN === NaN` is `true`, but objects compare by
  reference, not by value.
- **No `Array` input.** `a.union([3, 4])` throws. Wrap arrays first: `a.union(new Set([3, 4]))`.

Reach for these methods anytime you compare, merge, or diff collections. They replace the spread-filter-`has` dance
with one readable call — and the engine handles the fast path.

> Use [Remove Duplicates from an Array](/snippets/remove-duplicates-array) when you need a unique array, or
> [Group Array by Key](/snippets/group-by) to bucket items before comparing groups.
