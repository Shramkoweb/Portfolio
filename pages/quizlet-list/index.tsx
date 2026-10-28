import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { InstallLinks } from '@/components/install-links';
import { PageMeta } from '@/components/page-meta';
import { StoreRating } from '@/components/store-rating';
import { MEDIA_QUERIES } from '@/lib/breakpoints';
import {
  QUIZLET_APP_OG_IMAGE,
  QUIZLET_APP_RATING,
  QUIZLET_APP_STORES,
  SITE_URL,
} from '@/lib/constants';
import { FLASHCARD_APP_SLUGS, FLASHCARD_APPS } from '@/lib/flashcard-apps';
import { Routes } from '@/lib/routes';
import { generateAggregateRatingSchema, serializeJsonLd } from '@/lib/schema';
import { withStoreUtm } from '@/lib/store-links';
import { registerView, whenVisible } from '@/lib/views';

import secondImage from '../../public/static/images/quizlet-list/quizlet-quicklist-2.png';
import fourthImage from '../../public/static/images/quizlet-list/quizlet-quicklist-4.png';
import listsImage from '../../public/static/images/quizlet-list/quizlet-quicklist-lists.png';
import popupImage from '../../public/static/images/quizlet-list/quizlet-quicklist-popup.png';
import readingImage from '../../public/static/images/quizlet-list/quizlet-quicklist-reading.png';

const storeLink = (url: string) => withStoreUtm(url, 'landing', 'quizlet-list');

