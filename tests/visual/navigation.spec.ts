import { expect, ready, test, visit } from './fixtures';

test('keyboard skip link and navigation focus', async ({ page }) => {
  await visit(page, '/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to main content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/#skip');
  await page.getByRole('button', { name: /Switch to .* mode/ }).focus();
});

for (const [label, path] of Object.entries({
  Home: '/',
  About: '/about',
  Blog: '/blog',
  Dashboard: '/dashboard',
  Snippets: '/snippets',
  Bookmarks: '/bookmarks',
})) {
  test(`navigation to ${label}`, async ({ page, viewport }) => {
    await visit(page, label === 'Home' ? '/blog' : '/');
    const nav = page.getByRole('navigation', { name: 'Main', exact: true });
    const mobile = viewport!.width < 768;
    if (mobile) {
      await page.getByRole('button', { name: 'Toggle menu' }).click();
      await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    }
    await nav
      .getByRole('link', { name: label, exact: true })
      .filter({ visible: true })
      .click();
    await expect(page).toHaveURL(path);
    await ready(page);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
    if (mobile)
      await expect(
        nav
          .getByRole('link', { name: label, exact: true })
          .filter({ visible: true }),
      ).toHaveCount(0);
    else
      await expect(
        nav.getByRole('link', { name: label, exact: true }),
      ).toHaveAttribute('aria-current', 'page');
  });
}

test('mobile menu closes with its toggle', async ({ page, viewport }) => {
  test.skip(viewport!.width >= 768, 'The menu is available below md.');
  await visit(page, '/');
  const button = page.getByRole('button', { name: 'Toggle menu' });
  await button.click();
  await button.click();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('avatar changes on hover and restores on pointer leave', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Hover requires a mouse.');
  await visit(page, '/');
  const avatar = page.getByRole('button', {
    name: "Serhii Shramko's Memoji avatar",
  });
  const smile = avatar.locator('img').first();
  await avatar.hover();
  await expect(smile).toHaveCSS('opacity', '0');
  await page.mouse.move(0, 0);
  await expect(smile).toHaveCSS('opacity', '1');
});

test('bookmark section anchor', async ({ page }) => {
  await visit(page, '/bookmarks');
  const link = page
    .getByRole('navigation', { name: 'Bookmark sections' })
    .getByRole('link')
    .last();
  const href = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(`/bookmarks${href}`);
});

test('404 return home', async ({ page }) => {
  await visit(page, '/missing-page', 404);
  await page
    .getByRole('main')
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  await expect(page).toHaveURL('/');
  await ready(page);
});

for (const path of [
  '/blog/missing-post',
  '/snippets/missing-snippet',
  '/blog/category/missing-category',
]) {
  test(`unknown route returns 404: ${path}`, async ({ page }) => {
    await visit(page, path, 404);
    await expect(
      page.getByRole('main').getByRole('link', { name: 'Home', exact: true }),
    ).toBeVisible();
  });
}

test('resume download works from the current navigation layout', async ({
  page,
  isMobile,
}) => {
  await visit(page, '/');
  if (isMobile) await page.getByRole('button', { name: 'Toggle menu' }).click();
  const resume = page
    .getByRole('navigation', { name: 'Main', exact: true })
    .getByRole('link', { name: 'Resume', exact: true })
    .filter({ visible: true });
  const pending = page.waitForEvent('download');
  await resume.click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe('serhii_shramko_frontend.pdf');
  expect(await download.failure()).toBeNull();
});

test('footer links and browser history navigate correctly', async ({
  page,
}) => {
  await visit(page, '/');
  await page
    .getByRole('navigation', { name: 'Footer', exact: true })
    .getByRole('link', { name: 'My Gear' })
    .click();
  await expect(page).toHaveURL('/gear');
  await page
    .getByRole('navigation', { name: 'Footer', exact: true })
    .getByRole('link', { name: 'Learning' })
    .click();
  await expect(page).toHaveURL('/learning');
  await page.goBack();
  await expect(page).toHaveURL('/gear');
  await page.goForward();
  await expect(page).toHaveURL('/learning');
});

test('nav highlight follows the hovered link', async ({ page, viewport }) => {
  test.skip(viewport!.width < 768, 'The desktop links are hidden below md.');
  await visit(page, '/');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  const highlight = nav.locator('span[aria-hidden="true"]');
  await expect(highlight).toHaveCSS('opacity', '0');

  for (const label of ['Home', 'Bookmarks']) {
    const link = nav.getByRole('link', { name: label, exact: true });
    await link.hover();
    await expect(highlight).toHaveCSS('opacity', '1');

    const linkBox = (await link.boundingBox())!;
    await expect
      .poll(async () => {
        const box = (await highlight.boundingBox())!;

        return [box.x, box.y, box.width, box.height].map(Math.round);
      })
      .toEqual(
        [linkBox.x, linkBox.y, linkBox.width, linkBox.height].map(Math.round),
      );
  }

  await page.getByRole('heading', { level: 1 }).first().hover();
  await expect(highlight).toHaveCSS('opacity', '0');
});
