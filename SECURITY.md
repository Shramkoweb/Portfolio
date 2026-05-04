# Security Policy

## Supported versions

Only the version currently deployed at <https://shramko.dev> is supported. There is no LTS branch.

## Reporting a vulnerability

Please **do not open a public GitHub issue** for security problems.

Two reporting channels, in order of preference:

1. **GitHub private vulnerability advisory** — preferred. Use the "Report a vulnerability" button on the [Security tab](https://github.com/Shramkoweb/Portfolio/security).
2. **Email:** `shramko.dev@gmail.com` with subject `Security: <one-line summary>`.

## What to expect

- Acknowledgement within 7 days (best-effort, solo maintainer).
- Investigation timeline depends on severity. Critical issues that affect deployed code take priority.
- Credit in the fix commit / release notes if you'd like (mention in your report).

## Out of scope

- Content under `_posts/` and `_snippets/` (not executable code).
- Missing security headers on demo or staging subdomains.
- Reports from automated scanners with no proof-of-concept.
- Issues in third-party services I integrate with (Vercel, Sentry, GitHub) — please report to the upstream vendor.

## Existing controls

- GitHub native secret scanning is enabled (public repo, automatic).
- CodeQL workflow runs on every push and PR (`.github/workflows/codeql.yml`).
- Dependencies are updated weekly via Renovate; `pnpm audit` runs in CI.
