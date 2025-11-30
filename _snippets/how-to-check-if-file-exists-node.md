---
title: How to check if a file exists in Node.js
heading: Check if a file exists with Node.js
description: Learn how to check if a file exists in Node.js using the fs module. Covers synchronous and asynchronous methods with practical examples.
createDate: 2025-03-04T22:14:08.330Z
keywords: [nodejs, file system, fs module, synchronous file check, file existence, javascript, file operations, file management, system utilities, node file api]
---
To check if a file exists in the filesystem using Node.js, you can use the `fs.existsSync` method.

```javascript
import { existsSync } from 'node:fs';

if (existsSync('/etc/passwd')) {
  console.log('The path exists.');
}
```

This method is synchronous, which means it’s blocking. If you want to check if a file exists without opening it, you can
use `fs.access`.

```javascript
import { access, constants } from 'node:fs';

const file = 'package.json';

access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});
```
