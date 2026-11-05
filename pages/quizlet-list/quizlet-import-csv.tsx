import Head from 'next/head';
import Link from 'next/link';

import { ArticleDates } from '@/components/article-dates';
import { ArticleMeta } from '@/components/article-meta';
import { InstallLinks } from '@/components/install-links';
import { QUIZLET_APP_STORES, SITE_URL } from '@/lib/constants';
import { parsePostDate } from '@/lib/posts/utils';
import { Routes } from '@/lib/routes';
import {
  generateBreadcrumbSchema,
  generateGuideSchema,
  serializeJsonLd,
} from '@/lib/schema';

const QUIZLET_IMPORT_HELP =
  'https://help.quizlet.com/hc/en-us/articles/360029977151-Creating-sets-by-importing-content';
const QUIZLET_EXPORT_HELP =
  'https://help.quizlet.com/hc/en-us/articles/360034345672-Exporting-your-sets';

const CREATE_DATE = parsePostDate('2026-11-05') ?? 0;
const HEADING = 'How to Import a CSV File into Quizlet';
const DESCRIPTION =
  'Quizlet has no CSV upload. Its Import box takes pasted text, on the website only. How to paste a CSV, Excel or Google Sheets list so each row becomes one card.';
const KEYWORDS = [
  'quizlet import csv',
  'csv to quizlet',
  'import excel into quizlet',
  'quizlet import from google sheets',
  'quizlet import format',
  'quizlet export csv',
];

const FAQ = [
  {
    question: 'Can Quizlet import a CSV file?',
    answer:
      'Not as a file. Quizlet imports pasted text on its website, so open the CSV, copy the rows and paste them into the Import box. Each row becomes a card.',
  },
  {
    question: 'How do I import an Excel or Google Sheets list into Quizlet?',
    answer:
      "Put terms in one column and definitions in the next, copy both columns and paste them into Quizlet's Import box. Spreadsheet cells paste with a tab between columns, which keeps commas inside definitions intact.",
  },
  {
    question: 'Can I import into Quizlet from the mobile app?',
    answer:
      "No. Quizlet's help says import works only on the website. Sets you import there appear in the iOS and Android apps.",
  },
  {
    question: 'Can I export a Quizlet set as a CSV?',
    answer:
      'Only as copied text, and only for sets you created. Paste the exported text into a spreadsheet and save it as CSV.',
  },
];

function QuizletImportCsvPage() {
  return (
    <>
      <ArticleMeta
        title="Quizlet Import CSV: How to Get a CSV File into Quizlet"
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
                path: Routes.QuizletImportCsv(),
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
                  name: 'Import a CSV into Quizlet',
                  url: `${SITE_URL}${Routes.QuizletImportCsv()}`,
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
            Quizlet cannot open a .csv file. Its Import box takes pasted text,
            and only on the website. To get a CSV into Quizlet, open it, copy
            the rows and paste them, and each row becomes one card. I checked
            the steps below against{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={QUIZLET_IMPORT_HELP}
            >
              Quizlet&#39;s help
            </a>{' '}
            on 5 November 2026.
          </p>

          <h2>What the Import box reads</h2>

          <ul>
            <li>
              <strong>Between term and definition:</strong> a comma, a tab or a
              dash.
            </li>
            <li>
              <strong>Between cards:</strong> a new line or a semicolon.
            </li>
            <li>
              <strong>Cards:</strong> each row becomes one card.
            </li>
          </ul>

          <p>
            A CSV file already puts a comma between columns and a new line
            between rows, so a simple two-column CSV pastes as it is. Trouble
            starts when a term or definition contains a comma of its own.
          </p>

          <h2>Import through a spreadsheet</h2>

          <p>This route keeps commas inside definitions intact.</p>

          <ol>
            <li>
              Open the CSV in Google Sheets, Excel or Numbers. Put terms in the
              first column and definitions in the second.
            </li>
            <li>
              Delete the header row if there is one, such as{' '}
              <code>term,definition</code>. Quizlet would turn it into a card.
            </li>
            <li>
              Select the two columns of data and copy them. Spreadsheet cells
              copy with a tab between columns and a new line between rows.
            </li>
            <li>
              On the Quizlet website, select <strong>Create</strong>, then{' '}
              <strong>Flashcard set</strong>, and give the set a title.
            </li>
            <li>
              Select <strong>Import</strong> and paste. Make sure Quizlet reads
              a tab between term and definition and a new line between cards,
              then check the preview.
            </li>
            <li>
              Select <strong>Import</strong>, set the languages for terms and
              definitions, then select <strong>Create</strong>.
            </li>
          </ol>

          <h2>Paste the CSV text directly</h2>

          <p>
            You can also open the file in a text editor, copy everything and
            paste it with a comma between term and definition. That works while
            no field contains a comma. When one does, the CSV wraps that field
            in double quotes, and Quizlet&#39;s help says nothing about quoted
            fields. Check the preview for cards split in the wrong place or
            stray quote marks, and switch to the spreadsheet route if you see
            either.
          </p>

          <h2>Limits worth knowing</h2>

          <ul>
            <li>
              <strong>Website only:</strong> &ldquo;You can currently only
              import flashcard sets on the website.&rdquo; Sets you import there
              appear in the iOS and Android apps.
            </li>
            <li>
              <strong>Formatting:</strong> bold, italic, underline and
              highlighting in sets are for Quizlet Plus subscribers.
            </li>
          </ul>

          <h2>Words without definitions</h2>

          <p>
            If you collect vocabulary while you read,{' '}
            <Link href={Routes.QuizletList()}>Quizlet QuickList</Link>, a free
            extension I built, saves each word you select on a page. Its{' '}
            <strong>Export CSV</strong> button writes one word per line followed
            by a comma, with the definition left empty. For Quizlet,{' '}
            <strong>Copy to Clipboard</strong> is simpler: it copies the list
            one word per line. To add the meanings first, paste the list into
            the free{' '}
            <Link href={Routes.FlashcardImport('quizlet')}>
              Quizlet formatter
            </Link>
            , which puts a tab between each word and its meaning.
          </p>

          <InstallLinks
            name="Quizlet QuickList"
            stores={QUIZLET_APP_STORES}
            medium="guide"
            campaign="quizlet-import-csv"
          />

          <h2>Export a Quizlet set to CSV</h2>

          <p>
            Quizlet has no CSV download either. If you created the set, open it
            on the website, select the more menu, then <strong>Export</strong>,
            choose how terms and definitions are arranged and select{' '}
            <strong>Copy text</strong>. Paste the text into a spreadsheet and
            save it as CSV. Per{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={QUIZLET_EXPORT_HELP}
            >
              Quizlet&#39;s help
            </a>
            , a set you copied from another user cannot be exported.
          </p>

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
              <Link href={Routes.FlashcardImport('quizlet')}>
                Import a word list into Quizlet: free formatter
              </Link>
            </li>
            <li>
              <Link href={Routes.QuizletChromeExtension()}>
                Is there a Quizlet Chrome extension?
              </Link>
            </li>
            <li>
              <Link href={Routes.FlashcardImport('anki')}>
                Import a word list into Anki
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

export default QuizletImportCsvPage;
