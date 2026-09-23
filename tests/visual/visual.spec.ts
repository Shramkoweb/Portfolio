import { expect, test, visit } from './fixtures';
import { posts } from './routes';

// Only UI regions get baselines. Content pages supply real controls, not page snapshots.
test('navigation, keyboard focus and mobile menu', async ({
  page,
  isMobile,
}) => {
  await visit(page, '/');
  await expect(page.getByRole('banner')).toHaveScreenshot('header.png');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('banner')).toHaveScreenshot(
    'skip-link-focus.png',
  );
  await page.getByRole('button', { name: /Switch to .* mode/ }).focus();
  await expect(page.getByRole('banner')).toHaveScreenshot('theme-focus.png');
  if (isMobile) {
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await expect(
      page.getByRole('navigation', { name: 'Main', exact: true }).locator('ul'),
    ).toHaveScreenshot('menu-open.png');
  }
});

test('search focus, result and empty state', async ({ page }) => {
  await visit(page, '/blog');
  const input = page.getByRole('textbox', { name: 'Search articles' });
  await input.focus();
  await expect(input.locator('..')).toHaveScreenshot('search-focus.png');
  await input.fill(posts[0].heading);
  await expect(page.locator('main a h3')).toHaveCount(1);
  await expect(page.locator('main a:has(h3)')).toContainText('1,234 views');
  await expect(page.locator('main a:has(h3)')).toHaveScreenshot(
    'search-result.png',
  );
  await input.fill('no-such-article');
  const empty = page.getByRole('heading', { name: 'No articles found' });
  await expect(empty).toBeVisible();
  await expect(empty.locator('..')).toHaveScreenshot('search-empty.png');
});

test('table of contents collapsed and expanded', async ({ page }) => {
  await visit(page, '/blog/npm-semantic-versioning');
  const nav = page.getByRole('navigation', { name: 'Table of contents' });
  await expect(nav).toHaveScreenshot('contents-collapsed.png');
  await nav.getByRole('button').click();
  await expect(nav.getByRole('button')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(nav).toHaveScreenshot('contents-expanded.png');
});

test('copy control idle and success', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await visit(page, '/snippets/debounce');
  const pre = page.locator('pre').first();
  await pre.hover();
  await expect(pre.getByRole('button')).toHaveScreenshot('copy-idle.png');
  await pre.getByRole('button').click();
  await expect(pre.getByRole('button')).toHaveAttribute(
    'aria-label',
    'Copied!',
  );
  await expect(pre.getByRole('button')).toHaveScreenshot('copy-success.png');
});

for (const apiState of ['ready', 'loading', 'empty'] as const) {
  test.describe(apiState, () => {
    test.use({ apiState });
    test('dashboard metrics', async ({ page }) => {
      await visit(page, '/dashboard');
      const card = page.getByRole('link', { name: 'Total blog views' });
      await expect(card).toContainText(
        apiState === 'ready' ? '123,456' : apiState === 'empty' ? '0' : '---',
      );
      await expect(card.locator('..')).toHaveScreenshot(
        `dashboard-${apiState}.png`,
      );
    });

    test('view counter and reaction badges', async ({ page, isMobile }) => {
      await visit(page, '/blog/npm-semantic-versioning');
      const metric = page.getByText(
        apiState === 'ready'
          ? '1,234 views'
          : apiState === 'empty'
            ? '0 views'
            : '--- views',
        { exact: true },
      );
      await expect(metric).toBeVisible();
      await expect(metric.locator('..')).toHaveScreenshot(
        `views-${apiState}.png`,
      );
      if (!isMobile && apiState !== 'loading') {
        await expect(
          page.getByRole('button', {
            name: apiState === 'ready' ? 'Love it, 12 reactions' : 'Love it',
            exact: true,
          }),
        ).toBeVisible();
        await expect(page.locator('aside.share')).toHaveScreenshot(
          `engagement-${apiState}.png`,
        );
      }
    });
  });
}

test('featured card, hover and avatar', async ({ page, isMobile }) => {
  await visit(page, '/');
  const card = page.locator('main a[href^="/blog/"]').first();
  await expect(card).toContainText('1,234');
  await expect(card).toHaveScreenshot('featured-card.png');
  if (!isMobile) {
    await card.hover();
    await expect(card).toHaveScreenshot('featured-card-hover.png');
    const avatar = page
      .getByRole('img', { name: /smiling face/ })
      .locator('..');
    await avatar.hover();
    await avatar.locator('img').evaluateAll(async (images) => {
      await Promise.all(
        images.map((image) => (image as HTMLImageElement).decode()),
      );
    });
    await expect(avatar).toHaveScreenshot('avatar-hover.png');
  }
});
