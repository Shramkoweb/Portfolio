---
title: PHPStorm Allow Network Connections on Startup
description: How to fix PHPStorm network connections error on startup
createDate: 2022-10-26T16:49:52.889Z
updateData: 2022-10-26T16:49:52.889Z
keywords: [do you want the application to accept incoming network connections, accept incoming network connections]
categories: [How-To]
featured: true
---

<Image src="phpstorm.png" alt="PhpStorm allow network popup" />

[PHPStorm](https://www.jetbrains.com/phpstorm/) has a bug in macOS where it always asks for permission to
connect to the network on every startup.

So how to fix it?

## Generate a new certificate in Keychain Access

- Open Keychain Access and from the main menu open **Certificate Assistant** then click on **Create a Certificate**
- Fill out the follow:
  - Name: PHPStorm-network (can be any)
  - Identity: Self-Signed Root
  - Certificate Type: Code Signing
  - Leave the checkbox unchecked
- Click save then **Continue**

<Image src="certificate.png" alt="Keychain Access create certificate window" />

## Assign the Certificate to PHPStorm

Open your terminal and enter the following where “PHPStorm” is the name of the Certificate you just created and the
correct location for the PHPStorm.app

```shell
codesign -s "PHPStorm-network" -f /Applications/PhpStorm.app/
```

<Image src="console.png" alt="console codesign window" />

Now restart PHPStorm, and it will ask you one last time to verify the incoming network connections, and after that it
shouldn’t ask you again!
