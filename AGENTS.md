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
| Testing    | Jest + Testing Library                                         |
| Tooling    | oxlint, oxfmt, commitlint, pnpm                                |

## Setup

Prereqs: Node 24.x (see `.nvmrc`), pnpm 10.x, Postgres database for any DB-touching feature.

```bash
pnpm install            # also runs prisma generate via postinstall
cp .env.example .env    # each var is documented inline in .env.example
pnpm dev                # http://localhost:3000
```

## The verify loop

**Two commands. Use the right one.**

- `pnpm verify` — fast (~1 s). Runs `lint`, `format:check`, `typecheck`, `test:ci`. The pre-push hook calls this. Use during tight iteration.
- `pnpm verify:full` — slower (~30–60 s). Adds `next build` on top. Matches what CI runs. **Run this before opening a PR.**

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
- **Branches:** `feat/`, `fix/`, `chore/`, `ci/`, `docs/`, `refactor/`, `test/`, `perf/`.
- **Formatting:** `oxfmt`. Pre-commit hook auto-formats staged JS/TS. Don't fight it.
- **Before pushing:** the git pre-push hook (`.git-hooks/pre-push`) runs `pnpm verify` automatically. Don't bypass with `--no-verify`.
- **Before opening a PR:** run `pnpm verify:full` (adds `build`). PR template has a checkbox for this.

## Where things live

- **Env vars** are documented in `.env.example` with descriptions and where to obtain each value.
- **Secrets** live in Vercel project settings (`Sentry*`, `DATABASE_URL`, `GITHUB_TOKEN`). Read-only for agents — don't try to set them.
- **The Sentry public DSN** (`NEXT_PUBLIC_SENTRY_DSN`) is intentionally exposed to the client; this is by Sentry design, not a leak.
- **Specs and plans** for non-trivial work are in `docs/superpowers/specs/` and `docs/superpowers/plans/`. Both are gitignored — they live locally per-developer.

## Don't do

- Don't bypass git hooks with `--no-verify`.
- Don't commit `.env` (only `.env.example`).
- Don't hand-edit `pnpm-lock.yaml` — let `pnpm install` regenerate it.
- Don't push directly to `main`. PRs only.
- Don't add a dependency without a clear justification — this repo deliberately stays lean.
- Don't write `*.md` files outside what an issue requires; this project does not use docs-as-features.

## Notes for specific tools

- **Claude Code:** `CLAUDE.md` at the repo root is a symlink to this file. Edit `AGENTS.md`, not `CLAUDE.md`.
- **Pages Router / Sentry gap:** there is no `pages/_error.tsx` with `Sentry.captureUnderscoreErrorException`, so SSR errors from the Pages Router don't reach Sentry. Don't fix this inline as a side effect of unrelated work — open a focused PR for it.
