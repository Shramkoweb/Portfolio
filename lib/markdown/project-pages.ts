import { readdir, readFile } from 'node:fs/promises';
import { join, sep } from 'node:path';

import matter from 'gray-matter';

import {
  type ExtensionStores,
  QUIZLET_APP_RATING,
  QUIZLET_APP_STORES,
  SITE_URL,
  type StoreRating,
  UDEMY_RESET_APP_RATING,
  UDEMY_RESET_APP_STORES,
} from '@/lib/constants';
import { FLASHCARD_APP_SLUGS, FLASHCARD_APPS } from '@/lib/flashcard-apps';
import { formatPostDate, parsePostDate } from '@/lib/posts/utils';
import { Routes } from '@/lib/routes';
import { withStoreUtm } from '@/lib/store-links';
import {
  UDEMY_PACING_MODES,
  UDEMY_PACING_VERSION,
} from '@/lib/udemy-pacing-modes';
import type { ImportFormat } from '@/lib/word-list';

import {
  type MarkdownSource,
  parseAttributes,
  toMarkdown,
} from './to-markdown';

const MARKDOWN_DIRECTORY = join(process.cwd(), '_markdown');

// Separate from the HTML pages' UTM medium, so store stats show the installs
// that came through an AI agent reading the Markdown.
const UTM_MEDIUM = 'markdown';

interface Product {
  name: string;
  stores: ExtensionStores;
  rating: StoreRating;
}

const PRODUCTS: Record<string, Product> = {
  'quizlet-list': {
    name: 'Quizlet QuickList',
    stores: QUIZLET_APP_STORES,
    rating: QUIZLET_APP_RATING,
  },
  'udemy-reset-progress': {
    name: 'Udemy Reset Progress',
    stores: UDEMY_RESET_APP_STORES,
    rating: UDEMY_RESET_APP_RATING,
  },
};

const STORE_LABELS: Record<keyof ExtensionStores, string> = {
  chrome: 'Chrome Web Store',
  firefox: 'Firefox Add-ons',
  edge: 'Microsoft Edge Add-ons',
};

function getProduct(attributes: Record<string, string>): Product {
  if (!Object.hasOwn(PRODUCTS, attributes.app)) {
    throw new Error(`Unknown app "${attributes.app}" in a Markdown twin`);
  }
  return PRODUCTS[attributes.app];
}

function installLinks(product: Product, campaign: string): string {
  return (Object.keys(STORE_LABELS) as (keyof ExtensionStores)[])
    .map(
      (store) =>
        `- [${product.name} on ${STORE_LABELS[store]}](${withStoreUtm(product.stores[store], UTM_MEDIUM, campaign)})`,
    )
    .join('\n');
}

function pacingTable(): string {
  return [
    `Speed modes in version ${UDEMY_PACING_VERSION}:`,
    '',
    '| Mode | Between clicks | Pause | Pause length |',
    '| --- | --- | --- | --- |',
    ...UDEMY_PACING_MODES.map(
      (mode) =>
        `| ${mode.name} | ${mode.delay} | ${mode.batch} | ${mode.pause} |`,
    ),
  ].join('\n');
}

// Stand-ins for the page components whose data lives in code, so the twins
// can't drift from the store links, ratings and speed table on the HTML page.
const COMPONENTS: Record<
  string,
  (attributes: Record<string, string>) => string
> = {
  InstallLinks: (attributes) =>
    installLinks(getProduct(attributes), attributes.campaign),
  StoreRating: (attributes) => {
    const { rating } = getProduct(attributes);
    const url = withStoreUtm(rating.storeUrl, UTM_MEDIUM, attributes.app);
    return `Rated ${rating.ratingValue.toFixed(1)} out of 5 from ${rating.ratingCount} ratings, with ${rating.users} users, on the [Chrome Web Store](${url}).`;
  },
  StoreUsers: (attributes) => getProduct(attributes).rating.users,
  UdemyPacingModes: pacingTable,
};

const COMPONENT_TAG = /<([A-Z][A-Za-z]*)\b((?:[^>"']|"[^"]*"|'[^']*')*?)\/>/g;

function expandComponents(content: string): string {
  return content.replace(
    COMPONENT_TAG,
    (tag: string, name: string, attributes: string) =>
      Object.hasOwn(COMPONENTS, name)
        ? COMPONENTS[name](parseAttributes(attributes))
        : tag,
  );
}

function toTimestamp(value: unknown): number | null {
  return value ? new Date(value as string | Date).getTime() : null;
}

function flashcardPath(slug: ImportFormat): string {
  return Routes.FlashcardImport(slug).slice(1);
}

// Mirrors pages/quizlet-list/to/[app].tsx, which renders the same data.
function flashcardSource(slug: ImportFormat, url: string): MarkdownSource {
  const app = FLASHCARD_APPS[slug];
  const createDate = parsePostDate(app.checkedAt);
  const brands = app.name === 'Quizlet' ? 'Quizlet' : `Quizlet or ${app.name}`;
  const related = FLASHCARD_APP_SLUGS.filter((other) => other !== slug);

  const content = [
    app.intro,
    `The formatter itself runs in your browser on [the HTML version of this page](${url}).`,
    `## How to import into ${app.name}`,
    `I checked these steps against ${app.name}'s official help on ${formatPostDate(createDate ?? 0)}.`,
    app.steps.map((step, index) => `${index + 1}. ${step}`).join('\n'),
    '## Before you import',
    ...app.notes.flatMap((note) => [`### ${note.title}`, note.body]),
    '## Collect the words while you read',
    `I built [Quizlet QuickList](${Routes.QuizletList()}) for exactly this. Select a word on any page, right-click, choose **Add to Quizlet QuickList**, and copy the whole list when you are done. It is free, keeps the list in your browser, and is my own extension, not an official ${brands} tool.`,
    installLinks(PRODUCTS['quizlet-list'], `to-${slug}`),
    '## Related',
    related
      .map(
        (other) =>
          `- [${FLASHCARD_APPS[other].heading}](${Routes.FlashcardImport(other)})`,
      )
      .join('\n'),
    '## Further reading',
    app.sources
      .map((source) => `- [${source.label}](${source.url})`)
      .join('\n'),
  ].join('\n\n');

  return {
    title: app.heading,
    description: app.description,
    url,
    createDate,
    updateDate: null,
    content,
  };
}

/** URL paths, without the leading slash, of every page with a Markdown twin. */
export async function getProjectPagePaths(): Promise<string[]> {
  const files = await readdir(MARKDOWN_DIRECTORY, { recursive: true });
  const written = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length).split(sep).join('/'));

  return [...written, ...FLASHCARD_APP_SLUGS.map(flashcardPath)].sort();
}

export async function getProjectPageMarkdown(
  path: string,
): Promise<string | null> {
  // The allowlist is what keeps a crafted path from reading other files.
  if (!(await getProjectPagePaths()).includes(path)) {
    return null;
  }

  const url = `${SITE_URL}/${path}`;
  const flashcard = FLASHCARD_APP_SLUGS.find(
    (slug) => flashcardPath(slug) === path,
  );
  if (flashcard) {
    return toMarkdown(flashcardSource(flashcard, url));
  }

  const { data, content } = matter(
    await readFile(join(MARKDOWN_DIRECTORY, `${path}.md`), 'utf8'),
  );

  return toMarkdown({
    title: data.title,
    description: data.description,
    url,
    createDate: toTimestamp(data.createDate),
    updateDate: toTimestamp(data.updateDate),
    content: expandComponents(content),
  });
}
