---
title: How to Install PostgreSQL on macOS (2024 Guide)
heading: Installing PostgreSQL on macOS
description: We'll walk you through the steps to install PostgreSQL on your macOS system.
createDate: 2023-10-04T15:51:46.141Z
updateData: 2024-05-20T19:09:55.954Z
keywords: [ JS snippet, PostgreSQL Snippet, install PostgreSQL, postgres on MacOS ]
---

I use PostgreSQL for my projects, and I want to share with you how to install it on macOS.
Yea can read a little bit more about how my website works in my article [How I built my blog with Next.js](/blog/introducing-the-new-shramko.dev).

## Step 1: Homebrew Installation

First, let's ensure that you have Homebrew, a package manager for macOS, installed on your system. If you don't have it
already, you can install it using the following command in your terminal:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Step 2: Installing PostgreSQL

With Homebrew in place, we can now proceed to install PostgreSQL. Open your terminal and run the following command:

```shell
brew install postgresql
```

Homebrew will fetch and install PostgreSQL along with its dependencies. This process may take a few minutes.

## Step 3: Starting and Stopping PostgreSQL

After the installation is complete, you can start the PostgreSQL server with the following command:

```shell
brew services start postgresql
```

To stop the PostgreSQL server when you're done, use:

```shell
brew services stop postgresql
```

## Step 4: Creating a Database

Now that PostgreSQL is up and running, you can create your first database. Use the following command to access the
PostgreSQL interactive terminal:

```shell
psql
```

You can create a new database with the following SQL command, replacing `mydatabase` with your desired database name:

```sql
CREATE DATABASE mydatabase;
```

## Step 5: Accessing PostgreSQL

You can access PostgreSQL using various database clients and tools, or you can continue to use the terminal. To connect
to your newly created database, use:

```shell
psql -d mydatabase
```

## Step 6: Setting a Password (Optional)*

By default, PostgreSQL is installed without a password. It's highly recommended to set a password for the `postgres`
user to enhance security. To do this, run:

```shell
psql
ALTER USER postgres PASSWORD 'yourpassword';
```

Replace `yourpassword` with a strong password of your choice.

## Conclusion

Congratulations! You've successfully installed PostgreSQL on your macOS system. You're now ready to create, manage, and
interact with relational databases using this powerful and versatile database management system.

Remember to consult the [PostgreSQL documentation](https://www.postgresql.org/docs/current/index.html) and official
resources for more advanced configuration and usage
options. Happy database management!
