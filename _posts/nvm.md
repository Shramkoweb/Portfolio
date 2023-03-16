---
title: Node Version Manager
description: NVM, or Node Version Manager. What is it and why we should use it?
createDate: 2023-02-25T17:21:50.063Z
updateData: 2023-02-25T17:21:50.063Z
keywords: [what is nvm node, what is nvm in linux, brew install nvm, install nvm, install nvm windows, nvm set default, nvm set default node version]
categories: [JS, Node]
featured: false
---

<Image src="node-post.jpg" alt="" />

[NVM](https://github.com/nvm-sh/nvm), or Node Version Manager, is essential for managing multiple versions of Node.js on
our development environment.
[Node.js](https://nodejs.org/en/) is a JavaScript-based web technology, that allows developers to write server-side code
using JavaScript.

By using NVM to manage different versions with ease, developers can keep their environment up-to-date with the best
tools and achieve their desired results with ease.

In this article, we’ll be looking at how to install NVM with Brew and verify it worked properly. Additionally, we’ll
take a look at why we need NVM, a useful NVM cheatsheet, and how to install NVM on Windows, Linux, and MacOS.

## What is NVM?

Simply put, it is a software that allows you to install and manage different versions of Node.js on your system. You can
also switch easily between them, making it ideal for keeping your development environment updated.

## Why Do We Need NVM?

NVM is essential for managing multiple versions of Node.js on our systems. By using NVM to manage and switch between
different versions, we can make sure our environment is always up-to-date with the latest version. This allows us to
take advantage of the newest tools available in the Node.js ecosystem.

Additionally, NVM helps us become more efficient as developers. With NVM, we can quickly switch between different
versions of Node.js without having to reconfigure our environment and restart our terminal.

## How to Install NVM with Brew

Installing NVM with [Brew](https://brew.sh/) is a fairly straightforward process.

First, you’ll need to install Brew, which you can do simply by entering this on your terminal:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Brew is installed, you can install NVM by entering `brew install nvm` on your terminal.
This command will download the latest version of NVM for your system, including the necessary libraries and packages.

```shell
brew install nvm
```

### Verify It Worked

Once you’ve installed NVM with Brew, you can verify that it worked by entering `nvm —-v` on your terminal. This command
will show you the version of NVM you’re currently running.

```shell
nvm —-v

#Node Version Manager (v0.39.3) // It's my version of NVM
```

## NVM Cheatsheet

Using NVM can be intimidating at first. To help, here’s a helpful NVM cheatsheet:

```shell
- nvm install 8.0.0                     #Install a specific version number
- nvm use 8.0                           #Use the latest available 8.0.x release
- nvm run 6.10.3 app.js                 #Run app.js using node 6.10.3
- nvm exec 4.8.3 node app.js            #Run `node app.js` with the PATH pointing to node 4.8.3
- nvm alias default 8.1.0               #Set default node version on a shell
- nvm alias default node                #Always default to the latest available node version on a shell
- nvm uninstall [<version>]             #This command will uninstall a specific version of Node.js

- nvm install node                      #Install the latest available version
- nvm use node                          #Use the latest version
- nvm install --lts                     #Install the latest LTS version
- nvm use --lts                         #Use the latest LTS version
```

## How to Install NVM on Windows

Installing NVM on Windows is slightly more involved than with Linux or macOS. To do so, you’ll need to have the [Windows
Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) (WSL) installed. Once you have WSL
installed, you can use Brew to install NVM just as you would with Linux or macOS.

## How to Install NVM on Linux

The easiest way to install NVM on Linux is to use Brew. Simply open your terminal and then enter `brew install nvm`.

Before it install Brew 🍻

## Recap

Hopefully this article has helped you get a better understanding of NVM and how to install it on a variety of systems.
Installing and managing multiple versions of Node.js is essential for staying up-to-date with the best tools and
achieving better results.

With NVM, you’ll be able to easily switch between different versions and keep your development
environment updated.

