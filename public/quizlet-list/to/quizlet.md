# Import a Word List into Quizlet

> Turn a plain word list into Quizlet's import format, one card per line with a tab between term and definition, then follow the exact import steps.

Source: https://shramko.dev/quizlet-list/to/quizlet · Author: Serhii Shramko · Published: 2026-10-16

Quizlet builds a flashcard set from pasted text. Every row becomes a card, and the term and definition on a row are split by a comma, a tab or a dash. Paste your words below, add a meaning after a tab or a dash where you have one, and copy the result into the **Import** box.

The formatter itself runs in your browser on [the HTML version of this page](https://shramko.dev/quizlet-list/to/quizlet).

## How to import into Quizlet

I checked these steps against Quizlet's official help on Oct 16, 2026.

1. Log in to Quizlet in a browser. Import only works on the website, not in the apps.
2. Select **Create**, then **Flashcard set**, and give the set a title.
3. Select **Import**.
4. Copy the formatted list from this page and paste it into the import field.
5. Make sure Quizlet reads a tab between term and definition and a new line between cards, then select **Import**.
6. Set the language for your terms and for your definitions.
7. Select **Create** to save the set.

## Before you import

### Words without a meaning

Quizlet QuickList saves the word only. Quizlet's help does not say what happens to a row with an empty definition, so check the preview before you create the set, or add each meaning here after a tab or a dash.

### Commas inside a definition

Quizlet also accepts a comma or a dash between term and definition. A definition such as `to run, to jog` stays whole only when the separator is a tab, which is what this formatter writes.

### Plain text only

The import reads plain text. Adding your own images to cards requires Quizlet Plus.

## Collect the words while you read

I built [Quizlet QuickList](https://shramko.dev/quizlet-list) for exactly this. Select a word on any page, right-click, choose **Add to Quizlet QuickList**, and copy the whole list when you are done. It is free, keeps the list in your browser, and is my own extension, not an official Quizlet tool.

- [Quizlet QuickList on Chrome Web Store](https://chromewebstore.google.com/detail/quizlet-quicklist/oagcgmfbkpelgahbgilehnmjajpgdflg?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=to-quizlet)
- [Quizlet QuickList on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/quizlet-quicklist/?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=to-quizlet)
- [Quizlet QuickList on Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/quizlet-quicklist/fpnjfdebfnhoecnljeohbnnnedhgdefn?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=to-quizlet)

## Related

- [Import a Word List into Anki](https://shramko.dev/quizlet-list/to/anki)
- [Import a Word List into RemNote](https://shramko.dev/quizlet-list/to/remnote)

## Further reading

- [Quizlet Help: Creating sets by importing content](https://help.quizlet.com/hc/en-us/articles/360029977151-Creating-sets-by-importing-content)
- [Quizlet Help: Adding your own images to sets](https://help.quizlet.com/hc/en-us/articles/360030154311-Adding-your-own-images-to-sets)
