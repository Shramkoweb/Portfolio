---
title: "Presenting the Revamped shramko.dev: Explore the Exciting Updates!"
heading: "Introducing the new shramko.dev"
description: A deep dive into building my developer portfolio with Next.js, React, and Tailwind CSS. Learn about the tech stack, design decisions, and features.
createDate: 2022-08-13T13:31:25.041Z
updateDate: 2025-05-16T14:58:41.719Z
keywords: [ Website Redesign, Next.js, React, Tailwind, Developer Portfolio, Portfolio, Website ]
categories: [ Project-Setup, React, Vercel ]
featured: false
---

<Image src="my-site.jpeg" priority={true} alt="Screenshot of the redesigned shramko.dev homepage showing dark theme with featured blog posts" />

I'm so excited to announce the launch of my brand-new website!

For over 2 month, I worked on a complete rewrite of shramko.dev. I just want to give you an overview of the technologies
and libraries I used to make this site.

## Overview

Here are the [cloc](https://github.com/AlDanial/cloc) stats:

```shell
cloc --exclude-dir=node_modules .
      358 text files.
      329 unique files.                              
      191 files ignored.

T=0.07 s (2903.5 files/s, 389492.6 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                     143           6476           7897          13153
YAML                             3           2172              0           8278
Markdown                        56           1420              4           4523
TypeScript                      86            461             17           4177
XML                             12              0              0           1008
JSON                            19              0              0            271
CSS                              2             40              1            190
diff                             1              0             20             23
SVG                              1              0              0             17
Prisma Schema                    1              2              0             12
INI                              1              2              0             11
Bourne Shell                     2              2              0              4
Text                             2              0              0              4
-------------------------------------------------------------------------------
SUM:                           329          10575           7939          31671
-------------------------------------------------------------------------------
```

> Update: Line of Code on <time dateTime="2025-05-16">16 May 2025</time>

The first commit was
in [3 Jul 2022](https://github.com/Shramkoweb/Portfolio/commit/ce017f5e8e55693f85ec7576de8a82c5b7fad835).

## Key features

- Dark and Light Mode
- [Security headers](https://github.com/Shramkoweb/Portfolio/blob/develop/next.config.js#L13)
  and [CSP](https://github.com/Shramkoweb/Portfolio/blob/develop/next.config.js#L3)
- Feature post with [meta parsing](https://github.com/Shramkoweb/Portfolio/blame/develop/_posts/dirname-error.md#L7)
- Error page with custom 404 page
- Mobile and Responsive styling with Tailwind
- Dynamic Open Graph tags and Twitter cards
  from [metadata](https://github.com/Shramkoweb/Portfolio/blob/develop/pages/blog/%5Bslug%5D.tsx#L61)
- Accessibility (try to pass [WCAG 2.1 and WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/))
- Next.js Api for simple express server
- Realtime updates with SWR

## 💻 Technologies

Here are the primary technologies used in this project:

- [React](https://react.dev/): For the UI
- [Next.js](https://nextjs.org/): Framework for hybrid static & server rendering
- [TypeScript](https://www.typescriptlang.org): Typed JavaScript (necessary for any project you plan to maintain)
- [Prisma](https://www.prisma.io): TypeScript ORM with Zero-Cost Type Safety
- [SWR](https://swr.vercel.app/): Cool stale-while-revalidate hook
- [Jest](https://jestjs.io/): JavaScript Testing Framework
- [Testing Library](https://testing-library.com/): Simple and complete testing utilities
- [Tailwind CSS](https://tailwindcss.com): Utility classes for consistent/maintainable styling
- [Postcss](https://postcss.org/): CSS processor (pretty much just use it for autoprefixer and tailwind)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote): Load mdx content for my site (blog posts)
- [gray-matter](https://github.com/jonschlinkert/gray-matter): Smarter YAML front matter parser
- [Postgres](https://www.postgresql.org/): Most Advanced Open Source SQL Database
- [pnpm](https://pnpm.io/): Fast, disk space efficient package manager and i have [post about it](/blog/pnpm)

Here are the services this site uses:

- [Vercel](https://vercel.com): Platform for frontend frameworks and static sites
- [GitHub Actions](https://github.com/features/actions): Hosted CI pipeline service
- [Heroku](https://www.heroku.com/): Reliable and secure PostgreSQL as a service
- [Checkly](https://www.checklyhq.com/): API & E2E monitoring platform
- [Uptimerobot](https://uptimerobot.com/): Uptime monitoring service
- [Snyk](https://snyk.io/): Developer security platform
- [Sentry](https://sentry.io/welcome/): Error reporting service

## 🍭 The new look

Here's how the [latest design](https://shramkoweb.github.io/homepage/) looked before I updated it.

This is a simple <abbr title="HyperText Markup Language">HTML</abbr> and <abbr title="Cascading Style Sheets,">
CSS</abbr> site.
No <abbr title="JavaScript">JS</abbr> and frameworks 😂.

<Image src="old-site.jpg" alt="S.Shramko personal old website screenshot"/>

## 🚀 Deploy

Each commit triggers a build and environment (Production | Preview) creation.
And then we start multiple steps:

> I have post about [ESLint with TypeScript](/blog/eslint-with-typescript)

- ESLint & TypeScript: Linting the project for simple mistakes and Type checking
- Checkly: Running end-to-end tests
- Vercel: Building and deploy website to production and other environments

Once ESLint, TypeScript, Checkly, and the Build all successfully complete, then we can deploy site.

<Image src="deploy.jpeg" alt="Deploy process screenshot on Vercel"/>

## MDX Compilation

`mdx-bundler` & `next-mdx-remote` allows you to extend [remark](https://github.com/remarkjs/remark)
and [rehype](https://github.com/rehypejs/rehype), providing external plugins to hook into the compilation process.

It helps me to convert a link to an external link and one for wrapping images
with [Next Image](https://nextjs.org/docs/pages/api-reference/components/image).

How does it look:

```tsx
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';

export const compileMDX = async (content: string) => serialize(content, {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
    format: 'mdx',
  },
});
```

```tsx
import { MDXComponents } from '@/components/mdx-components';

<div className="w-full mt-4 prose dark:prose-dark max-w-none">
  <MDXRemote {...content} components={MDXComponents} />
</div>
```

## Monitoring with Sentry

Monitoring is an essential part of development.
It’s usually one of the first things you’d want to do after setting up an existing project or getting started with a new
one. Without monitoring, it will be challenging to detect issues in your application or how to resolve them.

> There example of some kind of ["dispatch table" pattern](/blog/dispatch-tables).

```tsx
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
    browsersListForSwc: true,
    legacyBrowsers: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

// dispatch table pattern
const nextConfigByEnv = {
  production: withSentryConfig(nextConfig, {
    silent: true
  }),
  development: nextConfig
}

module.exports = nextConfigByEnv[process.env.NODE_ENV];
```

## Database and Prisma

[Prisma](https://www.prisma.io/nextjs) makes database access easy. With auto-generated and type-safe queries based on
your database schema, it's easier than ever to manage your data.
Whether you have an existing database or you're starting from scratch, Prisma has you covered.

When combining Prisma with Next.js, you can skip
the [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) boilerplate
and directly query the database.
Less code means less bugs.

### Heroku Postgres

Heroku Postgres gives me all the benefits of PostgreSQL without having to spin up and maintain the databases ourselves.
And it is [easy integrate with PhpStorm](https://www.jetbrains.com/help/phpstorm/how-to-connect-to-heroku-postgres.html)
.

### Type Safety

```sql
model
User {
  id       String  @id @default(cuid())
  email    String  @unique
  password String
  name     String?
}
```

```typescript
type User = {
  id: string
  email: string
  password: string
  name: string | null
}
```

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

As a developer, you know how important tests are for any production-level project.
Writing tests takes some time, but they will help you in the long run to solve problems in the codebase.

I also [integrate these tests](https://github.com/Shramkoweb/Portfolio/blob/develop/.github/workflows/tests.yml) into
GitHub Actions, so that whenever I deploy to production or make a pull request, tests will run automatically.

My code coverage on <time dateTime="2022-08-28">28 August 2022</time>:

> Update: Test coverage on <time dateTime="2025-05-16">16 May 2025</time>

```shell
------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|-------------------
All files                     |   93.45 |    73.33 |   93.61 |    94.4 |                   
 components/blog-post-preview |     100 |       50 |     100 |     100 |                   
  blog-post-preview.tsx       |     100 |       50 |     100 |     100 | 27                
  index.ts                    |     100 |      100 |     100 |     100 |                   
 components/categories        |     100 |      100 |     100 |     100 |                   
  categories.tsx              |     100 |      100 |     100 |     100 |                   
  index.ts                    |     100 |      100 |     100 |     100 |                   
 components/footer            |     100 |      100 |     100 |     100 |                   
  get-copyright.ts            |     100 |      100 |     100 |     100 |                   
 components/post-reaction     |   96.77 |       75 |     100 |   96.66 |                   
  index.ts                    |     100 |      100 |     100 |     100 |                   
  post-reaction.tsx           |     100 |      100 |     100 |     100 |                   
  use-feedback-reducer.ts     |   93.33 |    66.66 |     100 |   92.85 | 21                
 components/search-input      |     100 |      100 |     100 |     100 |                   
  index.ts                    |     100 |      100 |     100 |     100 |                   
  search-input.tsx            |     100 |      100 |     100 |     100 |                   
 components/view-counter      |     100 |       50 |     100 |     100 |                   
  index.ts                    |     100 |      100 |     100 |     100 |                   
  view-counter.tsx            |     100 |       50 |     100 |     100 | 25                
 lib                          |   83.33 |      100 |      75 |     100 |                   
  fetcher.ts                  |     100 |      100 |     100 |     100 |                   
  ga.ts                       |     100 |      100 |     100 |     100 |                   
  types.ts                    |     100 |      100 |     100 |     100 |                   
  utils.ts                    |      70 |      100 |      50 |     100 |                   
 lib/posts                    |   96.42 |      100 |   94.73 |   95.45 |                   
  api.ts                      |   94.73 |      100 |   91.66 |   94.28 | 89-90             
  utils.ts                    |     100 |      100 |     100 |     100 |                   
 pages                        |     100 |      100 |     100 |     100 |                   
  404.tsx                     |     100 |      100 |     100 |     100 |                   
 pages/blog                   |      75 |       50 |      80 |   72.22 |                   
  index.tsx                   |      75 |       50 |      80 |   72.22 | 119-124           
------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 9 passed, 9 total
Tests:       37 passed, 37 total
Snapshots:   0 total
Time:        0.822 s, estimated 1 s
Ran all test suites.
```

> Sometimes I use [Browserstack for cross browsing testing](/blog/cross-browser-testing).

## Next.js

Next's framework allows you to build scalable, performant React code without the configuration hassle.

Quick list of why Next.js has been so good for me:

- Zero Config: Automatic compilation and bundling. Optimized for production from the start
- SSG and SSR: It allows you to render your content in different ways, depending on your application's use case. These
  include pre-rendering with Server-side Rendering or Static Generation, and updating or creating content at runtime
  with Incremental Static Regeneration
- Deploy: You can deploy in a few clicks to [Vercel](https://vercel.com)
- SEO: Automatic Static Optimization & Head Component
- React ecosystem: Wide range of tools and npm packages
- Out of the box support: Through webpack, Next provides developers with out-of-the-box support for asset compilation,
  hot reloading and code splitting, which can further speed up development

<Image src="framework.jpeg" width={400} className="mt-4 mb-8 mx-auto rounded-lg" alt="A meme in which a person tries to choose between two red buttons."/>

> I wrote new article about another framework - Astro [here](/blog/astro) and [here](/blog/linktree) 😆.

## Acknowledgements

- The design was inspired by [Lee Robinson](https://github.com/leerob)

## Conclusion

I can't tell you how much I've learned building this website, partly thanks to the [resources I recommend to every developer](/blog/useful-articles). 🤓

I'm excited about the new design. And I just had fun doing it. I hope you enjoy it too!

The project is developing and still has many unimplemented features, you can see or suggest
them [here](https://github.com/Shramkoweb/Portfolio/issues).
