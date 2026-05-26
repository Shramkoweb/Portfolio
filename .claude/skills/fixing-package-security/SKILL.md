---
name: fixing-package-security
description: Use when running pnpm audit, patching CVEs in dependencies, or after dependency updates — verifies every fix empirically and prunes stale pnpm overrides that updated parents already satisfy
---

# Fixing Package Security (pnpm)

## Overview

Two jobs, one workflow:

1. **Patch new vulnerabilities** flagged by `pnpm audit`.
2. **Prune stale overrides** that updated parents now satisfy on their own.

**Core rule: never trust theory. Remove the override, re-resolve, re-audit.** A `pnpm.overrides` entry is only justified if the audit reproduces a vulnerability without it OR the parent's range can't reach a safe version.

## When to use

- After `pnpm update` / Renovate / Dependabot bumps merged
- Whenever `pnpm audit` reports findings
- Periodic hygiene pass on `pnpm.overrides` (this repo accumulates them)
- After upgrading a major framework dep (next, react, prisma, jest, @sentry/\*)

## Workflow

```
1. Baseline audit         → pnpm audit --json
2. Patch new findings     → add override OR bump parent
3. Audit existing overrides → remove → re-resolve → re-audit each one
4. Final gate             → pnpm install && pnpm verify:full && pnpm audit
```

## Step 1 — Baseline audit

```bash
pnpm audit --json | jq '.metadata.vulnerabilities, [.advisories[] | {id, module: .module_name, severity, vulnerable_versions, patched_versions, paths: [.findings[].paths[]]}]'
```

Capture the advisory list — you'll re-run this after every change.

## Step 2 — Patch a finding

For each advisory, in this order of preference:

1. **Bump the direct dependency** so the transitive is pulled in patched naturally. Always try this first — it removes the need for an override entirely.
2. **Bump a closer parent** if the direct dep is current but a mid-tree parent still pins a vulnerable version.
3. **Add a `pnpm.overrides` entry** only if (1) and (2) aren't viable.

Override syntax notes:

- `"pkg": "^X.Y.Z"` — overrides every instance
- `"pkg@MAJOR": "^X.Y.Z"` — overrides only that major (safer when only one major is vulnerable, e.g. `"brace-expansion@5"`)
- Add a one-line comment in the PR/commit message naming the CVE and the parent that's pinning the vulnerable version. This is the only context future-you has to decide if the override is still needed.

## Step 3 — Audit existing overrides (the critical part)

**An override that "looks defensive" but doesn't change resolution is dead code that misleads future audits.** For each entry under `pnpm.overrides`:

### 3a. Trace the parent's range

```bash
pnpm why <pkg>                              # who pulls it
pnpm view <parent>@<version> dependencies   # what range parent allows
```

Two cases:

- **Parent pins exact version** (e.g. `"@hono/node-server": "1.19.11"`) → without override pnpm is stuck on that exact version. Override is **load-bearing** if that exact version is vulnerable.
- **Parent allows caret/range** (e.g. `"ws": "^8.18.0"`) → pnpm always picks the **highest** matching version in the registry. If the latest in-range version is already safe, override is **redundant**.

### 3b. Empirical verification (mandatory — do not skip)

Reasoning about semver isn't enough. Run the actual resolver:

```bash
# 1. Backup
cp package.json /tmp/package.json.bak
cp pnpm-lock.yaml /tmp/pnpm-lock.yaml.bak

# 2. Remove the suspect override(s) from package.json (keep the load-bearing ones)
#    Edit package.json: delete the entries you want to test

# 3. Re-resolve from scratch
pnpm install --lockfile-only

# 4. Inspect what actually resolved
grep -E "^\s+<pkg>:" pnpm-lock.yaml | sort -u

# 5. Run audit against override-free lockfile
pnpm audit --json | jq '.metadata.vulnerabilities, [.advisories[].module_name]'

# 6a. If audit stays clean AND resolved version is the same/newer → OVERRIDE IS REDUNDANT, leave it removed
# 6b. If audit reports the package OR a downgrade happened → restore the override
```

Restore on failure:

```bash
cp /tmp/package.json.bak package.json
cp /tmp/pnpm-lock.yaml.bak pnpm-lock.yaml
pnpm install
```

### 3c. Decision matrix

| Symptom after removal                    | Verdict                                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Audit clean, same/newer version resolved | **Drop** the override                                                                                                                                        |
| Audit reports the package                | **Keep** — override is load-bearing                                                                                                                          |
| Version downgrades but no audit hit      | **Drop** the override — it isn't doing security work. If you want dedup, that's a perf concern, not a security one; note it explicitly and decide separately |
| Multiple versions appear in lockfile     | Investigate — usually a parent pins exact. Override may be the only way to dedup; weigh against bumping the parent                                           |

## Step 4 — Final gate

Always end with a real install (not lockfile-only) and the full project gate:

```bash
pnpm install
pnpm audit                # must be 0 findings of severity you care about
pnpm verify:full          # lint + format + typecheck + test + build
```

If `verify:full` exits 0 and audit is clean, commit. Otherwise the override change broke something — investigate before continuing.

## Red flags

These thoughts mean STOP and run the empirical test:

| Thought                                              | Why it's wrong                                                                                                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "The override is defensive, keep it just in case"    | Caret overrides don't protect against future regressions — they allow the same range a parent would have allowed. They only matter if they raise the floor. |
| "I'll trust the semver math without re-resolving"    | Registry state changes. Pins, deprecations, and yanks can move resolution unexpectedly. Run the test.                                                       |
| "Removing it might break something subtle, leave it" | If it doesn't change resolution, it can't break anything. If it does change resolution, that's exactly what you need to know.                               |
| "Audit says 0 with override present, ship it"        | That's not the test. The test is: 0 _without_ the override.                                                                                                 |
| "Override range matches what pnpm would pick anyway" | Then it's redundant by definition. Drop it.                                                                                                                 |

## Common mistakes

- **Reading the override range and concluding it's needed** without removing it and re-resolving. Parent ranges + registry state determine resolution, not the override's range.
- **Running `pnpm audit` only with overrides in place.** That tells you nothing about whether the overrides are doing work.
- **Forgetting `--lockfile-only`** during the test — a full install with side effects (postinstall, prisma generate) is slow and unnecessary for resolution checks.
- **Skipping `pnpm verify:full`** at the end. `pnpm audit` clean ≠ project builds. A version change in a transitive can break types or runtime.
- **Editing `pnpm-lock.yaml` by hand.** Always re-resolve.

## Commit conventions

This repo uses Angular conventional commits (see CLAUDE.md). Suggested messages:

- Adding override: `fix: override <pkg> to patch <CVE-id>` or `chore: pin <pkg> for <advisory>`
- Removing stale: `chore: drop redundant pnpm overrides`
- Both at once: `chore: refresh pnpm overrides`

Always describe in the body which override was added/removed and the parent that justifies (or no longer justifies) it.
