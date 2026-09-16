---
name: fixing-package-security
description: Use when running pnpm audit, patching CVEs in dependencies, or after dependency updates — verifies every fix empirically, prunes stale pnpm overrides that updated parents already satisfy, and prunes spent release-cooldown waivers
---

# Fixing Package Security (pnpm)

## Overview

Three jobs, one workflow:

1. **Patch new vulnerabilities** flagged by `pnpm audit`.
2. **Prune stale overrides** that updated parents now satisfy on their own.
3. **Prune spent cooldown waivers** in `minimumReleaseAgeExclude`.

**Core rule: never trust theory. Remove the entry, re-resolve, re-audit.** An override is only justified if the audit reproduces a vulnerability without it OR the parent's range can't reach a safe version. A cooldown waiver is only justified if the version it names is still the one being resolved.

## Where config lives (this repo)

**`overrides`, `allowBuilds` and `minimumReleaseAgeExclude` all live in `pnpm-workspace.yaml`, not in `package.json`.** `package.json` has no `pnpm` field at all. Editing `package.json` to change an override is a no-op — a silent one, which is worse. Check the top of `pnpm-workspace.yaml` before touching anything.

## When to use

- After `pnpm update` / Renovate / Dependabot bumps merged
- Whenever `pnpm audit` reports findings
- Periodic hygiene pass on `overrides` (this repo accumulates them)
- **Any time an install adds a `minimumReleaseAgeExclude` entry** — the same pass must retire the ones that bump made inert
- After upgrading a major framework dep (next, react, prisma, jest, @sentry/\*)

## Workflow

```
1. Baseline audit           → pnpm audit --json
2. Patch new findings       → add override OR bump parent
3. Audit existing overrides → remove → re-resolve → re-audit each one
4. Prune cooldown waivers   → drop entries absent from pnpm-lock.yaml
5. Final gate               → pnpm install && pnpm verify:full && pnpm audit
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
3. **Add an `overrides` entry** in `pnpm-workspace.yaml` only if (1) and (2) aren't viable.

Override syntax notes (YAML, not JSON):

- `pkg: ^X.Y.Z` — overrides every instance
- `pkg@MAJOR: ^X.Y.Z` — overrides only that major (safer when only one major is vulnerable, e.g. `brace-expansion@5`)
- **Write the justification as an inline comment above the entry**, not just in the commit message. Name the advisory ID, the parent that pins the vulnerable version, and an explicit drop condition (`# Drop when satori pins fflate >=0.7.5 on its own`). Follow the style already in the file. This comment is the only context future-you has, and it is what makes Step 3 a five-minute pass instead of an archaeology dig.

Beware: a caret override always resolves to the newest matching version, so an override can itself pull a version that is hours old and trip the release cooldown. That is one of the two ways Step 4 entries get created.

## Step 3 — Audit existing overrides (the critical part)

**An override that "looks defensive" but doesn't change resolution is dead code that misleads future audits.** For each entry under `overrides:` in `pnpm-workspace.yaml`:

### 3a. Trace the parent's range

```bash
pnpm why <pkg>                              # who pulls it
pnpm view <parent>@<version> dependencies   # what range parent allows
```

Two cases:

- **Parent pins exact version** (e.g. `satori@0.33.3` pins `fflate: 0.7.3`) → without the override pnpm is stuck on that exact version. Override is **load-bearing** if that exact version is vulnerable.
- **Parent allows caret/range** (e.g. `ws: ^8.18.0`) → pnpm always picks the **highest** matching version in the registry. If the latest in-range version is already safe, override is **redundant**.

### 3b. Empirical verification (mandatory — do not skip)

Reasoning about semver isn't enough. Run the actual resolver:

```bash
# 1. Backup (use the session scratchpad, not the repo)
cp pnpm-workspace.yaml "$SCRATCH/pnpm-workspace.yaml.bak"
cp pnpm-lock.yaml      "$SCRATCH/pnpm-lock.yaml.bak"

# 2. Remove the suspect override(s) from pnpm-workspace.yaml (keep load-bearing ones)

# 3. Re-resolve from scratch
pnpm install --lockfile-only

# 4. Inspect what actually resolved
grep -E "^  <pkg>@" pnpm-lock.yaml | sort -u

# 5. Run audit against the override-free lockfile
pnpm audit --json | jq '.metadata.vulnerabilities, [.advisories[].module_name]'

# 6a. Audit clean AND resolved version same/newer → OVERRIDE IS REDUNDANT, leave it removed
# 6b. Audit reports the package OR a downgrade happened → restore the override
```

Restore on failure:

```bash
cp "$SCRATCH/pnpm-workspace.yaml.bak" pnpm-workspace.yaml
cp "$SCRATCH/pnpm-lock.yaml.bak"      pnpm-lock.yaml
pnpm install
```

### 3c. Decision matrix

| Symptom after removal                    | Verdict                                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Audit clean, same/newer version resolved | **Drop** the override                                                                                                                                        |
| Audit reports the package                | **Keep** — override is load-bearing                                                                                                                          |
| Version downgrades but no audit hit      | **Drop** the override — it isn't doing security work. If you want dedup, that's a perf concern, not a security one; note it explicitly and decide separately |
| Multiple versions appear in lockfile     | Investigate — usually a parent pins exact. Override may be the only way to dedup; weigh against bumping the parent                                           |

