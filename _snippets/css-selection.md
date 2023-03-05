---
title: CSS - Custom text selection
description: Changes the styling of text selection.
createDate: 2023-03-05T20:59:59.512Z
---

<Image src="css-hero.jpg" alt="Books about coding on the table" />

Custom text selection in CSS refers to the ability to style the text that is highlighted by a user when they select it
on a webpage. This can be a great way to add some visual flair and improve the user experience of your website. In this
article, we will go over the steps to implement custom text selection using CSS.

## Step 1: Select the text you want to style

First, you need to identify the text you want to style. You can do this by using a CSS selector to target a specific
element, such as a paragraph or a heading.

```css
p {
  /* styles for the paragraph */
}
```

## Step 2: Set the selection background color

Next, you can set the background color of the selected text using the ::selection pseudo-element.

```css
p::selection {
  background-color: yellow;
}
```

## Step 3: Set the selection text color

You can also change the color of the selected text using the ::selection pseudo-element.

```css
p::selection {
  background-color: yellow;
  color: black;
}
```

## Step 4: Add other styles as desired

Finally, you can add any other styles you want to the selected text, such as changing the font, font size, or adding a
border.

```css
p::selection {
  background-color: yellow;
  color: black;
  font-weight: bold;
  border: 1px solid black;
}
```

## Conclusion

That's it! With these simple steps, you can create a custom text selection that will make your website stand out and
improve the user experience. Keep in mind that not all browsers support all CSS selectors, so be sure to [test your code
on multiple browsers to ensure compatibility](/blog/cross-browser-testing).
