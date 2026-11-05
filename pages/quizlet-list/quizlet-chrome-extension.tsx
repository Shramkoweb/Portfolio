import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { ArticleDates } from '@/components/article-dates';
import { ArticleMeta } from '@/components/article-meta';
import { InstallLinks } from '@/components/install-links';
import { MEDIA_QUERIES } from '@/lib/breakpoints';
import {
  QUIZLET_APP_RATING,
  QUIZLET_APP_STORES,
  SITE_URL,
} from '@/lib/constants';
import { parsePostDate } from '@/lib/posts/utils';
import { Routes } from '@/lib/routes';
import {
  generateBreadcrumbSchema,
  generateGuideSchema,
  serializeJsonLd,
} from '@/lib/schema';

import readingImage from '../../public/static/images/quizlet-list/quizlet-quicklist-reading.png';

const QUIZLET_IMPORT_HELP =
  'https://help.quizlet.com/hc/en-us/articles/360029977151-Creating-sets-by-importing-content';
const QUIZLET_EXPORT_HELP =
  'https://help.quizlet.com/hc/en-us/articles/360034345672-Exporting-your-sets';

const CREATE_DATE = parsePostDate('2026-11-05') ?? 0;
const HEADING = 'Is There a Quizlet Chrome Extension?';
const DESCRIPTION =
  'Quizlet makes no browser extension. What the Quizlet extensions in the Chrome Web Store actually do, and a free one that collects words for your Quizlet sets.';
const KEYWORDS = [
  'quizlet chrome extension',
  'quizlet extension',
  'official quizlet extension',
  'quizlet browser extension',
  'quizlet anki chrome extension',
  'save words to quizlet',
];

const EXTENSIONS = [
  {
    name: 'Knowt',
    url: 'https://chromewebstore.google.com/detail/knowt-quizlet-import-ai-n/akegecpdcdbkjioddaingaedacjgfjhm',
    does: 'Imports flashcards and notes from flashcard sites, videos, PDFs and articles into Knowt',
    users: '200,000',
    updated: '4 Nov 2026',
  },
  {
    name: 'Quizlet Exporter',
    url: 'https://chromewebstore.google.com/detail/quizlet-exporter-export-f/lkoaedeomnobdibjfdfggjhoiiabpgkl',
    does: 'Exports Quizlet flashcards as JSON, CSV or text',
    users: '5,000',
    updated: '19 Jun 2025',
  },
  {
    name: 'Quizlet to Anki',
    url: 'https://chromewebstore.google.com/detail/quizlet-to-anki/cgeebapijlelpceccbapfkpoaolbiccm',
    does: 'Turns Quizlet flashcards into Anki decks',
    users: '1,000',
    updated: '26 Jul 2025',
  },
  {
    name: 'QuizBridge',
    url: 'https://chromewebstore.google.com/detail/quizbridge/omadfbkdojofkioimegikmokdmdicogb',
    does: 'Sends vocabulary lists to Quizlet flashcards',
    users: '7',
    updated: '9 Feb 2025',
  },
];

const FAQ = [
  {
    question: 'Is there an official Quizlet Chrome extension?',
    answer:
      "No. Quizlet's help center has no article about a browser extension, and the Quizlet extensions in the Chrome Web Store are made by other developers.",
  },
  {
    question: 'Can a Chrome extension add words to my Quizlet sets?',
    answer:
      "Quizlet QuickList collects words from any page into a list that you paste into Quizlet's Import box on the website. It does not sign in to Quizlet or change your sets.",
  },
  {
    question: 'Can I export a Quizlet set to Anki?',
    answer:
      'If you created the set, Quizlet lets you copy its terms and definitions as text on the website. Save that text as a .txt file and import it in Anki. Sets you copied from another user cannot be exported, which is the gap the converter extensions fill.',
  },
  {
    question: 'Is Quizlet QuickList free?',
    answer:
      'Yes. It is free in Chrome, Firefox and Edge, needs no account, and keeps your lists in the browser.',
  },
];

