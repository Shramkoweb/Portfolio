import Head from 'next/head';
import { FormEvent, useEffect, useState } from 'react';

function RebookmarkPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
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
        <meta
          property="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:title"
          key="twitter:title"
          content="Rebookmark — Your Bookmarks Aren't Dead"
        />
        <meta
          property="twitter:description"
          key="twitter:description"
          content="Chrome extension that brings forgotten bookmarks back on a smart schedule. Join the waitlist."
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
          Rebookmark: Your Bookmarks Aren&#39;t Dead. They&#39;re Just
          Sleeping.
        </h1>

        <p>
          You save dozens of bookmarks every week — articles, tutorials, tools,
          interesting threads. You tell yourself{' '}
          <em>&#34;I&#39;ll read this later.&#34;</em> But later never comes.
        </p>

        <p>
          You have hundreds of unread bookmarks collecting dust. The problem
          isn&#39;t organizing them better — it&#39;s having no reason to go
          back.
        </p>

        <p>
          That&#39;s why I&#39;m building <strong>Rebookmark</strong> — a
          Chrome extension that brings your forgotten bookmarks back, one at a
          time, on a smart schedule. It works on top of your existing bookmarks.
          No migration. No new app to learn. Think of it as{' '}
          <strong>Duolingo for your bookmarks</strong> — it doesn&#39;t
          organize them, it makes you actually come back to them.
        </p>

        {/* Section label: Extension */}
        <p className="not-prose text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-10 mb-4">
          Chrome Extension
        </p>

        {/* Triage Card Mockup */}
        <div className="not-prose my-4 mx-auto w-full max-w-sm select-none" aria-hidden="true">
          <div className="rounded-xl border border-gray-200 bg-white text-gray-900 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 text-xs text-gray-500">
              <span>🔥 12 day streak</span>
              <span>142 of 1,847 processed</span>
            </div>

            {/* Card content */}
            <div className="px-5 pb-5 flex flex-col items-center text-center">
              {/* Favicon */}
              <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-sm font-semibold text-orange-600 mb-2">
                M
              </div>
              <p className="text-xs text-gray-400 mb-3">
                medium.com · 12 min read
              </p>
              <h4 className="text-base font-semibold leading-snug mb-3">
                Why senior engineers should write more and code less
              </h4>
              <p className="text-xs leading-relaxed text-gray-500 mb-3">
                The author argues that after 5+ years of experience,
                documentation, RFCs and technical writing create more impact
                than code. Includes a framework for evaluating your
                leverage.{' '}
                <span className="inline-block border border-gray-200 rounded px-1.5 py-0.5 text-[10px] text-gray-400">
                  AI summary
                </span>
              </p>

              {/* Tags */}
              <div className="flex gap-1.5 mb-4">
                <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">
                  career
                </span>
                <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">
                  engineering
                </span>
                <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] text-gray-500">
                  writing
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 w-full mb-4">
                <span className="flex-1 py-2 rounded-lg border border-green-200 text-green-700 text-sm font-medium text-center">
                  Open
                </span>
                <span className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium text-center">
                  Later
                </span>
                <span className="flex-1 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium text-center">
                  Delete
                </span>
              </div>

              {/* Decay row */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Saved 47 days ago</span>
                <div className="flex gap-0.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-green-700" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-yellow-700" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-stone-400" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-stone-300" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-stone-200" />
                </div>
              </div>
            </div>

            {/* Bottom progress */}
            <div className="border-t border-gray-100 px-5 py-3">
              <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
                <span>142 processed</span>
                <span>1,705 remaining</span>
              </div>
              <div className="h-1 rounded-full bg-gray-100">
                <div className="h-1 rounded-full bg-green-700 w-[7.7%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Extension Popup Mockup */}
        <div className="not-prose my-4 mx-auto w-full max-w-sm select-none" aria-hidden="true">
          <div className="rounded-xl border border-gray-200 bg-white text-gray-900 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <span className="text-sm font-semibold">Rebookmark</span>
              <span className="text-xs text-gray-400">🔥 12</span>
            </div>

            {/* Stats */}
            <div className="px-5 pt-4 pb-3">
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="rounded-lg border border-gray-100 px-3 py-2.5">
                  <div className="text-lg font-semibold leading-none mb-0.5">
                    1,847
                  </div>
                  <div className="text-[11px] text-gray-400">Total</div>
                </div>
                <div className="rounded-lg border border-gray-100 px-3 py-2.5">
                  <div className="text-lg font-semibold leading-none mb-0.5">
                    142
                  </div>
                  <div className="text-[11px] text-gray-400">Processed</div>
                </div>
                <div className="rounded-lg border border-gray-100 px-3 py-2.5">
                  <div className="text-lg font-semibold leading-none mb-0.5">
                    23
                  </div>
                  <div className="text-[11px] text-gray-400">Deleted</div>
                </div>
              </div>
              <div className="h-1 rounded-full bg-gray-100 mb-1.5">
                <div className="h-1 rounded-full bg-blue-500 w-[7.7%]" />
              </div>
              <p className="text-[11px] text-gray-400">
                7.7% of library processed
              </p>
            </div>

            {/* Next bookmark */}
            <div className="px-5 pb-4 border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-400 mb-2.5">Next bookmark:</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-xs font-semibold text-green-600 shrink-0">
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
                <span className="flex-1 py-1.5 rounded-lg border border-green-200 text-green-700 text-xs font-medium text-center">
                  Open
                </span>
                <span className="flex-1 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium text-center">
                  Later
                </span>
                <span className="flex-1 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-medium text-center">
                  Delete
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-5 py-2.5 flex gap-2">
              <span className="flex-1 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-[11px] font-medium text-center">
                Open dashboard
              </span>
              <span className="flex-1 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-[11px] font-medium text-center">
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
                <span className="text-xs text-gray-400">
                  1,705 in queue
                </span>
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
                      <span className="text-[9px] text-gray-400">
                        decaying
                      </span>
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
                  <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end h-full">
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
                  <span className="text-[10px] text-gray-400">
                    Snoozed: 8
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-gray-500" />
                  <span className="text-[10px] text-gray-400">
                    Deleted: 5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section label: Settings */}
        <p className="not-prose text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-10 mb-4">
          Settings
        </p>

        {/* Settings Mockup */}
        <div className="not-prose my-4 w-full select-none" aria-hidden="true">
          <div className="rounded-xl border border-gray-200 bg-white text-gray-900 overflow-hidden">
            {/* Sources */}
            <div className="px-6 py-5">
              <h4 className="text-sm font-semibold mb-3">Bookmark sources</h4>
              <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Chrome bookmarks</p>
                    <p className="text-[11px] text-gray-400">
                      1,847 bookmarks imported
                    </p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">
                    Connected
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Raindrop.io</p>
                    <p className="text-[11px] text-gray-400">
                      Import collections via API
                    </p>
                  </div>
                  <span className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
                    Connect
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">HTML file</p>
                    <p className="text-[11px] text-gray-400">
                      Import from any browser
                    </p>
                  </div>
                  <span className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] text-gray-500">
                    Upload
                  </span>
                </div>
              </div>
            </div>

            {/* Resurfacing */}
            <div className="px-6 pb-5">
              <h4 className="text-sm font-semibold mb-3">Resurfacing</h4>
              <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Bookmarks per day</p>
                    <p className="text-[11px] text-gray-400">
                      How many to surface daily
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-gray-100 relative">
                      <div className="absolute left-0 top-0 h-1.5 w-[30%] rounded-full bg-gray-900" />
                      <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-gray-900 left-[30%] -translate-x-1/2" />
                    </div>
                    <span className="text-sm font-semibold w-4 text-right">
                      3
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email digest</p>
                    <p className="text-[11px] text-gray-400">
                      Daily email at 8:00 AM
                    </p>
                  </div>
                  {/* Toggle ON */}
                  <div className="w-9 h-5 rounded-full bg-blue-500 relative">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm" />
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Pause resurfacing</p>
                    <p className="text-[11px] text-gray-400">
                      Temporarily stop all reminders
                    </p>
                  </div>
                  {/* Toggle OFF */}
                  <div className="w-9 h-5 rounded-full bg-gray-200 relative">
                    <div className="w-4 h-4 rounded-full bg-white absolute left-0.5 top-0.5 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI */}
            <div className="px-6 pb-5">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="text-sm font-semibold">AI features</h4>
                <span className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 font-medium">
                  Pro
                </span>
              </div>
              <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto-tags</p>
                    <p className="text-[11px] text-gray-400">
                      Automatically tag new bookmarks
                    </p>
                  </div>
                  <div className="w-9 h-5 rounded-full bg-blue-500 relative">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm" />
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">AI summaries</p>
                    <p className="text-[11px] text-gray-400">
                      1-2 sentence page description
                    </p>
                  </div>
                  <div className="w-9 h-5 rounded-full bg-blue-500 relative">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm" />
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Dead link detection</p>
                    <p className="text-[11px] text-gray-400">
                      Find and flag broken bookmarks
                    </p>
                  </div>
                  <div className="w-9 h-5 rounded-full bg-blue-500 relative">
                    <div className="w-4 h-4 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2>How It Works</h2>

        <ol>
          <li>
            <strong>Import</strong> your existing bookmarks from Chrome,
            Raindrop.io, or an HTML export
          </li>
          <li>
            <strong>Get a daily dose</strong> of forgotten bookmarks delivered
            to your browser badge
          </li>
          <li>
            <strong>Triage</strong> each one — Read it, Snooze it, or Delete it
          </li>
          <li>
            <strong>Track your progress</strong> as your bookmark graveyard
            shrinks day by day
          </li>
        </ol>

        <h2>Features</h2>

        <ul>
          <li>
            <strong>Smart resurfacing schedule</strong> — spaced repetition
            algorithm that brings bookmarks back at increasing intervals
          </li>
          <li>
            <strong>Zero friction</strong> — click the badge, triage in 30
            seconds, done
          </li>
          <li>
            <strong>AI-powered tags & summaries</strong> — know what a bookmark
            is about before opening it
          </li>
          <li>
            <strong>Dead link detection</strong> — automatically finds and
            flags broken bookmarks
          </li>
          <li>
            <strong>Library health score</strong> — visualize how healthy your
            bookmark collection is
          </li>
        </ul>

        <h2>Join the Waitlist</h2>

        <p>
          Rebookmark is currently in development. Leave your email to get early
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
          <form
            onSubmit={handleSubmit}
            className="not-prose flex gap-3 w-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-md bg-gray-800 dark:bg-gray-200 px-5 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              {status === 'loading' ? 'Joining...' : 'Join'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p>
            <em>Something went wrong. Please try again.</em>
          </p>
        )}

        <h2>FAQ</h2>

        <p>
          <strong>Q: Does Rebookmark replace my bookmark manager?</strong>
          <br />
          A: No. Rebookmark works on top of Chrome bookmarks or Raindrop.io. It
          doesn&#39;t store or organize bookmarks — it just helps you come back
          to them.
        </p>

        <p>
          <strong>Q: How much will it cost?</strong>
          <br />
          A: Free tier includes up to 200 bookmarks and 3 per day. Pro ($4/mo)
          unlocks unlimited bookmarks, AI summaries, email digests, and more.
        </p>

        <p>
          <strong>Q: When will it be available?</strong>
          <br />
          A: I&#39;m building it right now. Join the waitlist above to get early
          access.
        </p>
      </section>
    </>
  );
}

export default RebookmarkPage;
