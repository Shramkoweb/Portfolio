---
title: Check if URL is Absolute - JavaScript Function
heading: Check if URL is Absolute
description: 'A JavaScript function that uses regex to check if a URL is absolute: it starts with a scheme like https:, ftp: or mailto:, or is protocol-relative.'
createDate: 2025-06-03
updateDate: 2026-11-05
keywords:
  [
    javascript,
    url validation,
    absolute url,
    regex,
    http,
    https,
    web development,
    utility function,
  ]
---

Returns true if the URL starts with a scheme (`https:`, `ftp:`, `mailto:`, in any case) or is protocol-relative
(`//host`).

```javascript
function isAbsolute(url) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url);
}
```

```javascript
isAbsolute('https://shramko.dev/blog'); // true
isAbsolute('HTTPS://shramko.dev/blog'); // true
isAbsolute('ftp://ftp.example.com/file.txt'); // true
isAbsolute('mailto:hello@example.com'); // true
isAbsolute('//shramko.dev/dashboard'); // true
isAbsolute('/about'); // false
isAbsolute('category/js'); // false
isAbsolute('#anatomy-of-a-url'); // false
```

A protocol-relative URL counts as absolute here: the browser takes the scheme from the current page. If you need an
explicit scheme, drop `|\/\/` from the regex.

<Update date="2026-11-05">
  The first version only matched `http://` and `https://` in lowercase. It now accepts any scheme, in any case, and
  protocol-relative URLs.
</Update>

> Learn more about the [difference between absolute and relative URLs](/blog/difference-between-absolute-and-relative-url).
