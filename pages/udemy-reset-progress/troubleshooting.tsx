import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { ArticleDates } from '@/components/article-dates';
import { ArticleMeta } from '@/components/article-meta';
import { InstallLinks } from '@/components/install-links';
import { UdemyPacingModes } from '@/components/udemy-pacing-modes';
import { MEDIA_QUERIES } from '@/lib/breakpoints';
import { SITE_URL, UDEMY_RESET_APP_STORES } from '@/lib/constants';
import { parsePostDate } from '@/lib/posts/utils';
import { Routes } from '@/lib/routes';
import {
  generateBreadcrumbSchema,
  generateGuideSchema,
  serializeJsonLd,
} from '@/lib/schema';

import messageImage from '../../public/static/images/udemy-progress-reset/udemy-reset-progress-message.png';

const NEW_COURSE_EXPERIENCE_FAQ =
  'https://web.archive.org/web/20260216/https://support.udemy.com/hc/en-us/articles/34345830524183-Udemy-s-New-Course-Experience-Frequently-Asked-Questions';
const MARK_COMPLETE_HELP =
  'https://web.archive.org/web/20230924/https://support.udemy.com/hc/en-us/articles/229607188-How-to-Mark-or-Unmark-Lectures-as-Complete-on-a-Browser-';
const CREATE_DATE = parsePostDate('2026-10-16') ?? 0;
const HEADING = 'Udemy Reset Progress Not Working?';
const DESCRIPTION =
  'What each Udemy Reset Progress error means and how to fix it: a missing course content list, logouts on long courses, boxes that stay checked, and courses with no checkboxes.';
const KEYWORDS = [
  'udemy reset progress not working',
  'udemy reset progress extension',
  'udemy logged out',
  'reset udemy course progress',
  'udemy uncheck all lectures',
];

function UdemyTroubleshootingPage() {
  return (
    <>
      <ArticleMeta
        title="Udemy Reset Progress Not Working? Fixes for Every Error"
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
                path: Routes.UdemyTroubleshooting(),
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
                  name: 'Udemy Reset Progress',
                  url: `${SITE_URL}${Routes.UdemyResetProgress()}`,
                },
                {
                  name: 'Troubleshooting',
                  url: `${SITE_URL}${Routes.UdemyTroubleshooting()}`,
                },
              ]),
            ),
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
            <Link href={Routes.UdemyResetProgress()}>Udemy Reset Progress</Link>{' '}
            does one thing: it clicks the lecture checkboxes in the course
            content list of the page you have open. Almost every problem comes
            from that list not being where the extension expects it, or from
            Udemy ending the session. It is my own extension, not an official
            Udemy tool, and I wrote this page for version 2.1.2. Find your
            message or symptom below.
          </p>

          <h2>&ldquo;Open a Udemy course page first&rdquo;</h2>

          <Image
            className="rounded-lg border border-gray-200 dark:border-gray-800"
            alt='The Udemy Reset Progress popup after "Clear Progress" was clicked on a page without a course, showing a "Try Again" button and the red message "Open a Udemy course page first".'
            src={messageImage}
            sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
          />

          <p>
            The extension could not find the course content list. Open the
            course player, the page where lectures play, and make sure the
            course content list is on screen. Then open the popup again. If the
            player shows no checkboxes at all, the course may be in{' '}
            <a href="#no-checkboxes">Udemy&#39;s new course experience</a>.
          </p>

          <h2>&ldquo;No course sections found on this page&rdquo;</h2>

          <p>
            The list is there, but it has no sections the extension can open,
            usually because it has not finished loading. Wait for the course
            content to appear, reload the page if it does not, and try again.
          </p>

          <h2>
            &ldquo;Make sure you&#39;re on a Udemy page&rdquo; or &ldquo;Cannot
            access the current tab&rdquo;
          </h2>

          <p>
            The browser did not let the extension into the tab. Browsers block
            extensions on their own pages, such as settings, the new tab page
            and the extension stores. Switch to the tab with your Udemy course
            and open the popup again.
          </p>

          <h2>Udemy logged me out halfway through</h2>

          <p>
            On a long course, hundreds of quick clicks can end your Udemy
            session. Udemy does not document a limit, and the extension does not
            retry, so the run stops where the session ended.
          </p>

          <ol>
            <li>Log back in and reload the course player.</li>
            <li>
              Open the settings with the gear button in the popup, turn off Auto
              and choose Safe. To go slower still, open Advanced and raise
              Action delay or lower Batch size.
            </li>
            <li>
              Run &#34;Clear Progress&#34; again. It only clicks boxes that are
              still checked, so it carries on where it stopped.
            </li>
          </ol>

          <UdemyPacingModes />

          <p>
            Auto currently uses the same settings as Balanced. It does not adapt
            to the length of the course.
          </p>

          <h2>Some lectures are still checked</h2>

          <ul>
            <li>
              Run it again. The extension collects the course sections once,
              when it starts, so sections that appear later are skipped on the
              first run and picked up on the second.
            </li>
            <li>
              If Udemy logged you out during the run, the clicks after that
              point were not saved. Log back in, reload and run it again.
            </li>
            <li>
              Assignments cannot be unmarked as complete, according to{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={MARK_COMPLETE_HELP}
              >
                Udemy&#39;s help
              </a>
              .
            </li>
          </ul>

          <h2 id="no-checkboxes">There are no checkboxes in the course</h2>

          <p>
            Udemy is piloting a new course experience, and{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={NEW_COURSE_EXPERIENCE_FAQ}
            >
              its FAQ
            </a>{' '}
            says the mark lecture as complete function is not included in it.
            Without checkboxes there is nothing to clear, by hand or with the
            extension.
          </p>

          <h2>Udemy Business</h2>

          <p>
            Udemy Business runs on your company&#39;s own udemy.com address
            under a separate agreement with Udemy. I have not tested the
            extension there, so it may not find the checkboxes.
          </p>

          <h2>Still stuck?</h2>

          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Shramkoweb/udemy-reset-progress/issues"
            >
              Open an issue on GitHub
            </a>{' '}
            with the message you see, your browser and the mode you used. Not
            installed yet? The extension is free:
          </p>

          <InstallLinks
            name="Udemy Reset Progress"
            stores={UDEMY_RESET_APP_STORES}
            medium="guide"
            campaign="udemy-troubleshooting"
          />

          <h2>Related</h2>

          <ul>
            <li>
              <Link href={Routes.UdemyResetProgress()}>
                How to reset Udemy course progress, by hand or in one click
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}

export default UdemyTroubleshootingPage;
