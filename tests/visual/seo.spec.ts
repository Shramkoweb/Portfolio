import { readFileSync } from 'node:fs';

import matter from 'gray-matter';

import { expect, ready, test, visit } from './fixtures';

const origin = 'https://shramko.dev';
const singletonTags = [
  'description',
  'og:url',
  'og:type',
  'og:site_name',
  'og:title',
  'og:description',
  'og:image',
  'og:image:width',
  'og:image:height',
  'og:image:type',
  'og:image:alt',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'twitter:image:alt',
];

function article(path: string) {
  const directory = path.startsWith('/blog/') ? '_posts' : '_snippets';
  return matter(
    readFileSync(`${directory}/${path.split('/').at(-1)}.md`, 'utf8'),
  ).data;
}

test('SEO: every sitemap page has unique prerendered metadata', async ({
  page,
  request,
}) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const paths = await page.evaluate(
    (xml) => {
      const doc = new DOMParser().parseFromString(xml, 'application/xml');
      return [...doc.querySelectorAll('loc')].map(
        (el) => new URL(el.textContent!).pathname,
      );
    },
    await sitemap.text(),
  );
  expect(paths).not.toContain('/og');
  expect(paths).not.toContain('/feed.xml');

  for (let index = 0; index < paths.length; index += 10) {
    const pages = await Promise.all(
      paths.slice(index, index + 10).map(async (path) => {
        const response = await request.get(path);
        expect(response.status(), path).toBe(200);
        return { path, html: await response.text() };
      }),
    );
    const metadata = await page.evaluate(
      (documents) =>
        documents.map(({ path, html }) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const tags: Record<string, string[]> = {};
          for (const el of doc.head.querySelectorAll('meta')) {
            const key = el.getAttribute('name') || el.getAttribute('property');
            if (key) (tags[key] ??= []).push(el.getAttribute('content') || '');
          }
          return {
            path,
            tags,
            title: doc.title,
            canonical: [
              ...doc.head.querySelectorAll('link[rel="canonical"]'),
            ].map((el) => el.getAttribute('href')),
            schemas: [
              ...doc.head.querySelectorAll(
                'script[type="application/ld+json"]',
              ),
            ].map((el) => JSON.parse(el.textContent!)),
          };
        }),
      pages,
    );

    for (const { path, tags, title, canonical, schemas } of metadata) {
      expect(canonical, path).toEqual([`${origin}${path}`]);
      for (const key of singletonTags) {
        expect(tags[key], `${path}: ${key}`).toHaveLength(1);
        expect(tags[key][0], `${path}: empty ${key}`).not.toBe('');
      }
      expect(tags['twitter:title']).toEqual(tags['og:title']);
      expect(tags['twitter:description']).toEqual(tags['og:description']);
      expect(tags['twitter:image']).toEqual(tags['og:image']);
      expect(tags['twitter:image:alt']).toEqual(tags['og:image:alt']);
      expect(tags['og:url']).toEqual(canonical);
      if (path !== '/')
        expect(tags['og:title'][0]).not.toBe(
          'Serhii Shramko – Developer, writer, creator.',
        );

      if (/^\/(blog|snippets)\/[^/]+$/.test(path)) {
        const data = article(path);
        expect(title, path).toBe(data.title);
        expect(tags.description).toEqual([data.description]);
        expect(tags['og:title']).toEqual([data.title]);
        expect(tags['og:description']).toEqual([data.description]);
        expect(tags['og:type']).toEqual(['article']);
        expect(tags['article:published_time']).toHaveLength(1);
        expect(new Date(tags['article:published_time'][0]).toUTCString()).toBe(
          new Date(data.createDate).toUTCString(),
        );
        const image = new URL(tags['og:image'][0]);
        expect(image.origin).toBe(origin);
        expect(image.pathname).toBe('/og');
        expect(image.searchParams.get('title')).toBe(data.heading);
        if (path.startsWith('/blog/')) {
          expect(
            schemas.find((schema) => schema['@type'] === 'BlogPosting').image,
          ).toBe(image.href);
        }
      }
    }
  }
});

