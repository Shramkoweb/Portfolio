---
title: 'Fix “__dirname Not Defined” in ES Modules – Quick Guide'
heading: How to fix "__dirname is not defined in ES module scope"
description: Fix the "__dirname is not defined in ES module scope" error in Node.js. Recreate __dirname and __filename using import.meta.url.
createDate: 2022-07-25T10:01:01Z
updateDate: 2022-09-25T12:03:53.360Z
keywords: [__filename, Node, ES Modules, __dirname]
categories: [JS, Node]
featured: false
---

<Image src="es-module.png" alt="ES module dependency graph with main.js as entry point importing from counter.js and display.js" priority={true} />

## Problem

I ran into this error when using `__dirname` in an ES module.

`__dirname` is an environment variable that tells you the absolute path of the directory containing the currently
executing file, and many Node.js projects use this.

But if you use it inside an ES module, you can't use it because of the infamous "\_\_dirname is not defined in ES module
scope" an error appears.

## Solution

What can you do in this case?

To get the current file directory, we'll want to use a combination of a global variable and a few built-in methods:

- `import.meta.url` to get the current file as a URL
- `url.fileURLToPath` to change the URL to a path
- `path.dirname` to get the directory name

Using these methods, we can reconstruct the global `__dirname` and `__filename` variables:

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
the [Node.js documentation for \_\_dirname](https://nodejs.org/docs/latest/api/modules.html#modules_dirname).
