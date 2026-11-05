---
title: 'Fix “__dirname Not Defined” in ES Modules – Quick Guide'
heading: How to fix "__dirname is not defined in ES module scope"
description: Fix the "__dirname is not defined in ES module scope" error in Node.js. Use import.meta.dirname and import.meta.filename, or import.meta.url on older Node.
createDate: 2022-07-25T10:01:01Z
updateDate: 2026-11-05T12:00:00.000Z
keywords: [__filename, Node, ES Modules, __dirname, import.meta.dirname]
categories: [JS, Node]
featured: false
---

<Image src="es-module.png" alt="ES module dependency graph with main.js as entry point importing from counter.js and display.js" priority inverted />

## Problem

I ran into this error when using `__dirname` in an ES module.

`__dirname` is a CommonJS module-scope variable that holds the absolute path of the directory containing the current
module, and many Node.js projects use it.

It only looks global. Node wraps every CommonJS file in a function and passes `__dirname`, `__filename`, `require`,
`module` and `exports` in as arguments. ES modules don't get that wrapper. So once your file is an ES module (a `.mjs`
extension, or `"type": "module"` in `package.json`), you get the infamous "\_\_dirname is not defined in ES module
scope" error.

## Solution

On Node.js 20.11+ (or 21.2+), use `import.meta.dirname` and `import.meta.filename`. They hold the same values as
`__dirname` and `__filename`:

```js
console.log(import.meta.dirname); // /home/app/src
console.log(import.meta.filename); // /home/app/src/index.js
```

Both stopped being experimental in Node.js 22.16 and 24.

<Update date="2026-11-05">
  Earlier versions of this post misdescribed `__dirname`. It's a CommonJS module-scope variable. The post now also
  leads with `import.meta.dirname`, which didn't exist when I first wrote it.
</Update>

### Older Node.js versions

On older versions, combine `import.meta.url` with a few built-in methods:

- `import.meta.url` to get the current file as a URL
- `url.fileURLToPath` to change the URL to a path
- `path.dirname` to get the directory name

Using these methods, we can reconstruct `__dirname` and `__filename`:

```js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
```

Now you can use `__dirname` as usual:

```js
console.log(__dirname);
```

## Conclusion

Due to the different approaches to modularity in Node.js and EcmaScript, you may encounter such problems.

If you are working with file paths, you may also find it useful to know [how to check if a file exists in Node.js](/snippets/how-to-check-if-file-exists-node).

For further reading, check out
the [Node.js documentation for import.meta.dirname](https://nodejs.org/api/esm.html#importmetadirname) and
[for \_\_dirname](https://nodejs.org/docs/latest/api/modules.html#modules_dirname).
