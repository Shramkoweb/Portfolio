---
heading: Node Version Manager
title: 'Node Version Manager (NVM): Install and Switch Versions'
description: Install Node Version Manager (NVM) with its official script, switch Node.js versions per project with .nvmrc, and set the default version for new shells.
createDate: 2023-02-25T17:21:50.063Z
updateDate: 2026-11-05T12:00:00.000Z
keywords:
  [
    what is nvm node,
    what is nvm in linux,
    brew install nvm,
    install nvm,
    install nvm windows,
    nvm set default,
    nvm set default node version,
    nvmrc,
  ]
categories: [JS, Node]
featured: false
---

<Image src="node-post.jpg" alt="Laptop displaying code in a dark IDE on a dimly lit industrial surface" />

[NVM](https://github.com/nvm-sh/nvm), or Node Version Manager, is essential for managing multiple versions of Node.js on
our development environment.
[Node.js](https://nodejs.org/en) is a JavaScript-based web technology, that allows developers to write server-side code
using JavaScript.

By using NVM to manage different versions with ease, developers can keep their environment up-to-date with the best
tools and achieve their desired results with ease.

In this article, we’ll be looking at how to install NVM with its official script and verify it worked properly.
Additionally, we’ll set a default Node.js version, pin a version per project, and go through a useful NVM cheatsheet
and NVM on Windows and Linux.

## Set the Default Node Version

Run `nvm alias default` with a version, then `nvm use default` to switch the shell you're already in:

```shell
nvm alias default 24
nvm use default
nvm ls
```

New shells start with the default version. `nvm ls` lists the versions you have installed and shows where `default`
points. Use `nvm alias default --lts node` to default to the latest LTS release you have installed.

<Update date="2026-11-05">
  The commands now paste cleanly, and NVM is installed with its official script instead of Homebrew, which the NVM
  project doesn't support. I also added this section and the one on `.nvmrc`.
</Update>

## What is NVM?

Simply put, it is a software that allows you to install and manage different versions of Node.js on your system. You can
also switch easily between them, making it ideal for keeping your development environment updated.

## Why Do We Need NVM?

NVM is essential for managing multiple versions of Node.js on our systems. By using NVM to manage and switch between
different versions, we can make sure our environment is always up-to-date with the latest version. This allows us to
take advantage of the newest tools available in the Node.js ecosystem.

Additionally, NVM helps us become more efficient as developers. With NVM, we can quickly switch between different
versions of Node.js without having to reconfigure our environment and restart our terminal.

## How to Install NVM

Run the official install script from the [NVM README](https://github.com/nvm-sh/nvm#installing-and-updating):

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash
```

The script clones NVM into `~/.nvm` and adds the lines that load it to your shell profile: `~/.zshrc`, `~/.bashrc`,
`~/.bash_profile` or `~/.profile`. Open a new terminal to pick them up.

On macOS, zsh is the default shell, but there's no `~/.zshrc` until you create one. If the script found no profile to
update, create it and run the script again:

```shell
touch ~/.zshrc
```

Don't install NVM with `brew install nvm`. The NVM README says Homebrew installation isn't supported.

### Verify It Worked

Once you’ve installed NVM, you can verify that it worked by entering `nvm --version` on your terminal. This command
will show you the version of NVM you’re currently running.

```shell
nvm --version
```

## Pin a Version per Project with .nvmrc

Put the version in a `.nvmrc` file at the project root:

```shell
echo "24" > .nvmrc
```

Then `nvm install` and `nvm use` with no version pick it up, from the project folder or any folder below it:

```shell
nvm install
nvm use
```

This blog does the same: its `.nvmrc` pins Node 24, so every clone and CI run gets the same major version.

## NVM Cheatsheet

Using NVM can be intimidating at first. To help, here’s a helpful NVM cheatsheet:

| Command                   | What it does                                        |
| ------------------------- | --------------------------------------------------- |
| `nvm install 24`          | Install the latest 24.x release                     |
| `nvm use 22`              | Use the latest installed 22.x release               |
| `nvm run 22 app.js`       | Run app.js using Node 22                            |
| `nvm exec 20 node app.js` | Run `node app.js` with the PATH pointing to Node 20 |
| `nvm alias default 24`    | Set the default version for new shells              |
| `nvm alias default node`  | Always default to the latest installed version      |
| `nvm uninstall 20`        | Uninstall a specific version of Node.js             |
| `nvm install node`        | Install the latest available version                |
| `nvm use node`            | Use the latest version                              |
| `nvm install --lts`       | Install the latest LTS version                      |
| `nvm use --lts`           | Use the latest LTS version                          |
| `nvm ls`                  | List installed versions and aliases                 |
| `nvm ls-remote --lts`     | List LTS versions available to install              |

## How to Install NVM on Windows

NVM has no native Windows build. It works inside the [Windows
Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) (WSL), depending on your WSL version, and in
Git Bash or Cygwin: open that terminal and run the same install script as on Linux or macOS.

For native Windows, there's [nvm-windows](https://github.com/nvm-windows/nvm). It's a separate project with similar
commands, not maintained by the NVM team.

## How to Install NVM on Linux

Use the same install script as above. It works in bash and zsh, and adds NVM to your `~/.bashrc` or `~/.zshrc`.

## Recap

Hopefully this article has helped you get a better understanding of NVM and how to install it on a variety of systems.
Installing and managing multiple versions of Node.js is essential for staying up-to-date with the best tools and
achieving better results.

With NVM, you’ll be able to easily switch between different versions and keep your development
environment updated.

## Further reading

- [pnpm — Fast, Disk Space Efficient Package Manager](/blog/pnpm) — a modern package manager that pairs well with NVM for Node.js projects
- [How to Create SSH Keys](/blog/how-to-create-ssh-keys) — another essential developer environment setup step
