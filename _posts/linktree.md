---
title: 'Build a Link Tree with Astro.js and Vercel (2026 Guide)'
heading: 'Build Your Own Link Tree with Astro.js and Vercel'
description: 'Build a custom link tree with Astro.js and deploy it on Vercel. Step-by-step tutorial with TypeScript, analytics setup, and performance optimization tips.'
createDate: 2024-08-30T10:00:00.000Z
updateDate: 2026-05-06
keywords:
  [
    build link tree Astro,
    Astro Vercel deploy tutorial,
    custom link tree website,
    Astro static site tutorial,
    Astro beginner project,
    Astro Vercel analytics,
  ]
categories: [Astro, Vercel, Tutorial]
featured: false
---

<Image src="linktree.jpeg" alt="Custom link tree built with Astro.js" priority />

**1 hour** of work and I had my own link tree with Astro.js and Vercel on a custom subdomain — faster than any Linktree
plan, and fully under my control.

Check out the final result: [links.shramko.dev](https://links.shramko.dev/)

## TL;DR

We're building a link tree website with Astro.js and deploying it to Vercel — a simple beginner project that takes about
an hour.

- **Stack**: Astro 6.2 + TypeScript + Vercel
- **Result**: A static site with 100/100 Lighthouse scores
- **Features**: Typed link data, image optimization, Vercel Analytics, custom subdomain

## Why Astro.js?

I [wrote a comprehensive guide about Astro](/blog/astro), and its zero-JS-by-default approach makes it perfect for a
link tree. A link tree is static content — no React runtime needed.

Astro ranked [#1 in satisfaction](https://2025.stateofjs.com/en-US/libraries/meta-frameworks/) among meta-frameworks in
the State of JS 2025 survey. For a project like this, the results speak for themselves:

<Image src="lighthouse.png" alt="100/100 Lighthouse scores for links.shramko.dev" />

**Why the scores are high:** Astro ships zero JavaScript by default. Your link tree is pure HTML and CSS — no framework
bundle, no hydration delay. Combined with Vercel's edge CDN, the page loads in under 200ms.

## Setting Up the Project

```bash
# Create a new Astro project
pnpm create astro@latest
```

I use [pnpm](/blog/pnpm) as my package manager, but `npm` or `yarn` work fine too.

## Data Structure with TypeScript

Define a typed interface for your links and store them in a JSON file:

```typescript:types.ts
interface SocialLink {
  url: string;
  icon: string;
  title: string;
  description: string;
}

interface UserData {
  name: string;
  profession: string;
  links: SocialLink[];
}
```

```json:data/user.json
{
  "name": "Serhii Shramko",
  "profession": "Senior Software Engineer",
  "links": [
    {
      "url": "https://shramko.dev/",
      "icon": "url",
      "title": "Personal Portfolio",
      "description": "All my latest news and blog posts"
    },
    {
      "url": "https://github.com/Shramkoweb",
      "icon": "github",
      "title": "Github Profile",
      "description": "My Github"
    }
  ]
}
```

This approach separates data from markup — add, remove, or reorder links by editing JSON, not HTML.

## Layout and Components

Astro's [file-based routing](/blog/astro#file-based-routing) keeps the structure simple. One page, a few components:

```jsx:pages/index.astro
---
import Layout from '../layouts/Layout.astro';
import Profile from '../components/Profile.astro';
import List from '../components/List.astro';
---

<Layout title="Link tree | Serhii Shramko">
  <main class="container" id="container">
    <Profile />
    <List />
  </main>
</Layout>
```

Each link is a typed component that renders an icon, title, and description:

```jsx:components/Link.astro
---
interface Props {
  icon: string;
  title: string;
  description: string;
  url: string;
}

const { icon, title, description, url } = Astro.props;
---

<a href={url} class="link" target="_blank" rel="noopener noreferrer">
  <span class="link__icon">
    {icon === 'github' && <Github />}
    {icon === 'linkedin' && <Linkedin />}
    {icon === 'url' && <Url />}
    {icon === 'youtube' && <Youtube />}
  </span>

  <div class="link__content">
    <h2 class="link__title">{title}</h2>
    <p class="link__description">{description}</p>
  </div>
</a>
```

Astro lets you create components from inline SVG. Each icon is its own `.astro` file — clean, tree-shakeable, and no
icon library needed:

```jsx:components/icons/Github.astro
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
</svg>
```

## Optimizing inline SVG icons

The icon components above ship every SVG attribute the browser doesn't strictly need — XML namespaces, defaults, whitespace. Astro 6.2 introduces `experimental.svgOptimizer`, which runs SVGO over SVGs imported as components at build time:

```typescript:astro.config.mjs
import { defineConfig, svgoOptimizer } from 'astro/config';

export default defineConfig({
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
```

The optimizer only kicks in on `.svg` imports — `.astro` files with hand-written SVG markup pass through. To benefit, save each icon as `Github.svg` and import it as a component instead. Across four social icons the savings are modest (a few hundred bytes), so it's only worth migrating if you're already moving away from inline `.astro` icons.

## SEO and Meta Tags

Even a simple link tree benefits from proper meta tags. Add OpenGraph and social sharing tags in your layout:

```jsx:layouts/Layout.astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content="Serhii Shramko — links to portfolio, blog, GitHub, and social profiles." />

    <!-- OpenGraph -->
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://links.shramko.dev/" />
    <meta property="og:image" content="https://links.shramko.dev/og-image.png" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

Since Astro outputs static HTML, search engines get a fully-rendered page with zero layout shift — great
for [Core Web Vitals and SEO](/blog/ai-seo-audit).

## Dynamic OG image with Satori

The static `og-image.png` works, but it goes stale the moment you add or rename a link. Astro 6.2 added `experimental_getFontFileURL` to `astro:assets` — the missing piece for build-time OG generation that doesn't reach into undocumented internals. Combine it with [Satori](https://github.com/vercel/satori) (HTML → SVG) and [Sharp](https://www.npmjs.com/package/sharp) (SVG → PNG) and the image rebuilds with the rest of your site.

Configure a font in `astro.config.mjs` (see the [Astro Fonts docs](https://docs.astro.build/en/guides/fonts/)) and install the runtime dependencies:

```bash
pnpm add satori satori-html sharp
```

Add the route at `src/pages/og.png.ts`:

```typescript:src/pages/og.png.ts
import type { APIRoute } from 'astro';
import { fontData, experimental_getFontFileURL } from 'astro:assets';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';

import userData from '../../data/user.json';

export const prerender = true;

export const GET: APIRoute = async (context) => {
  const fontPath = fontData['--font-roboto'][0]?.src[0]?.url;

  if (fontPath === undefined) {
    throw new Error('Roboto font not configured — check astro.config.mjs');
  }

  const fontUrl = experimental_getFontFileURL(fontPath, context.url);
  const fontBuffer = await fetch(fontUrl).then((res) => res.arrayBuffer());

  const svg = await satori(
    html`<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:1200px;height:630px;background:#0f172a;color:white;font-family:Roboto;">
      <span style="font-size:64px;font-weight:700;">${userData.name}</span>
      <span style="font-size:32px;opacity:0.7;margin-top:16px;">${userData.profession}</span>
    </div>`,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Roboto', data: fontBuffer, weight: 400, style: 'normal' },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
```

Point your layout's `og:image` at `https://links.shramko.dev/og.png` — or keep both, with the static file as a fallback for crawlers that hit the URL before the build settles. The `experimental_` prefix means the API may shift; pin your Astro version if this lives in production.

## Analytics

Add [Vercel Web Analytics](https://vercel.com/docs/analytics) to track page views without slowing down your site. The
analytics script is only 1.1KB.

For a static site, you only need the `@astrojs/vercel` adapter if you want to use Vercel services like analytics:

```bash
pnpm add @astrojs/vercel
```

```typescript:astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
```

> **Note:** `output` defaults to `'static'` in Astro — no need to set it explicitly. A link tree doesn't need SSR.

<Image src="astro-analytics.jpg" alt="Vercel Analytics dashboard showing link tree traffic" />

Enable Analytics in your Vercel dashboard under Project Settings → Analytics.

## Deploying to Vercel

[Vercel auto-detects Astro projects](https://vercel.com/docs/frameworks/frontend/astro) and configures the build
settings:

1. Push your project to a GitHub repository
2. Connect your Vercel account to GitHub
3. Click "New Project" and select your repository
4. Vercel detects Astro and suggests the correct build settings
5. Click "Deploy" — done

## Custom Domain

<Image src="vercel-domain.jpg" alt="Custom subdomain configuration on Vercel dashboard" />

1. In Vercel project settings, go to the **Domains** section
2. Add your subdomain: `links.shramko.dev`
3. Vercel automatically configures the DNS records

For a subdomain, add a CNAME record pointing to `cname.vercel-dns.com` in your domain registrar.

## Common Mistakes

### Using SSR when static is enough

I [did this mistake](https://github.com/Shramkoweb/linkt-tree/commit/aa6ec4eb384007efe924ce55265919e9ae135d0f)
before =)

```typescript
// ❌ Unnecessary server-side rendering for a link tree
export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

```typescript
// ✅
export default defineConfig({
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
```

### Not optimizing images

Use Astro's `<Image />` component instead of `<img>` for automatic optimization. If you hit the `[MissingSharp]` error
on Vercel, see my [guide to fixing it](/blog/astro-image-on-vercel).

### Missing OpenGraph meta tags

Without OG tags, links shared on social media show a blank preview. Always include `og:title`, `og:image`, and
`og:description` in your layout.

## Related Articles

- [Astro Framework Guide](/blog/astro) — comprehensive introduction to Astro 6
- [Fix: Could not find Sharp in Astro.js](/blog/astro-image-on-vercel) — resolve the MissingSharp error on Vercel
