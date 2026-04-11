---
title: Check if URL is Absolute - JavaScript Function
heading: Check if URL is Absolute
description: A JavaScript function that uses regex to determine if a given URL string is absolute by checking for http or https protocol prefix
createDate: 2025-06-03
updateDate: 2025-12-07
keywords: [
  javascript,
  url validation,
  absolute url,
  regex,
  http,
  https,
  web development,
  utility function
]
---

Returns true if the URL is an absolute URL.

```javascript
function isAbsolute(url) {
  return /^https?:\/\//.test(url);
}
```

> Learn more about the [difference between absolute and relative URLs](/blog/difference-between-absolute-and-relative-url).
