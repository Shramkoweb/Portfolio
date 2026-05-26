import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const STORAGE_KEY = 'banner:blog-pause:dismissed-at';
export const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
const NEWSLETTER_URL =
  'https://newsletter.ownyourweb.site/archive/own-your-web-issue-18-curators/';

export function isDismissed(now: number): boolean {
  if (typeof window === 'undefined') return false;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) return false;
  const dismissedAt = Number(raw);
  if (!Number.isFinite(dismissedAt)) return false;
  return now - dismissedAt < DISMISS_DURATION_MS;
}

export function SiteBanner() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isDismissed(Date.now())) {
      setHidden(true);
    }
  }, []);

  function handleDismiss() {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setHidden(true);
  }

  if (hidden) return null;

  return (
    <section
      aria-label="Site notice"
      className="border-b border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
    >
      <div className="relative mx-auto flex max-w-3xl items-center px-8 py-2.5 text-sm">
        <p className="mx-auto">
          Blog paused. AI agents are stealing content faster than humans can
          write it. I want a moment to think about what is actually worth
          writing.{' '}
          <a
            href={NEWSLETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Read what inspired this.
          </a>
        </p>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="cursor-pointer absolute right-4 inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition-[color,background-color,transform] duration-200 ease-out-expo active:scale-[0.97] hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
