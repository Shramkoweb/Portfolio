---
title: Introducing the new shramko.dev
description: How I built a modern portfolio in 2022, and a list of technologies used
createDate: 2022-08-13T13:31:25.041Z
updateData: 2022-09-25T12:03:53.360Z
keywords: [Website Redesign, Next.js, React, Tailwind, Developer Portfolio, Portfolio, Website]
categories: [Project-Setup, React]
featured: false
---

<Image alt src="my-site.jpeg" priority={true} alt="S.Shramko personal site screenshot"/>

I'm so excited to announce the launch of my brand new website!

For over 2 month, I worked on a complete rewrite of shramko.dev. I just want to give you an overview of the technologies
and libraries I used to make this site .

## Overview

Here are the [cloc](https://github.com/AlDanial/cloc) stats:

```shell
cloc .                                                                                                  
     101 text files.
      87 unique files.                              
      41 files ignored.

T=0.11 s (779.3 files/s, 159045.1 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JSON                             6              0              0          29012
XML                             14              0              0           7191
TypeScript                      63            240             14           2240
Markdown                         7            213              0            661
JavaScript                       5             10              6            201
CSS                              2             35              1            165
YAML                             2              0              0             44
Bourne Shell                     3              9              0             35
SVG                              1              0              0             17
Properties                       1              0              0              4
Text                             1              0              0              3
-------------------------------------------------------------------------------
SUM:                           105            507             21          39573
-------------------------------------------------------------------------------

```

The first commit was
in [3 Jul 2022](https://github.com/Shramkoweb/Portfolio/commit/ce017f5e8e55693f85ec7576de8a82c5b7fad835).

## Key features

- Dark and Light Mode
- [Security headers](https://github.com/Shramkoweb/Portfolio/blob/develop/next.config.js#L13)
  and [CSP](https://github.com/Shramkoweb/Portfolio/blob/develop/next.config.js#L3)
- Featuring post with [meta parsing](https://github.com/Shramkoweb/Portfolio/blame/develop/_posts/dirname-error.md#L7)
- Error page (try going to URL that doesn't exist)
- Mobile and Responsive styling with Tailwind
- Dynamic Open Graph tags and Twitter cards
  from [metadata](https://github.com/Shramkoweb/Portfolio/blob/develop/pages/blog/%5Bslug%5D.tsx#L61)
- Accessibility (try to pass [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/))
- Next.js Api for simple express server
- Realtime updates with SWR

## 💻 Technologies

Here are the primary technologies used in this project:

- [React](https://react.dev/): For the UI
- [Next.js](https://nextjs.org/): Framework for hybrid static & server rendering
- [TypeScript](https://www.typescriptlang.org): Typed JavaScript (necessary for
  any project you plan to maintain)
- [Prisma](https://www.prisma.io): TypeScript ORM with Zero-Cost Type Safety
- [SWR](https://swr.vercel.app/): Cool stale-while-revalidate hook
- [Jest](https://jestjs.io/): JavaScript Testing Framework
- [Testing Library](https://testing-library.com/): Simple and complete testing utilities
- [Tailwind CSS](https://tailwindcss.com): Utility classes for
  consistent/maintainable styling
- [Postcss](https://postcss.org/): CSS processor (pretty much just use it for
  autoprefixer and tailwind)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote): Load mdx content for my site (blog posts)
- [gray-matter](https://github.com/jonschlinkert/gray-matter): Smarter YAML front matter parser
- [Postgres](https://www.postgresql.org/): Most Advanced Open Source SQL Database

Here are the services this site uses:

- [Vercel](https://vercel.com): Platform for frontend frameworks and static sites
- [GitHub Actions](https://github.com/features/actions): Hosted CI pipeline
  service
- [Heroku](https://www.heroku.com/): Reliable and secure PostgreSQL as a service
- [Checkly](https://www.checklyhq.com/): API & E2E monitoring platform
- [Uptimerobot](https://uptimerobot.com/): Uptime monitoring service
- [Snyk](https://snyk.io/): Developer security platform
- [Sentry](https://sentry.io): Error reporting service

## 🍭 The new look

Here's how the [latest design](https://shramkoweb.github.io/homepage/) looked before I updated it.

This is a simple <abbr title="HyperText Markup Language">HTML</abbr> and <abbr title="Cascading Style Sheets,">
CSS</abbr> site.
No <abbr title="JavaScript">JS</abbr> and frameworks 😂.

<Image src="old-site.jpg" alt="S.Shramko personal old site screenshot"/>

## 🚀 Deploy

Each commit triggers a build and environment (Production | Preview) creation.
And then we start multiple steps:

- ESLint & TypeScript: Linting the project for simple mistakes and Type checking
- Checkly: Running end-to-end tests
- Vercel: Building and deploy site

Once ESLint, TypeScript, Checkly, and the Build all successfully complete, then we can deploy site.

<Image src="deploy.jpeg" alt="Deploy process screenshot on Vercel"/>

## MDX Compilation

`mdx-bundler` & `next-mdx-remote` allows you to extend [remark](https://github.com/remarkjs/remark)
and [rehype](https://github.com/rehypejs/rehype), providing external plugins to hook into the compilation process.

It helps me to convert a link to an external link and one for wrapping images
with [Next Image](https://nextjs.org/docs/api-reference/next/image).

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
t’s usually one of the first things you’d want to do after setting up an existing project or getting started with a new
one.
Without monitoring, it will be challenging to detect issues in your application or how to resolve them.

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

When combining Prisma with Next.js, you can skip the [CRUD](https://www.codecademy.com/article/what-is-crud) boilerplate
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

My code coverage on 28 August:

```shell
------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|-------------------
All files                     |   79.52 |    73.33 |   71.42 |   81.98 |                   
 components/blog-post-preview |     100 |       50 |     100 |     100 |                   
  blog-post-preview.tsx       |     100 |       50 |     100 |     100 | 29                
  index.ts                    |     100 |      100 |     100 |     100 |                   
 components/footer            |     100 |      100 |     100 |     100 |                   
  get-copyright.ts            |     100 |      100 |     100 |     100 |                   
 components/post-reaction     |   96.77 |       80 |     100 |   96.66 |                   
  post-reaction.tsx           |     100 |      100 |     100 |     100 |                   
  use-feedback-reducer.ts     |   93.33 |    66.66 |     100 |   92.85 | 18                
 components/view-counter      |     100 |       50 |     100 |     100 |                   
  view-counter.tsx            |     100 |       50 |     100 |     100 | 25                
 lib                          |     100 |      100 |     100 |     100 |                   
  fetcher.ts                  |     100 |      100 |     100 |     100 |                   
  ga.ts                       |     100 |      100 |     100 |     100 |                   
  types.ts                    |     100 |      100 |     100 |     100 |                   
 lib/posts                    |   34.37 |        0 |   23.07 |    42.3 |                   
  api.ts                      |   34.61 |        0 |   33.33 |    37.5 | 13-48,53-58,63-65 
  utils.ts                    |   33.33 |      100 |       0 |     100 |                   
 pages                        |   85.18 |      100 |      80 |   83.33 |                   
  404.tsx                     |     100 |      100 |     100 |     100 |                   
  blog.tsx                    |   77.77 |      100 |   71.42 |      75 | 101-105           
------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 5 passed, 5 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        2.23 s
Ran all test suites.
```

## Next.js

Next's framework allows you to build scalable, performant React code without the configuration hassle.

In my company, we use it for [CleanMyMac JP](https://cleanmymac.jp/).

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

## Acknowledgements

- The design was inspired by [Lee Robinson](https://github.com/leerob)

## Conclusion

I can't tell you how much I've learned building this website. 🤓

I'm excited about the new design. And I just had fun doing it. I hope you enjoy it too!

The project is developing and still has many unimplemented features, you can see or suggest
them [here](https://github.com/Shramkoweb/Portfolio/issues).
