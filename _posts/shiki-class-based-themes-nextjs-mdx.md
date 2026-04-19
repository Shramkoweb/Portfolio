---
title: 'How to Use Shiki Class-Based Themes with next-mdx-remote in Next.js'
heading: Shiki Class-Based Themes
description: Replace Shiki's bloated inline dual-theme styles with class-based CSS extraction using transformerStyleToClass and next-mdx-remote in Next.js.
createDate: 2026-04-19T22:00:00.000Z
keywords:
  [
    Shiki dark mode Next.js,
    transformerStyleToClass,
    next-mdx-remote syntax highlighting,
    Shiki dual theme class CSS,
    code highlighting dark light mode,
    Shiki inline styles performance,
  ]
categories: [ JS, Node, Tutorial ]
featured: false
---

When your blog has 30+ code-heavy posts, Shiki's default dual-theme output dumps two sets of inline styles on
every `<span>` — one for light, one for dark. That's a lot of repeated CSS baked into your HTML. I switched to
`transformerStyleToClass` and cut the per-page highlighting payload by deduplicating those styles into a single CSS
block. Here's how I wired it up.

## The problem with inline dual themes

Shiki's standard dual-theme mode writes both color values directly onto each token:

```html
<!-- ❌ Default: inline styles on every span -->
<span style="color:#24292e;--shiki-dark:#e1e4e8">const</span>
```

Multiply that across hundreds of tokens and two themes. Every page carries duplicated color strings that can't be
cached or shared between posts.

## Switch to class-based output

`transformerStyleToClass` from `@shikijs/transformers` replaces inline styles with hashed class names. You create one
transformer instance at module level — this matters because the cache and the CSS accumulate across all posts during a
single build:

```typescript
// lib/scripts/compiler.ts
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { transformerStyleToClass } from '@shikijs/transformers';
import { serialize } from 'next-mdx-remote/serialize';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';

const highlighterPromise = getSingletonHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: Object.keys(bundledLanguages),
});

// Module-level: accumulates class→variable mappings across all posts
const transformer = transformerStyleToClass();
const highlightCache = new Map();

export async function compileMDX(content: string) {
  const highlighter = await highlighterPromise;

  const mdx = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypeShikiFromHighlighter,
          highlighter,
          {
            themes: { light: 'github-light', dark: 'github-dark' },
            defaultColor: false,
            transformers: [transformer],
            cache: highlightCache,
          },
        ],
      ],
    },
  });

  return { mdx, shikiCSS: transformer.getCSS() };
}
```

Two things to notice. First, `defaultColor: false` tells Shiki not to pick a winner — both themes live as CSS custom
properties on the generated classes. Second, the `highlightCache` skips re-processing identical code blocks across
posts, so the transformer must be a singleton to keep its internal class-to-style map complete.

## Inject the CSS per page

In your page component, `getStaticProps` passes `shikiCSS` alongside the serialized MDX. Drop it into `<Head>` so the
styles exist before any code block renders:

```tsx
// pages/blog/[slug].tsx
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { data, content } = await getPostBySlug(params?.slug);
  const { mdx, shikiCSS } = await compileMDX(content);

  return { props: { data, content: mdx, shikiCSS } };
}

function ArticlePage({ content, shikiCSS, data }: ArticlePageProps) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        {shikiCSS && <style dangerouslySetInnerHTML={{ __html: shikiCSS }} />}
      </Head>
      <MDXRemote {...content} components={MDXComponents} />
    </>
  );
}
```

Your theme toggle handles the rest. In dark mode, generated classes apply `--shiki-dark` values; in light mode,
`--shiki-light`. No JavaScript runs at highlight time.

## One gotcha

If you create a *new* transformer instance per `compileMDX` call, posts compiled after a cache hit return empty CSS —
the cache skips the transformer entirely, so a fresh instance never sees those tokens. Keep the transformer at module
scope.

## Related

- [Total Build Time Lies](/blog/build-time-lies) — how I found and fixed a Shiki performance regression in this same
  codebase
