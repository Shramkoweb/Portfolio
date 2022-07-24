---
title: How to fix "__dirname is not defined in ES module scope"
description: Here is how to fix the "__dirname is not defined in ES module scope" error
tags: [JS, Node, ES Modules]
---

<Image src="/static/images/es-module.png" />

I stumbled on this error while I used ```__dirname``` inside a ES module.

In an ES module, you cannot use ```__dirname```.

Using ```__dirname``` in a Node script you can get the path of the folder where the current JavaScript file resides, and
many Node.js projects use this.

But if you use it inside an ES module, you can’t use this, as the infamous "__dirname is not defined in ES module scope"
error shows up.

What can you do in this case?

I solved this problem by using a solution I found on the Node.js GitHub issues.

You first need to import the Node.js path module and the `fileURLToPath` function from the url module:

```js
import path from 'path';
import { fileURLToPath } from 'url';
```

Then you can replicate the functionality of `__dirname` in this way:

```js
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
```

This, incidentally, also replicates `__filename`, which returns the filename of the code which is executed.

Now you can use `__dirname` as usual:

```js
console.log(__dirname)
```
