# AGENTS.md

Brief for AI coding agents (Claude Code, Codex, Cursor, Copilot, Factory). Humans should read [README.md](README.md) first.

## Project at a glance

`shramko.dev` is a personal portfolio + blog + digital garden. Single deployment target: Vercel.

| Layer      | Tools                                                          |
| ---------- | -------------------------------------------------------------- |
| Framework  | Next.js 16 (Pages Router), React 19                            |
| Language   | TypeScript (strict)                                            |
| Styling    | Tailwind CSS v4                                                |
| Content    | MDX via `next-mdx-remote`, Shiki for syntax highlighting       |
| Data       | Prisma 7, Postgres (Neon in prod)                              |
| Fetch      | SWR                                                            |
| Monitoring | Sentry, Vercel Analytics, Speed Insights, Checkly, UptimeRobot |
| Testing    | Jest + Testing Library, Playwright (local Chromium)            |
| Tooling    | oxlint, oxfmt, commitlint, pnpm                                |

## Setup

Prereqs: Node 24.x (see `.nvmrc`), pnpm at the version pinned in `packageManager` (`package.json`), Postgres database for any DB-touching feature.

```bash
pnpm install            # also runs prisma generate via postinstall
cp .env.example .env    # each var is documented inline in .env.example
pnpm dev                # http://localhost:3000
```

## The verify loop

**Three commands. Use the right one.**

- `pnpm verify` — fast (~3 s). Runs `lint`, `format:check`, `typecheck`, `test:ci`. The pre-push hook calls this. Use during tight iteration.
- `pnpm verify:full` — slower (~10 s). Adds `next build` on top. Matches what CI runs. **Run this before opening a PR.**
- `pnpm verify:all` — complete local check. Runs `verify:full`, then all Playwright behavior and visual regression tests. Install Chromium once with `pnpm exec playwright install chromium`; no database or Docker is required for the browser tests.

**Success criterion:** before claiming work is done, `pnpm verify:full` exits 0.

## Common tasks

| Goal                      | Command                               |
| ------------------------- | ------------------------------------- |
| Start dev server          | `pnpm dev`                            |
| Run a single test file    | `pnpm exec jest path/to/file.test.ts` |
| Run a single test by name | `pnpm exec jest -t "test name"`       |
| Production build          | `pnpm build`                          |
| Format only (write)       | `pnpm format`                         |
| Lint only (auto-fix)      | `pnpm lint:fix`                       |
| Type check only           | `pnpm typecheck`                      |
| Scaffold a blog post      | `pnpm article`                        |
| Regenerate Prisma client  | `pnpm exec prisma generate`           |
| Check CSP inline hashes   | `pnpm csp:check` (after `pnpm build`) |

## Publishing a blog post

`pnpm article` scaffolds the file. The rest is manual, and two of these are easy to forget because nothing fails when you skip them.

| Step                       | Where                   | Notes                                                                                                                                                                                 |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Post body                  | `_posts/<slug>.md`      | MDX. Frontmatter needs `title`, `heading`, `description`, `createDate`, `keywords`, `categories`, `featured`.                                                                         |
| Categories                 | same frontmatter        | Must exist in the `PostCategory` enum in `lib/types.ts`, or the build throws at `getStaticProps`.                                                                                     |
| Images                     | `public/static/images/` | Reference as `<Image src="name.png" alt="..." />` — the path prefix is added by the MDX component. Add `inverted` for diagrams on a transparent background so dark mode flips them.   |
| Video                      | `public/static/videos/` | Plain `<video>` works in MDX. Use `muted` + `playsInline`, or autoplay is blocked.                                                                                                    |
| Update notes               | in the post body        | Text added after publishing goes in `<Update date="2026-05-06">…</Update>`, which renders it as a labelled note. Keep the frontmatter `updateDate` in sync.                           |
| **`public/llms.txt`**      | hand-maintained         | **Add the post.** Entries are sorted alphabetically by title; the text after the colon is the frontmatter `description`. Deliberately no post counts — they went stale on every post. |
| **`public/llms-full.txt`** | hand-maintained         | Same, in that file's own format.                                                                                                                                                      |
| `public/sitemap.xml`       | generated               | `next-sitemap` rewrites it during `pnpm build`. Never hand-edit.                                                                                                                      |

