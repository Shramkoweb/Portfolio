# Import a Word List into Anki

> Make an Anki-ready text file from a plain word list: UTF-8, tab-separated, with a #separator header so Anki never has to guess. Runs in your browser.

Source: https://shramko.dev/quizlet-list/to/anki · Author: Serhii Shramko · Published: 2026-10-16

Anki imports plain text files with one note per line. It guesses which separator a file uses, and a wrong guess splits your cards in odd places. The file made here starts with `#separator:Tab` and `#html:false`, so Anki reads every line as one note with the word on the front.

The formatter itself runs in your browser on [the HTML version of this page](https://shramko.dev/quizlet-list/to/anki).

## How to import into Anki

I checked these steps against Anki's official help on Oct 16, 2026.

1. Paste your words on this page and select **Download .txt**. The file is saved as UTF-8, which Anki requires.
2. Open Anki on your computer and choose **File**, then **Import**.
3. Select the downloaded file. Anki reads the header lines and sets the separator to Tab.
4. Pick the note type and the deck, check the fields in the preview, and select **Import**.

## Before you import

### Header lines need Anki 2.1.54 or newer

Older versions ignore `#separator:Tab` and fall back to guessing. Update Anki, or set the separator to Tab by hand in the import options.

### Duplicates

Anki decides whether a note already exists by its first field. By default it updates that note; the import options can ignore duplicates or add them as new notes.

### Quotes and angle brackets

A word with a double quote is wrapped in quotes with the inner quote doubled, the escaping the Anki manual describes. With `#html:false`, angle brackets and ampersands show up exactly as typed.

### Phones

AnkiDroid's manual says it can't import text files directly. Import on a computer, then sync the deck to your phone.

## Collect the words while you read

I built [Quizlet QuickList](https://shramko.dev/quizlet-list) for exactly this. Select a word on any page, right-click, choose **Add to Quizlet QuickList**, and copy the whole list when you are done. It is free, keeps the list in your browser, and is my own extension, not an official Quizlet or Anki tool.

- [Quizlet QuickList on Chrome Web Store](https://chromewebstore.google.com/detail/quizlet-quicklist/oagcgmfbkpelgahbgilehnmjajpgdflg?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=to-anki)
- [Quizlet QuickList on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/quizlet-quicklist/?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=to-anki)
- [Quizlet QuickList on Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/quizlet-quicklist/fpnjfdebfnhoecnljeohbnnnedhgdefn?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=to-anki)

## Related

- [Import a Word List into Quizlet](https://shramko.dev/quizlet-list/to/quizlet)
- [Import a Word List into RemNote](https://shramko.dev/quizlet-list/to/remnote)

## Further reading

- [Anki Manual: Text Files](https://docs.ankiweb.net/manual/importing/text-files)
- [AnkiDroid Manual](https://docs.ankidroid.org/)
