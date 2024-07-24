---
title: "Conventional Commits enhance your coding practices"
heading: Conventional Commits
description: Discover how Conventional Commits can enhance your work and project's readability.
createDate: 2024-07-23T22:52:26.716Z
keywords: [
  Conventional Commits for JavaScript Development,
  Effective Conventional Commits in Next.js Projects,
  Standardizing Commit Messages for Junior Developers,
  Streamlining JavaScript Workflow with Conventional Commits,
  Enhancing Next.js Code Management with Commit Standards,
  How Conventional Commits Improve Coding Practices,
  Integrating Conventional Commits in Front-End Development,
  Commit Message Best Practices for JavaScript,
  Boosting Blog Quality with Conventional Commits,
  Conventional Commits Tools for Junior Developers
]
categories: [ JS, TS, How-To, Project-Setup, Opinion, Tools ]
featured: true
---

<Image src="conventional-commits.jpg" alt="Conventional Commits. A close up of a text description on a computer screen." />

I first came across Conventional Commits during my time at [MacPaw](/about), but initially, I didn't give much thought
to these unique commit messages.
It wasn't until recently that I took a closer look and realized how much more efficient and organized they make the
development process.

Here’s why you might want to give them a try too! 😃

## What Are Conventional Commits?

Conventional Commits is a specification that provides a simple, structured convention for commit messages.
It allows to write messages that are easy to read and maintain, and which convey the specific intent behind each
change.

The conventional commit message format is straightforward. It starts with a **type**, optionally followed by a **scope
**, and a
short **description**. For example:

```bash
feat(login): add authentication with JWT
```

In this example:

- `feat` is the type of the commit, indicating a new feature.
- `login` is the scope, specifying the part of the project that is affected.
- `add authentication with JWT` is the short description of the change.

## Why Use Conventional Commits?

Using Conventional Commits offers several key benefits:

- `Consistency`: Standardized commit messages ensure that everyone on the team follows the same format, which enhances
  readability and reduces ambiguity.
- `Automation`: Tools can automatically generate change logs, version numbers, and releases based on the structured
  commit messages.
- `Collaboration`: Clear and descriptive commit messages help team members understand the history and context of
  changes, improving collaboration.
- `Compliance`: Adhering to a standardized format helps in meeting the guidelines and best practices of many open-source
  projects.

## Types of Conventional Commits

There are several predefined types of Conventional Commits that help categorize the nature of each change. Each type
indicates a specific kind of modification, making it easier to understand the impact of the commit. Here are the most
commonly used types:

- **feat**: A new feature for the user.
- **fix**: A bug fix for the user.
- **chore**: Changes that don't modify src or test files, such as updating build tasks.
- **docs**: Documentation-only changes.
- **style**: Changes that do not affect the meaning of the code (e.g., formatting, missing semicolons, etc.).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding or updating tests.
- **build**: Changes that affect the build system or external dependencies (e.g., gulp, npm).
- **ci**: Changes to CI configuration files and scripts (e.g., CircleCI, Travis).
- **revert**: Reverts a previous commit.

## Cheat Sheet for Conventional Commits

<Image src="conventional-commits-cheatsheet.png" alt="Conventional Commits Cheatsheet" />

| Type     | Description                | Example                          |
|:---------|:---------------------------|:---------------------------------|
| feat     | New feature                | feat(ui): add dark mode          |
| fix      | Bug fix                    | fix(api): resolve login issue    |
| docs     | Documentation only changes | docs(readme): update setup guide |
| style    | Code style changes only    | style(css): format CSS classes   |
| refactor | Code refactoring           | refactor(auth): optimize logic   |
| perf     | Performance improvement    | perf(database): optimize queries |
| test     | Adding tests               | test(routes): add unit tests     |
| chore    | Build tool/config changes  | chore(deps): bump dependencies   |
| ci       | Continuous Integration     | ci(travis): update config        |
| revert   | Revert previous commit     | revert: rollback last change     |

## Examples of Conventional Commits

Understanding the theory behind Conventional Commits is one thing, but seeing how they are applied in real-world
scenarios can be extremely helpful. Below are some examples illustrating how to write effective, clear, and standardized
commit messages.

