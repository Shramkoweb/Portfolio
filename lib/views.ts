import useSWR, { useSWRConfig } from 'swr';

import { fetcher } from '@/lib/fetcher';
import { Views } from '@/lib/types';
import type { AllViewsResponse } from '@/pages/api/views';

const DAY_MS = 24 * 60 * 60 * 1000;
const SEEN_KEY = 'views:seen';
// Set to '1' in a browser to stop it counting views (e.g. the author's own).
const IGNORE_KEY = 'views:ignore';

// 'trunc' so a rounded count never overstates the real one (1,299 → 1.2K).
const countFormat = new Intl.NumberFormat('en', {
  notation: 'compact',
  roundingMode: 'trunc',
});

export function formatViewCount(count: number): string {
  return countFormat.format(count);
}

export function formatViews(count: number): string {
  return `${formatViewCount(count)} ${count === 1 ? 'view' : 'views'}`;
}

type SeenViews = Record<string, { at: number; total: number }>;

function readSeen(now = Date.now()): SeenViews {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(SEEN_KEY) ?? '{}',
    );
    if (!parsed || typeof parsed !== 'object') return Object.create(null);
    // No prototype, so a slug like "constructor" isn't already "seen".
    const fresh: SeenViews = Object.create(null);
    for (const [slug, entry] of Object.entries(
      parsed as Record<string, { at?: unknown; total?: unknown } | null>,
    )) {
      if (
        typeof entry?.at === 'number' &&
        typeof entry?.total === 'number' &&
        now - entry.at < DAY_MS
      ) {
        fresh[slug] = { at: entry.at, total: entry.total };
      }
    }
    return fresh;
  } catch {
    return Object.create(null);
  }
}

function writeSeen(slug: string, total: number) {
  try {
    const now = Date.now();
    const seen = readSeen(now);
    seen[slug] = { at: now, total };
    window.localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {
    // Storage blocked: fall back to counting every visit.
  }
}

function isIgnored(): boolean {
  try {
    return window.localStorage.getItem(IGNORE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Counts one view per browser per slug per day. Resolves to the fresh total,
 * or undefined when the view was not counted (already seen, ignored, failed).
 */
export async function registerView(slug: string): Promise<number | undefined> {
  if (isIgnored() || readSeen()[slug]) return undefined;

  try {
    const res = await fetch(`/api/views/${slug}`, { method: 'POST' });
    if (!res.ok) return undefined;
    const { total } = (await res.json()) as Views;
    writeSeen(slug, total);
    return total;
  } catch {
    return undefined;
  }
}

type VisibleDocument = Document & { prerendering?: boolean };

function isVisible(doc: VisibleDocument) {
  return !doc.prerendering && doc.visibilityState === 'visible';
}

/**
 * Runs `callback` once the page is shown to the reader, so prerendered pages
 * and background tabs don't count as views. Returns a cancel function.
 */
export function whenVisible(callback: () => void): () => void {
  const doc = document as VisibleDocument;
  if (isVisible(doc)) {
    callback();
    return () => {};
  }

  const stop = () => {
    doc.removeEventListener('visibilitychange', check);
    doc.removeEventListener('prerenderingchange', check);
  };
  const check = () => {
    if (!isVisible(doc)) return;
    stop();
    callback();
  };
  doc.addEventListener('visibilitychange', check);
  doc.addEventListener('prerenderingchange', check);
  return stop;
}

function highest(...counts: (number | undefined)[]): number | undefined {
  const known = counts.filter((count): count is number => count !== undefined);
  return known.length ? Math.max(...known) : undefined;
}

/**
 * Reads view counts from the shared, CDN-cached `/api/views` map, floored by
 * what this browser saw when it registered a view. Counts only grow, so the
 * highest value is the freshest: the list never shows less than the post did.
 */
export function useViewCounts() {
  const { cache } = useSWRConfig();
  const { data, error, isLoading } = useSWR<AllViewsResponse>(
    '/api/views',
    fetcher,
  );
  const views = data?.views;
  // Wait for the map so the first client render matches the server HTML.
  const seen: SeenViews = views ? readSeen() : Object.create(null);

  const getViews = (slug: string): number | undefined => {
    if (!views) return undefined;
    const registered = (
      cache.get(`/api/views/${slug}`)?.data as Views | undefined
    )?.total;
    return highest(views[slug], registered, seen[slug]?.total);
  };

  return { getViews, isLoading: isLoading && !error };
}
