import Head from 'next/head';
import { FormEvent, useEffect, useState } from 'react';

function RebookmarkPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'invalid' | 'error'
  >('idle');

  useEffect(() => {
    const registerView = () =>
      fetch('/api/views/rebookmark-page', {
        method: 'POST',
      }).catch(() => {});

    registerView();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok || res.status === 409) {
        setStatus('success');
        setEmail('');
      } else if (res.status === 400) {
        setStatus('invalid');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Rebookmark — Stop Forgetting Your Bookmarks</title>
        <meta
          name="description"
          key="description"
          content="Rebookmark is a Chrome extension that brings your forgotten bookmarks back on a smart schedule. Read, snooze, or delete — finally clear your bookmark graveyard."
        />
        <meta
          name="keywords"
          key="keywords"
          content="bookmark manager, chrome extension, forgotten bookmarks, spaced repetition bookmarks, bookmark organizer, rebookmark, read later"
        />
        <meta name="author" key="author" content="Serhii Shramko" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:title"
          key="og:title"
          content="Rebookmark — Your Bookmarks Aren't Dead"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Chrome extension that brings forgotten bookmarks back on a smart schedule. Join the waitlist."
        />
        <meta property="og:url" key="og:url" content="https://shramko.dev/rebookmark" />
        <meta
          name="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          key="twitter:title"
          content="Rebookmark — Your Bookmarks Aren't Dead"
        />
        <meta
          name="twitter:description"
          key="twitter:description"
          content="Chrome extension that brings forgotten bookmarks back on a smart schedule. Join the waitlist."
        />
        <meta
          name="twitter:site"
          key="twitter:site"
          content="@shramkoweb"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Rebookmark',
              description:
                'A Chrome extension that brings your forgotten bookmarks back on a smart schedule.',
              url: 'https://shramko.dev/rebookmark',
              author: {
                '@type': 'Person',
                '@id': 'https://shramko.dev/#person',
                name: 'Serhii Shramko',
                url: 'https://shramko.dev/about',
              },
              operatingSystem: 'Chrome',
              applicationCategory: [
                'BrowserApplication',
                'UtilitiesApplication',
              ],
              offers: {
                '@type': 'Offer',
                priceCurrency: 'USD',
                price: '0.00',
                availability: 'https://schema.org/PreOrder',
              },
            }),
          }}
        />
      </Head>

      <section className="prose dark:prose-dark flex flex-col justify-center items-start max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Your Bookmarks Aren&#39;t Dead. They&#39;re Just Sleeping.
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          You have 1,000+ bookmarks. When was the last time you opened one?
        </p>

        <p>
          Every week you save articles, tutorials, tools, threads. You tell
          yourself <em>&#34;I&#39;ll read this later.&#34;</em> But later never
          comes. The result: a graveyard of good intentions collecting dust in
          your browser.
        </p>

        <p>
          <strong>Rebookmark</strong> is a Chrome extension + web app that
          brings your forgotten bookmarks back — one at a time, on a smart
          schedule. No new bookmark manager to learn. No migration. It works{' '}
          <strong>on top</strong> of Chrome bookmarks, Raindrop.io, or any HTML
          export. Think of it as <strong>Duolingo for your bookmarks</strong> —
          it doesn&#39;t organize them, it makes you actually come back to them.
        </p>

        {/* CTA #1 */}
        <h2>Get Early Access</h2>

        <p>
          Rebookmark is in active development and will be{' '}
          <strong>free to use at launch</strong>. Join the waitlist to get early
          access.
        </p>

        {status === 'success' ? (
          <p>
            <strong>
              You&#39;re on the list! We&#39;ll notify you when Rebookmark is
              ready.
            </strong>
          </p>
        ) : (
          <form onSubmit={handleSubmit} aria-label="Join waitlist" className="not-prose flex gap-3 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              required
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-md bg-gray-800 dark:bg-gray-200 px-5 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}

        {status === 'invalid' && (
          <p role="alert">
            <em>Please enter a valid email address.</em>
          </p>
        )}

        {status === 'error' && (
          <p role="alert">
            <em>Something went wrong. Please try again.</em>
          </p>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400">
          <em>
            The UI below is an early concept — the final product will look even
            better.
          </em>
        </p>

        {/* Section label: Extension */}
        <p className="not-prose text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-10 mb-4">
          Chrome Extension
        </p>

        {/* Triage Card Mockup */}
        <div
          className="not-prose my-4 mx-auto w-full max-w-sm select-none"
          aria-hidden="true"
        >
          <div className="rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
              <span className="text-xs font-medium text-gray-500">
                🔥 12 day streak
              </span>
              <span className="text-[11px] text-gray-400">
                142 / 1,847 processed
              </span>
            </div>

            {/* Card content */}
            <div className="px-5 py-5 flex flex-col items-center text-center">
              {/* Favicon */}
              <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center text-sm font-bold text-orange-500 mb-3 shadow-sm">
                M
              </div>
              <p className="text-[11px] text-gray-400 mb-2">
                medium.com · 12 min read
              </p>
              <p className="text-[15px] font-semibold leading-snug mb-2.5">
                Why senior engineers should write more and code less
              </p>
              <p className="text-xs leading-relaxed text-gray-400 mb-3.5">
                After 5+ years, documentation and RFCs create more impact than
                code. A framework for evaluating your leverage.{' '}
                <span className="inline-block bg-gray-100 rounded px-1.5 py-0.5 text-[10px] text-gray-500 font-medium">
                  AI
                </span>
              </p>

              {/* Tags */}
              <div className="flex gap-1.5 mb-5">
                <span className="rounded-full bg-gray-50 border border-gray-100 px-2.5 py-0.5 text-[11px] text-gray-500">
                  career
                </span>
                <span className="rounded-full bg-gray-50 border border-gray-100 px-2.5 py-0.5 text-[11px] text-gray-500">
                  engineering
                </span>
                <span className="rounded-full bg-gray-50 border border-gray-100 px-2.5 py-0.5 text-[11px] text-gray-500">
                  writing
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 w-full mb-5">
                <span className="flex-1 py-2.5 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium text-center">
                  Open
                </span>
                <span className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium text-center">
                  Later
                </span>
                <span className="flex-1 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
                  Delete
                </span>
              </div>

              {/* Decay row */}
              <div className="flex items-center gap-2.5 text-[11px] text-gray-400">
                <span>Saved 47 days ago</span>
                <div className="flex gap-0.75">
                  <div className="w-3 h-3 rounded-[3px] bg-green-600" />
                  <div className="w-3 h-3 rounded-[3px] bg-yellow-600" />
                  <div className="w-3 h-3 rounded-[3px] bg-stone-400" />
                  <div className="w-3 h-3 rounded-[3px] bg-stone-300" />
                  <div className="w-3 h-3 rounded-[3px] bg-stone-200" />
                </div>
              </div>
            </div>

            {/* Bottom progress */}
            <div className="border-t border-gray-100 px-5 py-3">
              <div className="flex justify-between text-[11px] text-gray-400 mb-2">
                <span>142 processed</span>
                <span>1,705 remaining</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100">
                <div className="h-1.5 rounded-full bg-green-600 w-[7.7%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Extension Popup Mockup */}
        <div
          className="not-prose my-4 mx-auto w-full max-w-sm select-none"
          aria-hidden="true"
        >
          <div className="rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <span className="text-sm font-bold tracking-tight">
                Rebookmark
              </span>
              <span className="text-xs text-gray-400 font-medium">🔥 12</span>
            </div>

            {/* Stats */}
            <div className="px-5 pt-4 pb-3.5">
              <div className="grid grid-cols-3 gap-2 mb-3.5">
                <div className="rounded-xl bg-gray-50 px-3 py-3">
                  <div className="text-lg font-bold leading-none mb-1">
                    1,847
                  </div>
                  <div className="text-[11px] text-gray-400">Total</div>
                </div>
                <div className="rounded-xl bg-green-50 px-3 py-3">
                  <div className="text-lg font-bold leading-none mb-1 text-green-700">
                    142
                  </div>
                  <div className="text-[11px] text-gray-400">Processed</div>
                </div>
                <div className="rounded-xl bg-gray-50 px-3 py-3">
                  <div className="text-lg font-bold leading-none mb-1">23</div>
                  <div className="text-[11px] text-gray-400">Deleted</div>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 mb-1.5">
                <div className="h-1.5 rounded-full bg-green-600 w-[7.7%]" />
              </div>
              <p className="text-[11px] text-gray-400">
                7.7% of library processed
              </p>
            </div>

            {/* Next bookmark */}
            <div className="px-5 pb-4 border-t border-gray-100 pt-3.5">
              <p className="text-[11px] uppercase tracking-wider text-gray-300 font-medium mb-2.5">
                Next bookmark
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-xs font-bold text-green-600 shrink-0 shadow-sm">
                  G
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug truncate">
                    A visual guide to CSS Grid
                  </p>
                  <p className="text-[11px] text-gray-400">css-tricks.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="flex-1 py-2 rounded-xl bg-green-50 border border-green-100 text-green-700 text-xs font-medium text-center">
                  Open
                </span>
                <span className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium text-center">
                  Later
                </span>
                <span className="flex-1 py-2 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium text-center">
                  Delete
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-3 flex gap-2">
              <span className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-500 text-[11px] font-medium text-center">
                Open dashboard
              </span>
              <span className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-500 text-[11px] font-medium text-center">
                Import bookmarks
              </span>
            </div>
          </div>
        </div>

        {/* Section label: Web App */}
        <p className="not-prose text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-10 mb-4">
          Web Dashboard
        </p>

        {/* Dashboard Mockup */}
        <div className="not-prose my-4 w-full select-none" aria-hidden="true">
          <div className="rounded-xl border border-gray-200 bg-white text-gray-900 overflow-hidden">
            {/* Dashboard header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold">Dashboard</span>
                <span className="text-xs text-gray-400">🔥 12 days</span>
              </div>
              <span className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500">
                Share stats
              </span>
            </div>

            {/* Stats row */}
            <div className="px-6 pt-5 pb-4">
              <div className="grid grid-cols-4 gap-3 mb-5">
                <div>
                  <div className="text-2xl font-bold leading-none mb-1">
                    1,847
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Total bookmarks
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none mb-1 text-green-700">
                    119
                  </div>
                  <div className="text-[11px] text-gray-400">Read</div>
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none mb-1 text-gray-500">
                    23
                  </div>
                  <div className="text-[11px] text-gray-400">Deleted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none mb-1 text-amber-600">
                    14
                  </div>
                  <div className="text-[11px] text-gray-400">Dead links</div>
                </div>
              </div>

              {/* Health score */}
              <div className="rounded-xl border border-gray-100 p-4 flex items-center gap-5 mb-5">
                <div className="relative w-14 h-14 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="3"
                      strokeDasharray="97.4"
                      strokeDashoffset="79.7"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-bold leading-none">18</span>
                    <span className="text-[9px] text-gray-400">/100</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5">
                    Bookmark health: poor
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    92% of bookmarks never reviewed
                    <br />
                    14 dead links found
                  </p>
                </div>
              </div>

              {/* Bookmark queue */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Bookmark queue</span>
                <span className="text-xs text-gray-400">1,705 in queue</span>
              </div>

              {/* Filter pills */}
              <div className="flex gap-1.5 mb-4 flex-wrap">
                <span className="rounded-full bg-gray-900 text-white px-3 py-1 text-[11px] font-medium">
                  All
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] text-gray-500">
                  New
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] text-gray-500">
                  Snoozed
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] text-gray-500">
                  Dead links
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] text-gray-500">
                  dev
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] text-gray-500">
                  career
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[11px] text-gray-500">
                  design
                </span>
              </div>

              {/* Bookmark list */}
              <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
                {/* Item 1 */}
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-[10px] font-semibold text-green-600 shrink-0">
                    V
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Vue 3 Composition API cheatsheet
                    </p>
                    <p className="text-[11px] text-gray-400">
                      vuejs.org · saved 3 days ago
                    </p>
                    <div className="flex gap-1 mt-1">
                      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-400">
                        vue
                      </span>
                      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-400">
                        dev
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <span className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] text-gray-500">
                      Open
                    </span>
                    <span className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] text-gray-500">
                      Later
                    </span>
                    <span className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] text-gray-400">
                      X
                    </span>
                  </div>
                </div>

                {/* Item 2 — with AI */}
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[10px] font-semibold text-orange-600 shrink-0">
                    M
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Why senior engineers should write more and code less
                    </p>
                    <p className="text-[11px] text-gray-400">
                      medium.com · saved 47 days ago
                    </p>
                    <div className="flex gap-1 mt-1 items-center">
                      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-400">
                        career
                      </span>
                      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-400">
                        engineering
                      </span>
                      <span className="rounded border border-gray-200 px-1.5 py-0.5 text-[9px] text-gray-400">
                        AI
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <span className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] text-gray-500">
                      Open
                    </span>
                    <span className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] text-gray-500">
                      Later
                    </span>
                    <span className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] text-gray-400">
                      X
                    </span>
                  </div>
                </div>

                {/* Item 3 — dead link */}
                <div className="px-4 py-3 flex items-center gap-3 opacity-60">
                  <div className="w-7 h-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[10px] font-semibold text-red-400 shrink-0">
                    !
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate line-through text-gray-400">
                      Best practices for React hooks 2024
                    </p>
                    <p className="text-[11px] text-red-400">
                      blog.example.com · 404 not found
                    </p>
                    <span className="rounded-full border border-red-200 px-2 py-0.5 text-[10px] text-red-400 mt-1 inline-block">
                      dead link
                    </span>
                  </div>
                  <span className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] text-gray-400 shrink-0">
                    Delete
                  </span>
                </div>

                {/* Item 4 — decaying */}
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-[10px] font-semibold text-purple-600 shrink-0">
                    F
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      The art of finishing projects
                    </p>
                    <p className="text-[11px] text-gray-400">
                      flaviocopes.com · saved 92 days ago
                    </p>
                    <div className="flex gap-1 mt-1 items-center">
                      <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-400">
                        productivity
                      </span>
                      <div className="flex gap-0.5 ml-1">
                        <div className="w-2 h-2 rounded-sm bg-red-700" />
                        <div className="w-2 h-2 rounded-sm bg-red-400" />
                        <div className="w-2 h-2 rounded-sm bg-stone-400" />
                        <div className="w-2 h-2 rounded-sm bg-stone-300" />
                        <div className="w-2 h-2 rounded-sm bg-stone-200" />
                      </div>
                      <span className="text-[9px] text-gray-400">decaying</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly activity */}
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold">Weekly activity</span>
              </div>
              <div className="flex items-end gap-2 h-20 mb-2">
                {[
                  { read: 40, snoozed: 20, deleted: 10 },
                  { read: 55, snoozed: 25, deleted: 5 },
                  { read: 35, snoozed: 15, deleted: 15 },
                  { read: 50, snoozed: 20, deleted: 10 },
                  { read: 60, snoozed: 15, deleted: 5 },
                  { read: 20, snoozed: 10, deleted: 0 },
                  { read: 0, snoozed: 0, deleted: 0 },
                ].map((day, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col gap-0.5 justify-end h-full"
                  >
                    <div
                      className="bg-green-700 rounded-t-sm"
                      style={{ height: `${day.read}%` }}
                    />
                    <div
                      className="bg-gray-300"
                      style={{ height: `${day.snoozed}%` }}
                    />
                    <div
                      className="bg-gray-500 rounded-b-sm"
                      style={{ height: `${day.deleted}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 text-[10px] text-gray-400">
                <span className="flex-1 text-center">Mon</span>
                <span className="flex-1 text-center">Tue</span>
                <span className="flex-1 text-center">Wed</span>
                <span className="flex-1 text-center">Thu</span>
                <span className="flex-1 text-center">Fri</span>
                <span className="flex-1 text-center">Sat</span>
                <span className="flex-1 text-center">Sun</span>
              </div>
              <div className="flex gap-4 mt-2 justify-center">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-green-700" />
                  <span className="text-[10px] text-gray-400">Read: 14</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-gray-300" />
                  <span className="text-[10px] text-gray-400">Snoozed: 8</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-gray-500" />
                  <span className="text-[10px] text-gray-400">Deleted: 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>How It Works</h2>

        <ol>
          <li>
            <strong>Import</strong> your existing bookmarks from Chrome,
            Raindrop.io, or an HTML export — takes 10 seconds
          </li>
          <li>
            <strong>Get a daily dose</strong> of forgotten bookmarks via browser
            badge or email digest
          </li>
          <li>
            <strong>Triage in 30 seconds</strong> — Open it, Snooze it, or
            Delete it forever
          </li>
          <li>
            <strong>Watch your graveyard shrink</strong> — track stats, streaks,
            and library health over time
          </li>
        </ol>

        <h2>This Is NOT Another Bookmark Manager</h2>

        <p>
          You already have a place to save bookmarks. You don&#39;t need another
          one. What you need is a <strong>reason to go back</strong>.
        </p>

        <ul>
          <li>
            <strong>Raindrop, Pinboard, Chrome bookmarks</strong> — that&#39;s
            where you <em>save</em> links. Rebookmark is how you{' '}
            <em>actually read</em> them.
          </li>
          <li>
            <strong>Your bookmarks stay where they are.</strong> Rebookmark
            works on top of your existing tools — no new silo, no Pocket-style
            shutdown risk.
          </li>
          <li>
            <strong>Zero switching cost.</strong> Install the extension, import
            your bookmarks, start reading. Nothing to migrate, nothing to
            configure.
          </li>
        </ul>

        <h2>FAQ</h2>

        <dl>
          <dt>Does this replace Raindrop / Chrome bookmarks?</dt>
          <dd>
            No. Rebookmark works on top of them. Your bookmarks stay where they
            are — we just help you come back to them.
          </dd>

          <dt>Pocket shut down. Is this a replacement?</dt>
          <dd>
            Rebookmark isn&#39;t a read-it-later app. But if you have hundreds
            of saved links you never returned to, it solves the same underlying
            problem: actually reading what you saved.
          </dd>

          <dt>What happens if I stop using it?</dt>
          <dd>
            Nothing. Your bookmarks stay in Chrome / Raindrop / wherever they
            are. Rebookmark never moves or deletes your source bookmarks.
          </dd>

          <dt>Will it cost anything?</dt>
          <dd>
            Rebookmark will be free at launch. A Pro tier with AI features and
            advanced analytics may come later, but the core experience will
            always be free.
          </dd>

          <dt>When will it be available?</dt>
          <dd>
            Launch is planned for May 2026. Waitlist subscribers get early
            access.
          </dd>
        </dl>

        {/* CTA #2 */}
        <h2>Join the Waitlist</h2>

        <p>Free at launch. Waitlist subscribers get access first.</p>

        {status === 'success' ? (
          <p>
            <strong>
              You&#39;re on the list! We&#39;ll notify you when Rebookmark is
              ready.
            </strong>
          </p>
        ) : (
          <form onSubmit={handleSubmit} aria-label="Join waitlist" className="not-prose flex gap-3 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              required
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-md bg-gray-800 dark:bg-gray-200 px-5 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}

        {status === 'invalid' && (
          <p role="alert">
            <em>Please enter a valid email address.</em>
          </p>
        )}

        {status === 'error' && (
          <p role="alert">
            <em>Something went wrong. Please try again.</em>
          </p>
        )}
      </section>
    </>
  );
}

export default RebookmarkPage;
