import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { ArticleDates } from '@/components/article-dates';
import { ArticleMeta } from '@/components/article-meta';
import { InstallLinks } from '@/components/install-links';
import { MEDIA_QUERIES } from '@/lib/breakpoints';
import { SITE_URL, UDEMY_RESET_APP_STORES } from '@/lib/constants';
import { parsePostDate } from '@/lib/posts/utils';
import { Routes } from '@/lib/routes';
import {
  generateBreadcrumbSchema,
  generateGuideSchema,
  serializeJsonLd,
} from '@/lib/schema';

import popupImage from '../../public/static/images/udemy-progress-reset/udemy-reset-progress-popup.png';

const MARK_COMPLETE_HELP =
  'https://web.archive.org/web/20230924/https://support.udemy.com/hc/en-us/articles/229607188-How-to-Mark-or-Unmark-Lectures-as-Complete-on-a-Browser-';
const BUSINESS_COMPLETION_HELP =
  'https://web.archive.org/web/20230928232926/https://business-support.udemy.com/hc/en-us/articles/13302587726615';
const CERTIFICATE_FAQ =
  'https://web.archive.org/web/20251007155453/https://support.udemy.com/hc/en-us/articles/14291607637015-Certificates-of-Completion-Frequently-Asked-Questions';
const CERTIFICATE_DOWNLOAD_HELP =
  'https://web.archive.org/web/20231004142042/https://support.udemy.com/hc/en-us/articles/229603868-How-to-Download-Your-Certificate-of-Completion-on-a-Browser-%22';
const NEW_COURSE_EXPERIENCE_FAQ =
  'https://web.archive.org/web/20260216/https://support.udemy.com/hc/en-us/articles/34345830524183-Udemy-s-New-Course-Experience-Frequently-Asked-Questions';
const MARCH_11_INCIDENT = 'https://status.udemy.com/incidents/xm8whcpb5sr4';
const MARCH_30_INCIDENT = 'https://status.udemy.com/incidents/15zlwhk27h1s';
const STATUS_PAGE = 'https://status.udemy.com/';
const TERMS_OF_USE = 'https://www.udemy.com/terms/terms-of-use/';

const CREATE_DATE = parsePostDate('2026-11-05') ?? 0;
const HEADING = 'Udemy Progress Not Updating?';
const DESCRIPTION =
  'Why Udemy lectures stay unchecked, why the certificate does not appear, and what "Progress cannot be changed for this item" means, with fixes from Udemy\'s help.';
const KEYWORDS = [
  'udemy progress not updating',
  'udemy lecture not marked complete',
  'udemy certificate not showing',
  'udemy certificate not generated',
  'udemy progress cannot be changed for this item',
  'udemy mark course as complete',
  'udemy business reset course progress',
];

const FAQ = [
  {
    question: 'Why is my Udemy course progress not updating?',
    answer:
      'Usually one item is still open: a video lecture you did not watch to the end, a quiz with a skipped question, or a practice test below the pass mark. Tick finished lectures by hand in the course content list. If progress stopped for everyone at once, check status.udemy.com.',
  },
  {
    question:
      'What does "Progress cannot be changed for this item" mean on Udemy?',
    answer:
      "Udemy's help does not explain the message, but it documents two kinds of locked checkbox: assignments on Udemy.com cannot be unmarked, and on Udemy Business no checkbox can be changed by hand. Complete the item the normal way instead.",
  },
  {
    question: "Why don't I have a Udemy certificate after finishing a course?",
    answer:
      'Every curriculum item must be marked as complete, and only paid, approved courses offer a certificate. If the trophy above the course player has changed colour but the certificate is missing, wait up to an hour, then refresh the certificate page or clear your cache and cookies.',
  },
  {
    question: 'Is there a button to mark a whole Udemy course as complete?',
    answer:
      "No. Udemy's help describes ticking lectures one at a time. The Mark All Complete button in the free Udemy Reset Progress extension ticks every empty checkbox in the course content list for you.",
  },
  {
    question: 'Can I reset course progress on Udemy Business?',
    answer:
      "Udemy Business's help says its checkboxes cannot be adjusted by hand, and it describes no reset option for learners.",
  },
];

