---
title: 'Astro Framework Guide: Build Faster Sites in 2026'
heading: 'What Is Astro? The Complete Framework Guide for 2026'
description: 'Master the Astro framework with this hands-on guide. Islands Architecture, Content Collections, View Transitions, and client directives with code examples.'
createDate: 2023-03-16T09:01:43.973Z
updateDate: 2026-04-03
keywords:
  [
    astro framework guide,
    what is astro,
    astro islands architecture,
    astro client directives,
    astro content collections,
    astro vs nextjs,
    astro tutorial 2026,
  ]
categories: [JS, TS, Astro]
featured: false
---

<Image src="astro.jpg" alt="Astro framework logo on a dark starry background" />

**Astro is a web framework that ships zero JavaScript by default, delivering lightning-fast websites through its Islands Architecture.** This Astro framework guide covers everything you need to build content-driven sites — blogs, marketing pages, docs, and e-commerce storefronts. Astro renders HTML at build time and hydrates only the interactive components you choose.

As of 2026, Astro 6.x powers over 1.3 million weekly npm downloads and holds 57K+ GitHub stars. It ranked **#1 in satisfaction** among meta-frameworks in the [State of JS 2025](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/) survey — with a 39% gap over Next.js. In January 2026, [Cloudflare acquired Astro](https://blog.cloudflare.com/astro-joins-cloudflare/), signaling long-term investment in the framework's future.

> **Why Astro over Next.js?** If your site is primarily content (blogs, docs, landing pages), Astro delivers smaller bundles and faster page loads — no React runtime ships unless you need it. Next.js excels for highly interactive apps. Choose the right tool for the job.

## TL;DR

- **Zero JS by default** — Astro renders static HTML; no JavaScript ships unless you opt in
- **Islands Architecture** — hydrate only interactive components, not the entire page
- **UI-agnostic** — use React, Vue, Svelte, Solid, or plain HTML in the same project
- **Content Collections** — type-safe content management with schema validation
- **View Transitions** — native page transitions without a SPA framework
- **Server Islands** — defer server-rendered components with `server:defer`

## Islands Architecture

