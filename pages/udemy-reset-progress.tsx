import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

import { UDEMY_RESET_APP_OG_IMAGE } from '@/lib/constants';
import chromeStore from '../public/static/images/chrome-store.png';
import firefoxStore from '../public/static/images/firefox-store.webp';

function UdemyResetProgressPage() {
  useEffect(() => {
    const registerView = () =>
      fetch('/api/views/udemy-reset-progress-page', {
        method: 'POST',
      }).catch(() => {});

    registerView();
  }, []);
  return (
    <>
      <Head>
        <title>How to Reset Udemy Course Progress - One-Click Solution</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          key="description"
          content="Learn how to reset Udemy course progress instantly with my browser extension. The easiest way to restart Udemy courses with one click. Free download for Chrome & Firefox."
        />
        <meta
          name="keywords"
          key="keywords"
          content="reset Udemy course progress, Udemy reset progress, how to reset Udemy course, restart Udemy course, clear Udemy progress, Udemy course reset tool"
        />
        <meta name="author" key="author" content="Serhii Shramko" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:title"
          key="og:title"
          content="How to Reset Udemy Course Progress - One-Click Solution"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Learn the fastest way to reset your Udemy course progress with my free browser extension. Perfect for restarting courses or managing multiple accounts."
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
          content="How to Reset Udemy Course Progress Instantly"
        />
        <meta
          property="twitter:description"
          key="twitter:description"
          content="The easiest method to reset Udemy course progress - one-click solution with my free browser extension."
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Udemy Reset Progress",
              "description": "A browser extension that lets you reset any Udemy course progress with a single click.",
              "url": "https://shramko.dev/udemy-reset-progress",
              "image": UDEMY_RESET_APP_OG_IMAGE,
              "author": {
                "@type": "Person",
                "@id": "https://shramko.dev/#person",
                "name": "Serhii Shramko",
                "url": "https://shramko.dev/about"
              },
              "operatingSystem": "Chrome, Firefox, Edge",
              "applicationCategory": ["BrowserApplication", "EducationalApplication"],
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "0.00",
                "availability": "https://schema.org/InStock",
                "url": "https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo"
              },
              "downloadUrl": [
                "https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo",
                "https://addons.mozilla.org/en-US/firefox/addon/udemy-reset-progress/"
              ]
            })
          }}
        />
      </Head>

      <section className="prose dark:prose-dark flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          How to Reset Udemy Course Progress in One Click
        </h1>

        <p>
          Need to reset your Udemy course progress but frustrated with the
          manual process? Whether you want to restart a course from scratch,
          review material, or manage multiple accounts, resetting course
          progress on Udemy can be tedious through their standard interface.
        </p>

        <p>
          That&#39;s why I created <strong>Udemy Reset Progress</strong> — a
          free browser extension that lets you reset any Udemy course progress
          with a single click. No more navigating through multiple menus or
          confirmation dialogs.
        </p>

        <video loop autoPlay muted playsInline className="mb-6 mx-auto mt-10">
          <source
            src="/static/images/udemy-progress-reset/video.mp4"
            type="video/mp4"
          />
        </video>

        <h2>Installation</h2>

        <div className="flex gap-8 justify-center items-center">
          <a
            target="_blank"
            rel="nofollow noopener"
            href="https://chromewebstore.google.com/detail/udemy-reset-progress/dddnklikfgdefjekcbhehjogkpfkbdlo"
            aria-label="Udemy Reset Progress on Chrome Web Store"
          >
            <Image
              className="w-44 border rounded-md"
              role="presentation"
              alt="Download Udemy Reset Progress for Chrome"
              src={chromeStore}
            />
          </a>
          <a
            target="_blank"
            rel="nofollow noopener"
            href="https://addons.mozilla.org/en-US/firefox/addon/udemy-reset-progress/"
            aria-label="Udemy Reset Progress on Firefox Add-ons"
          >
            <Image
              className="w-[156px]"
              role="presentation"
              src={firefoxStore}
              alt="Download Udemy Reset Progress for Firefox"
            />
          </a>
        </div>

        <h2>Why Choose Our Udemy Reset Progress Extension?</h2>

        <ul>
          <li>
            <strong>Instant reset with one click ⚡️:</strong> Clear all course
            progress instantly from the extension popup
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
        </ul>

        <h2>How to Reset Udemy Course Progress (Step by Step)</h2>

        <ol>
          <li>
            Install the Udemy Reset Progress extension from your browser&#39;s
            store
          </li>
          <li>Navigate to any Udemy course page you want to reset</li>
          <li>Click the extension icon in your browser toolbar</li>
          <li>Click the &#34;Clear Progress&#34; button</li>
          <li>Your course progress is now completely reset!</li>
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
              href="https://addons.mozilla.org/en-US/firefox/addon/udemy-reset-progress/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for Firefox
            </a>

            <a
              href="https://microsoftedge.microsoft.com/addons/detail/udemy-reset-progress/cmnolghflighmmfpdkinlbmoelfgchhc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install for Microsoft Edge
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default UdemyResetProgressPage;