## Step 4 — Prune spent cooldown waivers

pnpm >=11 enforces a **release cooldown by default**: `minimumReleaseAge` is 1440 minutes, so a version published less than a day ago will not resolve. It is not set anywhere in this repo — the default is doing the work. This is supply-chain protection against the dominant npm attack shape: maintainer account compromised, malicious patch published, caught within hours.

Because this repo pins every dependency exactly, bumping to a fresh version fails the install, and the only way forward is a `minimumReleaseAgeExclude` entry. **Every entry is therefore a real waiver, not dead config** — while it is live.

### 4a. Keep the version-exact form

```yaml
minimumReleaseAgeExclude:
  - '@types/node@26.6.1' # good: expires by itself
  - '@types/*' # BAD: waives the cooldown for the whole scope, forever
  - postcss # BAD: same, for every future version
```

A version-exact entry goes inert the moment the pin moves past it — it can never fire again. That self-expiry is the whole point. A bare name or glob is a standing hole in the cooldown. **Never widen an entry to a glob to avoid re-adding it later.**

### 4b. Find the dead ones

Inert is not harmless: a genuinely risky waiver is hard to spot among dead ones. Every entry naming a version that no longer appears in the lockfile should go.

```bash
sed -n '/^minimumReleaseAgeExclude:/,$p' pnpm-workspace.yaml \
  | grep -E "^  - " | sed "s/^  - //; s/'//g; s/ *#.*//" \
  | while read -r e; do
      [ "$(grep -c -F "$e" pnpm-lock.yaml)" -eq 0 ] && echo "STALE  $e" || echo "LIVE   $e"
    done
```

Drop every `STALE` line, then confirm the prune was a no-op for resolution:

```bash
pnpm install --lockfile-only
git diff --stat pnpm-lock.yaml   # must be unchanged by the prune itself
```

### 4c. Prefer waiting over waiving

For a routine (non-hotfix) bump, the cheapest fix is not to add the entry at all — wait out the remaining window and install then. Check how much is left:

```bash
curl -s https://registry.npmjs.org/<pkg> | jq -r '.time["<version>"]'
```

Reserve `minimumReleaseAgeExclude` for versions you genuinely need before they mature, and note the publish timestamp inline so the drop condition is obvious.

## Step 5 — Final gate

Always end with a real install (not lockfile-only) and the full project gate:

```bash
pnpm install
pnpm audit                # must be 0 findings of severity you care about
pnpm verify:full          # lint + format + typecheck + test + build
```

If `verify:full` exits 0 and audit is clean, commit. Otherwise the change broke something — investigate before continuing.

## Red flags

These thoughts mean STOP and run the empirical test:

| Thought                                              | Why it's wrong                                                                                                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "The override is defensive, keep it just in case"    | Caret overrides don't protect against future regressions — they allow the same range a parent would have allowed. They only matter if they raise the floor. |
| "I'll trust the semver math without re-resolving"    | Registry state changes. Pins, deprecations, and yanks can move resolution unexpectedly. Run the test.                                                       |
| "Removing it might break something subtle, leave it" | If it doesn't change resolution, it can't break anything. If it does change resolution, that's exactly what you need to know.                               |
| "Audit says 0 with override present, ship it"        | That's not the test. The test is: 0 _without_ the override.                                                                                                 |
| "Override range matches what pnpm would pick anyway" | Then it's redundant by definition. Drop it.                                                                                                                 |
| "The exclude entries are inert, leave them"          | Inert entries are exactly the problem: they bury the one live waiver. Nothing warns you — not install, not audit, not verify.                               |
| "I'll just glob the scope so I stop re-adding it"    | That converts a self-expiring waiver into a permanent one. Re-adding an exact version each time is the feature, not the friction.                           |

## Common mistakes

- **Editing `package.json` to change an override.** In this repo they live in `pnpm-workspace.yaml`; `package.json` has no `pnpm` field, so the edit silently does nothing.
- **Reading the override range and concluding it's needed** without removing it and re-resolving. Parent ranges + registry state determine resolution, not the override's range.
- **Running `pnpm audit` only with overrides in place.** That tells you nothing about whether the overrides are doing work.
- **Adding a `minimumReleaseAgeExclude` entry and not pruning the ones that bump just killed.** This is how the list reached 23 dead entries against 1 live one.
- **Forgetting `--lockfile-only`** during the test — a full install with side effects (postinstall, prisma generate) is slow and unnecessary for resolution checks.
- **Skipping `pnpm verify:full`** at the end. `pnpm audit` clean ≠ project builds. A version change in a transitive can break types or runtime.
- **Editing `pnpm-lock.yaml` by hand.** Always re-resolve.

## Commit conventions

This repo uses Angular conventional commits (see CLAUDE.md). Suggested messages:

- Adding override: `fix: override <pkg> to patch <CVE-id>` or `chore: pin <pkg> for <advisory>`
- Removing stale: `chore: drop redundant pnpm overrides`
- Pruning waivers: `chore: prune spent release-cooldown waivers`
- Both at once: `chore: refresh pnpm overrides`

Always describe in the body which entry was added/removed and the parent (or version) that justifies — or no longer justifies — it.
