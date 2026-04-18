---
title: 'Presenting the Revamped shramko.dev: Explore the Exciting Updates!'
heading: 'Introducing the new shramko.dev'
description: A deep dive into building my developer portfolio with Next.js 16, React 19, and Tailwind CSS 4. Learn about the tech stack, design decisions, and features behind 900+ commits.
createDate: 2022-08-13T13:31:25.041Z
updateDate: 2026-04-11T12:00:00.000Z
keywords:
  [
    Website Redesign,
    Next.js,
    React,
    Tailwind,
    Developer Portfolio,
    Portfolio,
    Website,
  ]
categories: [Project-Setup, React, Vercel]
featured: false
---

<Image src="my-site.jpeg" priority={true} alt="Screenshot of the redesigned shramko.dev homepage showing dark theme with featured blog posts" />

What started as a two-month rewrite in the summer of 2022 has turned into a nearly four-year engineering project — 940+ commits, 33 blog posts, 41 code snippets, and a full-stack architecture that I keep pushing forward with every new version of the JavaScript ecosystem.

Here is an overview of what powers shramko.dev today.

## Overview

The [cloc](https://github.com/AlDanial/cloc) stats, counting only git-tracked files:

```shell
cloc --vcs=git .
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
YAML                             4           2444              0           9422
TypeScript                     111            823             24           7012
Markdown                        74           2107              8           6693
JavaScript                       8             37             17            448
CSS                              2             47              1            229
JSON                             6              0              0            204
XML                              2              0              0            110
Text                             3             12              0             81
Prisma Schema                    1              5              0             23
SQL                              1              9              6             21
SVG                              1              0              0             17
INI                              1              2              0             11
Bourne Shell                     2              2              0              4
-------------------------------------------------------------------------------
SUM:                           216           5488             56          24275
-------------------------------------------------------------------------------
```

> Update: Lines of code on <time dateTime="2026-04-11">11 April 2026</time>

TypeScript is the dominant application language at ~7 000 lines. Markdown, which represents every blog post and snippet, already rivals it — a ratio I consider healthy for a content-first site.

The first commit was
in [3 Jul 2022](https://github.com/Shramkoweb/Portfolio/commit/ce017f5e8e55693f85ec7576de8a82c5b7fad835).

## Key features

- Dark and Light mode via [next-themes](https://github.com/pacocoursey/next-themes) with class-based Tailwind switching
- [Security headers](https://github.com/Shramkoweb/Portfolio/blob/develop/next.config.js#L19) including a strict
  [Content Security Policy](https://github.com/Shramkoweb/Portfolio/blob/develop/next.config.js#L3), HSTS with preload, and a locked-down Permissions-Policy
- Featured posts with [frontmatter meta parsing](https://github.com/Shramkoweb/Portfolio/blame/develop/_posts/dirname-error.md#L7), reading time, and auto-generated table of contents
- Custom 404 error page
- Fully responsive styling with Tailwind CSS 4
- Dynamic [Open Graph images](https://github.com/Shramkoweb/Portfolio/blob/develop/pages/api/og.tsx) generated at the edge with `@vercel/og`
- Accessibility targeting [WCAG 2.1 and WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/)
- Six REST API endpoints backed by PostgreSQL — views, reactions, waitlist, dashboard, GitHub stats, and OG image generation
- Real-time client updates with [SWR](https://swr.vercel.app/)
- RSS feed at `/feed.xml` with proper cache headers and CDATA escaping
- Schema.org structured data — BlogPosting, TechArticle, BreadcrumbList, FAQPage, and WebSite schemas
- Post reactions (heart, beer, trophy) with optimistic UI via a custom `useReducer`
- Lighthouse CI on every deploy preview with enforced [performance budgets](https://github.com/Shramkoweb/Portfolio/blob/develop/.github/lighthouse-budget.json) (LCP < 2.5 s, TBT < 1 s, CLS < 0.1)
- Auto-generated sitemap with depth-based priority and frontmatter-driven `lastmod` dates

## 💻 Technologies

The core stack:

- [React 19](https://react.dev/): The UI layer
- [Next.js 16](https://nextjs.org/): Framework for hybrid static and server rendering (Pages Router)
- [TypeScript 6](https://www.typescriptlang.org): Strict mode, path aliases, ES2022 target
- [Prisma 7](https://www.prisma.io): Type-safe ORM with the `@prisma/adapter-pg` driver
- [SWR 2](https://swr.vercel.app/): Stale-while-revalidate data fetching
- [Jest 30](https://jestjs.io/) + [Testing Library](https://testing-library.com/): Unit and component testing with V8 coverage
- [Tailwind CSS 4](https://tailwindcss.com): Utility-first styling with `@tailwindcss/postcss` and the typography plugin
- [next-mdx-remote 6](https://github.com/hashicorp/next-mdx-remote): MDX compilation with remark/rehype pipelines
- [gray-matter](https://github.com/jonschlinkert/gray-matter): YAML frontmatter parsing
- [PostgreSQL](https://www.postgresql.org/): The database behind views, reactions, and the waitlist
- [pnpm 10](https://pnpm.io/): Package manager — I wrote a [post about migrating to it](/blog/pnpm)
- [Node.js 24](https://nodejs.org/): Runtime, pinned via `.nvmrc`
- [lucide-react](https://lucide.dev/): Icon library, tree-shaken via `optimizePackageImports`

The services running behind the scenes:

- [Vercel](https://vercel.com): Hosting, preview deploys, edge functions, and analytics
- [GitHub Actions](https://github.com/features/actions): CI pipeline — lint, test, and Lighthouse workflows
- [Sentry](https://sentry.io/welcome/): Error tracking and performance monitoring (10% trace sampling) via Next.js instrumentation hooks
- [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights): Real-user metrics

## 🍭 The new look

Here is how the [original design](https://shramkoweb.github.io/homepage/) looked before the rewrite.

A plain <abbr title="HyperText Markup Language">HTML</abbr> and <abbr title="Cascading Style Sheets">CSS</abbr> page.
No <abbr title="JavaScript">JS</abbr>, no frameworks 😂.

<Image src="old-site.jpg" alt="Previous version of shramko.dev hosted on GitHub Pages showing resume layout with experience and tech stack sections"/>

## 🚀 Deploy

Every commit triggers a Vercel build and creates either a Production or Preview environment. Three GitHub Actions workflows run in parallel:

> I have a post about [ESLint with TypeScript](/blog/eslint-with-typescript)

- **Lint** — [oxlint](https://oxc.rs/docs/guide/usage/linter) for fast, zero-config linting across the entire codebase
- **Test** — Jest 30 runs the full suite in CI mode
- **Lighthouse CI** — Three runs per URL (`/`, `/blog`, `/about`) against the preview deploy, with results posted as a sticky PR comment

All three must pass before the site ships to production.

<Image src="deploy.jpeg" alt="Vercel deployment overview showing 100 scores for Virtual Experience, First Contentful Paint, Largest Contentful Paint, Cumulative Layout Shift, and Total Blocking Time"/>

## MDX Compilation

Every blog post and snippet is an MDX file compiled at build time through [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote). The compilation pipeline threads content through remark and rehype, turning raw Markdown into richly interactive React:

```tsx
import { serialize } from ‘next-mdx-remote/serialize’;
import remarkGfm from ‘remark-gfm’;
import rehypeSlug from ‘rehype-slug’;
import rehypeCodeTitles from ‘rehype-code-titles’;
import rehypeAutolinkHeadings from ‘rehype-autolink-headings’;
import rehypeShiki from ‘@shikijs/rehype’;

export const compileMDX = async (content: string) =>
  serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeShiki,
          {
            themes: {
              light: ‘github-light’,
              dark: ‘github-dark’
            },
            defaultColor: false
          }
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: [‘anchor’]
            }
          }
        ]
      ],
      format: ‘mdx’
    }
  });
```

A separate `extractHeadingsFromMarkdown` function parses heading structure from the raw Markdown to build the auto-generated table of contents — no extra runtime dependency required.

```tsx
import { MDXComponents } from ‘@/components/mdx-components’;

<div className="w-full mt-4 prose dark:prose-dark max-w-none">
  <MDXRemote {...content} components={MDXComponents} />
</div>
```

## Monitoring with Sentry

Sentry is wired in through two layers. The server side uses Next.js instrumentation hooks to capture errors and filter out network noise like `ECONNRESET` and `ETIMEDOUT`. Events without a stacktrace are dropped before they leave the server — a simple `beforeSend` guard that keeps the dashboard clean:

```typescript
import * as Sentry from ‘@sentry/nextjs’;

export function register() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: process.env.APP_RELEASE_VERSION,
    sendDefaultPii: true,
    tracesSampleRate: 0.1,
    ignoreErrors: [
      ‘ECONNRESET’,
      ‘ECONNREFUSED’,
      ‘ETIMEDOUT’,
      ‘UND_ERR_CONNECT_TIMEOUT’,
    ],
    beforeSend(event) {
      if (!event.exception?.values?.some((e) => e.stacktrace)) {
        return null;
      }
      return event;
    },
  });
}

export const onRequestError = Sentry.captureRequestError;
```

The client-side instrumentation filters out a different class of noise — browser extensions, Safari WebKit quirks, `ResizeObserver` loops, and Google Translate proxy URLs — the kind of false positives that would otherwise drown the real signal.

> The Next.js config uses a ["dispatch table" pattern](/blog/dispatch-tables) to select the right Sentry build options per environment, wrapping the config with `withSentryConfig` only in production.

## Database and Prisma

[Prisma 7](https://www.prisma.io/nextjs) with the `@prisma/adapter-pg` driver powers three models — page view tracking, post reactions, and a waitlist:

```groovy
generator client {
  provider = "prisma-client"
  output   = "../generated"
}

datasource db {
  provider = "postgresql"
}

model views {
  slug  String @id @db.VarChar(128)
  count BigInt @default(1)
}

model reactions {
  id    Int    @id @default(autoincrement())
  slug  String @db.VarChar(128)
  type  String @db.VarChar(32)
  count BigInt @default(0)

  @@unique([slug, type])
}

model waitlist {
  id        Int      @id @default(autoincrement())
  email     String   @unique @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at")
}
```

The `views` model uses `upsert` — if the slug exists, increment; otherwise, create. The `reactions` model supports three types (heart, beer, trophy) with a composite unique constraint on `[slug, type]`, and the API handles increments inside a Prisma transaction.

### Querying Data

```typescript
const views = await prisma.views.upsert({
  where: { slug },
  create: {
    slug,
  },
  update: {
    count: {
      increment: 1,
    },
  },
});
```

## Testing

Tests run on every push and every pull request through [GitHub Actions](https://github.com/Shramkoweb/Portfolio/blob/develop/.github/workflows/tests.yml). The suite has grown from 9 test suites and 37 tests in 2022 to 23 suites and 158 tests today, covering API routes, components, utilities, content parsing, schema generation, and page rendering.

Current coverage on <time dateTime="2026-04-17">17 April 2026</time>:

```shell
------------------------------|---------|----------|---------|---------|-------------------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------|---------|----------|---------|---------|-------------------------------
All files                     |   93.28 |    83.26 |   86.17 |   93.28 |
 components/blog-post-preview |     100 |     37.5 |     100 |     100 |
  blog-post-preview.tsx       |     100 |    33.33 |     100 |     100 | 18-30
  index.ts                    |     100 |       40 |     100 |     100 | 1
 components/categories        |     100 |    57.14 |     100 |     100 |
  categories.tsx              |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |       40 |     100 |     100 | 1
 components/footer            |     100 |      100 |     100 |     100 |
  get-copyright.ts            |     100 |      100 |     100 |     100 |
 components/mobile-menu       |     100 |      100 |     100 |     100 |
  icons.tsx                   |     100 |      100 |     100 |     100 |
  mobile-menu.tsx             |     100 |      100 |     100 |     100 |
 components/post-reaction     |   99.21 |    73.33 |     100 |   99.21 |
  index.ts                    |     100 |       40 |     100 |     100 | 1
  post-reaction.tsx           |     100 |      100 |     100 |     100 |
  use-feedback-reducer.ts     |   97.82 |    83.33 |     100 |   97.82 | 25
 components/search-input      |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |      100 |     100 |     100 |
  search-input.tsx            |     100 |      100 |     100 |     100 |
 components/share-button      |     100 |      100 |     100 |     100 |
  share-button.tsx            |     100 |      100 |     100 |     100 |
 components/theme-changer     |   94.73 |    57.14 |     100 |   94.73 |
  index.ts                    |     100 |       40 |     100 |     100 | 1
  theme-changer.tsx           |   94.59 |    66.66 |     100 |   94.59 | 32-33
 components/view-counter      |   88.23 |     62.5 |     100 |   88.23 |
  index.ts                    |     100 |       40 |     100 |     100 | 1
  view-counter.tsx            |      88 |    72.72 |     100 |      88 | 20-21,35,41-43
 lib                          |     100 |    98.27 |   75.75 |     100 |
  constants.ts                |     100 |      100 |     100 |     100 |
  feed.ts                     |     100 |      100 |     100 |     100 |
  fetcher.ts                  |     100 |      100 |     100 |     100 |
  github.ts                   |     100 |      100 |     100 |     100 |
  routes.ts                   |     100 |      100 |   53.33 |     100 |
  schema.ts                   |     100 |    95.23 |     100 |     100 | 69
  types.ts                    |     100 |      100 |     100 |     100 |
  utils.ts                    |     100 |      100 |      80 |     100 |
 lib/posts                    |   92.62 |    84.61 |    87.5 |   92.62 |
  api.ts                      |   89.93 |    73.91 |      75 |   89.93 | 18-19,67-68,109-117,157-159
  utils.ts                    |     100 |      100 |     100 |     100 |
 lib/scripts                  |      55 |      100 |      50 |      55 |
  compiler.ts                 |      55 |      100 |      50 |      55 | 9-26
 pages                        |     100 |      100 |     100 |     100 |
  404.tsx                     |     100 |      100 |     100 |     100 |
 pages/api                    |   96.63 |     93.1 |     100 |   96.63 |
  dashboard.ts                |    91.3 |    83.33 |     100 |    91.3 | 42-45
  github.ts                   |     100 |      100 |     100 |     100 |
  waitlist.ts                 |     100 |      100 |     100 |     100 |
 pages/api/reactions          |     100 |    93.33 |     100 |     100 |
  [slug].ts                   |     100 |    93.33 |     100 |     100 | 88
 pages/api/views              |     100 |      100 |     100 |     100 |
  [slug].ts                   |     100 |      100 |     100 |     100 |
 pages/blog                   |   73.63 |     62.5 |      50 |   73.63 |
  index.tsx                   |   73.63 |     62.5 |      50 |   73.63 | 46,96-101,138,142-150,178-218
------------------------------|---------|----------|---------|---------|-------------------------------

Test Suites: 23 passed, 23 total
Tests:       158 passed, 158 total
Snapshots:   0 total
Time:        1.444 s
Ran all test suites.
```

> Sometimes I use [Browserstack for cross-browser testing](/blog/cross-browser-testing).

## Next.js

The site runs on Next.js 16 with React 19 — still on the Pages Router, which remains a first-class citizen in the framework. A few reasons Next.js continues to be the right foundation:

- **Static Generation + Server Rendering**: Every blog post and snippet is pre-rendered at build time via `getStaticProps` and `getStaticPaths`, while API routes handle dynamic data
- **One-click deploys**: Deep Vercel integration means every push generates a preview URL
- **SEO built in**: Auto-generated sitemaps, structured data, and dynamic OG images with zero extra infrastructure
- **Ecosystem depth**: The React and Node.js ecosystems provide a package for nearly every need, from MDX compilation to Prisma database access
- **Performance defaults**: SWC compilation, automatic code splitting, image optimization with configurable quality levels

<Image src="framework.jpeg" width={400} className="mt-4 mb-8 mx-auto rounded-lg" alt="Two-button meme: a sweating man choosing between 'Learn yet another framework' and 'Lose my job'"/>

> I wrote articles about another framework — Astro [here](/blog/astro) and [here](/blog/linktree) 😆.

Since launching, I have also [run an AI-powered SEO audit](/blog/ai-seo-audit) across the entire blog to improve discoverability.

## Code quality

The project enforces quality at multiple checkpoints:

- **[oxlint](https://oxc.rs/docs/guide/usage/linter)** — a fast, Rust-based linter that replaced ESLint with zero-config setup and 136 rules
- **Prettier** for consistent formatting (single quotes, trailing commas, 80-char width)
- **Conventional Commits** enforced by [commitlint](https://commitlint.js.org/) via a `commit-msg` git hook
- **Pre-push hook** that runs the full linter before code leaves the local machine
- **Browserslist** set to `baseline widely available`, which targets browsers with broad cross-engine support

## Acknowledgements

- The design was inspired by [Lee Robinson](https://github.com/leerob)

## Conclusion

What I have learned building this site over four years would fill a book. The stack has evolved from plain HTML to Next.js 16 with React 19. The database grew from nothing to three Prisma models. The test suite went from 37 tests to 158. And the content — 33 posts, 41 snippets — keeps growing, partly thanks to the [resources I recommend to every developer](/blog/useful-articles). 🤓

The project is still developing. You can see open features or suggest new ones [here](https://github.com/Shramkoweb/Portfolio/issues).
