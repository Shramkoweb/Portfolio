import { getPostSlugs } from '@/lib/posts/api';
import { getSnippetSlugs } from '@/lib/snippets/api';

const MAX_SLUG_LENGTH = 128;

// Pages that legitimately POST view counts but have no MDX source behind them,
// so they never show up in getPostSlugs()/getSnippetSlugs().
const SYNTHETIC_SLUGS = ['udemy-reset-progress-page', 'quizlet-page'];

let knownSlugsPromise: Promise<Set<string>> | null = null;

async function buildKnownSlugs(): Promise<Set<string>> {
  const [postSlugs, snippetSlugs] = await Promise.all([
    getPostSlugs(),
    getSnippetSlugs(),
  ]);

  // Both helpers already strip the file extension via extractMarkdownSlug, so
  // these are the bare slugs the client posts. Do not strip again — a slug such
  // as `introducing-the-new-shramko.dev` would lose its `.dev`.
  return new Set([...postSlugs, ...snippetSlugs, ...SYNTHETIC_SLUGS]);
}

function getKnownSlugs(): Promise<Set<string>> {
  if (!knownSlugsPromise) {
    knownSlugsPromise = buildKnownSlugs().catch((err) => {
      // Don't memoise a transient disk failure, otherwise the route 500s forever.
      knownSlugsPromise = null;
      throw err;
    });
  }

  return knownSlugsPromise;
}

export async function isKnownSlug(slug: unknown): Promise<boolean> {
  // `req.query.slug` is typed as string but Next.js hands back string[] when a
  // duplicate query param is appended, so the type guard is load-bearing.
  if (typeof slug !== 'string' || !slug || slug.length > MAX_SLUG_LENGTH) {
    return false;
  }

  const knownSlugs = await getKnownSlugs();

  return knownSlugs.has(slug);
}
