import type { ImportFormat } from '@/lib/word-list';

export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideNote {
  title: string;
  body: string;
}

export interface FlashcardApp {
  slug: ImportFormat;
  name: string;
  title: string;
  description: string;
  heading: string;
  keywords: string[];
  intro: string;
  download?: string;
  steps: string[];
  notes: GuideNote[];
  sources: GuideSource[];
  checkedAt: string;
}

export const FLASHCARD_APPS: Record<ImportFormat, FlashcardApp> = {
  quizlet: {
    slug: 'quizlet',
    name: 'Quizlet',
    title: 'Import a Word List into Quizlet: Free Formatter',
    description:
      "Turn a plain word list into Quizlet's import format, one card per line with a tab between term and definition, then follow the exact import steps.",
    heading: 'Import a Word List into Quizlet',
    keywords: [
      'quizlet import',
      'import word list into quizlet',
      'quizlet import format',
      'csv to quizlet',
      'quizlet flashcards from a list',
    ],
    intro:
      'Quizlet builds a flashcard set from pasted text. Every row becomes a card, and the term and definition on a row are split by a comma, a tab or a dash. Paste your words below, add a meaning after a tab or a dash where you have one, and copy the result into the **Import** box.',
    steps: [
      'Log in to Quizlet in a browser. Import only works on the website, not in the apps.',
      'Select **Create**, then **Flashcard set**, and give the set a title.',
      'Select **Import**.',
      'Copy the formatted list from this page and paste it into the import field.',
      'Make sure Quizlet reads a tab between term and definition and a new line between cards, then select **Import**.',
      'Set the language for your terms and for your definitions.',
      'Select **Create** to save the set.',
    ],
    notes: [
      {
        title: 'Words without a meaning',
        body: "Quizlet QuickList saves the word only. Quizlet's help does not say what happens to a row with an empty definition, so check the preview before you create the set, or add each meaning here after a tab or a dash.",
      },
      {
        title: 'Commas inside a definition',
        body: 'Quizlet also accepts a comma or a dash between term and definition. A definition such as `to run, to jog` stays whole only when the separator is a tab, which is what this formatter writes.',
      },
      {
        title: 'Plain text only',
        body: 'The import reads plain text. Adding your own images to cards requires Quizlet Plus.',
      },
    ],
    sources: [
      {
        label: 'Quizlet Help: Creating sets by importing content',
        url: 'https://help.quizlet.com/hc/en-us/articles/360029977151-Creating-sets-by-importing-content',
      },
      {
        label: 'Quizlet Help: Adding your own images to sets',
        url: 'https://help.quizlet.com/hc/en-us/articles/360030154311-Adding-your-own-images-to-sets',
      },
    ],
    checkedAt: '2026-10-16',
  },
  anki: {
    slug: 'anki',
    name: 'Anki',
    title: 'Import a Word List into Anki: Free Text File Maker',
    description:
      'Make an Anki-ready text file from a plain word list: UTF-8, tab-separated, with a #separator header so Anki never has to guess. Runs in your browser.',
    heading: 'Import a Word List into Anki',
    keywords: [
      'anki import',
      'import word list into anki',
      'anki text file import',
      'anki csv import',
      'anki separator header',
    ],
    intro:
      'Anki imports plain text files with one note per line. It guesses which separator a file uses, and a wrong guess splits your cards in odd places. The file made here starts with `#separator:Tab` and `#html:false`, so Anki reads every line as one note with the word on the front.',
    download: 'anki-import.txt',
    steps: [
      'Paste your words on this page and select **Download .txt**. The file is saved as UTF-8, which Anki requires.',
      'Open Anki on your computer and choose **File**, then **Import**.',
      'Select the downloaded file. Anki reads the header lines and sets the separator to Tab.',
      'Pick the note type and the deck, check the fields in the preview, and select **Import**.',
    ],
    notes: [
      {
        title: 'Header lines need Anki 2.1.54 or newer',
        body: 'Older versions ignore `#separator:Tab` and fall back to guessing. Update Anki, or set the separator to Tab by hand in the import options.',
      },
      {
        title: 'Duplicates',
        body: 'Anki decides whether a note already exists by its first field. By default it updates that note; the import options can ignore duplicates or add them as new notes.',
      },
      {
        title: 'Quotes and angle brackets',
        body: 'A word with a double quote is wrapped in quotes with the inner quote doubled, the escaping the Anki manual describes. With `#html:false`, angle brackets and ampersands show up exactly as typed.',
      },
      {
        title: 'Phones',
        body: "AnkiDroid's manual says it can't import text files directly. Import on a computer, then sync the deck to your phone.",
      },
    ],
    sources: [
      {
        label: 'Anki Manual: Text Files',
        url: 'https://docs.ankiweb.net/manual/importing/text-files',
      },
      {
        label: 'AnkiDroid Manual',
        url: 'https://docs.ankidroid.org/',
      },
    ],
    checkedAt: '2026-10-16',
  },
  remnote: {
    slug: 'remnote',
    name: 'RemNote',
    title: 'Import a Word List into RemNote as Flashcards',
    description:
      'Turn a word list into RemNote flashcard syntax, one "term >> definition" per line, and paste it straight into a document. Free formatter plus the steps.',
    heading: 'Import a Word List into RemNote',
    keywords: [
      'remnote flashcards',
      'import flashcards into remnote',
      'remnote import text',
      'remnote card syntax',
    ],
    intro:
      'RemNote does not need a file for flashcards. Text pasted into a document becomes cards when a line has `>>` between the front and the back. Paste your words below and the formatter writes them in that syntax.',
    steps: [
      'Paste your words on this page and copy the result.',
      'In RemNote, open the document where the cards should live.',
      'Paste the list. Each line becomes its own bullet, and every bullet with `>>` becomes a basic forward flashcard: the word on the front, the meaning on the back.',
    ],
    notes: [
      {
        title: 'Give every word a meaning',
        body: "Only a line with `>>` becomes a card. The formatter still writes `>>` after a word that has no meaning yet, but RemNote's help does not say what it does with an empty back, so fill the meanings in first.",
      },
      {
        title: 'Card syntax inside your words',
        body: '`>>`, `==`, `::` and `;;` are card syntax in RemNote, and its help does not say how to escape them. The formatter warns you when a word contains one.',
      },
      {
        title: 'Why paste instead of a CSV file',
        body: "RemNote's CSV import creates a table rather than plain flashcards, and free accounts can create up to three tables. For a word list, pasting is the simpler route.",
      },
    ],
    sources: [
      {
        label: 'RemNote Help: How to import flashcards from text',
        url: 'https://help.remnote.com/en/articles/9252072-how-to-import-flashcards-from-text',
      },
      {
        label: 'RemNote Help: Importing and exporting tables',
        url: 'https://help.remnote.com/en/articles/13771289-importing-and-exporting-tables',
      },
    ],
    checkedAt: '2026-10-16',
  },
};

export const FLASHCARD_APP_SLUGS = Object.keys(
  FLASHCARD_APPS,
) as ImportFormat[];

export function isFlashcardAppSlug(slug: unknown): slug is ImportFormat {
  return typeof slug === 'string' && Object.hasOwn(FLASHCARD_APPS, slug);
}
