---
title: "Mastering Cross-Browser Compatibility: A Comprehensive Guide to Testing"
heading: Cross-browser testing
description: Cross-browser testing and how to test your site with Browserstack
createDate: 2023-02-24T22:06:42.844Z
updateData: 2023-02-24T22:06:42.844Z
keywords: [browserstack, browserstack dev tools, android browser with dev tools, browserstack devices, browser with developer tools for ios]
categories: [Tutorial, Useful-Resources, Project-Setup]
featured: false
---

<Image src="browsers.jpg" alt="Different browsers logo on gradient background" />

During site development, we usually test our site only in the browser installed on our computer, but in the world of
browsers there are dozens, and maybe even thousands, of versions.

Therefore, cross-browser development and testing are considered a good tone in site development.

## Cross-browser development

Cross-browser development is when your site works not only in the latest Google Chrome, but also in Firefox, Safari,
Opera and Microsoft Edge, plus mobile browsers and tablets.

There are many methods and ways for such development, such
as [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix), [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill),
responsive design and [much more](https://ishadeed.com/article/cross-browser-development/).

I will write about all this in the next article, and today we will talk only about cross-browser testing and tools.

## Cross-browser testing

But how to check that the site you created looks and works the same on different browsers and devices?

The first thought that comes to mind is to install all your browsers on your computer and check everything there, but
there are several limitations here:

- Browser versions ( Usually you install the latest version )
- Operating systems ( You will not be able to install Safari on Windows )
- Devices ( How to check that your site works on an old iPhone )

All these questions are solved by the tools that we will discuss with you today.

## Browserstack

What is Browserstack? It is cross browser testing tools that help us to test our sites on real devices and operating
systems remotely. From Windows to macOS and iPhone.

<Image src="browserstack.jpg" alt="Browserstack main page UI" />

### Device test

Browserstack allows you to test your site on different devices. To do this, it is enough to select the device and
browser you need and that's it, everything is ready for testing.

<Image src="pixel-pro.jpg" alt="Google Pixel 7 testing screen in Browserstack" />


The screenshot shows that the site is not just running in an emulator, but is a real device (Google Pixel 7Pro) with a
serial number.

> Serial Number - 2B101FDH30XXXX

### Testing with different OS

Remember those green fields on the Windows XP? In just a couple of clicks, you can start a real computer
and test your site without installing Windows ☠️.

<Image src="windows-xp.jpg" alt="shramko.dev website on Windows XP" />

### Multi browser testing

If you want to quickly see how the site looks on many devices and browsers, you can
take [screenshots](https://www.browserstack.com/screenshots) of the pages you want.

<img src="/static/images/screenshots.gif" alt="Animated image with how site can look on browserstack app"/>

Yes, I know that my site does not work on IE. I did it on purpose. [IE 11 Must die](https://death-to-ie11.com/) 👾

### Browserstack developer tools

Sometimes bugs appear in a specific version of a browser or on a device, so you may not only need to look at the site
visually and click on it, but also open the developer tools in the browser and try to find the bug and fix it.

Browserstack can help with this. The DevTools tab opened familiar developer tools such as `Console`, `Network` and
others.

<Image src="dev-tools.jpg" alt="Developer tools" />

At this moment, several options are supported on the mobile phone:

- Safari developer tools
- Chrome developer tools

More on the desktop:

- Firefox developer tools
- Safari developer tools
- Chrome developer tools
- Internet Explorer developer tools

### Local testing

It is also possible to launch not only by URL, but also a local site on localhost.

To do this, you need to update the BrowserStackLocal application and follow
the [instructions](https://www.browserstack.com/docs/live/local-testing).

### Browserstack alternatives

Unfortunately, I've only worked with this tool and don't have the experience to recommend anything else, but you can
always [look at the competitors](https://www.g2.com/products/browserstack/competitors/alternatives) and try it
yourself.