Astro pioneered the [Islands Architecture](https://docs.astro.build/en/concepts/islands/) for the web. Think of your page as an ocean of static HTML with small "islands" of interactivity.

```md:src/pages/index.astro
---
// Static content — ships as HTML, zero JS
import Header from '../components/Header.astro';
import Newsletter from '../components/Newsletter.tsx';
import Footer from '../components/Footer.astro';
---

<Header />

<main>
  <h1>Welcome to my site</h1>
  <p>This paragraph is static HTML. No JavaScript needed.</p>

  <!-- This React component is an interactive "island" -->
  <Newsletter client:visible />
</main>

<Footer />
```

The `Header`, `Footer`, and all HTML ship as plain markup. Only the `Newsletter` component loads JavaScript — and only when it scrolls into view. This is why Astro sites score 90+ on Lighthouse by default.

## Content Collections and the Content Layer API

[Content Collections](https://docs.astro.build/en/guides/content-collections/) give you type-safe access to Markdown, MDX, JSON, and YAML content. Define a schema, and Astro validates your frontmatter at build time.

```ts:src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
// Output: type-safe collection with validated frontmatter
```

Query your content with full [TypeScript](/blog/discriminated-unions) autocompletion:

```md:src/pages/blog/index.astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
// Output: Array of type-safe blog post objects
---

<ul>
  {posts.map(post => (
    <li>
      <a href={`/blog/${post.id}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

The Content Layer API (Astro 5+) extends this to external sources — CMS platforms, databases, or APIs — using the same type-safe interface. See the [Content Layer docs](https://docs.astro.build/en/guides/content-collections/#the-content-layer) for details.

## View Transitions

Astro provides native [View Transitions](https://docs.astro.build/en/guides/view-transitions/) that create smooth page navigation without client-side routing.

```md:src/layouts/Base.astro
---
import { ViewTransitions } from 'astro:transitions';
---

<html>
  <head>
    <ViewTransitions />
  </head>
  <body>
    <slot />
  </body>
</html>
```

Add per-element animations with the `transition:animate` directive:

```md
<h1 transition:animate="slide">Page Title</h1>
<article transition:animate="fade">Content here</article>
```

> **Gotcha:** Scripts run only on initial page load by default. If you need code to run on every navigation, listen for the `astro:page-load` event:

```html
<script>
  document.addEventListener('astro:page-load', () => {
    // Runs on every page navigation
    console.log('Page loaded');
  });
</script>
```

## Server Islands

[Server Islands](https://docs.astro.build/en/guides/server-islands/) (Astro 5+) let you defer specific components to render on the server at request time while the rest of the page is statically cached.

```md:src/pages/product.astro
---
import ProductInfo from '../components/ProductInfo.astro';
import UserCart from '../components/UserCart.astro';
---

<!-- Static: cached at the CDN edge -->
<ProductInfo />

<!-- Dynamic: rendered per-request on the server -->
<UserCart server:defer>
  <p slot="fallback">Loading cart...</p>
</UserCart>
```

This is perfect for personalized content (user carts, dashboards) on otherwise static pages. The static parts serve instantly from the CDN while the dynamic island streams in.

## Creating Your First Project

```shell
# Create a new Astro 6.x project
npm create astro@latest

# Start the dev server
npm run dev
```

<Image src="astro-dev.jpeg" alt="Astro welcome screen on localhost" />

Astro scaffolds a project with file-based routing, TypeScript support, and zero configuration. Add integrations like React, Tailwind, or MDX with one command:

```shell
npx astro add react mdx
```

## File-Based Routing

Astro uses [file-based routing](https://docs.astro.build/en/guides/routing/). Files in `src/pages/` become pages on your site:

```shell
# Static routes
src/pages/index.astro        → site.com/
src/pages/about.astro         → site.com/about
src/pages/blog/first-post.md  → site.com/blog/first-post
```

Dynamic routes use bracket syntax with `getStaticPaths()`:

```md:src/pages/blog/[slug].astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
// Output: renders a page for each blog post
---

<h1>{post.data.title}</h1>
```

## Astro Component Structure

Every `.astro` component has two parts: the Component Script (frontmatter) and the Component Template.

```md:src/components/Greeting.astro
---
// Component Script — runs at build time
const { name } = Astro.props;
const greeting = `Hello, ${name}!`;
---

<!-- Component Template — outputs HTML -->
<h1>{greeting}</h1>

<style>
  h1 { color: navy; }
</style>
```

Use [slots](https://docs.astro.build/en/basics/astro-components/#slots) to pass child content into components:

```md:src/components/Wrapper.astro
---
const { title } = Astro.props;
---

<div class="wrapper">
  <h1>{title}</h1>
  <slot />  <!-- children render here -->
</div>
```

## Client Directives (Hydration)

By default, UI framework components render as static HTML with **no JavaScript**. Use `client:*` directives to hydrate interactive [islands](https://docs.astro.build/en/concepts/islands/).

| Directive        | Priority | When It Loads                | Use Case                        |
| ---------------- | -------- | ---------------------------- | ------------------------------- |
| `client:load`    | High     | Immediately on page load     | Buttons, modals, forms          |
| `client:idle`    | Medium   | After page finishes loading  | Analytics, non-critical widgets |
| `client:visible` | Low      | When scrolled into viewport  | Below-fold carousels, comments  |
| `client:media`   | Low      | When CSS media query matches | Mobile-only sidebars            |
| `client:only`    | —        | Client-only, no SSR HTML     | Components needing `window`     |

### The #1 Beginner Mistake

"Why isn't my `onClick` working?" — Because you forgot the client directive.

```jsx
// ❌ Wrong — renders as static HTML, no JavaScript runs
<Counter />
```

```jsx
// ✅ Correct — hydrates the component on page load
<Counter client:load />
```

Without a `client:*` directive, your React/Vue/Svelte component renders HTML only. Event handlers, state, and effects won't work. See the [client directives reference](https://docs.astro.build/en/reference/directives-reference/#client-directives).

Use `client:only="react"` when a component has no meaningful server-rendered HTML or depends on browser-only APIs like `window` or `localStorage`.

## Data Fetching

Astro supports two primary data fetching patterns.

**Content Collections** (recommended for local content):

```md
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
// Output: type-safe array of blog posts
---
```

**Global `fetch()`** for external APIs:

```md:src/pages/users.astro
---
const response = await fetch('https://api.github.com/users/octocat');
const user = await response.json();
// Output: { login: "octocat", name: "The Octocat", ... }
---

<h1>{user.name}</h1>
<p>{user.bio}</p>
```

> Before using React components for fetched data, add the [React integration](https://docs.astro.build/en/guides/integrations-guide/react/).

<Image src="astro-dev.gif" alt="Data fetching in Astro" />

**Build-time vs runtime:** In static mode (default), `fetch()` runs at build time. With [SSR enabled](https://docs.astro.build/en/guides/on-demand-rendering/), it runs on each request. Read more in the [data fetching docs](https://docs.astro.build/en/guides/data-fetching/).

## Styles & CSS

Astro scopes `<style>` blocks to their component by default — no CSS leaks:

```md:src/components/Card.astro
<style>
  /* Only applies to <h2> inside this component */
  h2 { color: navy; }
</style>

<h2>Scoped heading</h2>
```

**Tailwind CSS v4** setup uses the Vite plugin (the `@astrojs/tailwind` integration is deprecated in Astro 5+):

```shell
npm install tailwindcss @tailwindcss/vite
```

```ts:astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css:src/styles/global.css
@import 'tailwindcss';
```

Astro also supports [Sass, Less, and CSS Modules](https://docs.astro.build/en/guides/styling/) out of the box.

> **Gotcha:** Styles inside `<style>` blocks cannot target elements inside `<astro-island>` wrappers. Use `:global()` or Tailwind utility classes for hydrated framework components.

## Astro vs Next.js: When to Use Each

Both are excellent frameworks, but they solve different problems.

|                    | Astro                                 | Next.js                            |
| ------------------ | ------------------------------------- | ---------------------------------- |
| **Best for**       | Content sites, blogs, docs, marketing | Interactive apps, dashboards, SaaS |
| **Default JS**     | Zero                                  | Full React runtime                 |
| **Rendering**      | Static-first, opt-in SSR              | SSR-first, opt-in static           |
| **UI framework**   | Any (or none)                         | React only                         |
| **Learning curve** | Low (HTML-first)                      | Medium (React required)            |

**Choose Astro** when your site is mostly content with pockets of interactivity. **Choose Next.js** when every page needs heavy client-side state and routing. You can always use React components in Astro for the interactive parts — get the best of both worlds.

## Common Mistakes

### Forgetting `client:*` directives

```jsx
// ❌ No interactivity — renders as static HTML
<ReactForm />
```

```jsx
// ✅ Hydrated — event handlers and state work
<ReactForm client:load />
```

### Using the deprecated Tailwind integration

```shell
# ❌ Deprecated in Astro 5+
npx astro add tailwind
```

```shell
# ✅ Use the Vite plugin instead
npm install tailwindcss @tailwindcss/vite
```

### Ignoring `astro:page-load` with View Transitions

```html
<!-- ❌ Only runs on first page load -->
<script>
  document.querySelector('.menu').addEventListener('click', toggle);
</script>
```

```html
<!-- ✅ Runs on every navigation -->
<script>
  document.addEventListener('astro:page-load', () => {
    document.querySelector('.menu').addEventListener('click', toggle);
  });
</script>
```

### Fetching content without Content Collections

```md
---
// ❌ Manual glob — no type safety, no validation
const posts = await Astro.glob('../content/blog/*.md');
---
```

```md
---
// ✅ Type-safe with schema validation (Astro 5+)
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
```

## Why Learn Astro in 2026?

Astro ranked **#1 in satisfaction** among meta-frameworks in the [State of JS 2025](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/) survey — a 39% gap over Next.js. With ~1.3M weekly npm downloads and 57K+ GitHub stars, it's one of the fastest-growing web frameworks.

In January 2026, [Cloudflare acquired Astro](https://blog.cloudflare.com/astro-joins-cloudflare/), bringing enterprise backing and deeper edge computing integration. The ecosystem continues to grow with [Starlight](https://starlight.astro.build/) (documentation framework) powering docs for Cloudflare, Sentry, and Stripe.

Whether you're building a personal blog, a [link tree](/blog/linktree), or deploying [images on Vercel](/blog/astro-image-on-vercel), Astro keeps your sites fast by default.

## Useful Links

- [Astro home page](https://astro.build/)
- [Astro documentation](https://docs.astro.build/en/getting-started/)
- [Astro GitHub repository](https://github.com/withastro/astro)
- [Astro integrations directory](https://astro.build/integrations/)
- [Starlight — documentation framework built on Astro](https://starlight.astro.build/)
- [State of JS 2025 — meta-frameworks](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/)
- [Are SPAs better than MPAs? | HTTP 203](https://www.youtube.com/watch?v=ivLhf3hq7eM)

## My Astro Projects

- [Building a Link Tree](/blog/linktree) — my personal linktree with Astro and Vercel
- [Astro Image Component on Vercel](/blog/astro-image-on-vercel) — fixing image optimization for Vercel deployments
