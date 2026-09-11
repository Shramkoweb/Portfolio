import { getPostSlugs } from '@/lib/posts/api';
import { getSnippetSlugs } from '@/lib/snippets/api';

const MAX_SLUG_LENGTH = 128;

const SYNTHETIC_SLUGS = ['udemy-reset-progress-page', 'quizlet-page'];

let knownSlugsPromise: Promise<Set<string>> | null = null;

async function buildKnownSlugs(): Promise<Set<string>> {
  const [postSlugs, snippetSlugs] = await Promise.all([
    getPostSlugs(),
    getSnippetSlugs(),
  ]);

  // Do not strip extensions again: it would cut `.dev` off the real slug
  // `introducing-the-new-shramko.dev`.
  return new Set([...postSlugs, ...snippetSlugs, ...SYNTHETIC_SLUGS]);
}

function getKnownSlugs(): Promise<Set<string>> {
  if (!knownSlugsPromise) {
    knownSlugsPromise = buildKnownSlugs().catch((err) => {
      knownSlugsPromise = null;
      throw err;
    });
  }

  return knownSlugsPromise;
}

export async function isKnownSlug(slug: unknown): Promise<boolean> {
  // Next hands back string[] when a duplicate query param is appended.
  if (typeof slug !== 'string' || !slug || slug.length > MAX_SLUG_LENGTH) {
    return false;
  }

  const knownSlugs = await getKnownSlugs();

  return knownSlugs.has(slug);
}
