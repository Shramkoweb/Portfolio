---
title: "How to Migrate Your Project from npm to pnpm: A Step-by-Step Guide"
heading: How I Migrated My Project from npm to pnpm
description: Learn how to efficiently migrate your project from npm to pnpm with our comprehensive step-by-step guide.
createDate: 2024-06-16T21:34:24.323Z
keywords: [ migrate npm to pnpm, pnpm migration guide, npm to pnpm transition, pnpm benefits, pnpm installation, pnpm tutorial, npm alternatives, efficient package management, pnpm setup, node.js package manager, npm vs pnpm, upgrading to pnpm, pnpm step-by-step guide ]
categories: [ Project-Setup, How-To, JS, TS, Node ]
featured: true
---

## Introduction

<Image src="pnpm-logo.png" alt="pnpm logo on gay background" />


I found article from Vercel about [Projects using pnpm can now be deployed with zero configuration](https://vercel.com/changelog/projects-using-pnpm-can-now-be-deployed-with-zero-configuration) and I decided to write my own guide.

## Why Migrate to pnpm?

Before diving into the migration process, it’s important to understand why pnpm is beneficial:

1. **Speed** 🚀: pnpm installs dependencies faster than npm by using a unique package linking mechanism.
2. **Disk Space** 🔎: It saves disk space by using a global store and hard links.
3. **Consistency** 💡: pnpm ensures that dependencies are installed in a way that is more consistent with the version
   specified in your `package.json`.

## Installation of pnpm

First, you need to install pnpm globally. You can do this by running:

```bash
brew install pnpm
```

## Migration Steps

### 1. Clean the Project

Remove the `node_modules` directory and the `package-lock.json` file. This step is crucial to ensure that there are no
leftover artifacts from npm that might interfere with pnpm.

```bash
rm -rf node_modules package-lock.json
```

### 2. Initialize pnpm

Run the following command to initialize pnpm in your project directory:

```bash
pnpm install
```

This command will create a `pnpm-lock.yaml` file and install all the dependencies listed in your `package.json`.

### 3. Verify Dependency Installation

Check that all dependencies have been installed correctly by running:

```bash
pnpm list
```

This command lists all the installed dependencies and their versions. Make sure that there are no missing or outdated
packages.

<Image src="pnpm-list.png" alt="pnpm list command result in terminal" />


## Updating Scripts

### 1. Update npm Scripts

In your `package.json`, update any npm scripts to use pnpm where necessary. For example, if you have a script for
installing dependencies, change it from:

```json
"scripts": {
"install": "npm install"
}
```

to:

```json
"scripts": {
"install": "pnpm install"
}
```

### 2. Update CI/CD Pipelines

If your project uses CI/CD pipelines, ensure that the build scripts and installation commands are updated to use pnpm.
For example, in a [GitHub Actions  with pnpm](https://pnpm.io/continuous-integration) workflow, you might update the step as follows:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      - name: Install
        run: pnpm i
      - name: Run Tests // All your CI commands
        run: pnpm run test
```

## Handling Issues and Troubleshooting

During the migration, you might encounter some issues.

> Error: Unable to locate executable file: pnpm. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.


I stuck with this error when I tried to run the `pnpm` command in GitHub Actions. 

The solution was to use the `pnpm/action-setup@v4` before `actions/setup-node@v4`.
So simply just copy the [above code](#2-update-cicd-pipelines) and paste it in your `.yml` file. 

## Conclusion

Migrating from npm to pnpm can yield significant benefits in terms of speed, disk space, and dependency management. By
following the steps outlined in this guide, you can smoothly transition your project and take advantage of pnpm's
features.

More info how my blog works you can there [How my site works under the hood](./introducing-the-new-shramko.dev)
