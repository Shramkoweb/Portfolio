---
title: How to use ESLint with TypeScript
description: In this post, we'll walk through how to set up linting in your TS project.
createDate: 2022-08-02T19:51:19Z
updateData: 2022-08-02T20:00:45.784Z
keywords: [TS, TypeScript, ESLint, Project-Setup]
categories: [TS, Project-Setup]
featured: false
---

## Intro

Formatting is one of several issues to consider when writing clean code. There are many other things we have to worry
about as well, but formatting is one of those things that we can adjust right away and set the standard for our project.

## ESLint and TSLint

[ESLint](https://eslint.org/) is statically analyzes your code to quickly find problems. It looks at your code, and
tells you when you're not following the standard that you set in place.

## Installation and setup

```shell
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Next, add the `.eslintrc.json` configuration file to the project root.

```shell
touch .eslintrc
```

In it, use the following start configuration.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

## Ignoring files we don't want to lint

```shell
touch .eslintignore
```

Then add the things we want to ignore. In the following code sample, we're ignoring the dist/ folder that contains the
compiled TypeScript code.

```ini
node_modules
dist
```

## Adding a script to package

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts"
  }
}
```

Let's run the following command.

```ini
npm run lint
```

## Eslint Rules

ESLint comes with a large number of built-in rules and you can add more rules through plugins. You can modify which
rules your project uses either using configuration comments or configuration files. To change a rule setting, you must
set the rule ID equal to one of these values:

- "off" or 0 - turn the rule off
- "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
- "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

### Adding a rule

To configure rules inside of a configuration file, use the rules key along with an error level and any options you want
to use. For example:

```json
{
  "rules": {
    "curly": "error",
    "quotes": [
      "error",
      "double"
    ]
  }
}
```

Rules are added as keys to this rules attribute and you can usually find basic eslint rules here on their website in the
[rules' documentation](https://eslint.org/docs/latest/use/configure/rules).

## Conclusion

That's all 🎉.

It's very easy to start using `ESlint`, but its contribution to code formatting and saving time is
huge. Therefore, I recommend always using it.

- [Create-React-App with TypeScript, ESLint, Prettier, and Github Actions](https://brygrill.medium.com/create-react-app-with-typescript-eslint-prettier-and-github-actions-f3ce6a571c97)
- [What is ESLint?](https://hackernoon.com/what-is-eslint-how-do-i-set-it-up-on-atom-70f270f57296)
