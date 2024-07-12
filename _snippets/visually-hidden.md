---
title: Visually Hidden
description: Hide content visually while keeping it accessible to screen readers using the visually hidden CSS technique.
createDate: 2024-07-12
keywords: [
  visually hidden CSS,
  accessibility CSS techniques,
  screen reader CSS tricks,
  hidden content accessibility,
  CSS visibility tricks,
  visually hide elements CSS,
  CSS clip rect technique,
  web accessibility tips,
  CSS display none screen readers,
  hidden content best practices,
  CSS accessibility guidelines,
  visually hidden elements,
  CSS aria-hidden attribute,
  accessible web design CSS,
  BEM CSS methodology,
  CSS for screen readers,
  CSS clip technique,
  visually hide elements accessibility,
  hidden content SEO,
  CSS tricks for accessibility
]
---

```css
/* Visually hides an element while keeping it accessible to screen readers. */

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

Developers frequently employ `display: none` to conceal content on web pages.

However, this approach can pose [accessibility](https://www.a11yproject.com/posts/how-to-hide-content/) challenges for users of screen readers, particularly when the hidden
content was intended for their benefit.

If you need more info about common css classes, check out the [post](/snippets/common-css-classes).