**Watch out:** a colon inside an unquoted frontmatter value breaks the YAML parse. `description: Build a second brain: transcribe...` silently turns into a different key and every field after it disappears, which surfaces as `Cannot read properties of undefined` in the post filters. Quote any value containing a colon.

Only one or two posts should carry `featured: true` at a time. Adding one usually means clearing another.

## Repo layout

| Path                | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `pages/`            | Next.js Pages Router routes + API endpoints (`pages/api/`) |
| `components/`       | Shared React components                                    |
| `lib/`              | Utilities, schema, GitHub/Sentry helpers, scripts          |
| `_posts/`           | Blog post MDX sources                                      |
| `_snippets/`        | Code-snippet MDX sources                                   |
| `prisma/`           | Prisma schema + migrations                                 |
| `public/`           | Static assets                                              |
| `styles/`           | Global CSS + Tailwind directives                           |
| `__tests__/`        | Page-level and API-route tests                             |
| `__mocks__/`        | Manual Jest mocks                                          |
| `docs/superpowers/` | Local-only specs and plans (gitignored)                    |

## Conventions

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) Angular convention. Enforced by `commitlint.config.ts`. Lowercase subject, ≤ 50 chars, no period. Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Commit bodies:** default to no body. The subject line should carry the change on its own. Add a body only when something genuinely can't be read off the diff — a non-obvious reason for the approach, a rejected alternative, a link to the upstream issue. Never restate what the diff already shows.
- **Code comments:** same rule. Comment the _why_, not the _what_ — a constraint, a workaround, a gotcha that would otherwise get "cleaned up" by the next reader. If the code already says it, don't repeat it in prose.
- **Branches:** `feat/`, `fix/`, `chore/`, `ci/`, `docs/`, `refactor/`, `test/`, `perf/`. Convention only — nothing enforces this, unlike commit messages.
- **Formatting:** `oxfmt`. Pre-commit hook auto-formats staged JS/TS. Don't fight it.
- **Before pushing:** the git pre-push hook (`.git-hooks/pre-push`) runs `pnpm verify` automatically. Don't bypass with `--no-verify`.
- **Before opening a PR:** run `pnpm verify:full` (adds `build`). PR template has a checkbox for this.

## Where things live

- **Env vars** are documented in `.env.example` with descriptions and where to obtain each value.
- **Secrets** live in Vercel project settings (`Sentry*`, `DATABASE_URL`, `GITHUB_TOKEN`). Read-only for agents — don't try to set them.
- **The Sentry public DSN** (`NEXT_PUBLIC_SENTRY_DSN`) is intentionally exposed to the client; this is by Sentry design, not a leak.
- **Specs and plans** for non-trivial work go in `docs/superpowers/specs/` and `docs/superpowers/plans/` — create either when you need it. The whole `docs/superpowers/` tree is gitignored and lives locally per-developer.

## Don't do

- Don't bypass git hooks with `--no-verify`.
- Don't commit `.env` (only `.env.example`).
- Don't hand-edit `pnpm-lock.yaml` — let `pnpm install` regenerate it.
- Don't push directly to `main`. PRs only.
- Don't add a dependency without a clear justification — this repo deliberately stays lean.
- Don't write `*.md` files outside what an issue requires; this project does not use docs-as-features.
- Don't hand-edit `public/sitemap.xml` — `next-sitemap` regenerates it on build.
- Don't run `pnpm build` while `pnpm dev` is running; they fight over `.next` and the build dies on a missing `_app.js`.

## Notes for specific tools

- **Claude Code:** `CLAUDE.md` at the repo root is a symlink to this file. Edit `AGENTS.md`, not `CLAUDE.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
