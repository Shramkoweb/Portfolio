---
title: How to fix "__dirname is not defined in ES module scope"
description: Here is how to fix the "__dirname is not defined in ES module scope" error
tags: [JS, Node, ES Modules]
---

<Image src="/static/images/es-module.png" />

## Problem

I ran into this error when using ```__dirname``` in an ES module.

```__dirname``` is an environment variable that tells you the absolute path of the directory containing the currently
executing file, and many Node.js projects use this.

But if you use it inside an ES module, you can't use it because of the infamous "__dirname is not defined in ES module scope"
an error appears.

## Solution

What can you do in this case?

To get the current file directory, we'll want to use a combination of a global variable and a few built-in methods:

- `import.meta.url` to get the current file's as a URL
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
console.log(__dirname)
```

## Conclusion

Due to the different approaches to modularity in Node.js and EcmaScript, you may encounter such problems.

For further reading, check out the [Node.js documentation for __dirname](https://nodejs.org/docs/latest/api/modules.html#modules_dirname).
