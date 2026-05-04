# Contributing

This is a personal, opinionated portfolio. Contributions are welcome but not the primary mode of development. If you're considering a non-trivial change, open an issue first to align on scope.

## Setup

See [README.md](README.md) for prerequisites and bootstrap steps.

## Branch naming

Use one of these prefixes (matches existing git history):

- `feat/<short-name>` — new feature
- `fix/<short-name>` — bug fix
- `chore/<short-name>` — maintenance / non-functional
- `ci/<short-name>` — CI configuration
- `docs/<short-name>` — documentation only
- `refactor/<short-name>` — internal restructuring
- `test/<short-name>` — tests only
- `perf/<short-name>` — performance work

## Commits

Conventional Commits (Angular convention) is enforced by `commitlint.config.ts`. Rules:

- Lowercase subject, ≤ 50 characters, no trailing period.
- Type required (one of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`).
- Imperative mood: `add`, not `added`.

Examples: `feat: add OG image generator`, `fix(api): correct slug normalization`.

## Pre-PR checks

Run `pnpm verify:full` locally and confirm it exits 0. This runs:

```
oxlint  →  oxfmt --check  →  tsc --noEmit  →  jest --ci  →  next build
```

The PR template has a checkbox for this. Without it, CI will fail.

## Pull request description

- Explain the **why**, not just the what.
- Flag breaking changes explicitly.
- If the change has a spec under `docs/superpowers/specs/`, link it. Specs are local-only (gitignored), so paste the relevant excerpt rather than a path-only link.
