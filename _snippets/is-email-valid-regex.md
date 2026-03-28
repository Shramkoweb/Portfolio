---
title: Email Validation in TypeScript – Regex Function
heading: Validate Email in JavaScript
description: TypeScript function for validating email addresses using regex. Copy-paste snippet with type safety for form validation in your web applications.
createDate: 2025-05-14
keywords: [
  "email validation",
  "string validation",
  "regular expression",
  "regex",
  "form validation",
  "input validation",
  "typescript function",
  "email format",
  "string checking"
]
---

```typescript
function isValidEmail(email: string): boolean {
  // [RFC 5321] https://datatracker.ietf.org/doc/html/rfc5321
  const MAX_EMAIL_LENGTH = 254;
  const isInvalidInput = !email ||
    email.length === 0 ||
    email.length > MAX_EMAIL_LENGTH;

  if (isInvalidInput) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

## Usage example

```typescript
// Valid cases ✅ 
console.log(isValidEmail('user@example.com'));
console.log(isValidEmail('multiple@dots.co.uk'));
console.log(isValidEmail('name+tag@example.com'));

// Invalid cases ❌ 
console.log(isValidEmail('')); // - empty string 
console.log(isValidEmail(null as any)); // false - null input 
console.log(isValidEmail(undefined as any)); // false - undefined input 
console.log(isValidEmail('a'.repeat(255))); // false - exceeds max length (RFC 5321) 
console.log(isValidEmail('invalid.email@com')); // false - incomplete domain 
console.log(isValidEmail('no@dots')); // false - missing TLD 
console.log(isValidEmail('spaces in@email.com')); // false - contains spaces
 ```

## Related Content

- [JavaScript Naming Conventions](/blog/javascript-naming-conventions) - naming validation functions and other identifiers consistently
