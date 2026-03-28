---
title: "JavaScript Naming Conventions: A Complete Guide for Clean Code"
heading: Why Are JavaScript Naming Conventions Important?
description: Master JavaScript naming conventions with this guide. Learn best practices for naming variables, functions, and classes to write cleaner code.
createDate: 2025-02-02T09:00:00.000Z
keywords: [ javascript naming conventions, javascript best practices, clean code javascript, javascript naming patterns, javascript variable naming, javascript coding standards, js naming convention, javascript class naming ]
categories: [ JS, TS, Tutorial, Project-Setup, Opinion, Tools ]
featured: false
---

Writing clean, maintainable JavaScript isn't just about making your code work - it's about making it understandable. In
this comprehensive guide, we'll explore the essential naming conventions that can transform your JavaScript code from
merely functional to professionally polished.

## Why Naming Matters in JavaScript

Every time you write code, you're not just writing it for the computer - you're writing it for other developers (
**including your future self** ). Good naming conventions serve as a form of documentation, making your code
self-explanatory
and reducing the cognitive load required to understand it.

## Core Principles of JavaScript Naming

### 1. Consistency Is Key

The most fundamental rule of naming in JavaScript is maintaining consistency throughout your project. Whether you choose
camelCase or snake_case, stick to it. Here's why:

- Reduces cognitive overhead for developers
- Makes code more predictable
- Simplifies maintenance and refactoring
- Improves team collaboration

### 2. Language Matters

While JavaScript is flexible enough to allow variable names in any language, stick to English. This ensures:

- Universal code readability
- Easier collaboration with international teams
- Better integration with existing codebases

### 3. The Case for Different Cases

JavaScript uses multiple naming conventions depending on the context:

- `camelCase` for variables, functions, and methods (e.g., when you need to [capitalize the first letter of a string](/snippets/how-to-capitalize-first-letter-of-string-in-javascript), the function name follows camelCase)
- `PascalCase` for classes and constructor functions
- `UPPER_SNAKE_CASE` for constants
- `kebab-case` typically for CSS classes and HTML attributes

JavaScript’s built-in APIs use camelCase (e.g., getElementById), PascalCase for classes (e.g., Date), and
UPPER_SNAKE_CASE for constants (e.g., Math.PI). Align your code with these patterns.

## Practical Naming Guidelines

### Variables and Functions

#### Boolean Variables

Boolean variables should start with an affirmative prefix, typically 'is' or 'has':

```javascript
// Bad ❌
const active = true;
const notAllowed = !user.checkAccess();

// Good ✅
const isActive = true;
const hasPermission = user.checkAccess();
```

> Another thing to remember at the conference is that the affirmative prefix shouldn't include a negation. This is
> because the negation operator (!) is most commonly used with Boolean values. So, a value named something like '
> isNotAllowed' with the negation applied to it, '!isNotAllowed', can be quite misleading.

