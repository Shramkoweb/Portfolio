---
title: 'Group Array by Key in JavaScript and TypeScript'
heading: Group Array by Key
description: Group an array of objects by a property value in TypeScript. Covers Object.groupBy, Map.groupBy, and a manual fallback for older environments.
createDate: 2026-02-21
keywords:
  [
    group array by key,
    group by JavaScript,
    groupBy TypeScript,
    Object.groupBy,
    Map.groupBy,
    group array of objects by property,
    JavaScript array groupBy,
    lodash groupBy alternative,
    categorize array JavaScript,
    array reduce group,
    group items by field,
    TypeScript array utility,
  ]
---

Grouping an array of objects by a property is one of the most common data transformations in frontend code. Modern
JavaScript has `Object.groupBy` built in — no lodash needed.

## Object.groupBy (ES2024)

Supported in all modern browsers and Node.js 21+:

```typescript
interface Product {
  name: string;
  category: string;
  price: number;
}

const products: Product[] = [
  { name: 'Shirt', category: 'clothing', price: 25 },
  { name: 'Pants', category: 'clothing', price: 45 },
  { name: 'Phone', category: 'electronics', price: 699 },
  { name: 'Laptop', category: 'electronics', price: 999 },
  { name: 'Apple', category: 'food', price: 2 },
];

const grouped = Object.groupBy(products, (product) => product.category);

// {
//   clothing: [{ name: 'Shirt', ... }, { name: 'Pants', ... }],
//   electronics: [{ name: 'Phone', ... }, { name: 'Laptop', ... }],
//   food: [{ name: 'Apple', ... }]
// }
```

## Map.groupBy

When your keys aren't plain strings (objects, numbers, compound keys), use `Map.groupBy`:

```typescript
const byPriceRange = Map.groupBy(products, (product) => {
  if (product.price < 50) return 'budget';
  if (product.price < 500) return 'mid';
  return 'premium';
});

byPriceRange.get('budget'); // [Shirt, Pants, Apple]
byPriceRange.get('premium'); // [Phone, Laptop]
```

## Manual Fallback

If you need to support older environments without a polyfill:

```typescript
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((groups, item) => {
    const value = String(item[key]);
    (groups[value] ??= []).push(item);
    return groups;
  }, {});
}
```

```typescript
const grouped = groupBy(products, 'category');
```

> To sort the grouped results, check out [sorting arrays of objects](/snippets/sort-an-array-of-objects-in-javascript)
> by any property.
