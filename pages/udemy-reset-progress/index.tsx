import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { PageMeta } from '@/components/page-meta';
import { StoreRating } from '@/components/store-rating';
import { UdemyPacingModes } from '@/components/udemy-pacing-modes';
import {
  UDEMY_RESET_APP_OG_IMAGE,
  UDEMY_RESET_APP_RATING,
  UDEMY_RESET_APP_STORES,
} from '@/lib/constants';
import { Routes } from '@/lib/routes';
import { generateAggregateRatingSchema, serializeJsonLd } from '@/lib/schema';
import { withStoreUtm } from '@/lib/store-links';
import { registerView, whenVisible } from '@/lib/views';

import chromeStore from '../../public/static/images/chrome-store.png';
import firefoxStore from '../../public/static/images/firefox-store.webp';

const storeLink = (url: string) =>
  withStoreUtm(url, 'landing', 'udemy-reset-progress');

function UdemyResetProgressPage() {
  useEffect(
    () =>
      whenVisible(() => {
        void registerView('udemy-reset-progress-page');
      }),
    [],
  );
  return (
    <>
      <PageMeta
        title="How to Reset Udemy Course Progress: By Hand or in One Click"
        description="Udemy has no button that resets a whole course. Uncheck lectures one by one, or clear every checkbox in one click with a free, open-source extension for Chrome, Firefox and Edge."
        socialDescription="Udemy has no reset button. How to uncheck lectures by hand, and how to clear a whole course in one click with a free extension."
        image={{
          url: UDEMY_RESET_APP_OG_IMAGE,
          width: 1280,
          height: 800,
          type: 'image/png',
          alt: 'Udemy Reset Progress browser extension',
        }}
      />
      <Head>
        <meta
          name="keywords"
          key="keywords"
          content="reset Udemy course progress, Udemy reset progress, how to reset Udemy course, restart Udemy course, clear Udemy progress, uncheck Udemy lectures, Udemy course reset tool"
        />
        <meta name="author" key="author" content="Serhii Shramko" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Udemy Reset Progress',
              description:
                'A browser extension that clears, or marks complete, every lecture checkbox in a Udemy course with one click.',
              url: 'https://shramko.dev/udemy-reset-progress',
              image: UDEMY_RESET_APP_OG_IMAGE,
              license: 'https://www.gnu.org/licenses/agpl-3.0.html',
              author: {
                '@type': 'Person',
                '@id': 'https://shramko.dev/#person',
                name: 'Serhii Shramko',
                url: 'https://shramko.dev/about',
              },
              aggregateRating: generateAggregateRatingSchema(
                UDEMY_RESET_APP_RATING,
              ),
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
                url: UDEMY_RESET_APP_STORES.chrome,
              },
              downloadUrl: [
                UDEMY_RESET_APP_STORES.chrome,
                UDEMY_RESET_APP_STORES.firefox,
                UDEMY_RESET_APP_STORES.edge,
              ],
            }),
          }}
        />
      </Head>

      <section className="prose dark:prose-dark flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          How to Reset Udemy Course Progress
        </h1>

        <StoreRating
          rating={{
            ...UDEMY_RESET_APP_RATING,
            storeUrl: storeLink(UDEMY_RESET_APP_RATING.storeUrl),
          }}
        />

        <p>
          Udemy has no button that resets a whole course. Its help center only
          describes unchecking lectures one at a time in the course content
          list. That is fine for a short course. For a long one, the free{' '}
          <strong>Udemy Reset Progress</strong> extension clears every checkbox
          for you.
        </p>

        <h2>Reset Progress by Hand</h2>

        <ol>
          <li>Open the course player.</li>
          <li>Find the course content list on the right-hand side.</li>
          <li>
            Click the checkmark beside each completed lecture to remove it.
          </li>
        </ol>

        <p>
          Udemy marks a lecture complete on its own once you have watched every
          minute of it, so the checkmarks come back as you rewatch. Its help
          also notes that assignments cannot be unmarked as complete (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://web.archive.org/web/20230924/https://support.udemy.com/hc/en-us/articles/229607188-How-to-Mark-or-Unmark-Lectures-as-Complete-on-a-Browser-"
          >
            archived Udemy help article
          </a>
          ).
        </p>

        <h2>Reset Progress in One Click</h2>

        <video
          loop
          autoPlay
          muted
          playsInline
          aria-label="Demo of Udemy Reset Progress extension resetting a course"
          className="mb-6 mx-auto mt-10"
        >
          <source
            src="/static/images/udemy-progress-reset/video.mp4"
            type="video/mp4"
          />
        </video>

        <h3>Installation</h3>

        <div className="flex gap-8 justify-center items-center">
          <a
            target="_blank"
            rel="nofollow noopener"
            href={storeLink(UDEMY_RESET_APP_STORES.chrome)}
            aria-label="Udemy Reset Progress on Chrome Web Store"
            className="transition-transform duration-200 ease-out-expo hover:scale-[1.02] active:scale-[0.97]"
          >
            <Image
              className="w-44 border border-gray-200 dark:border-gray-800 rounded-lg"
              role="presentation"
              alt="Download Udemy Reset Progress for Chrome"
              src={chromeStore}
              sizes="176px"
            />
          </a>
          <a
            target="_blank"
            rel="nofollow noopener"
            href={storeLink(UDEMY_RESET_APP_STORES.firefox)}
            aria-label="Udemy Reset Progress on Firefox Add-ons"
            className="transition-transform duration-200 ease-out-expo hover:scale-[1.02] active:scale-[0.97]"
          >
            <Image
              className="w-39"
              role="presentation"
              src={firefoxStore}
              alt="Download Udemy Reset Progress for Firefox"
              sizes="156px"
            />
          </a>
        </div>

        <h3>Step by Step</h3>

        <ol>
          <li>
            Install the Udemy Reset Progress extension from your browser&#39;s
            store
          </li>
          <li>Open the course player, with the course content list visible</li>
          <li>Click the extension icon in your browser toolbar</li>
          <li>
            Click the &#34;Clear Progress&#34; button and keep the tab open
            until it finishes
          </li>
          <li>Reload the page: every lecture checkbox is now clear</li>
        </ol>

        <h2>Why Choose Our Udemy Reset Progress Extension?</h2>

        <ul>
          <li>
            <strong>One-click reset ⚡️:</strong> Clear all course progress from
            the extension popup
          </li>
          <li>
            <strong>Works on all Udemy courses 📚:</strong> Reset progress on
            any course you&#39;re enrolled in
          </li>
          <li>
            <strong>100% Free with no ads 🆓:</strong> Download now for Chrome,
            Firefox, or Edge
          </li>
          <li>
            <strong>Privacy focused 🔒:</strong> No data collection - everything
            happens locally in your browser
          </li>
          <li>
            <strong>Speed modes:</strong> Slow down on long courses so Udemy
            does not end your session
          </li>
          <li>
            <strong>Open source:</strong> AGPL-3.0, with the code on GitHub
          </li>
        </ul>

        <h2>Speed Modes</h2>

        <p>
          The extension clicks the same checkboxes you would, one after another.
          Clicking hundreds of them in a few seconds can end your Udemy session,
          so it waits between clicks and pauses after every batch. Pick a mode
          in the extension settings:
        </p>

        <UdemyPacingModes />

        <p>
          Auto currently uses the Balanced settings. If Udemy logs you out
          halfway, log back in and run it again in Safe mode. The{' '}
          <Link href={Routes.UdemyTroubleshooting()}>troubleshooting page</Link>{' '}
          covers that and every error message.
        </p>

        <h2>Mark All Complete and Certificates</h2>

        <p>
          The popup also has a &#34;Mark All Complete&#34; button, which ticks
          every unchecked box. Udemy issues a certificate of completion for a
          paid course once every curriculum item is complete (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://success.udemy.com/s/article/229603868"
          >
            Udemy help
          </a>
          ), and that certificate says you completed the course. Use the button
          for material you have already worked through, not to skip a course.
        </p>

        <h2>Limitations</h2>

        <ul>
          <li>
            It needs the course content list. If the popup says &#34;Open a
            Udemy course page first&#34;, open the course player and make sure
            the list is on screen.
          </li>
          <li>
            Udemy is piloting a new course experience without the &#34;mark
            lecture as complete&#34; function (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://web.archive.org/web/20260216/https://support.udemy.com/hc/en-us/articles/34345830524183-Udemy-s-New-Course-Experience-Frequently-Asked-Questions"
            >
              archived Udemy FAQ
            </a>
            ). Courses in it have no checkbox to clear, by hand or with the
            extension.
          </li>
          <li>
            It has not been tested on Udemy Business, which runs on your
            company&#39;s own udemy.com address under a separate agreement.
          </li>
          <li>
            It does not retry or check what Udemy saved. Reload the course page
            to see the result, and run it again if anything is still checked.
          </li>
        </ul>

        <h2>Technical Details</h2>

        <ul>
          <li>
            <strong>Framework:</strong> <a href="https://wxt.dev/">WXT</a>
          </li>
          <li>
            <strong>UI:</strong>{' '}
            <a
              target="_blank"
              rel="nofollow noopener"
              href="https://www.solidjs.com/"
            >
              SolidJS
            </a>{' '}
            +{' '}
            <a
              target="_blank"
              rel="nofollow noopener"
              href="https://tailwindcss.com/"
            >
              TailwindCSS
            </a>{' '}
            +{' '}
            <a
              target="_blank"
              rel="nofollow noopener"
              href="https://daisyui.com/"
            >
              DaisyUI
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
            <strong>Build:</strong>{' '}
            <a target="_blank" rel="nofollow noopener" href="https://vite.dev/">
              Vite-powered compilation
            </a>
          </li>
          <li>
            <strong>License:</strong>{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Shramkoweb/udemy-reset-progress"
            >
              AGPL-3.0, source on GitHub
            </a>
          </li>
        </ul>

        <h2>FAQs</h2>
        <p>
          <strong>
            Q: Is there a built-in way to reset progress on Udemy?
          </strong>
          <br />
          A: No. As of October 2026, Udemy&#39;s help describes only unchecking
          lectures one by one.
        </p>

        <p>
          <strong>Q: Is this extension safe to use?</strong>
          <br />
          A: It runs only when you press a button in its popup, and only on the
          tab you have open. It keeps its settings in your browser and makes no
          network requests of its own.
        </p>

        <p>
          <strong>Q: Will this affect my Udemy account?</strong>
          <br />
          A: It clicks the same checkboxes you can click by hand. Udemy&#39;s{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.udemy.com/terms/terms-of-use/"
          >
            Terms of Use
          </a>{' '}
          do not allow &#34;automated means of any kind to access the
          Services&#34; and let Udemy restrict accounts that break them. They do
          not mention browser extensions, and Udemy has not said how it treats
          one like this. If that worries you, uncheck lectures by hand.
        </p>

        <p>
          <strong>Q: Does it work in the Udemy mobile app?</strong>
          <br />
          A: No. It is a browser extension, so it works on the Udemy website in
          Chrome, Firefox or Edge.
        </p>

        <p>
          <strong>Q: Can I use it on other learning platforms?</strong>
          <br />
          A: No, it&#39;s specifically designed for the Udemy interface.
        </p>

        <div className="mt-8 text-center w-full">
          <h3>Ready to Simplify Your Udemy Experience?</h3>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com/Shramkoweb/udemy-reset-progress"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>

            <a
              href={storeLink(UDEMY_RESET_APP_STORES.chrome)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for Chrome
            </a>

            <a
              href={storeLink(UDEMY_RESET_APP_STORES.firefox)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for Firefox
            </a>

            <a
              href={storeLink(UDEMY_RESET_APP_STORES.edge)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for Microsoft Edge
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400">
          Udemy Reset Progress is an independent extension, not affiliated with
          or endorsed by Udemy.
        </p>
      </section>
    </>
  );
}

export default UdemyResetProgressPage;
