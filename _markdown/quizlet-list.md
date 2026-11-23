---
title: Save Words from Any Page for Quizlet and Anki
description: Quizlet QuickList is a free browser extension for Chrome, Firefox and Edge. Select a word on any page, right-click to save it to a list, then copy the list into Quizlet or export it as TSV or CSV for Anki, Google Sheets or Excel.
---

**Quizlet QuickList** is a free browser extension that collects unfamiliar words while you read. Select a word on any web page, right-click, choose **Add to Quizlet QuickList**, and keep reading. When you are done, paste the list into Quizlet or export it for Anki or a spreadsheet.

<StoreRating app="quizlet-list" />

- **Price:** free, no account needed.
- **Browsers:** Chrome, Firefox and Microsoft Edge.
- **Privacy:** lists are stored in your browser, with no account and no server.
- **Permissions:** `contextMenus` and `storage` only.
- **Made by:** Serhii Shramko. It is an independent extension, not affiliated with or endorsed by Quizlet.

I built it because stopping to copy each new word while reading in a foreign language breaks the reading. With the extension, collecting a word takes one right-click.

<InstallLinks app="quizlet-list" campaign="quizlet-list" />

## How it works

### 1. Install the extension

Install Quizlet QuickList from the Chrome Web Store, Firefox Add-ons or Microsoft Edge Add-ons. The links are above.

### 2. Add a word

Select a word on any page, right-click and choose **Add to Quizlet QuickList**. Or type it into the "Add a new word..." field in the popup and press Enter. The extension capitalizes the first letter, and it skips a word that is already on the active list.

### 3. Pick a list

Keep Spanish words in one list and SAT prep in another. Click **+** to start a new list and pick one from the dropdown to switch. The pencil button opens "Your Lists", where you can rename or delete a list. New words go to the active list, and the toolbar icon shows how many words it has.

### 4. Copy or export the list

- **Copy to Clipboard** copies the active list, one word per line, and shows "Copied!" when it is done.
- **Export TSV** and **Export CSV** download the list as a file.
- **Clear** empties the active list.

## Features

- **Right-click to add:** select a word on any page and save it from the context menu.
- **Named lists:** keep a separate list for each language or subject and switch between them in the popup.
- **No duplicates:** a word already on the active list is not added twice.
- **Word count:** the toolbar icon shows how many words the active list has.
- **Copy or export:** copy the list one word per line, or download it as a TSV or CSV file.
- **Private:** lists are stored in your browser, with no account and no server.
- **Free:** it costs nothing and works in Chrome, Firefox and Edge.

## Export to Quizlet, Anki or a spreadsheet

**Quizlet:** Quizlet imports pasted text on its website. Start a new set, click **Import** and paste the list. Quizlet reads one card per line, with a tab, comma or dash between term and definition.

**Anki, Google Sheets or Excel:** click **Export TSV** or **Export CSV** and import the file there.

Quizlet cannot open a CSV file, so [paste a CSV into Quizlet](/quizlet-list/quizlet-import-csv) through its Import box instead.

## Add the meanings before you import

The extension saves the word itself, not its meaning, so a copied list has no definitions yet. These free formatters turn the list into each app's import format, with room for a meaning on every line, and walk through the import step by step:

- [Import a Word List into Quizlet](/quizlet-list/to/quizlet)
- [Import a Word List into Anki](/quizlet-list/to/anki)
- [Import a Word List into RemNote](/quizlet-list/to/remnote)

## Technical details

- **Framework:** [Plasmo](https://www.plasmo.com/)
- **UI:** [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Permissions:** `contextMenus` and `storage` only

## FAQ

### Is Quizlet QuickList free?

Yes, it is free to use.

### Do I need a Quizlet account to use Quizlet QuickList?

No. The extension works without any account, and you can paste the list into Quizlet whenever you want flashcards.

### Does Quizlet QuickList save the meaning of a word?

No. It saves the word itself. Add the meanings in your flashcard app, or in the free formatters for [Quizlet](/quizlet-list/to/quizlet), [Anki](/quizlet-list/to/anki) and [RemNote](/quizlet-list/to/remnote) on this site.

### Can I use Quizlet QuickList on any website?

Yes. As long as you can highlight the text, you can add words to your list.

### Is Quizlet QuickList made by Quizlet?

No. It is an independent extension I built, and it is not affiliated with or endorsed by Quizlet. Quizlet does not make a browser extension of its own, and [the Quizlet extensions in the Chrome Web Store](/quizlet-list/quizlet-chrome-extension) come from other developers.

### Where can I find the privacy policy?

On the [privacy policy page](/quizlet-list/privacy-policy).

## Install Quizlet QuickList

It is free for Chrome, Firefox and Edge.

<InstallLinks app="quizlet-list" campaign="quizlet-list" />

Your lists stay in your browser. The [privacy policy](/quizlet-list/privacy-policy) has the details.
