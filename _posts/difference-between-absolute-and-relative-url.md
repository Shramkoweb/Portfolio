---
title: Difference between absolute and relative URL in HTML
description: Everything you need to know about link addresses. Absolute link vs relative
createDate: 2022-10-21T21:57:25.439Z
updateData: 2022-10-21T21:57:25.439Z
keywords: [absolute and relative links, absolute url example, absolute url html, absolute url, absolute url vs relative url, absolute or relative]
categories: [JS, HTML]
featured: true
---

I am a Frontend mentor in a [MacPaw internship](https://macpaw.com/internship) and sometimes my interns get confused 🫠
about how links work in HTML.

So I decided to write a small article about this topic.

## Anatomy of a URL

<abbr title="Uniform Resource Locator">URL</abbr> - is a string that indicates the address of a document or file on the
Internet.

<Image src="anatomy.png" alt="Anatomy of URL" inverted />

### Scheme

The first part of the URL is the scheme, which indicates the protocol that the browser must use to request the resource.
The protocol is usually HTTPS or HTTP, but can also be:

- ftp
- gopher
- file
- mailto
- and others

### Authority

Authority is the domain and optional port like `:80`.

Now you are in `shramko.dev` domain.

### Path to resource or file

```text
/blog/difference-between-absolute-and-relative-url
```

This is the path to the HTML file of this article. You can check it in the console if you write:

```javascript
window.location.pathname
```

## Relative links

These links will always be anchored to the place where they are located.
The browser will use the same protocol and the same domain.

### Relative to the root of the site

An important point, we add `/` to the address at the beginning.

```html
<a href="/about">About page</a>
```

<Image src="root-example.png" alt="Root example" inverted />

### Relative path from the current document

Similar to the previous example, but
the [path to the file](#path-to-resource-or-file) is saved.

An important point, we do not add `/` to the address at the beginning.

```html
<a href="category/js">JS category of Blog</a>
```

<Image src="location.png" alt="Location example" inverted />

## Absolute links

An absolute link is an address to a file or page as a whole, with all the above-described parts of
the <abbr title="Uniform Resource Locator">URL</abbr>. With such a link, regardless of where this link is located, you
will be able to get to the right resource.

You will be taken to any page or site exactly as indicated by a link of this type:

```html
<a href="https://shramko.dev/dashboard">My Dashboard</a>
```

You can not specify the protocol `http/https`, then the browser will automatically use the protocol on which the site
was loaded.

```html
<a href="//shramko.dev/dashboard">My Dashboard</a>
```

## Anchors (links by #id)

Anchor links are usually used to navigate the current page. For example, a link to a paragraph or heading.

The link below moves you to the section about [Anatomy of URL on this page](#anatomy-of-a-url).

Add `#anatomy-of-a-url` to the current URL in your browser.

## Cheat Sheet

Examples that we discussed today.

<Image src="cheat-sheet.png" alt="Links cheat" inverted />

## Useful links

- [Article about how my site works under the hood](https://shramko.dev/blog/introducing-the-new-shramko.dev)
- [Site where I drew pictures](https://okso.app/)
- [Nice tutorial about how DNS works](https://howdns.works/)
- [What is a URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)
