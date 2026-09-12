import {
  articleMetadata,
  pageMetadata,
  SITE_DESCRIPTION,
  SITE_IMAGE,
} from '@/lib/metadata';

describe('pageMetadata', () => {
  test('derives canonical and og:url from the path', () => {
    const meta = pageMetadata({
      path: '/about',
      title: 'About | Serhii Shramko',
    });

    expect(meta.alternates?.canonical).toBe('https://shramko.dev/about');
    expect(meta.openGraph?.url).toBe('https://shramko.dev/about');
  });

  test('mirrors title and description into openGraph and twitter', () => {
    const meta = pageMetadata({
      path: '/gear',
      title: 'Gear | Serhii Shramko',
      description: 'My gear.',
    });

    expect(meta.title).toBe('Gear | Serhii Shramko');
    expect(meta.description).toBe('My gear.');
    expect(meta.openGraph?.title).toBe('Gear | Serhii Shramko');
    expect(meta.openGraph?.description).toBe('My gear.');
    expect(meta.twitter?.title).toBe('Gear | Serhii Shramko');
    expect(meta.twitter?.description).toBe('My gear.');
  });

  test('falls back to the site description and site image', () => {
    const meta = pageMetadata({ path: '/', title: 'Home' });

    expect(meta.description).toBe(SITE_DESCRIPTION);
    expect(meta.openGraph?.images).toEqual([
      { url: SITE_IMAGE, width: 1200, height: 630 },
    ]);
  });

  test('keeps the RSS alternate on every page', () => {
    const meta = pageMetadata({ path: '/blog', title: 'Blog' });

    expect(meta.alternates?.types).toEqual({
      'application/rss+xml': [
        { url: 'https://shramko.dev/feed.xml', title: "Serhii Shramko's Blog" },
      ],
    });
  });

  test('omits openGraph.images when image is null (file-based OG image routes)', () => {
    const meta = pageMetadata({ path: '/blog/x', title: 'X', image: null });

    expect(meta.openGraph).not.toHaveProperty('images');
    expect(meta.twitter).not.toHaveProperty('images');
  });

  test('uses a custom image and merges openGraph/twitter overrides last', () => {
    const meta = pageMetadata({
      path: '/quizlet-list',
      title: 'Quizlet QuickList - Web Extension',
      image: 'https://shramko.dev/static/images/quizlet-list/og-quizlet.jpg',
      openGraph: { description: 'OG copy' },
      twitter: { description: 'Twitter copy' },
    });

    expect(meta.openGraph?.images).toEqual([
      {
        url: 'https://shramko.dev/static/images/quizlet-list/og-quizlet.jpg',
        width: 1200,
        height: 630,
      },
    ]);
    expect(meta.openGraph?.description).toBe('OG copy');
    expect(meta.twitter?.description).toBe('Twitter copy');
    expect(meta.openGraph?.siteName).toBe('Serhii Shramko');
  });

  test('passes keywords and authors through', () => {
    const meta = pageMetadata({
      path: '/x',
      title: 'X',
      keywords: ['a', 'b'],
      authors: [{ name: 'Serhii Shramko' }],
    });

    expect(meta.keywords).toBe('a, b');
    expect(meta.authors).toEqual([{ name: 'Serhii Shramko' }]);
  });
});

describe('articleMetadata', () => {
  const base = {
    path: '/blog/hello',
    title: 'Hello',
    description: 'Desc',
    keywords: ['k'],
    createDate: Date.UTC(2024, 0, 2),
    updateDate: Date.UTC(2024, 5, 3),
    categories: ['React', 'TS'],
  };

  test('sets article openGraph fields and no images', () => {
    const meta = articleMetadata(base);
    const og = meta.openGraph as Record<string, unknown>;

    expect(og.type).toBe('article');
    expect(og.publishedTime).toBe('2024-01-02T00:00:00.000Z');
    expect(og.modifiedTime).toBe('2024-06-03T00:00:00.000Z');
    expect(og.section).toBe('Technology');
    expect(og.authors).toEqual(['https://shramko.dev']);
    expect(og.tags).toEqual(['React', 'TS']);
    expect(og).not.toHaveProperty('images');
    expect(meta.alternates?.canonical).toBe('https://shramko.dev/blog/hello');
  });

  test('skips modifiedTime and tags when absent', () => {
    const meta = articleMetadata({
      ...base,
      updateDate: null,
      categories: undefined,
    });
    const og = meta.openGraph as Record<string, unknown>;

    expect(og).not.toHaveProperty('modifiedTime');
    expect(og).not.toHaveProperty('tags');
  });
});
