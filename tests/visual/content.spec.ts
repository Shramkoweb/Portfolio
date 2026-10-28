import { expect, test, visit } from './fixtures';

test('article image hints are present in the initial HTML', async ({
  page,
}) => {
  const response = await page.request.get('/blog/blogs-going-offline');
  expect(response.status()).toBe(200);
  const { images, preloadPriority } = await page.evaluate(
    (html) => {
      const document = new DOMParser().parseFromString(html, 'text/html');
      return {
        images: [...document.images].map((image) => ({
          loading: image.loading,
          fetchPriority: image.fetchPriority,
        })),
        preloadPriority: document
          .querySelector('link[rel="preload"][as="image"]')
          ?.getAttribute('fetchpriority'),
      };
    },
    await response.text(),
  );

  expect(preloadPriority).toBe('high');
  expect(images[0]).toMatchObject({
    loading: 'eager',
    fetchPriority: 'high',
  });
  expect(images.slice(1).every((image) => image.loading === 'lazy')).toBe(true);
});

test('article images match the content width', async ({ page, api }) => {
  await page.setViewportSize({ width: 673, height: 900 });
  await visit(page, '/blog/blogs-going-offline');
  const cover = page.locator('.prose img').first();
  await expect(cover).toBeVisible();
  await expect
    .poll(() => cover.evaluate((image: HTMLImageElement) => image.currentSrc))
    .toContain('&w=640&');
  expect(
    api.requests.some(({ path }) => path.startsWith('/api/reactions/')),
  ).toBe(false);
});

test('desktop article geometry stays stable while JavaScript loads', async ({
  page,
  viewport,
}) => {
  test.skip(viewport!.width < 1024, 'Reactions are desktop controls.');
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  await page.route('**/_next/static/**/*.js', async (route) => {
    await scriptsReady;
    await route.continue();
  });

  try {
    await page.goto('/blog/blogs-going-offline', { waitUntil: 'commit' });
    const cover = page.locator('.prose img').first();
    await expect(cover).toBeVisible();
    const before = await cover.boundingBox();

    releaseScripts();
    await expect(page.getByRole('button', { name: /^Love it/ })).toBeVisible();

    expect(await cover.boundingBox()).toEqual(before);
  } finally {
    releaseScripts();
  }
});

test('table of contents expands, navigates and collapses', async ({ page }) => {
  await visit(page, '/blog/npm-semantic-versioning');
  const nav = page.getByRole('navigation', { name: 'Table of contents' });
  const toggle = nav.getByRole('button', { name: 'Table of Contents' });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const link = nav.getByRole('link').first();
  const href = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(`/blog/npm-semantic-versioning${href}`);
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('section heading is a named link to itself', async ({ page }) => {
  await visit(page, '/blog/npm-semantic-versioning');
  const heading = page
    .locator('.prose')
    .getByRole('heading', { level: 2 })
    .first();
  const link = heading.getByRole('link');
  await link.focus();
  await expect(link).toHaveAccessibleName(await heading.innerText());
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(
    `/blog/npm-semantic-versioning#${await heading.getAttribute('id')}`,
  );
});

for (const path of ['/blog/npm-semantic-versioning', '/snippets/debounce']) {
  test(`code copy ${path}`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await visit(page, path);
    const pre = page.locator('pre').first();
    await pre.scrollIntoViewIfNeeded();
    await pre.hover();
    await pre.getByRole('button', { name: 'Copy code' }).click();
    await expect(pre.getByRole('button', { name: 'Copied!' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
      await pre.locator('code').innerText(),
    );
    await expect(pre.getByRole('button', { name: 'Copy code' })).toBeVisible();
  });
}

test('clipboard failure can be retried successfully', async ({ page }) => {
  await page.addInitScript(() => {
    let attempts = 0;
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () =>
        ++attempts === 1
          ? Promise.reject(new Error('Clipboard denied'))
          : Promise.resolve(),
    });
  });
  await visit(page, '/snippets/debounce');
  const pre = page.locator('pre').first();
  await pre.getByRole('button', { name: 'Copy code' }).click();
  await expect(pre.getByRole('status')).toBeEmpty();
  await pre.getByRole('button', { name: 'Copy code' }).click();
  await expect(pre.getByRole('button', { name: 'Copied!' })).toBeVisible();
  await expect(pre.getByRole('status')).toHaveText('Code copied to clipboard');
  await expect(pre.getByRole('status')).toBeEmpty();
});

test('all share controls remain visible and open the correct target', async ({
  page,
}) => {
  const opened: string[] = [];
  await page.exposeFunction('recordShare', (url: string) => opened.push(url));
  await page.addInitScript(() => {
    window.open = (url) => {
      void (
        window as unknown as { recordShare: (url: string) => Promise<void> }
      ).recordShare(String(url));
      return null;
    };
  });
  await visit(page, '/blog/npm-semantic-versioning');
  for (const [name, domain] of [
    ['Twitter', 'twitter.com'],
    ['LinkedIn', 'linkedin.com'],
    ['Facebook', 'facebook.com'],
    ['Telegram', 'telegram.me'],
  ]) {
    const button = page
      .getByRole('button', { name: `Share this post on ${name}` })
      .filter({ visible: true });
    await button.click();
    await expect.poll(() => opened.at(-1)).toContain(domain);
    expect(decodeURIComponent(opened.at(-1)!)).toContain(
      '/blog/npm-semantic-versioning',
    );
  }
});