> Here example of commits from [my GitHub](https://github.com/Shramkoweb/Portfolio/commits/develop/)


### Example 1: Adding a New Feature

**Commit Message**:

```bash
feat(auth): add OAuth 2.0 authentication
```

**Explanation**:

**Type**: `feat` (indicates a new feature). <br/>
**Scope**: `auth` (specifies that the change is related to authentication). <br/>
**Description**: `add OAuth 2.0 authentication` (brief summary of the change).

### Example 2: Fixing a Bug

**Commit Message**:

```bash
fix(profile): resolve issue with avatar upload
```

**Explanation**:

**Type**: `fix` (indicates a bug fix). <br/>
**Scope**: `profile` (specifies that the change affects the profile feature). <br/>
**Description**: `resolve issue with avatar upload` (briefly describes the problem and solution).

### Example 3: Updating Documentation

**Commit Message**:

```bash
docs(readme): update installation instructions
```

**Explanation**:

**Type**: `docs` (indicates a documentation change). <br/>
**Scope**: `readme` (specifies the README file). <br/>
**Description**: `update installation instructions` (details the specific update).

### Example 4: Refactoring Code

**Commit Message**:

```bash
refactor(utils): simplify the date parsing logic
```

**Explanation**:

**Type**: `refactor` (indicates a code change that neither fixes a bug nor adds a feature). <br/>
**Scope**: `utils` (specifies that the change pertains to utility functions). <br/>
**Description**: `simplify the date parsing logic` (briefly describes the refactoring).

### Example 5: Performance Improvement

**Commit Message**:

```bash
perf(db): optimize query execution time
```

**Explanation**:

**Type**: `perf` (indicates a performance improvement). <br/>
**Scope**: `db` (specifies that the change affects the database). <br/>
**Description**: `optimize query execution time` (summarizes the performance enhancement).

### Example 6: Adding or Updating Tests

**Commit Message**:

```bash
test(router): add unit tests for routing module
```

**Explanation**:

**Type**: `test` (indicates test-related changes). <br/>
**Scope**: `router` (specifies the routing module). <br/>
**Description**: `add unit tests for routing module` (briefly describes the tests added).

### Example 7: Maintenance or Chore

**Commit Message**:

```bash
chore(deps): upgrade lodash to version 4.17.21
```

**Explanation**:

**Type**: `chore` (indicates maintenance or chores). <br/>
**Scope**: `deps` (specifies that the change pertains to dependencies). <br/>
**Description**: `upgrade lodash to version 4.17.21` (details the specific update).

### Example 8: Continuous Integration Configuration

**Commit Message**:

```bash
ci(circleci): add build step for linting
```

**Explanation**:

**Type**: `ci` (indicates changes to CI configuration). <br/>
**Scope**: `circleci` (specifies the CI service being configured). <br/>
**Description**: `add build step for linting` (briefly describes the new CI step).

### Example 9: Reverting a Previous Commit

**Commit Message**:

```bash
revert: remove OAuth 2.0 authentication

This reverts commit abc123.
```

**Explanation**:

**Type**: `revert` (indicates the commit is a revert). <br/>
**Scope**: None (reverts don't usually need a scope). <br/>
**Description**: `remove OAuth 2.0 authentication` (describes what is being reverted).
Body: This reverts commit abc123. (provides context by specifying the commit being reverted).

## Using Conventional Commits in Projects

Incorporating Conventional Commits into your projects can significantly improve code quality and team collaboration.
Here’s a step-by-step guide on how to start using Conventional Commits in your projects.

### Step 1: Educate Your Team

Before adopting Conventional Commits, ensure that everyone on your team understands its benefits and guidelines. Share
resources, conduct workshops, or organize short training sessions to help everyone get up to speed.

### Step 2: Set Up Commit Message Linting

To enforce the Conventional Commits standard, you can use tools
like [commitlint](https://github.com/conventional-changelog/commitlint) and [husky](https://typicode.github.io/husky/).
These tools help ensure that
all commit messages adhere to the predefined format.

Example Configuration:

#### Install Dependencies:

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli husky
```

#### Configure Commitlint:

Create a new file named `commitlint.config.js` in the root of your project and add the following content:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

#### Set Up Husky Hooks:

The `init` command simplifies setting up husky in a project. It creates a `pre-commit` script in `.husky/` and updates
the prepare script in `package.json`. Modifications can be made later to suit your workflow.

```bash
npx husky init
```

### Step 3: Use Tools and Libraries

Conventional commits can be parsed by tools, and a very nice use-case is that of generating release changelogs.

<Image src="changelog.png" alt="Changelog created from Conventional commits on GitHub page" />

#### Semantic Release:

- Automates the whole package release workflow including determining the next version number, generating the release
  notes, and publishing the package.
- [Semantic Release Documentation](https://semantic-release.gitbook.io/semantic-release)

#### Commitizen:

- A tool that prompts you to fill out the commit message with a CLI, ensuring you follow the Conventional Commits
  standard.
- [Commitizen Documentation](https://github.com/commitizen/cz-cli)

### Step 4: Continuous Integration and Continuous Deployment (CI/CD)

Integrate Conventional Commits with your `CI/CD` pipeline to automate tasks such as generating changelogs and
versioning.

Here’s how you can do it:

#### Changelog Generation:

- Use tools like standard-version to generate changelogs automatically.
- [Standard Version Documentation](https://github.com/conventional-changelog/standard-version)

#### Versioning and Releasing:

- Automate versioning and releasing using tools like Semantic Release.
- Define release steps in your CI configuration (e.g., GitHub Actions, Travis CI).

Example GitHub Actions Configuration for Semantic Release:

```yaml
name: Release
on:
  push:
    branches:
      - main
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2
      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 14
      - name: Install Dependencies
        run: npm install
      - name: Run Semantic Release
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Conclusion

I hope this blog post has inspired you to delve into conventional commits.

Initially, conventional commits might seem a bit odd, and you might find yourself questioning the format as you make
commits. However, they soon become second nature, and you’ll appreciate their impact on your software engineering
practices.
