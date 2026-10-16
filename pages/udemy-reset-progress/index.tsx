import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { InstallLinks } from '@/components/install-links';
import { PageMeta } from '@/components/page-meta';
import { StoreRating } from '@/components/store-rating';
import { UdemyPacingModes } from '@/components/udemy-pacing-modes';
import {
  UDEMY_RESET_APP_OG_IMAGE,
  UDEMY_RESET_APP_RATING,
  UDEMY_RESET_APP_STORES,
  SITE_URL,
} from '@/lib/constants';
import { Routes } from '@/lib/routes';
import { generateAggregateRatingSchema, serializeJsonLd } from '@/lib/schema';
import { withStoreUtm } from '@/lib/store-links';
import { registerView, whenVisible } from '@/lib/views';

import popupImage from '../../public/static/images/udemy-progress-reset/udemy-reset-progress-popup.png';
import speedModesImage from '../../public/static/images/udemy-progress-reset/udemy-reset-progress-speed-modes.png';

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
              screenshot: [
                `${SITE_URL}/static/images/udemy-progress-reset/udemy-reset-progress-popup.png`,
                `${SITE_URL}/static/images/udemy-progress-reset/udemy-reset-progress-speed-modes.png`,
              ],
              featureList: [
                'Clear every lecture checkbox in a course',
                'Mark every lecture complete',
                'Speed modes: Turbo, Balanced, Safe and Auto, plus your own delay and batch size',
                'Runs only on the tab you have open',
                'Keeps its settings in the browser and makes no network requests of its own',
                'Open source under AGPL-3.0',
              ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Is there a built-in way to reset progress on Udemy?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "No. As of October 2026, Udemy's help describes only unchecking lectures one by one.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is this extension safe to use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'It runs only when you press a button in its popup, and only on the tab you have open. It keeps its settings in your browser and makes no network requests of its own.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Will this affect my Udemy account?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'It clicks the same checkboxes you can click by hand. Udemy\'s Terms of Use do not allow "automated means of any kind to access the Services" and let Udemy restrict accounts that break them. They do not mention browser extensions, and Udemy has not said how it treats one like this. If that worries you, uncheck lectures by hand.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does it work in the Udemy mobile app?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. It is a browser extension, so it works on the Udemy website in Chrome, Firefox or Edge.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I use it on other learning platforms?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. It is built for the Udemy interface and works only on Udemy.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is this an official Udemy tool?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. It is an independent extension I built, and it is not affiliated with or endorsed by Udemy.',
                  },
                },
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
          list. That is fine for a short course and slow for a long one.
        </p>

        <p>
          So I built{' '}
          <strong>
            <a
              target="_blank"
              href={storeLink(UDEMY_RESET_APP_STORES.chrome)}
              rel="noopener"
            >
              Udemy Reset Progress
            </a>
          </strong>
          , a free browser extension that clears every checkbox for you. It
          clicks the same lecture checkboxes you would, in the tab you have
          open, and makes no Udemy API calls.
        </p>

        <InstallLinks
          name="Udemy Reset Progress"
          stores={UDEMY_RESET_APP_STORES}
          medium="landing"
          campaign="udemy-reset-progress"
        />

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

        <h2>How it works</h2>

        <h3>1. Install the extension</h3>

        <p>
          Install Udemy Reset Progress from the{' '}
          <a
            target="_blank"
            href={storeLink(UDEMY_RESET_APP_STORES.chrome)}
            rel="noopener noreferrer"
          >
            Chrome Web Store
          </a>
          ,{' '}
          <a
            target="_blank"
            href={storeLink(UDEMY_RESET_APP_STORES.firefox)}
            rel="noopener noreferrer"
          >
            Firefox Add-ons
          </a>{' '}
          or{' '}
          <a
            target="_blank"
            href={storeLink(UDEMY_RESET_APP_STORES.edge)}
            rel="noopener noreferrer"
          >
            Microsoft Edge Add-ons
          </a>
          .
        </p>

        <h3>2. Open the course player</h3>

        <p>
          Open the course you want to reset in the course player, the page where
          lectures play, and make sure the course content list is on screen.
        </p>

        <h3>3. Clear the progress</h3>

        <p>
          Click the extension icon in your browser toolbar, then{' '}
          <strong>Clear Progress</strong>. The button reads
          &#34;Resetting...&#34; while it works. Keep the tab open until it says
          &#34;Done&#34;. If it says &#34;Try Again&#34;, the{' '}
          <Link href={Routes.UdemyTroubleshooting()}>troubleshooting page</Link>{' '}
          explains the message.
        </p>

        <Image
          className="rounded-lg border border-gray-200 dark:border-gray-800"
          alt='The Udemy Reset Progress popup with the heading "Udemy Reset Progress", the subtitle "Manage your course progress", a settings gear, a "Clear Progress" button and a "Mark All Complete" button.'
          src={popupImage}
          sizes="(min-width: 768px) 768px, 100vw"
        />

        <h3>4. Reload the page</h3>

        <p>
          Reload the course page to see the result. Every lecture checkbox is
          now clear.
        </p>

        <h2>Features</h2>

        <ul>
          <li>
            <strong>One-click reset:</strong> The popup clears every lecture
            checkbox in the course content list.
          </li>
          <li>
            <strong>Mark all complete:</strong> A second button ticks every box
            that is still unchecked.
          </li>
          <li>
            <strong>Speed modes:</strong> Slow down on long courses so Udemy is
            less likely to end your session.
          </li>
          <li>
            <strong>Any enrolled course:</strong> It works on any course you are
            enrolled in that shows lecture checkboxes.
          </li>
          <li>
            <strong>Private:</strong> It collects no data, keeps its settings in
            your browser and makes no network requests of its own.
          </li>
          <li>
            <strong>Free:</strong> It costs nothing, has no ads and works in
            Chrome, Firefox and Edge.
          </li>
          <li>
            <strong>Open source:</strong> The code is on GitHub under the
            AGPL-3.0 license.
          </li>
        </ul>

        <h2>Reset progress by hand</h2>

        <p>
          This is the only method Udemy&#39;s help describes, and it needs no
          extension:
        </p>

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

        <h2>Speed modes</h2>

        <p>
          The extension clicks the same checkboxes you would, one after another.
          Clicking hundreds of them in a few seconds can end your Udemy session,
          so it waits between clicks and pauses after every batch. Open the
          settings with the gear button in the popup, turn off{' '}
          <strong>Auto</strong> and pick a mode:
        </p>

        <Image
          className="rounded-lg border border-gray-200 dark:border-gray-800"
          alt='The Udemy Reset Progress settings page with the "Speed mode" card, the "Auto" switch turned off and "Safe" selected below "Turbo" and "Balanced", then an "Advanced" toggle and a "Reset to Auto" button.'
          src={speedModesImage}
          sizes="(min-width: 768px) 768px, 100vw"
        />

        <UdemyPacingModes />

        <p>
          Auto is on by default and uses the Balanced timing. It does not adapt
          to the size of the course. Open <strong>Advanced</strong> to set the
          Action delay, from 50 to 1000 ms, and the Batch size, from 5 to 50,
          yourself. The table shows version 2.1.2.
        </p>

        <p>
          If Udemy logs you out halfway, log back in and run it again in Safe
          mode. The extension does not retry, but a second run continues with
          the boxes that are still checked. The{' '}
          <Link href={Routes.UdemyTroubleshooting()}>troubleshooting page</Link>{' '}
          covers that and every error message.
        </p>

        <h2>Mark a course complete</h2>

        <p>
          The popup also has a <strong>Mark All Complete</strong> button, which
          ticks every unchecked box. Udemy issues a certificate of completion
          for a paid course once every curriculum item is complete (
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

        <h2>Technical details</h2>

        <ul>
          <li>
            <strong>Framework:</strong>{' '}
            <a target="_blank" rel="nofollow noopener" href="https://wxt.dev/">
              WXT
            </a>
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
              Tailwind CSS
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
              Vite
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

        <h2>FAQ</h2>

        <h3>Is there a built-in way to reset progress on Udemy?</h3>
        <p>
          No. As of October 2026, Udemy&#39;s help describes only unchecking
          lectures one by one.
        </p>

        <h3>Is this extension safe to use?</h3>
        <p>
          It runs only when you press a button in its popup, and only on the tab
          you have open. It keeps its settings in your browser and makes no
          network requests of its own.
        </p>

        <h3>Will this affect my Udemy account?</h3>
        <p>
          It clicks the same checkboxes you can click by hand. Udemy&#39;s{' '}
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

        <h3>Does it work in the Udemy mobile app?</h3>
        <p>
          No. It is a browser extension, so it works on the Udemy website in
          Chrome, Firefox or Edge.
        </p>

        <h3>Can I use it on other learning platforms?</h3>
        <p>No. It is built for the Udemy interface and works only on Udemy.</p>

        <h3>Is this an official Udemy tool?</h3>
        <p>
          No. It is an independent extension I built, and it is not affiliated
          with or endorsed by Udemy.
        </p>

        <h2>Install Udemy Reset Progress</h2>

        <p>It is free for Chrome, Firefox and Edge.</p>

        <InstallLinks
          name="Udemy Reset Progress"
          stores={UDEMY_RESET_APP_STORES}
          medium="landing"
          campaign="udemy-reset-progress"
        />

        <p>
          The code is open source under AGPL-3.0.{' '}
          <a
            href="https://github.com/Shramkoweb/udemy-reset-progress"
            target="_blank"
            rel="noopener noreferrer"
          >
            View it on GitHub
          </a>
          .
        </p>
      </section>
    </>
  );
}

export default UdemyResetProgressPage;
