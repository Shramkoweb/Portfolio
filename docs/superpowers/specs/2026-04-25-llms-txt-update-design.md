# llms.txt Ecosystem Update — Design Spec

## Goal

Update `public/llms.txt` and create `public/llms-full.txt` to reflect the current project state (35 blog posts, 43 snippets, 7+ pages, projects, social links) following the [llmstxt.org](https://llmstxt.org/) specification. Approach B: spec-compliant with semantic enrichment in the full version.

## Current State

- `llms.txt` exists but is stale — missing 5 blog posts, 15 snippets, 3 pages, social links, and resources (RSS, sitemap, resume)
- No `llms-full.txt` exists
- Total gap: 28 items/features undocumented

## Specification Compliance

Both files follow the llmstxt.org spec:
- H1 header (required)
- Blockquote summary (optional, used)
- Body text (optional, used in llms-full.txt only)
- H2-delimited sections with `- [Title](url): description` link lists
- "Optional" H2 section for skippable content

## File 1: `public/llms.txt` (Concise Index)

### Structure

```
# Serhii Shramko — Senior Frontend Engineer

> Personal portfolio and blog of Serhii Shramko, a Senior Software Engineer
> specializing in frontend development with React, TypeScript, and Next.js.
> Built with Next.js, TypeScript, and Tailwind CSS. Open source.

## Pages

- [About](https://shramko.dev/about): Professional experience, skills, and background
- [Blog](https://shramko.dev/blog): Articles on React, TypeScript, Next.js, and web development
- [Snippets](https://shramko.dev/snippets): Production-ready code snippets for common tasks
- [Dashboard](https://shramko.dev/dashboard): Real-time GitHub and development stats
- [Gear](https://shramko.dev/gear): Development hardware and software setup
- [Bookmarks](https://shramko.dev/bookmarks): Curated developer bookmarks
- [Learning](https://shramko.dev/learning): Learning resources and progress

## Projects

- [Quizlet QuickList](https://shramko.dev/quizlet-list): Chrome extension for creating and managing Quizlet study lists
- [Udemy Progress Reset](https://shramko.dev/udemy-reset-progress): Chrome extension to reset progress on Udemy courses

## Blog Posts

All 35 posts listed alphabetically by title:
- [Title](https://shramko.dev/blog/slug): Frontmatter description

## Code Snippets

All 43 snippets listed alphabetically by title:
- [Title](https://shramko.dev/snippets/slug): Frontmatter description

## Social & Professional

- [GitHub](https://github.com/shramkoweb): Source code and open-source projects
- [LinkedIn](https://www.linkedin.com/in/shramko-dev/): Professional profile and recommendations
- [Product Hunt](https://www.producthunt.com/@shramko_dev): Product launches

## Optional

- [RSS Feed](https://shramko.dev/feed.xml): Blog post feed for readers and aggregators
- [Sitemap](https://shramko.dev/sitemap.xml): Complete URL listing for crawlers
- [Resume PDF](https://shramko.dev/static/serhii_shramko_frontend.pdf): Downloadable resume
```

### Content Rules

- Each blog post and snippet uses its frontmatter `description` as the link note
- Alphabetical sort by title within flat lists
- No topic grouping in the concise version — flat lists for maximum parseability

## File 2: `public/llms-full.txt` (Detailed Version)

### Structure Differences from llms.txt

1. **Extended blockquote** — same as llms.txt
2. **Body paragraph** — 2-3 sentences covering: tech stack (Next.js, TypeScript, Tailwind CSS, MDX), content types available (blog posts on web development, reusable code snippets, project showcases), and that content is written in Markdown with rich frontmatter metadata
3. **Blog posts grouped by topic** under sub-sections (H2 per category)
4. **Snippets grouped by domain** under sub-sections (H2 per category)
5. **Each item includes keywords** from frontmatter

### Blog Post Topic Groups (H2 sections)

| Section Title | Slugs (count) |
|---|---|
| Blog Posts: React | react-rerender, react-hooks-pitfalls, react-elements-children, react-flexbox-grid (4) |
| Blog Posts: TypeScript | discriminated-unions, generic-type-parameters, eslint-with-typescript (3) |
| Blog Posts: JavaScript | js-arrays, dispatch-tables, for-in-vs-for-of, expressions-statements, the-early-return-pattern-in-javascript, javascript-naming-conventions (6) |
| Blog Posts: Next.js & Frameworks | introducing-the-new-shramko.dev, shiki-class-based-themes-nextjs-mdx, build-time-lies, astro, astro-image-on-vercel, linktree (6) |
| Blog Posts: Node.js & Tooling | dirname-error, nvm, pnpm, npm-semantic-versioning, postgres-connect-url (5) |
| Blog Posts: Git & DevOps | conventional-commits, gitignore-is-not-enough, how-to-create-ssh-keys (3) |
| Blog Posts: CSS & Design | class-naming-conventions, cross-browser-testing (2) |
| Blog Posts: Productivity & Opinion | ai-seo-audit, unsubscribe-immediately, useful-articles, phpstorm-allow-network (4) |
| Blog Posts: Web Fundamentals | difference-between-absolute-and-relative-url, apollo-graphql-certification (2) |

**Total: 35 posts across 9 categories**

### Snippet Domain Groups (H2 sections)

| Section Title | Slugs (count) |
|---|---|
| Snippets: TypeScript Patterns | branded-types, satisfies-operator, template-literal-types, type-predicates, distributive-omit (5) |
| Snippets: React Hooks | use-local-storage, use-click-outside, use-media-query, use-toggle-react-hook, use-has-mounted (5) |
| Snippets: JavaScript Utilities | debounce, throttle, deep-clone, sleep, random, generate-range, group-by, remove-duplicates-array, sort-an-array-of-objects-in-javascript (9) |
| Snippets: DOM & Browser | copy-to-clipboard, detect-caps-lock, is-element-in-viewport, lazy-loading-images-with-intersection-observer, move-cursor, scroll-driven-animations, window-crypto (7) |
| Snippets: URL & String Validation | is-absolute-url, is-email-valid-regex, how-to-get-the-current-url-with-javascript, how-to-remove-query, how-to-capitalize-first-letter-of-string-in-javascript, check-if-character-is-a-letter-in-javascript (6) |
| Snippets: CSS | common-css-classes, css-selection, visually-hidden (3) |
| Snippets: Data & Storage | local-storage, intl-numberformat, set-methods, compare-dates (4) |
| Snippets: DevOps & Backend | environment, how-to-check-if-file-exists-node, countries-sql, postgres-install-macos (4) |

**Total: 43 snippets across 8 categories**

### Item Format in llms-full.txt

```markdown
- [Title](url): Frontmatter description
  Keywords: keyword1, keyword2, keyword3
```

Keywords are pulled directly from frontmatter `keywords` field, comma-separated. This gives LLMs semantic search signals beyond the description.

### Optional Section

Same as llms.txt: RSS, Sitemap, Resume PDF.

## Content Source

All descriptions and keywords are pulled from existing frontmatter — no new content is authored. This ensures consistency with SEO meta tags already on the site.

## Out of Scope

- Auto-generation script (can be a follow-up)
- `.md` versions of pages (llmstxt.org secondary proposal)
- `llms-ctx.txt` / `llms-ctx-full.txt` expanded context files
