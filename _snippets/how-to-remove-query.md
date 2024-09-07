---
title: How to Remove a Query String From a URL in JavaScript
description: Snippet to remove a query string from a URL using JavaScript. Learn how to remove query parameters from a URL string.
createDate: 2024-09-07
keywords: [
  JavaScript snippet,
  remove query string from URL,
  remove query parameters from URL,
  remove query string JavaScript,
  remove query parameters JavaScript,
  remove query string from URL JavaScript,
  remove query parameters from URL JavaScript,
  remove query string from URL example
]
---

## Removing Query Parameters from a URL in JavaScript

To remove query parameters from a URL in JavaScript, you can use the following function:

```typescript
function removeQueryParams(inputUrl: string): string {
  const url = new URL(inputUrl);
  url.search = '';
  return url.toString();
}
```

```typescript
removeQueryParams('https://www.example.com/page?param1=value1&param2=value2');
// Output: https://www.example.com/page
```
