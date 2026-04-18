---
title: 'I Fixed the Wrong Thing and Found the Real Bug'
heading: 'Total Build Time Lies'
description: I spotted a build regression, shipped what I thought was the fix, and the numbers didn't move. Turns out the metrics were lying too — Next.js reports batch timing, not page timing.
createDate: 2026-04-17T22:00:00.000Z
keywords:
  [
    Next.js build performance,
    build time regression,
    Shiki highlighting performance,
    static generation optimization,
    Vercel build logs,
  ]
categories: [Opinion, Tools, Vercel]
featured: false
---

## The number that didn't move

I pushed a routine update to my portfolio — swapped Prettier for [oxfmt](https://github.com/nicolo-ribaudo/oxfmt),
added [`@shikijs/transformers`](https://shiki.style/packages/transformers) for better syntax highlighting. Stack is
Next.js 16, Turbopack, Prisma, Sentry, Vercel, pnpm. Nothing unusual.

Checked the Vercel build log. Total build time: 48 seconds. Ran two more deploys to be sure. 47 seconds. 48 seconds.
Flat line.

I almost closed the tab.

Then I scrolled down to the per-page breakdown. Completely different story.

## Two changes, opposite directions

The listing pages — homepage, blog index, snippets — got much faster:

| Route       | Before   | After  |
| ----------- | -------- | ------ |
| `/`         | 7,046 ms | 487 ms |
| `/blog`     | 7,116 ms | 664 ms |
| `/snippets` | 7,046 ms | 547 ms |

Roughly a 13x improvement. But the total build time didn't budge. Something else got worse by the same amount.

That something was `/blog/category/[category]`.

| Metric           | Before       | After        |
| ---------------- | ------------ | ------------ |
| Route total      | ~15.8 s      | ~45.8 s      |
| Slowest category | ~1,000 ms    | ~6,600 ms    |
| Typical range    | 900–1,100 ms | 500–6,600 ms |

Six categories jumped from about a second to 6.6 seconds each: `html`, `clean-code`, `project-setup`, `node`, `react`,
`advanced-react`. The rest stayed put. A 20-second improvement on listing pages masked a 30-second regression on
category pages. Near-perfect cancellation.

An accidental coincidence that made the top-line number useless.

## The wrong fix

Three deploys. Same six slow categories. Same order of magnitude. Not noise.

The six categories had something in common — they were the six with the most posts. Whatever was slow, it scaled with
post count.

My hypothesis: the category page was fetching full post content — markdown body included — when it only needed metadata.
A listing page shows titles, descriptions, and links. It doesn't render post bodies. If the data-fetching function
pulled full content, it was doing unnecessary work.

I checked the code. `getPostsByCategory` called `getPosts`, which reads every post file and returns the body. The
category page never used the body. I switched it to `getPostsMetadata` — slug, title, description. No body. Two files,
28 lines changed.

Deployed. Checked the build log.

Numbers didn't move. Same six categories. Same 6,600ms each.

## The actual problem

I stared at the build log longer and noticed something I'd skipped over. Look at these two routes:

```bash
/blog/[slug]                     (43168 ms)
  /blog/ai-seo-audit             (6663 ms)
  /blog/apollo-graphql-certification (6663 ms)

/blog/category/[category]        (45771 ms)
  /blog/category/html            (6663 ms)
  /blog/category/clean-code      (6663 ms)
```

Blog posts and category pages both showing exactly 6,663ms. Not approximately — _exactly_. Different routes, different
code paths, identical timing.

Next.js generates static pages in batches. The per-page time in the build log is the batch wall-clock time, not the
individual page time. Every page in a batch gets assigned the same number — the slowest page in that batch.

My category pages were fast. They were just stuck in the same batch as Shiki-heavy blog post compilations. The metadata
fix was correct code hygiene — don't fetch content you don't need — but it couldn't change the batch timing because the
category pages weren't the bottleneck in their batch. The blog posts were.

## The real bottleneck

So why were the blog posts slow? I dug into the Shiki integration.

Every `compileMDX` call created a new `rehypeShiki` plugin instance. Each instance initialized a fresh Shiki
highlighter — loading the WASM engine, two themes, and grammars for every bundled language. 75 pages = 75 highlighter
initializations.

The fix: use `@shikijs/rehype/core` with a single pre-created highlighter at module level.

```typescript
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';

const highlighterPromise = getSingletonHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: Object.keys(bundledLanguages),
});

const highlightCache = new Map();
```

Themes and language grammars load once. A shared `Map` caches highlighted code blocks across pages. The pre-created
highlighter gets passed directly to each `compileMDX` call instead of creating a new one.

Same Vercel infrastructure, same 1 worker:

| Metric                    | Before     | After      |
| ------------------------- | ---------- | ---------- |
| Static generation total   | 13.4 s     | 6.7 s      |
| `/blog/category` route    | 45,771 ms  | 7,396 ms   |
| Category per-page         | 6,663 ms   | 461 ms     |
| `/blog/[slug]` route      | 43,168 ms  | 27,770 ms  |

The category route dropped from 45.8s to 7.4s. Individual categories went from 6,663ms to 461ms. Static generation cut in half.

## Three things I got wrong

First, I thought the category page was the problem. It wasn't — it was innocent bystander in a slow batch.

Second, I thought `getPostsMetadata` vs `getPosts` was the fix. It was good code, but it didn't address the timing. I
was looking at the right page and the wrong metric.

Third, I assumed per-page timing in the build log meant per-page timing. It means per-batch timing. Every page in a
batch gets the same number. If you're comparing page performance across builds, you're comparing batch composition and
scheduling as much as you're comparing the page itself.

## The numbers you actually need

Total build time is the number everyone watches. It's on the dashboard. It's in the Slack notification. It's the number
you compare week over week.

It's also an aggregate, and aggregates lie by averaging. My total build time held steady at 48 seconds while a 30-second
per-route regression hid behind an equally sized improvement somewhere else.

And when I looked at the per-page numbers, those lied too — just differently. They told me which pages were slow. They
didn't tell me those pages were _fast_, just stuck behind slow neighbors.

I ended up fixing the right thing for the wrong reason. I'll take it.
