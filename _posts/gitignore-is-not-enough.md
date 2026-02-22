---
heading: Ignore files in Git without adding them to .gitignore
title: When .gitignore Isn't the Right Tool
description: Learn about Git's hidden alternatives to .gitignore for managing file exclusions locally without affecting your team's workflow.
createDate: 2025-05-29T10:30:00.000Z
updateDate: 2025-06-01T10:30:00.000Z
keywords: [ git info exclude, git assume unchanged, git local ignore, gitignore alternatives, git file management, git exclude files locally, git update-index, git ignore tracked files ]
categories: [ Opinion, Project-Setup, Tools ]
featured: false
---

<Image src="git.jpg" alt="Hand-drawn illustration of the Git logo inside a tilted square outline with three red dots connected by black lines, representing branches" priority={true} />

When it comes to managing version control in your project with Git, `.gitignore` files typically handle most cases of
excluding specific files or directories from being tracked. However, there are instances when you either can’t or simply
prefer not to modify the `.gitignore` file directly.

Fortunately, Git offers several alternative methods to tackle these scenarios effectively.

### Why You Might Want to Avoid Modifying .gitignore

There are generally two key situations where you might opt to keep your `.gitignore` unchanged:

1. **Personal or local-specific files:** Say you have custom settings or environment files (like `.envrc` or
   personalized
   IDE configurations). You wouldn’t want to clutter the repository with your personal preferences that aren’t relevant
   to others.
2. **Temporarily ignoring changes to tracked files:** Perhaps you’re making adjustments to a file that’s already under
   version control (such as a Docker configuration or database settings), but you want to ensure these changes don’t
   appear in every commit.

Here’s how to handle both situations gracefully.

### Ignoring untracked files

Git provides a straightforward solution that keeps personal preferences out of sight from collaborators: the
`.git/info/exclude` file. This file acts just like `.gitignore` but remains local—meaning your teammates won’t be
affected
by your individual exclusions.

To put this into action, simply open the `.git/info/exclude` file in your repository and list the files or directories
you
wish to ignore:

```gitignore
.idea/
*.log
.env.local
```

Now, your IDE settings, log files, or local environment configurations will no longer clutter your Git status or lead to
accidental commits without interrupting your teammates’ workflow.

### Temporarily Ignoring Changes with git update-index

At some point, you’ll find it necessary to tweak files you’re already tracking, but you have no intention of committing
those changes (for example, adjusting local ports or temporary debugging code). That’s where the
`git update-index --assume-unchanged` command comes in.

Here’s how it works:

To temporarily ignore changes in a tracked file, simply run:

```bash
git update-index --assume-unchanged docker-compose.yml
```

This command tells Git to overlook any further changes made to `docker-compose.yml`, treating it as if it hasn’t been
modified.

However, use this feature with caution! Overuse can lead to confusion, especially if you forget you’ve set it. To resume
tracking the changes, you can run:

```bash
git update-index --no-assume-unchanged docker-compose.yml
```

If you ever need a quick way to check which files are being ignored, you can use:

```bash
git ls-files -v | grep '^h'
```

This command lists the files that Git currently assumes are unchanged, helping you maintain organization.

### Final Thoughts

While `.gitignore` is a powerful tool, it’s not always enough on its own. By incorporating `.git/info/exclude` and the
`git update-index` technique into your toolkit, you can enjoy greater flexibility in managing your repository.

Precise management leads to fewer headaches and cleaner commits, ensuring a smoother and more intuitive approach to
version control.

> For more git workflow automation, check out [Git Hooks for Solo Developers](/blog/git-hooks-automation).
