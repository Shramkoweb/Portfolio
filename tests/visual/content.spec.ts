import { expect, test, visit } from './fixtures';

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
