---
title: Adding SSH Keys to Your GitHub Account
heading: How to add SSH keys to your GitHub account
description: Learn how to add SSH keys to your GitHub account. Boost your account's security and ease your workflow by securely connecting your local machine to your GitHub repositories.
createDate: 2023-12-08T01:07:13.290Z
updateDate: 2025-09-15T12:29:00.000Z
keywords: [ Adding SSH Keys, GitHub Account, Git Terminal, Existing SSH Keys, Generating SSH Key, SSH public key, SSH Key to GitHub Account, ed25519 ]
categories: [ Tutorial, Project-Setup ]
featured: false
---

<Image src="keys.jpg" alt="Keys on white background" />

Hello everyone!

Today, we are going to walk through the process of adding [SSH keys](https://www.ssh.com/academy/ssh-keys) to a GitHub
account using the modern and secure ed25519 algorithm.

Before we begin, make sure you have Git installed on your system. If you haven't done this already, head over to
the [Git website](https://git-scm.com/install/), download the latest version, and install it.

Here is a step-by-step guide:

### Step 1: Checking for Existing SSH keys

Before creating new SSH keys, check if you already have any pre-existing keys. Open your Git terminal or command line
and type:

```bash
$ ls -al ~/.ssh
```

<Image src="ssh.jpg" alt="macOS terminal with .ssh folder" />

This command lists all the files in your .ssh directory. If you don't find any, you can proceed to generate a new one.

Your SSH keys might use one of the following algorithms:

- ⛔️ DSA: It's unsafe and even no longer supported since OpenSSH version 7, you need to upgrade it!
- 🥴 RSA: It depends on key size. If it has 3072 or 4096-bit length, then you're good. Less than that, you probably want
  to upgrade it. The 1024-bit length is even considered unsafe.
- 👌 ECDSA: It depends on how well your machine can generate a random number that will be used to create a signature.
  There's also a trustworthiness concern on the NIST curves that being used by ECDSA.
- 🥳 Ed25519: It's the most recommended public-key algorithm available today! This is what we'll use in this guide.

### Step 2: Generating a New SSH key

In your terminal, paste the following command:

```bash
$ ssh-keygen -t ed25519 -C "shramko.dev@gmail.com"
```

Replace `shramko.dev@gmail.com` with the email address you used to create your GitHub account. Then, you will be
prompted to "Enter a file in which to save the key," - press Enter to accept the default file location.

**Note:** If you're using a legacy system that doesn't support ed25519, you can use RSA with 4096 bits instead:

```bash
$ ssh-keygen -t rsa -b 4096 -C "shramko.dev@gmail.com"
```

### Step 3: Adding Your SSH key to the ssh-agent

Make sure the `ssh-agent` is running:

```bash
$ eval "$(ssh-agent -s)"
```

Then, add your new SSH key to the ssh-agent:

```bash
$ ssh-add ~/.ssh/id_ed25519
```

Note: If you used RSA instead, replace "id_ed25519" with "id_rsa".

### Step 4: Adding the SSH key to Your GitHub Account

1. Go to your GitHub account settings.
2. Click on 'SSH and GPG keys' in the menu on the left-hand side.
3. Click on 'New SSH Key'.
4. Title it appropriately, then copy the SSH public key to the 'Key' input.

To copy the SSH key, go back to your terminal and type:

```bash
$ clip < ~/.ssh/id_ed25519.pub
```

**For Linux users, use:**
```bash
$ cat ~/.ssh/id_ed25519.pub
```

**For macOS users, you can also use:**
```bash
$ pbcopy < ~/.ssh/id_ed25519.pub
```

Paste the key into the 'Key' input on GitHub, then click 'Add SSH Key'.

### Step 5: Testing the Connection

Return to your terminal and type:

```bash
$ ssh -T git@github.com
```

<Image src="gh.jpg" alt="Testing the Connection with GitHub in macOS terminal" />

You should see a message welcoming you: "Hi [Your GitHub username]! You've successfully authenticated, but GitHub does
not provide shell access."

You've now successfully added a modern, secure ed25519 SSH Key to your GitHub account.