test('SEO: metadata follows client navigation and clears article tags', async ({
  page,
}) => {
  await visit(page, '/blog');
  await page.evaluate(() => {
    document.documentElement.dataset.navigationMarker = 'present';
  });
  const checkArticle = async (path: string) => {
    const data = article(path);
    await ready(page);
    await expect(page).toHaveTitle(data.title);
    await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
      'content',
      data.description,
    );
    await expect(
      page.locator('head meta[property="og:title"]'),
    ).toHaveAttribute('content', data.title);
    await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute(
      'content',
      'article',
    );
    await expect(
      page.locator('head meta[property="og:image"]'),
    ).toHaveAttribute(
      'content',
      `${origin}/og?title=${encodeURIComponent(data.heading)}`,
    );
    await expect(page.locator('html')).toHaveAttribute(
      'data-navigation-marker',
      'present',
    );
  };

  await page.locator('a[href="/blog/second-brain-from-video"]').first().click();
  await checkArticle('/blog/second-brain-from-video');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  await nav.getByRole('link', { name: 'Blog', exact: true }).click();
  await expect(page.locator('head meta[property^="article:"]')).toHaveCount(0);
  await page.locator('a[href="/blog/build-time-lies"]').first().click();
  await checkArticle('/blog/build-time-lies');
  await nav.getByRole('link', { name: 'Snippets', exact: true }).click();
  await page.locator('a[href="/snippets/branded-types"]').first().click();
  await checkArticle('/snippets/branded-types');
  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.locator('head meta[property^="article:"]')).toHaveCount(0);
  await expect(page.locator('head meta[property="og:type"]')).toHaveAttribute(
    'content',
    'website',
  );
  await expect(page.locator('head meta[property="og:image"]')).toHaveAttribute(
    'content',
    `${origin}/static/images/twittersite.png`,
  );
});

test('SEO: canonical URLs exclude tracking queries and fragments', async ({
  page,
}) => {
  await visit(page, '/bookmarks?utm_source=audit');
  await page
    .getByRole('navigation', { name: 'Bookmark sections' })
    .getByRole('link')
    .last()
    .click();
  for (const selector of ['link[rel="canonical"]', 'meta[property="og:url"]']) {
    await expect(page.locator(`head ${selector}`)).toHaveAttribute(
      selector.startsWith('link') ? 'href' : 'content',
      `${origin}/bookmarks`,
    );
  }
});

test('SEO: static social image dimensions match the files', async ({
  page,
  request,
}) => {
  for (const path of ['/', '/quizlet-list', '/udemy-reset-progress']) {
    const response = await request.get(path);
    const image = await page.evaluate(
      (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const value = (key: string) =>
          doc
            .querySelector(`meta[property="${key}"]`)!
            .getAttribute('content')!;
        return {
          url: value('og:image'),
          width: Number(value('og:image:width')),
          height: Number(value('og:image:height')),
          type: value('og:image:type'),
        };
      },
      await response.text(),
    );
    const asset = await request.get(new URL(image.url).pathname);
    expect(asset.status()).toBe(200);
    expect(asset.headers()['content-type']).toContain(image.type);
    const dimensions = await page.evaluate(
      async ({ bytes, type }) => {
        const bitmap = await createImageBitmap(
          new Blob([new Uint8Array(bytes)], { type }),
        );
        const size = { width: bitmap.width, height: bitmap.height };
        bitmap.close();
        return size;
      },
      { bytes: [...(await asset.body())], type: image.type },
    );
    expect(dimensions, path).toEqual({
      width: image.width,
      height: image.height,
    });
  }
});

test('SEO: feed thumbnails and favicon are publicly served', async ({
  page,
  request,
}) => {
  const feed = await request.get('/feed.xml');
  expect(feed.status()).toBe(200);
  expect(feed.headers()['content-type']).toContain('application/rss+xml');
  const parsed = await page.evaluate(
    (xml) => {
      const doc = new DOMParser().parseFromString(xml, 'application/xml');
      return {
        error: doc.querySelector('parsererror')?.textContent,
        logo: doc.querySelector('channel > image > url')?.textContent,
        items: [...doc.querySelectorAll('item')].map((item) => ({
          link: item.querySelector('link')!.textContent!,
          guid: item.querySelector('guid')!.textContent!,
          date: item.querySelector('pubDate')!.textContent!,
          image: item
            .getElementsByTagNameNS(
              'http://search.yahoo.com/mrss/',
              'content',
            )[0]
            ?.getAttribute('url'),
        })),
      };
    },
    await feed.text(),
  );
  expect(parsed.error).toBeUndefined();
  expect(parsed.items.length).toBeGreaterThan(0);
  expect(new Set(parsed.items.map((item) => item.guid)).size).toBe(
    parsed.items.length,
  );
  for (const item of parsed.items) {
    const data = article(new URL(item.link).pathname);
    expect(item.guid).toBe(item.link);
    expect(item.date).toBe(new Date(data.createDate).toUTCString());
    expect(item.image).toBe(
      `${origin}/og?title=${encodeURIComponent(data.heading)}`,
    );
  }
  const image = await request.get(
    new URL(parsed.items[0].image!).pathname +
      new URL(parsed.items[0].image!).search,
  );
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/png');
  expect((await image.body()).readUInt32BE(16)).toBe(1200);
  expect((await image.body()).readUInt32BE(20)).toBe(630);
  const logo = await request.get(new URL(parsed.logo!).pathname);
  expect(logo.status()).toBe(200);
  expect(logo.headers()['content-type']).toContain('image/png');
  const favicon = await request.get('/favicon.ico');
  expect(favicon.status()).toBe(200);
  expect(favicon.headers()['content-type']).toMatch(/^image\//);
});
