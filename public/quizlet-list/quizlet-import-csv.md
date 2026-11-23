# How to Import a CSV File into Quizlet

> Quizlet has no CSV upload. Its Import box takes pasted text, on the website only. How to paste a CSV, Excel or Google Sheets list so each row becomes one card.

Source: https://shramko.dev/quizlet-list/quizlet-import-csv · Author: Serhii Shramko · Published: 2026-11-05

**Short answer:** Quizlet cannot open a .csv file. Its Import box takes pasted text, and only on the website. To get a CSV into Quizlet, open it, copy the rows and paste them. Each row becomes one card. I checked the steps below against [Quizlet's help](https://help.quizlet.com/hc/en-us/articles/360029977151-Creating-sets-by-importing-content) on 5 November 2026.

## What the Import box reads

- **Between term and definition:** a comma, a tab or a dash.
- **Between cards:** a new line or a semicolon.
- **Cards:** each row becomes one card.

A CSV file already puts a comma between columns and a new line between rows, so a simple two-column CSV pastes as it is. Trouble starts when a term or definition contains a comma of its own.

## Import through a spreadsheet

This route keeps commas inside definitions intact.

1. Open the CSV in Google Sheets, Excel or Numbers. Put terms in the first column and definitions in the second.
2. Delete the header row if there is one, such as `term,definition`. Quizlet would turn it into a card.
3. Select the two columns of data and copy them. Spreadsheet cells copy with a tab between columns and a new line between rows.
4. On the Quizlet website, select **Create**, then **Flashcard set**, and give the set a title.
5. Select **Import** and paste. Make sure Quizlet reads a tab between term and definition and a new line between cards, then check the preview.
6. Select **Import**, set the languages for terms and definitions, then select **Create**.

## Paste the CSV text directly

You can also open the file in a text editor, copy everything and paste it with a comma between term and definition. That works while no field contains a comma. When one does, the CSV wraps that field in double quotes, and Quizlet's help says nothing about quoted fields. Check the preview for cards split in the wrong place or stray quote marks, and switch to the spreadsheet route if you see either.

## Limits worth knowing

- **Website only:** "You can currently only import flashcard sets on the website." Sets you import there appear in the iOS and Android apps.
- **Formatting:** bold, italic, underline and highlighting in sets are for Quizlet Plus subscribers.

## Words without definitions

If you collect vocabulary while you read, [Quizlet QuickList](https://shramko.dev/quizlet-list), a free extension I built, saves each word you select on a page. Its **Export CSV** button writes one word per line followed by a comma, with the definition left empty. For Quizlet, **Copy to Clipboard** is simpler: it copies the list one word per line. To add the meanings first, paste the list into the free [Quizlet formatter](https://shramko.dev/quizlet-list/to/quizlet), which puts a tab between each word and its meaning.

- [Quizlet QuickList on Chrome Web Store](https://chromewebstore.google.com/detail/quizlet-quicklist/oagcgmfbkpelgahbgilehnmjajpgdflg?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=quizlet-import-csv)
- [Quizlet QuickList on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/quizlet-quicklist/?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=quizlet-import-csv)
- [Quizlet QuickList on Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/quizlet-quicklist/fpnjfdebfnhoecnljeohbnnnedhgdefn?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=quizlet-import-csv)

## Export a Quizlet set to CSV

Quizlet has no CSV download either. If you created the set, open it on the website, select the more menu, then **Export**, choose how terms and definitions are arranged and select **Copy text**. Paste the text into a spreadsheet and save it as CSV. Per [Quizlet's help](https://help.quizlet.com/hc/en-us/articles/360034345672-Exporting-your-sets), a set you copied from another user cannot be exported.

## FAQ

### Can Quizlet import a CSV file?

Not as a file. Quizlet imports pasted text on its website, so open the CSV, copy the rows and paste them into the Import box. Each row becomes a card.

### How do I import an Excel or Google Sheets list into Quizlet?

Put terms in one column and definitions in the next, copy both columns and paste them into Quizlet's Import box. Spreadsheet cells paste with a tab between columns, which keeps commas inside definitions intact.

### Can I import into Quizlet from the mobile app?

No. Quizlet's help says import works only on the website. Sets you import there appear in the iOS and Android apps.

### Can I export a Quizlet set as a CSV?

Only as copied text, and only for sets you created. Paste the exported text into a spreadsheet and save it as CSV.

## Related

- [Import a word list into Quizlet: free formatter](https://shramko.dev/quizlet-list/to/quizlet)
- [Is there a Quizlet Chrome extension?](https://shramko.dev/quizlet-list/quizlet-chrome-extension)
- [Import a word list into Anki](https://shramko.dev/quizlet-list/to/anki)

## Sources

- [Quizlet Help: Creating sets by importing content](https://help.quizlet.com/hc/en-us/articles/360029977151-Creating-sets-by-importing-content)
- [Quizlet Help: Exporting your sets](https://help.quizlet.com/hc/en-us/articles/360034345672-Exporting-your-sets)
