---
title: "Git Hooks for Solo Developers: Automate What You Forget"
heading: Git Hooks and Automation
description: Set up git hooks with lint-staged, commitlint, and pre-push checks to automate code quality. A practical guide using core.hooksPath without husky.
createDate: 2026-02-21
keywords: [ git hooks tutorial, pre-commit hook, lint-staged, commitlint, git automation, husky alternative, git pre-push hook, automate code quality, git hooks JavaScript, git core.hooksPath ]
categories: [ JS, TS, Tutorial, Project-Setup, Tools ]
featured: false
---

I don't trust myself at 11 PM. My commits get sloppy — I skip linting, forget to run tests, and push code that breaks on
the first import. Sound familiar?

Git hooks are a built-in safety net that catches what you forget. They run scripts automatically at key points in your
git workflow: before a commit, before a push, or right after a commit message is written. No discipline required — just
automation.

## What Are Git Hooks?

Git hooks are shell scripts that live inside your repository and execute automatically when specific git events occur.
Every repo has a `.git/hooks/` directory with sample scripts out of the box.

There are many hooks available, but for day-to-day development these three cover 90% of what you need:

| Hook         | Trigger                         | Use case                       |
|:-------------|:--------------------------------|:-------------------------------|
| `pre-commit` | Before a commit is created      | Lint and format staged files   |
| `commit-msg` | After commit message is written | Validate commit message format |
| `pre-push`   | Before pushing to remote        | Run tests or type-checking     |

Each hook is simply an executable script. If it exits with a non-zero code, the git action is aborted. That's the entire
mechanism — simple and powerful.

## Setting Up Hooks (Two Approaches)

### Option A: Native (No Dependencies)

This is the approach I use in my own projects. Instead of relying on third-party tools to manage hooks, you point git at
a directory in your repo:

```bash
mkdir .git-hooks
git config core.hooksPath .git-hooks
```

To make this automatic for anyone who clones your repo, add a `prepare` script to `package.json`:

```json
{
  "scripts": {
    "prepare": "git config core.hooksPath .git-hooks"
  }
}
```

Now `npm install` (or [`pnpm install`](/blog/pnpm)) will configure the hooks path automatically. No extra dependencies,
no magic — just git.

### Option B: Husky

If you prefer a managed approach (especially on a team), [husky](https://typicode.github.io/husky/) is the popular
choice:

```bash
npx husky init
```

This creates a `.husky/` directory and sets up the `prepare` script for you. Both approaches work well — pick whichever
feels right for your project.

## Pre-Commit: Lint Only What You Changed

Running your linter against the entire codebase on every commit is slow and
noisy. [lint-staged](https://github.com/lint-staged/lint-staged) solves this by running tools only on files you've
actually staged.

Install it:

```bash
npm install --save-dev lint-staged
```

Add configuration to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": "eslint --fix",
    "*.{js,ts,jsx,tsx,md,json}": "prettier --write"
  }
}
```

Create the hook file at `.git-hooks/pre-commit`:

```bash
#!/usr/bin/env sh

npx lint-staged
```

Make it executable:

```bash
chmod +x .git-hooks/pre-commit
```

Now every commit automatically lints and formats only the files you changed. If ESLint finds an error it can't auto-fix,
the commit is blocked until you fix it.

> If you haven't configured ESLint for your project yet, check out
> my [ESLint with TypeScript](/blog/eslint-with-typescript) guide.

## Commit-Msg: Enforce Conventional Commits

Consistent commit messages make your git history readable and enable tools like automated
changelogs. [commitlint](https://github.com/conventional-changelog/commitlint) validates your messages against
the [Conventional Commits](/blog/conventional-commits) spec.

Install commitlint:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

Create `commitlint.config.ts`:

```ts
import type { UserConfig } from "@commitlint/types";

const commitLintConfig: UserConfig = {
  extends: ["@commitlint/config-conventional"],
};

export default commitLintConfig;
```

Create the hook file at `.git-hooks/commit-msg`:

```bash
#!/usr/bin/env sh

npx --no -- commitlint --edit "${1}"
```

Make it executable:

```bash
chmod +x .git-hooks/commit-msg
```

Now a commit like `git commit -m "stuff"` gets rejected, while `git commit -m "fix(auth): resolve token refresh"`
passes.

## Pre-Push: Run Tests Before It's Too Late

The pre-push hook is your last line of defense before code leaves your machine. Use it to run tests, type-checking, or
both:

```bash
#!/usr/bin/env sh

npm run pre-push
```

Wire it up in `package.json`:

```json
{
  "scripts": {
    "pre-push": "npm run lint && npm test"
  }
}
```

Save this as `.git-hooks/pre-push` and make it executable. If any test fails, the push is blocked. You'll thank yourself
when this catches a broken import at midnight instead of your CI pipeline 20 minutes later.

## The Full Setup (TL;DR)

Here's the complete setup from scratch — install, configure, done.

**1. Install dependencies:**

```bash
npm install --save-dev lint-staged @commitlint/cli @commitlint/config-conventional
```

**2. Add scripts to `package.json`:**

```json
{
  "scripts": {
    "prepare": "git config core.hooksPath .git-hooks",
    "lint": "eslint .",
    "pre-push": "npm run lint && npm test"
  },
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": "eslint --fix",
    "*.{js,ts,jsx,tsx,md,json}": "prettier --write"
  }
}
```

**3. Create hook files:**

```bash
mkdir .git-hooks

# pre-commit
printf '#!/usr/bin/env sh\n\nnpx lint-staged\n' > .git-hooks/pre-commit

# commit-msg
printf '#!/usr/bin/env sh\n\nnpx --no -- commitlint --edit "${1}"\n' > .git-hooks/commit-msg

# pre-push
printf '#!/usr/bin/env sh\n\nnpm run pre-push\n' > .git-hooks/pre-push

chmod +x .git-hooks/*
```

**4. Create `commitlint.config.ts`:**

```ts
import type { UserConfig } from "@commitlint/types";

const commitLintConfig: UserConfig = {
  extends: ["@commitlint/config-conventional"],
};

export default commitLintConfig;
```

**5. Run install to activate hooks:**

```bash
npm install
```

That's it. Three hooks, zero runtime overhead, and your code quality runs on autopilot.

> Automate the things you'll forget, so the only commits that reach your repo are the ones you'd be proud of at 9 AM.

If you found this useful, check out these related posts:

- [Conventional Commits](/blog/conventional-commits) — the commit message standard behind commitlint
- [ESLint with TypeScript](/blog/eslint-with-typescript) — setting up the linter that powers your pre-commit hook
- [When .gitignore Isn't Enough](/blog/gitignore-is-not-enough) — more git tricks for managing your repo
