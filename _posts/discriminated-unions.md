---
title: "Discriminated Unions in TypeScript: The Secret Sauce for Better Code"
heading: Discriminated Unions in TypeScript
description: Discover how discriminated unions in TypeScript can help you write cleaner, safer, and more expressive code. Learn what they are, how to use them, and why they're awesome!
createDate: 2024-09-14
keywords: [ "TypeScript", "Discriminated Unions", "Tagged Unions", "Sum Types", "Type Safety", "Code Clarity", "Exhaustiveness Checking" ]
categories: [ TS, Tutorial, Clean-Code ]
featured: false
---

Hey there, TypeScript fans!

Ever found yourself wrestling with complex types and wishing there was a better way? Well,
buckle up, because we're about to dive into the world of discriminated unions. 🚀

## What Are Discriminated Unions?

Okay, so `discriminated unions` sounds like some fancy computer science term (and yeah, it kind of is), but don't let
that scare you off. Think of them as TypeScript's way of saying, "Hey, this thing can be one of these specific types,
and here's an easy way to figure out which one it is."

It's like having a box of assorted candies, but each candy has a little flag sticking out of it telling you what flavor
it is 🍭. That flag? That's our discriminant. Neat, right?

## How to Create a Discriminated Union

Let's break it down into easy steps:

1. Come up with the different "flavors" your type can be.
2. Give each flavor a special property (our little flag) that says what it is.
3. Throw them all together into one super-type.

Here's what it looks like in action:

```typescript
interface Taco {
  kind: "taco";
  shells: number;
}

interface Burrito {
  kind: "burrito";
  length: number;
}

interface Nachos {
  kind: "nachos";
  toppings: string[];
}

type MexicanFood = Taco | Burrito | Nachos;
```

In this tasty example, `kind` is our special flag (discriminant), and `MexicanFood` is our super-type. Each specific
type
(`Taco`, `Burrito`, `Nachos`) has its own `kind` property that tells TypeScript what it is.

## Why Discriminated Unions Are Awesome

1. **TypeScript becomes psychic**: It can magically figure out which specific type you're dealing with. No more guessing
   games!

2. **Your code tells a story**: Anyone reading your code can quickly understand what's going on. It's like leaving good
   comments, but better.

3. **Catch mistakes before they happen**: TypeScript can warn you if you forget to handle a case. It's like having a
   really attentive proofreader.

4. **Your IDE becomes smarter**: Better autocomplete suggestions? Yes, please!

## Discriminated Unions in Action

Let's see how we can use our `MexicanFood` type:

```typescript
function getCalories(food: MexicanFood): number {
  switch (food.kind) {
    case "taco":
      return food.shells * 200; // TypeScript knows it's a Taco!
    case "burrito":
      return food.length * 100; // It's definitely a Burrito here
    case "nachos":
      return food.toppings.length * 50; // Nacho time!
  }
}
```

TypeScript's got your back here. It knows exactly what properties are available in each case. Pretty cool, huh?

## Pro Tip: Don't Forget Any Cases!

Want to make sure you've covered all your ? Here's a neat trick:

```typescript
function assertNever(x: never): never {
  throw new Error("Unexpected food: " + x);
}

function getCalories(food: MexicanFood): number {
  switch (food.kind) {
    case "taco":
      return food.shells * 200;
    case "burrito":
      return food.length * 100;
    case "nachos":
      return food.toppings.length * 50;
    default:
      return assertNever(food); // TypeScript will complain if you miss a case
  }
}
```

> We will discuss the `assertNever` function in a future post.

If you add a new type of food but forget to update `getCalories`, TypeScript will give you a heads-up. It's like having
a friendly reminder bot!

## Wrapping Up

[Discriminated unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions) in TypeScript are like the Swiss Army knife of type management. They help you write code that's
easier to understand, harder to mess up, and just plain cooler.

Next time you're dealing with a bunch of related but different types, give discriminated unions a shot. Your future
self (and your teammates) will thank you!

Happy coding, and may your types always be discriminated! 🚀✨
