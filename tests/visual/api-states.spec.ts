import { expect, test, visit } from './fixtures';

for (const apiState of ['loading', 'error', 'empty'] as const) {
  test.describe(apiState, () => {
    test.use({ apiState });
    for (const path of [
      '/',
      '/dashboard',
      '/blog',
      '/blog/npm-semantic-versioning',
    ]) {
      test(`${apiState} ${path}`, async ({ page, api }) => {
        await visit(page, path);
        await expect.poll(() => api.requests.length).toBeGreaterThan(0);
        if (path === '/dashboard')
          await expect(
            page.getByText(apiState === 'empty' ? '0' : '---', { exact: true }),
          ).toHaveCount(3);
        if (path === '/') {
          if (apiState === 'empty')
            await expect(
              page.locator('main a[href^="/blog/"]').first(),
            ).toContainText('0');
          else
            await expect(
              page.locator('main .animate-pulse').first(),
            ).toBeVisible();
        }
        if (path.startsWith('/blog'))
          await expect(
            page
              .getByText(
                apiState === 'empty' && path !== '/blog'
                  ? '0 views'
                  : '--- views',
                { exact: true },
              )
              .first(),
          ).toBeVisible();
        if (path.includes('npm-semantic-versioning')) {
          await expect(
            page.getByRole('button', { name: 'Love it', exact: true }),
          ).toBeVisible();
        }
      });
    }
  });
}

test('dashboard replaces placeholders when the response arrives', async ({
  page,
}) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/api/dashboard', async (route) => {
    await pending;
    await route.fallback();
  });
  try {
    await visit(page, '/dashboard');
    await expect(page.getByText('---', { exact: true })).toHaveCount(3);
    release();
    for (const value of ['123,456', '2,345', '6,789'])
      await expect(page.getByText(value, { exact: true })).toBeVisible();
  } finally {
    release();
  }
});

test('API failure recovers after reload', async ({ page, api }) => {
  api.state = 'error';
  await visit(page, '/dashboard');
  await expect.poll(() => api.requests.length).toBeGreaterThan(0);
  await expect(page.getByText('---', { exact: true })).toHaveCount(3);
  api.state = 'ready';
  await page.reload();
  await expect(page.getByText('123,456', { exact: true })).toBeVisible();
});
