---
title: Generating UUIDs in JavaScript
description: Learn how to generate universally unique identifiers (UUIDs) in JavaScript using window.crypto.randomUUID().
createDate: 2024-09-28T18:23:42.844Z
keywords: [
  window.crypto.randomUUID,
  generateUUIDJavaScript,
  JavaScriptUUIDGeneration,
  checkCodeEnvironmentJavaScript,
  detectRuntimeEnvironmentJavaScript,
  window.crypto,
  uniqueIdentifiersJavaScript,
  UUIDInBrowserAndNodeJS
]
---

Have you ever needed to create unique identifiers in your JavaScript app? Say hello to `window.crypto.randomUUID()`.
It's a great way to generate UUIDs in the browser.

## What is it?

Simply put, `window.crypto.randomUUID()` is a method that generates a
random v4 [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier). It's part of the Web Crypto API. It
provides cryptographically strong random values.

```javascript
const myUUID = window.crypto.randomUUID();
console.log(myUUID); // Outputs something like '3b241101-e2bb-4255-8caf-4136c566a962'
```

> Before using `window.crypto.randomUUID()`, check if it's available. Your code might run in different environments.
> I have a more detailed snippet on [checking the environment](/snippets/environment) if you want to dive deeper.

## Why use it?

• **Uniqueness**: Guarantees that each UUID is unique across space and time.

• **Security**: Generates random values that are cryptographically strong.

• **Convenience**: No need to install external libraries; it’s built into modern browsers.

• **Performance**: Generates UUIDs with minimal overhead from extra code.


## Useful links
- [MDN Web Docs - window.crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
- [Can I use window.crypto.randomUUID()?](https://caniuse.com/mdn-api_crypto_randomuuid)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [RFC 4122 - A Universally Unique IDentifier (UUID) URN Namespace](https://tools.ietf.org/html/rfc4122)