function QuizletChromeExtensionPage() {
  return (
    <>
      <ArticleMeta
        title="Quizlet Chrome Extension: Is There an Official One?"
        heading={HEADING}
        description={DESCRIPTION}
        createDate={CREATE_DATE}
        updateDate={null}
        keywords={KEYWORDS}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              generateGuideSchema({
                path: Routes.QuizletChromeExtension(),
                heading: HEADING,
                description: DESCRIPTION,
                createDate: CREATE_DATE,
                keywords: KEYWORDS,
              }),
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              generateBreadcrumbSchema([
                { name: 'Home', url: SITE_URL },
                {
                  name: 'Quizlet QuickList',
                  url: `${SITE_URL}${Routes.QuizletList()}`,
                },
                {
                  name: 'Quizlet Chrome extension',
                  url: `${SITE_URL}${Routes.QuizletChromeExtension()}`,
                },
              ]),
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            }),
          }}
        />
      </Head>
      <article className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
              {HEADING}
            </h1>
            <ArticleDates createDate={CREATE_DATE} updateDate={null} />
          </div>
        </div>
        <div className="prose dark:prose-dark w-full max-w-none">
          <p>
            No. Quizlet does not make a browser extension. Its help center has
            no article about one, and the Quizlet extensions in the Chrome Web
            Store come from other developers. They fall into three groups, and
            only one of them helps you build your own sets.
          </p>

          <p>
            I made one of these extensions,{' '}
            <Link href={Routes.QuizletList()}>Quizlet QuickList</Link>, so keep
            that in mind as you read. User counts and dates come from each
            Chrome Web Store listing on 5 November 2026.
          </p>

          <h2>Extensions that copy sets out of Quizlet</h2>

          <p>
            Quizlet&#39;s{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={QUIZLET_EXPORT_HELP}
            >
              own export
            </a>{' '}
            works only for the creator of a set, only on the website, and gives
            you copied text. A set you copied from another user cannot be
            exported at all. Most Quizlet extensions fill that gap: Knowt moves
            sets into its own study app, Quizlet Exporter saves them as JSON,
            CSV or text, and Quizlet to Anki turns them into Anki decks.
          </p>

          <h2>Extensions that answer for you</h2>

          <p>
            Several of the most installed results fill in answers or complete
            Quizlet activities on their own. The largest, with 10,000 Chrome
            users, says it &ldquo;automatically completes every quizlet
            activity&rdquo;. That finishes the activity without the studying, so
            I leave them out of this page.
          </p>

          <h2>Extensions that add words to Quizlet</h2>

          <p>
            This group is for people who meet new words while reading and want
            them in a set later. Only two turned up in my search: QuizBridge,
            with 7 users and no update since February 2025, and Quizlet
            QuickList.
          </p>

          <p>
            With Quizlet QuickList you select a word on any page, right-click
            and choose <strong>Add to Quizlet QuickList</strong>. Words go into
            named lists, one per language or subject, a word already on the list
            is skipped, and the toolbar icon shows the count. When you finish
            reading, <strong>Copy to Clipboard</strong> copies the list one word
            per line, ready for Quizlet&#39;s Import box. It is free in Chrome,
            Firefox and Edge, needs no account, and asks only for the{' '}
            <code>contextMenus</code> and <code>storage</code> permissions.
          </p>

          <Image
            className="rounded-lg border border-gray-200 dark:border-gray-800"
            alt='A Spanish reading page titled "Un domingo en el mercado" with the word "entrañable" selected, and the Quizlet QuickList popup open at the top right showing the "Spanish" list of six words, an "Add a new word..." field, a "Copy to Clipboard" button and "Export TSV", "Export CSV" and "Clear" buttons.'
            src={readingImage}
            sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
          />

          <InstallLinks
            name="Quizlet QuickList"
            stores={QUIZLET_APP_STORES}
            medium="guide"
            campaign="quizlet-chrome-extension"
          />

          <h2>Get the words into a Quizlet set</h2>

          <p>
            Quizlet{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={QUIZLET_IMPORT_HELP}
            >
              builds a set from pasted text
            </a>
            , and only on its website. Sets you import there show up in the
            Quizlet apps afterwards.
          </p>

          <ol>
            <li>Collect the words with Quizlet QuickList while you read.</li>
            <li>
              Open the extension and click <strong>Copy to Clipboard</strong>.
            </li>
            <li>
              On the Quizlet website, select <strong>Create</strong>, then{' '}
              <strong>Flashcard set</strong>, and give the set a title.
            </li>
            <li>
              Select <strong>Import</strong> and paste the list. Each line
              becomes a card.
            </li>
            <li>
              Select <strong>Import</strong>, set the languages for terms and
              definitions, then select <strong>Create</strong>.
            </li>
          </ol>

          <p>
            The extension saves the word only, so the cards start without
            definitions. The free{' '}
            <Link href={Routes.FlashcardImport('quizlet')}>
              Quizlet formatter
            </Link>{' '}
            lets you add a meaning after each word before you paste. If your
            words are in a spreadsheet instead, see{' '}
            <Link href={Routes.QuizletImportCsv()}>
              how to import a CSV file into Quizlet
            </Link>
            .
          </p>

          <h2>One list for Quizlet and Anki</h2>

          <p>
            The &ldquo;Quizlet to Anki&rdquo; extensions convert a finished
            Quizlet set into an Anki deck. If you collect your own words, keep
            one list and send it to both: paste it into Quizlet, and click{' '}
            <strong>Export TSV</strong> or use the{' '}
            <Link href={Routes.FlashcardImport('anki')}>Anki formatter</Link>{' '}
            for Anki.
          </p>

          <h2>At a glance</h2>

          <table>
            <thead>
              <tr>
                <th>Extension</th>
                <th>What it does</th>
                <th>Chrome users</th>
                <th>Last updated</th>
              </tr>
            </thead>
            <tbody>
              {EXTENSIONS.map((extension) => (
                <tr key={extension.name}>
                  <td>
                    <a
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      href={extension.url}
                    >
                      {extension.name}
                    </a>
                  </td>
                  <td>{extension.does}</td>
                  <td>{extension.users}</td>
                  <td>{extension.updated}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <Link href={Routes.QuizletList()}>Quizlet QuickList</Link>
                </td>
                <td>
                  Saves words from any page into lists you copy into Quizlet or
                  export for Anki
                </td>
                <td>{QUIZLET_APP_RATING.users}</td>
                <td>7 Oct 2026</td>
              </tr>
            </tbody>
          </table>

          <h2>FAQ</h2>

          {FAQ.map((item) => (
            <div key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}

          <h2>Related</h2>

          <ul>
            <li>
              <Link href={Routes.QuizletList()}>
                Quizlet QuickList: save words from any page for Quizlet and Anki
              </Link>
            </li>
            <li>
              <Link href={Routes.QuizletImportCsv()}>
                How to import a CSV file into Quizlet
              </Link>
            </li>
            <li>
              <Link href={Routes.FlashcardImport('quizlet')}>
                Import a word list into Quizlet
              </Link>
            </li>
          </ul>

          <h2>Sources</h2>

          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={QUIZLET_IMPORT_HELP}
              >
                Quizlet Help: Creating sets by importing content
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={QUIZLET_EXPORT_HELP}
              >
                Quizlet Help: Exporting your sets
              </a>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}

export default QuizletChromeExtensionPage;