function QuizletPage() {
  useEffect(
    () =>
      whenVisible(() => {
        void registerView('quizlet-page');
      }),
    [],
  );

  return (
    <>
      <PageMeta
        title="Quizlet QuickList: Save Words for Quizlet and Anki"
        description="Free browser extension: select a word on any page and right-click to save it to a list. Copy the list into Quizlet, or export a TSV or CSV file for Anki, Google Sheets or Excel."
        socialDescription="Save unfamiliar words from any page in one click, then copy them into Quizlet or export them for Anki."
        image={{
          url: QUIZLET_APP_OG_IMAGE,
          width: 880,
          height: 560,
          type: 'image/jpeg',
          alt: 'Quizlet QuickList browser extension',
        }}
      />
      <Head>
        <meta
          name="keywords"
          key="keywords"
          content="Quizlet QuickList, save words for Quizlet, Quizlet extension, Anki, Chrome extension, Firefox extension, vocabulary list, study word list, language learning tool, export to Quizlet, export to Anki"
        />
        <meta name="author" key="author" content="Serhii Shramko" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Quizlet QuickList',
              description:
                'A browser extension that saves selected words into lists and exports them for Quizlet, Anki or a spreadsheet.',
              url: 'https://shramko.dev/quizlet-list',
              image: QUIZLET_APP_OG_IMAGE,
              screenshot: [
                `${SITE_URL}/static/images/quizlet-list/quizlet-quicklist-reading.png`,
                `${SITE_URL}/static/images/quizlet-list/quizlet-quicklist-popup.png`,
                `${SITE_URL}/static/images/quizlet-list/quizlet-quicklist-lists.png`,
              ],
              featureList: [
                'Save a selected word from any page with the right-click menu',
                'Several named word lists',
                'Skips words that are already on the list',
                'Word count on the toolbar icon',
                'Copy a list to the clipboard, one word per line',
                'Export a list as a TSV or CSV file',
                'Lists stay in the browser, with no account and no server',
              ],
              author: {
                '@type': 'Person',
                '@id': 'https://shramko.dev/#person',
                name: 'Serhii Shramko',
                url: 'https://shramko.dev/about',
              },
              aggregateRating:
                generateAggregateRatingSchema(QUIZLET_APP_RATING),
              operatingSystem: 'Chrome, Firefox, Edge',
              applicationCategory: [
                'BrowserApplication',
                'EducationalApplication',
              ],
              offers: {
                '@type': 'Offer',
                priceCurrency: 'USD',
                price: '0.00',
                availability: 'https://schema.org/InStock',
                url: QUIZLET_APP_STORES.chrome,
              },
              downloadUrl: [
                QUIZLET_APP_STORES.chrome,
                QUIZLET_APP_STORES.firefox,
                QUIZLET_APP_STORES.edge,
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Is Quizlet QuickList free?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, it is free to use.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do I need a Quizlet account to use Quizlet QuickList?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. The extension works without any account, and you can paste the list into Quizlet whenever you want flashcards.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does Quizlet QuickList save the meaning of a word?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. It saves the word itself. Add the meanings in your flashcard app, or in the free formatters for Quizlet, Anki and RemNote on this site.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I use Quizlet QuickList on any website?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. As long as you can highlight the text, you can add words to your list.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is Quizlet QuickList made by Quizlet?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. It is an independent extension I built, and it is not affiliated with or endorsed by Quizlet.',
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <section className="prose dark:prose-dark flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Save Words from Any Page for Quizlet and Anki
        </h1>

        <StoreRating
          rating={{
            ...QUIZLET_APP_RATING,
            storeUrl: storeLink(QUIZLET_APP_RATING.storeUrl),
          }}
        />

        <p>
          When I read in a foreign language, I keep running into words I do not
          know. Stopping to copy each one and paste it somewhere to study later
          breaks the reading.
        </p>

        <p>
          So I built{' '}
          <strong>
            <a
              target="_blank"
              href={storeLink(QUIZLET_APP_STORES.chrome)}
              rel="noopener"
            >
              Quizlet QuickList
            </a>
          </strong>
          , a free browser extension. Select a word, right-click, and it goes on
          a list. When you finish reading, copy the list into Quizlet or export
          it for Anki or a spreadsheet.
        </p>

        <InstallLinks
          name="Quizlet QuickList"
          stores={QUIZLET_APP_STORES}
          medium="landing"
          campaign="quizlet-list"
        />

        <Image
          className="rounded-lg border border-gray-200 dark:border-gray-800"
          alt='A Spanish reading page titled "Un domingo en el mercado" with the word "entrañable" selected, and the Quizlet QuickList popup open at the top right showing the "Spanish" list of six words, an "Add a new word..." field, a "Copy to Clipboard" button and "Export TSV", "Export CSV" and "Clear" buttons.'
          src={readingImage}
          sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
          priority
        />

        <h2>How it works</h2>

        <h3>1. Install the extension</h3>

        <p>
          Install Quizlet QuickList from the{' '}
          <a
            target="_blank"
            href={storeLink(QUIZLET_APP_STORES.chrome)}
            rel="noopener noreferrer"
          >
            Chrome Web Store
          </a>
          ,{' '}
          <a
            target="_blank"
            href={storeLink(QUIZLET_APP_STORES.firefox)}
            rel="noopener noreferrer"
          >
            Firefox Add-ons
          </a>{' '}
          or{' '}
          <a
            target="_blank"
            href={storeLink(QUIZLET_APP_STORES.edge)}
            rel="noopener noreferrer"
          >
            Microsoft Edge Add-ons
          </a>
          .
        </p>

        <h3>2. Add a word</h3>

        <p>
          Select a word on any page, right-click and choose{' '}
          <strong>Add to Quizlet QuickList</strong>. Or type it into the
          &#34;Add a new word...&#34; field in the popup and press Enter. The
          extension capitalizes the first letter, and a word that is already on
          the active list is not added twice.
        </p>

        <Image
          role="presentation"
          alt={
            'A screenshot of a webpage displaying highlighted text. A context menu is opened, with the option "Add to Quizlet QuickList" highlighted. This indicates the ability to quickly add a selected word to the Quizlet QuickList extension from a webpage.'
          }
          src={secondImage}
          sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
        />

        <h3>3. Pick a list</h3>

        <p>
          Keep Spanish words in one list and SAT prep in another. Click{' '}
          <strong>+</strong> to start a new list and pick one from the dropdown
          to switch. The pencil button opens &#34;Your Lists&#34;, where you can
          rename or delete a list. New words go to the active list, and the
          toolbar icon shows how many words it has.
        </p>

        <Image
          className="rounded-lg border border-gray-200 dark:border-gray-800"
          alt='Two Quizlet QuickList popups side by side: the "Your Lists" screen with "SAT prep" active and "Spanish" below it with edit and delete icons, and the main screen showing the six "SAT prep" words.'
          src={listsImage}
          sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
        />

        <h3>4. Copy or export the list</h3>

        <p>
          Click <strong>Copy to Clipboard</strong> to copy the active list, one
          word per line. You will see &#34;Copied!&#34; when it is done.{' '}
          <strong>Export TSV</strong> and <strong>Export CSV</strong> download
          the list as a file, and <strong>Clear</strong> empties the active
          list.
        </p>

        <Image
          className="rounded-lg border border-gray-200 dark:border-gray-800"
          alt='The Quizlet QuickList popup with the "Spanish" list selected, six words, an "Add a new word..." field, a "Copy to Clipboard" button and "Export TSV", "Export CSV" and "Clear" buttons.'
          src={popupImage}
          sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
        />

        <h2>Features</h2>

        <ul>
          <li>
            <strong>Right-click to add:</strong> Select a word on any page and
            save it from the context menu.
          </li>
          <li>
            <strong>Named lists:</strong> Keep a separate list for each language
            or subject and switch between them in the popup.
          </li>
          <li>
            <strong>No duplicates:</strong> A word that is already on the active
            list is not added twice.
          </li>
          <li>
            <strong>Word count:</strong> The toolbar icon shows how many words
            the active list has.
          </li>
          <li>
            <strong>Copy or export:</strong> Copy the list one word per line, or
            download it as a TSV or CSV file.
          </li>
          <li>
            <strong>Private:</strong> Your lists are stored in your browser,
            with no account and no server.
          </li>
          <li>
            <strong>Free:</strong> It costs nothing and works in Chrome, Firefox
            and Edge.
          </li>
        </ul>

        <h2>Export to Quizlet, Anki or a spreadsheet</h2>

        <p>
          Quizlet imports pasted text on its website. Start a new set, click{' '}
          <strong>Import</strong> and paste the list. Quizlet reads one card per
          line, with a tab, comma or dash between term and definition.
        </p>

        <Image
          role="presentation"
          alt={
            'A screenshot showing the Quizlet flashcard set creation interface. On the left, the user is creating a flashcard set titled "My first flashcard set." Each flashcard has an English term and its corresponding Spanish definition.'
          }
          src={fourthImage}
          sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
        />

        <p>
          For Anki, Google Sheets or Excel, click <strong>Export TSV</strong> or{' '}
          <strong>Export CSV</strong> and import the file there.
        </p>

        <h2>Add the meanings before you import</h2>

        <p>
          The extension saves the word itself, not its meaning, so a copied list
          has no definitions yet. These free formatters turn the list into each
          app&#39;s import format, with room for a meaning on every line, and
          walk through the import step by step:
        </p>

        <ul>
          {FLASHCARD_APP_SLUGS.map((slug) => (
            <li key={slug}>
              <Link href={Routes.FlashcardImport(slug)}>
                {FLASHCARD_APPS[slug].heading}
              </Link>
            </li>
          ))}
        </ul>

        <h2>Technical details</h2>

        <ul>
          <li>
            <strong>Framework:</strong>{' '}
            <a
              target="_blank"
              rel="nofollow noopener"
              href="https://www.plasmo.com/"
            >
              Plasmo
            </a>
          </li>
          <li>
            <strong>UI:</strong>{' '}
            <a
              target="_blank"
              rel="nofollow noopener"
              href="https://react.dev/"
            >
              React
            </a>{' '}
            +{' '}
            <a
              target="_blank"
              rel="nofollow noopener"
              href="https://tailwindcss.com/"
            >
              Tailwind CSS
            </a>
          </li>
          <li>
            <strong>Language:</strong>{' '}
            <a
              target="_blank"
              rel="nofollow noopener"
              href="https://www.typescriptlang.org/"
            >
              TypeScript
            </a>
          </li>
          <li>
            <strong>Permissions:</strong> <code>contextMenus</code> and{' '}
            <code>storage</code> only
          </li>
        </ul>

        <h2>FAQ</h2>

        <h3>Is Quizlet QuickList free?</h3>
        <p>Yes, it is free to use.</p>

        <h3>Do I need a Quizlet account to use Quizlet QuickList?</h3>
        <p>
          No. The extension works without any account, and you can paste the
          list into Quizlet whenever you want flashcards.
        </p>

        <h3>Does Quizlet QuickList save the meaning of a word?</h3>
        <p>
          No. It saves the word itself. Add the meanings in your flashcard app,
          or in the free formatters for{' '}
          <Link href={Routes.FlashcardImport('quizlet')}>Quizlet</Link>,{' '}
          <Link href={Routes.FlashcardImport('anki')}>Anki</Link> and{' '}
          <Link href={Routes.FlashcardImport('remnote')}>RemNote</Link> on this
          site.
        </p>

        <h3>Can I use Quizlet QuickList on any website?</h3>
        <p>
          Yes. As long as you can highlight the text, you can add words to your
          list.
        </p>

        <h3>Is Quizlet QuickList made by Quizlet?</h3>
        <p>
          No. It is an independent extension I built, and it is not affiliated
          with or endorsed by Quizlet.
        </p>

        <h3>Where can I find the privacy policy?</h3>
        <p>
          On the{' '}
          <Link href="/quizlet-list/privacy-policy">privacy policy page</Link>.
        </p>

        <h2>Install Quizlet QuickList</h2>

        <p>It is free for Chrome, Firefox and Edge.</p>

        <InstallLinks
          name="Quizlet QuickList"
          stores={QUIZLET_APP_STORES}
          medium="landing"
          campaign="quizlet-list"
        />

        <p>
          Your lists stay in your browser. The{' '}
          <Link href="/quizlet-list/privacy-policy">privacy policy</Link> has
          the details.
        </p>
      </section>
    </>
  );
}

export default QuizletPage;
