---
title: Lazy Load Images in TypeScript Using Observer
heading: Lazy Loading Images
description: Complete guide to implementing lazy loading for images using Intersection Observer API with TypeScript, including code examples and best practices
createDate: 2025-02-02T00:00:00.000Z
keywords:
  [
    Intersection Observer,
    lazy loading,
    TypeScript,
    image optimization,
    web performance,
    JavaScript,
    frontend optimization,
    image loading,
  ]
---

Intersection Observer API allows us to load images only when they're about to enter the viewport. This optimization
technique significantly improves initial page load performance, especially for image-heavy pages. You can also use the same API to [check if an element is in the viewport](/snippets/is-element-in-viewport) for other use cases beyond image loading.

## Implementation

```typescript
interface LazyImageOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

class LazyImageLoader {
  private observer: IntersectionObserver;

  constructor(options: LazyImageOptions = {}) {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: options.root || null,
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0,
    });
  }

  private handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const dataSrc = img.getAttribute('data-src');

        if (dataSrc) {
          img.src = dataSrc;
          img.removeAttribute('data-src');
          this.observer.unobserve(img);
        }
      }
    });
  };

  public observe(images: NodeListOf<HTMLImageElement> | HTMLImageElement[]) {
    images.forEach((img) => this.observer.observe(img));
  }

  public disconnect() {
    this.observer.disconnect();
  }
}
```

## Usage

```html
<img
  class="lazy"
  data-src="path/to/image.jpg"
  src="https://placehold.co/600x600"
  width="600"
  height="600"
  alt="Lazy loaded image"
/>
```

```typescript
// Initialize
const lazyLoader = new LazyImageLoader({
  rootMargin: '50px', // Start loading 50px before the image enters viewport
});

const images = document.querySelectorAll<HTMLImageElement>('.lazy');

// Start observing
lazyLoader.observe(images);
```