function UdemyProgressNotUpdatingPage() {
  return (
    <>
      <ArticleMeta
        title="Udemy Progress Not Updating? Fix Lectures and Certificates"
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
                path: Routes.UdemyProgressNotUpdating(),
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
                  name: 'Progress not updating',
                  url: `${SITE_URL}${Routes.UdemyProgressNotUpdating()}`,
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
            Udemy ticks a lecture once you have watched every minute of it, and
            it issues a certificate only when every item in the course has a
            checkmark. When the percentage stalls or the certificate never
            appears, one item is almost always missing its tick. This page shows
            how to find it, which checkboxes Udemy locks, and how to tick the
            rest.
          </p>

          <p>
            I built{' '}
            <Link href={Routes.UdemyResetProgress()}>Udemy Reset Progress</Link>
            , a free extension that clears or ticks every lecture checkbox in a
            course. It is my own tool, not an official Udemy one. The Udemy help
            articles quoted here are archived copies from 2023 to 2025, listed
            under Sources at the bottom, and Udemy may have changed them since.
          </p>

          <h2>How Udemy marks an item complete</h2>

          <p>
            On the website, a video lecture is marked complete automatically
            &ldquo;once you have watched every minute of the lecture&rdquo;. You
            can also click the checkbox next to any lecture in the course
            content list to tick it, and click it again to remove the tick.
          </p>

          <p>
            Udemy Business&#39;s help spells out what the other item types need:
          </p>

          <ul>
            <li>
              <strong>Quizzes:</strong> every question answered, without
              skipping.
            </li>
            <li>
              <strong>Practice tests:</strong> a passing score.
            </li>
            <li>
              <strong>Slide lectures:</strong> every slide opened.
            </li>
            <li>
              <strong>Assignments:</strong> not needed to finish the course.
            </li>
          </ul>

          <h2>Why your progress is not updating</h2>

          <ul>
            <li>
              <strong>You skipped part of a video.</strong> Jumping ahead leaves
              minutes unwatched, so Udemy does not tick the lecture. Tick it by
              hand in the course content list.
            </li>
            <li>
              <strong>A quiz or practice test is unfinished.</strong> One
              skipped question, or a score below the pass mark, keeps that item
              open. Answer every question, or retake the test.
            </li>
            <li>
              <strong>Udemy had an outage.</strong> On 11 March 2026 Udemy
              reported that{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={MARCH_11_INCIDENT}
              >
                lectures were not being marked complete
              </a>{' '}
              &ldquo;even after watching the content fully&rdquo;, on Udemy.com
              and Udemy Business. After the fix it said some lectures watched
              during the incident might still show as unmarked, that it would
              fix them automatically, and that anyone who needs it sooner should
              contact support. On 30 March 2026{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={MARCH_30_INCIDENT}
              >
                reports and dashboards showed progress below 100%
              </a>{' '}
              for learners who already had certificates, until 2 April. When
              progress stops for everyone at once, check{' '}
              <a target="_blank" rel="noopener noreferrer" href={STATUS_PAGE}>
                Udemy&#39;s status page
              </a>
              .
            </li>
            <li>
              <strong>The course has no checkboxes.</strong> Udemy is piloting{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={NEW_COURSE_EXPERIENCE_FAQ}
              >
                a new course experience
              </a>{' '}
              that leaves out the mark lecture as complete function.
            </li>
          </ul>

          <h2>&ldquo;Progress cannot be changed for this item&rdquo;</h2>

          <p>
            Udemy&#39;s help does not mention this exact message. It does
            describe two kinds of checkbox that learners cannot change:
          </p>

          <ul>
            <li>
              On Udemy.com,{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={MARK_COMPLETE_HELP}
              >
                &ldquo;assignments cannot be unmarked as complete&rdquo;
              </a>
              .
            </li>
            <li>
              On Udemy Business,{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={BUSINESS_COMPLETION_HELP}
              >
                &ldquo;lectures and course items cannot be manually marked as
                complete, and checkboxes cannot be manually adjusted&rdquo;
              </a>
              . The same article says to move your cursor away if a popup
              message appears next to the checkbox.
            </li>
          </ul>

          <p>
            If the message appears on one of these items, Udemy has locked the
            checkbox. Clicking it again, by hand or with an extension, will not
            change it. Finish the item the usual way: watch the video to the
            end, answer every quiz question or pass the practice test.
          </p>

          <h2>Certificate of completion not showing</h2>

          <p>
            Udemy&#39;s{' '}
            <a target="_blank" rel="noopener noreferrer" href={CERTIFICATE_FAQ}>
              certificate FAQ
            </a>{' '}
            is direct: &ldquo;To receive your certificate of completion, each
            curriculum item must be marked as complete.&rdquo; The order does
            not matter, and Role Play exercises are not required.
          </p>

          <ol>
            <li>
              Open the course content list and look for any item without a
              checkmark, quizzes and practice tests included.
            </li>
            <li>
              Once every item is ticked, the trophy above the course player
              changes colour. Click it to see the certificate.
            </li>
            <li>
              If the trophy has changed but no certificate shows, Udemy asks you
              to wait up to an hour, then refresh the certificate page or clear
              your cache and cookies.
            </li>
          </ol>

          <p>
            Some courses never get one: &ldquo;Currently only paid, approved
            courses offer a certificate of completion. Free courses and courses
            that only include practice tests do not offer a certificate of
            completion.&rdquo; Free enrolments made before 17 March 2020 keep
            theirs. If you retake a course, the certificate keeps the date you
            first completed it, unless the course adds new lectures and you
            complete those too.
          </p>

          <p>
            Udemy also{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={CERTIFICATE_DOWNLOAD_HELP}
            >
              notes
            </a>{' '}
            that it is not an accredited institution, so its certificates cannot
            be used for formal accreditation.
          </p>

          <h2>How to mark a Udemy course as complete</h2>

          <p>
            There is no button for the whole course. Udemy&#39;s help describes
            clicking each empty checkbox in the course content list, section by
            section, and a long course means hundreds of clicks.
          </p>

          <p>
            Udemy Reset Progress makes those clicks for you. Open the course
            player with the course content list on screen, click the extension
            icon, then <strong>Mark All Complete</strong>. It ticks every box
            that is still empty and waits between clicks so Udemy is less likely
            to end your session. It is meant for lectures you have finished that
            Udemy did not tick, such as ones watched during the March 2026
            outage.
          </p>

          <Image
            className="rounded-lg border border-gray-200 dark:border-gray-800"
            alt='The Udemy Reset Progress popup with the heading "Udemy Reset Progress", the subtitle "Manage your course progress", a settings gear, a "Clear Progress" button and a "Mark All Complete" button.'
            src={popupImage}
            sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
          />

          <p>
            It clicks the same checkboxes you can click yourself, so items Udemy
            locks, such as assignments, stay as they are. Udemy&#39;s{' '}
            <a target="_blank" rel="noopener noreferrer" href={TERMS_OF_USE}>
              Terms of Use
            </a>{' '}
            do not allow &ldquo;automated means of any kind to access the
            Services&rdquo;. They do not mention browser extensions, and if that
            worries you, tick the boxes by hand.
          </p>

          <InstallLinks
            name="Udemy Reset Progress"
            stores={UDEMY_RESET_APP_STORES}
            medium="guide"
            campaign="udemy-progress-not-updating"
          />

          <h2>Resetting progress on Udemy Business</h2>

          <p>
            Udemy Business&#39;s help says its checkboxes cannot be adjusted by
            hand, and it describes no reset option for learners. I have not
            tested the extension there. On Udemy.com you can{' '}
            <Link href={Routes.UdemyResetProgress()}>
              reset a whole course by hand or in one click
            </Link>
            .
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
              <Link href={Routes.UdemyResetProgress()}>
                How to reset Udemy course progress, by hand or in one click
              </Link>
            </li>
            <li>
              <Link href={Routes.UdemyTroubleshooting()}>
                Udemy Reset Progress not working? Fixes for every error
              </Link>
            </li>
          </ul>

          <h2>Sources</h2>

          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={MARK_COMPLETE_HELP}
              >
                Udemy: How to mark or unmark lectures as complete (archived
                2023)
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={BUSINESS_COMPLETION_HELP}
              >
                Udemy Business: completing lectures and course items (archived
                2023)
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={CERTIFICATE_FAQ}
              >
                Udemy: Certificates of completion FAQ (archived 2025)
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={CERTIFICATE_DOWNLOAD_HELP}
              >
                Udemy: How to download your certificate of completion (archived
                2023)
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={MARCH_11_INCIDENT}
              >
                Udemy status: lectures unable to be marked as completed (11
                March 2026)
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={MARCH_30_INCIDENT}
              >
                Udemy status: course completion ratio not updated (30 March
                2026)
              </a>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}

export default UdemyProgressNotUpdatingPage;
