---
title: Astro.js Image Component on Vercel
heading: How to Build an Astro.js Image Component on Vercel
description: Learn how to create an image component in Astro.js and deploy it on Vercel correctly.
createDate: 2024-09-13T21:01:43.973Z
keywords: [ Astro.js, Image Component, Vercel, Sharp, Image Service, Astro Image Error, Astro Image Fix, Astro Image Vercel, Astro Image Component, Astro Image Deployment, Astro Image Error Fix]
categories: [ Astro, Vercel, Tutorial ]
featured: false
---

## Astro.js Image Component

When I built [my linktree](https://links.shramko.dev/) website I forgot to use [Image component](https://docs.astro.build/en/guides/images/) in
Astro.js.<br></br>I used the `img` tag instead. So after learning about the Image component in Astro.js, I decided to
add it.

```tsx
<Image
  src={UserProfileImage}
  densities={[1, 2]}
  width="160"
  height="160"
  quality="max"
  alt="Serhii Shramko is eating pizza."
/>
```

And what do you think? It's works locally, but when I deployed it on Vercel, I got an error.

<Image src="astro-image-error.png" alt="Astro Image not works on Vercel" />

## How to Fix the Error

Searching... 🔎

Powerful ChatGPT?<br></br>
No, I found the solution on old and good [GitHub](https://github.com/withastro/astro/issues/5253).<br></br>
And a little bit of [documentation](https://docs.astro.build/en/reference/errors/missing-sharp/).

```javascript:astro.config.mjs
// Update astro.config.mjs with image service

export default defineConfig({
  image: {
    service: sharpImageService(),
  }
});
```

```bash
// Install sharp package
pnpm add sharp
```

Done and deployed. Now it works perfectly on Vercel.

<Image src="astro-image.png" alt="Astro Image works on Vercel" />
