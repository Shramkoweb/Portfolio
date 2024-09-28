---
title: How to Get the Current URL with JavaScript (2024 Update)
heading: How to get the current URL with JavaScript
description: Learn different methods to retrieve the current URL using JavaScript for analytics tracking, dynamic content updates, and more.
createDate: 2024-03-20T23:39:45.492Z
keywords: [how to get the current URL with javaScript, URL, window.location, document.URL, location.pathname, URLSearchParams, query parameters]
---

When working with JavaScript, accessing the current page's URL is a common task for various purposes like analytics tracking, dynamic content updates, and more. In this guide, we'll explore different methods to achieve this.

## 1. Using `window.location`

The most straightforward method is by utilizing the `window.location` object, which contains information about the current URL, including the protocol, host, pathname, search parameters, and more.

```javascript
const currentURL = window.location.href;
console.log("Current URL:", currentURL);
```

This will return the complete URL of the current page, including any hash or query parameters.

## 2. Using `document.URL`

Another approach is by accessing the `document.URL` property, which provides the same result as `window.location.href`.

```javascript
const currentURL = document.URL;
console.log("Current URL:", currentURL);
```

## 3. Using `location.pathname`

If you only need the path part of the URL (without the protocol, host, or query parameters), you can use the `location.pathname` property.

```javascript
const path = window.location.pathname;
console.log("Current Path:", path);
```

This will return the path portion of the URL.

## Conclusion

These examples cover various methods to retrieve different parts of the current URL using JavaScript. Additionally, you can refer to the MDN Web Docs for more information on the [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location) interface and its properties.
