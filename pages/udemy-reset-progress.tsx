import Head from 'next/head';
import Image from 'next/image';

import { UDEMY_RESET_APP_OG_IMAGE } from '@/lib/constants';
import chromeStore from '../public/static/images/chrome-store.png';
import firefoxStore from '../public/static/images/firefox-store.webp';

function UdemyResetProgressPage() {
  return (
    <>
      <Head>
        <title>Udemy Reset Progress - Browser Extension</title>
        <meta
          name="description"
          key="description"
          content="Udemy Reset Progress extension lets you quickly clear your course progress on Udemy with one click. Perfect for restarting courses or managing multiple accounts."
        />
        <meta
          name="keywords"
          key="keywords"
          content="Udemy, Chrome Extension, Firefox Extension, Course Reset, Learning Management, Education Tools, Udemy Tools"
        />
        <meta name="author" key="author" content="Serhii Shramko" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:title"
          key="og:title"
          content="Udemy Reset Progress - Browser Extension"
        />
        <meta
          property="og:description"
          key="og:description"
          content="One-click solution to reset your Udemy course progress. Easily restart courses or manage multiple accounts."
        />
        <meta
          property="og:image"
          content={UDEMY_RESET_APP_OG_IMAGE}
          key="og:image"
        />
        <meta
          property="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:title"
          key="twitter:title"
          content="Udemy Reset Progress - Browser Extension"
        />
        <meta
          property="twitter:description"
          key="twitter:description"
          content="Reset your Udemy course progress instantly with this powerful browser extension."
        />
        <meta
          property="twitter:image"
          key="twitter:image"
          content={UDEMY_RESET_APP_OG_IMAGE}
        />
        <meta
          property="twitter:site"
          key="twitter:site"
          content="@shramkoweb"
        />
      </Head>

      <section className="prose dark:prose-dark flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Udemy Reset Progress: Instant Course Progress Reset
        </h1>

        <p>
          Tired of manually clearing your Udemy course progress when you want to
          restart a course or switch accounts? As someone who frequently tests
          courses and manages multiple Udemy accounts, I understand how tedious
          it can be to reset progress through Udemy interface.
        </p>

        <p>
          That&#39;s why I built <strong>Udemy Reset Progress</strong> — a
          browser extension that lets you wipe your course progress with a
          single click. No more navigating through multiple menus or confirming
          endless dialogs.
        </p>

        <video loop autoPlay muted className="mb-6 w-10/12 mx-auto mt-10">
          <source
            src="/static/images/udemy-progress-reset/video.mp4"
            type="video/mp4"
          />
        </video>

        <h2>Key Features</h2>

        <ul>
          <li>
            <strong>One-click progress reset 🚀:</strong> Clear all course
            progress instantly from the extension popup
          </li>
          <li>
            <strong>Udemy-specific functionality 🔐:</strong> Works exclusively
            on Udemy course pages for maximum reliability
          </li>
          <li>
            <strong>Lightning fast ⚡️:</strong> Built with performance in mind
            using SolidJS and WXT
          </li>
          <li>
            <strong>Privacy focused 🧑‍💻:</strong> No data collection - everything
            happens locally in your browser
          </li>
        </ul>

        <h2>Installation</h2>
        <div className="flex gap-8 justify-center items-center">
          <a href="https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo">
            <Image
              className="w-44 border rounded-md"
              role="presentation"
              alt="Chrome Web Store"
              src={chromeStore}
            />
          </a>
          <Image
            className="w-44 w-[156px]"
            role="presentation"
            src={firefoxStore}
            alt="Firefox Add-ons"
          />
        </div>

        <h2>How It Works</h2>
        <ol>
          <li>Navigate to any Udemy course page</li>
          <li>Click the extension icon in your toolbar</li>
          <li>Click &#34;Clear Progress&#34;</li>
        </ol>

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
        </ul>

        <h2>FAQs</h2>
        <p>
          <strong>Q: Is this extension safe to use?</strong>
          <br />
          A: Absolutely! It only interacts with Udemy official interface and
          doesn&#39;t store any data.
        </p>

        <p>
          <strong>Q: Will this affect my Udemy account status?</strong>
          <br />
          A: No. This extension absolutely safe to use.
        </p>

        <p>
          <strong>Q: Can I use it on other learning platforms?</strong>
          <br />
          A: No, it&#39;s specifically designed for Udemy interface.
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
              href="https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for Chrome
            </a>

            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for FireFox
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default UdemyResetProgressPage;
