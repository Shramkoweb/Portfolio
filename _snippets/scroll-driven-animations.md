---
title: "CSS Scroll-Driven Animations: Replace JavaScript with Pure CSS"
heading: Scroll-Driven Animations
description: Pure CSS scroll-linked animations with scroll() and view() timelines. Build progress bars, fade-ins, and parallax effects without a single line of JavaScript.
createDate: 2026-04-11
keywords: [
  scroll-driven animations,
  CSS scroll animation,
  animation-timeline,
  scroll progress CSS,
  view timeline CSS,
  CSS parallax,
  scroll-linked animation,
  CSS animation-range,
  scroll() CSS,
  view() CSS,
  CSS scroll progress bar,
  fade in on scroll CSS,
]
---

For years, scroll-linked effects meant shipping a JavaScript library — Intersection Observer hacks, `requestAnimationFrame` loops, or 45KB plugins like ScrollMagic. CSS scroll-driven animations replace all of that with two functions: `scroll()` and `view()`.

## The Core Idea

Instead of time driving your animation, **scroll position** drives it. You bind a standard `@keyframes` animation to a scroll timeline, and the browser handles everything on the compositor thread — 60fps with zero JavaScript.

Two timeline types exist:

- **`scroll()`** — tracks how far a container has scrolled
- **`view()`** — tracks an element's visibility in the viewport

## Reading Progress Bar

A fixed bar that fills as the user scrolls down the page:

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: var(--color-accent);
  transform-origin: left;
  animation: grow-progress auto linear;
  animation-timeline: scroll(root);
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

```html
<div class="progress-bar" aria-hidden="true"></div>
```

Using `scaleX` instead of `width` keeps the animation on the compositor thread — no layout thrashing on every scroll tick.

## Fade-In on Scroll

Each card fades in and slides up as it enters the viewport:

```css
.card {
  animation: fade-in-up auto ease-out both;
  animation-timeline: view();
  animation-range: entry 10% entry 90%;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

The `animation-range: entry 10% entry 90%` controls when the animation starts and ends relative to the element entering the scrollport. No more fiddling with Intersection Observer thresholds.

## Parallax

```css
.parallax-bg {
  animation: parallax auto linear both;
  animation-timeline: view();
  animation-range: cover 0% cover 100%;
}

@keyframes parallax {
  from { transform: translateY(-50px); }
  to { transform: translateY(50px); }
}
```

## Gotchas

1. **`animation-duration: auto` is mandatory.** The default `0s` makes scroll-driven animations invisible. Always set `auto` (or use the shorthand: `animation: name auto timing`).

2. **`animation-timeline` is not part of the `animation` shorthand.** Always declare it separately.

3. **Use `animation-fill-mode: both`** for view timelines — without it, elements snap to their un-animated state before entry and after exit.

4. **Respect reduced motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .card,
  .progress-bar,
  .parallax-bg {
    animation: none;
  }
}
```

## Browser Support

Use `@supports` for progressive enhancement — the page works without the animations, they just add polish:

```css
@supports (animation-timeline: scroll()) {
  /* scroll-driven styles here */
}
```

Chrome 115+, Edge 115+, Firefox 128+. Safari does not support this yet (as of early 2026).

## Related

- [Lazy Loading with Intersection Observer](/snippets/lazy-loading-images-with-intersection-observer) — the JS-based scroll detection this API replaces
- [Debounce](/snippets/debounce) — another pattern for taming scroll event handlers