Naming recommendations for Boolean from [W3C](https://w3ctag.github.io/design-principles/#naming-booleans).

#### Functions and Methods

Function names should be verbs that clearly describe their action:

```javascript
// Bad ❌
function userData() {}

function total() {}

// Good ✅
function getUserData() {}

function calculateTotal() {}
```

### Collections and Arrays

Use plural nouns for arrays and collections:

```javascript
// Bad ❌
const userRoleList = ['admin', 'editor', 'viewer'];
const activeUserArr = new Set();

// Good ✅
const userRoles = ['admin', 'editor', 'viewer'];
const activeUsers = new Set();
```

### Classes and Objects

#### Class Names

Classes should use PascalCase and be noun phrases:

```javascript
// Bad ❌
class userService {
  constructor() {}
}

// Good ✅
class UserService {
  constructor() {}
}
```

#### Class Members

Avoid repeating the class name in member names:

```javascript
// Bad ❌
class UserProfile {
  updateUserProfile() {}

  deleteUserProfile() {}
}

// Good ✅
class UserProfile {
  update() {}

  delete() {}
}
```

### Constants and Enums

#### Constants

Use UPPER_SNAKE_CASE for true constants:

```javascript
// Bad ❌
const maxRetryAttempts = 3;
const apiBaseUrl = 'https://api.example.com';

// Good ✅
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';
```

#### Enums

Use PascalCase for enum names and UPPER_SNAKE_CASE for enum values:

```javascript
// Bad ❌
const userRoles = {
  admin: 'admin',
  editor: 'editor',
  viewer: 'viewer'
};

// Good ✅
const UserRole = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};
```

#### Maps

Also known as a dictionary data structure. This data structure is used for mapping one value to another.

```javascript
// Bad ❌
const userRole = {
  [AccountType.SUPERVISOR]: 'Supervisor',
  [AccountType.VISITOR]: 'Visitor',
}

const REDIRECTING = {
  '/teams': '/supervisor-panel',
  '/account': '/authenticate',
}

const UserPermissions = {
  [AccountType.SUPERVISOR]: [AccessLevel.USER_ADMINISTRATION, AccessLevel.TEAM_ADMINISTRATION],
  [AccountType.VISITOR]: [AccessLevel.PROFILE_MANAGEMENT],
}

// Good ✅
const userRoleToReadable = {
  [AccountType.SUPERVISOR]: 'Supervisor',
  [AccountType.VISITOR]: 'Visitor',
}

const pagePathToRedirectPath = {
  '/teams': '/supervisor-panel',
  '/account': '/authenticate',
}

const userRoleToPermissions = {
  [AccountType.SUPERVISOR]: [AccessLevel.USER_ADMINISTRATION, AccessLevel.TEAM_ADMINISTRATION],
  [AccountType.VISITOR]: [AccessLevel.PROFILE_MANAGEMENT],
}
```

## Common Pitfalls to Avoid

### 1. Including Types in Names

```javascript
// Bad ❌
const userArray = ['John', 'Jane'];
const nameString = 'John';

// Good ✅
const users = ['John', 'Jane'];
const name = 'John';
```

### 2. Ambiguous Abbreviations

```javascript
// Bad ❌
const usr = getUser();
const pwd = 'secret';

// Good ✅
const user = getUser();
const password = 'secret';
```

### 3. Inconsistent Naming Patterns

```javascript
// Bad ❌
const get_user = () => {};
const fetchData = () => {};
const retrieve_info = () => {};

// Good ✅
const getUser = () => {};
const fetchData = () => {};
const retrieveInfo = () => {};
```

### 4. Different Languages

```javascript
// Bad ❌
const ユーザー名 = "John";

// Good ✅
const userName = "John";
```

## Types & Interfaces

Names of types and interfaces should be written in `PascalCase` notation.

```typescript
// Bad  ❌
type TUser = {
  firstName: string
  lastName: string
}

interface userServiceInterface {
  findByEmail: (email: string) => User
}

// Good ✅
type User = {
  firstName: string
  lastName: string
}

interface UserServiceContract {
  findByEmail: (email: string) => User
}

interface IUserService {
  findByEmail: (email: string) => User
}
```

> When engineering teams choose to leverage both class-based types and abstract definitions within the same project, best practices suggest adding a distinguishing marker to the abstract definitions. Common prefix choices include `T` and `Contract`.

## Tools for Maintaining Naming Conventions

To help maintain consistent naming conventions, consider using:

1. [ESLint](https://eslint.org/) with naming convention rules
2. [Prettier](https://prettier.io/) for consistent formatting
3. IDE extensions for code style enforcement
4. Team code review guidelines focused on naming

## Time Tested Naming Naming Conventions

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html#naming)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript?tab=readme-ov-file#naming-conventions)

## Conclusion

Good naming conventions are more than just style preferences - they're a fundamental aspect of writing maintainable,
professional JavaScript code. By following these conventions consistently and thoughtfully, you'll create code that's
easier to understand, maintain, and debug.

Remember, the goal isn't to follow these rules blindly, but to use them as guidelines to write more readable and
maintainable code. The best naming convention is one that your entire team understands and follows consistently.

## Related Content

- [CSS Class Naming Conventions](/blog/class-naming-conventions) - BEM methodology for HTML/CSS
- [Common CSS Class Names](/snippets/common-css-classes) - practical BEM class name examples
