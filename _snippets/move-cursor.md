---
title: Move cursor to the end of input
description: How to move cursor to the end of input with JavaScript
createDate: 2023-03-22T00:11:17.662Z
keywords: [move cursor to the end of input, change cursor in javascript, javascript move cursor to end of contenteditable, javascript move cursor to beginning of input]
---

How to move the cursor to the beginning or end of an input field using JavaScript:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Move Cursor to Beginning/End of Input Field</title>
  </head>
  <body>
    <label for="myInput">Type something here:</label>
    <input id="myInput" type="text" value="Hello, World!">

    <button onclick="moveCursorToBeginning()">Move Cursor to Beginning</button>
    <button onclick="moveCursorToEnd()">Move Cursor to End</button>

    <script>
      function moveCursorToBeginning() {
        const input = document.getElementById("myInput");
        input.focus();
        input.setSelectionRange(0, 0);
      }

      function moveCursorToEnd() {
        const input = document.getElementById("myInput");
        const length = input.value.length;
        input.focus();
        input.setSelectionRange(length, length);
      }
    </script>
  </body>
</html>
```

In this example, we have an input field with an id of `myInput` and two buttons, each of which calls a JavaScript
function when clicked.

## Move cursor to beginning

The `moveCursorToBeginning` function first gets a reference to the input field
using [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).

It then calls the `focus()` method to set the input field as the active element and brings it into focus.

Finally, it calls
the [setSelectionRange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange) method to
set the selection range to the beginning of the input field (i.e., from index 0 to index 0).

```js
// Syntax
setSelectionRange(selectionStart, selectionEnd) // 0, 0 moved the cursor to the start
```

## Move cursor to the end

The `moveCursorToEnd` function works similarly, but instead of setting the selection range to the beginning of the input
field, it sets it to the end of the input field by passing in the `length` of the input field's value as both the start
and end index of the selection range.

By using these two functions, you can easily move the cursor to the beginning or end of an input field in JavaScript.

## Useful links

- [caniuse](https://caniuse.com/?search=setSelectionRange)
- [Demo](https://emgbkp.csb.app/)



