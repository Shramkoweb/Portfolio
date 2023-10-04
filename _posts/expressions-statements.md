---
title: Expressions vs Statements
description: Understand the important distinction expressions vs statements in JavaScript
keywords: [JS, CS, ES Modules]
categories: [JS, Clean-Code]
createDate: 2022-07-27T21:27:20Z
updateData: 2022-08-07T11:37:59.665Z
featured: false
---

JavaScript distinguishes _expressions_ and _statements_. A statement is an instruction, an action.

Remember conditions with `if`, `loops` with `while` and `for` — all those are _statements_, because they just perform
actions and control actions, but don't become values.

`Expression` returns (expresses) a value. Each of the following lines contains an expression:

```js
100 // this is a literal that expresses number 100

getUserName() // expresses Serhii

5 + 2 // expresses 7
```

`Statements` produce or control actions, but do not turn into values:

```js
let x; // declare a variable 'x'

function foo() {} // declare a function 'foo'

function bar() {
  return null // return is also a statement
}
```

You can't put statements where expressions are expected. For example, passing a const statement as a function
argument will produce an error. Or trying to assign the if statement to a variable:

```js
let b = if (x > 10) { return 100; };  // error!

console.log(const y);  // error!
```

## Related posts

- [Expressions versus statements in JavaScript](https://2ality.com/2012/09/expressions-vs-statements.html)
- [Expressions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#expressions)
