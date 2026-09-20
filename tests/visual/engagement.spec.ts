import { expect, test, visit } from './fixtures';

const article = '/blog/npm-semantic-versioning';
const endpoint = '**/api/reactions/npm-semantic-versioning';

test('all reaction types submit their type and display singular/plural and 99+ counts', async ({
  page,
  api,
}) => {
  await visit(page, article);
  await expect(
    page.getByRole('button', { name: 'Cheers, 1 reaction', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Champion, 123 reactions' }),
  ).toHaveText('99+');
  for (const [type, label, count] of [
    ['heart', 'Love it', 13],
    ['beer', 'Cheers', 2],
    ['trophy', 'Champion', 124],
  ] as const) {
    await page.getByRole('button', { name: new RegExp(`^${label}`) }).click();
    await expect(
      page.getByRole('button', { name: `${label}, ${count} reactions` }),
    ).toBeVisible();
    await expect
      .poll(() =>
        api.requests
          .filter(
            (r) => r.method === 'POST' && r.path.startsWith('/api/reactions/'),
          )
          .map((r) => r.body),
      )
      .toContainEqual({ type });
  }
});

for (const outcome of ['success', 'http-error', 'network-error'] as const) {
  test(`optimistic reaction and ${outcome}`, async ({ page }) => {
    await visit(page, article);
    await expect(
      page.getByRole('button', { name: 'Love it, 12 reactions' }),
    ).toBeVisible();
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route(endpoint, async (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      await pending;
      if (outcome === 'http-error')
        return route.fulfill({ status: 500, json: { error: 'Unavailable' } });
      if (outcome === 'network-error') return route.abort('failed');
      return route.fulfill({
        json: { reactions: { heart: 20, beer: 1, trophy: 123 } },
      });
    });
    try {
      await page.getByRole('button', { name: 'Love it, 12 reactions' }).click();
      await expect(
        page.getByRole('button', { name: 'Love it, 13 reactions' }),
      ).toBeVisible();
      release();
      await expect(
        page.getByRole('button', {
          name: `Love it, ${outcome === 'success' ? 20 : 12} reactions`,
        }),
      ).toBeVisible();
    } finally {
      release();
    }
  });
}

test.describe('first reaction', () => {
  test.use({ apiState: 'empty' });
  test('zero becomes one', async ({ page }) => {
    await visit(page, article);
    const button = page.getByRole('button', { name: 'Love it', exact: true });
    await expect(button).toHaveText('');
    await button.click();
    await expect(
      page.getByRole('button', { name: 'Love it, 1 reaction', exact: true }),
    ).toHaveText('1');
  });
});

for (const [path, slug] of [
  [article, 'npm-semantic-versioning'],
  ['/snippets/debounce', 'debounce'],
  ['/quizlet-list', 'quizlet-page'],
  ['/udemy-reset-progress', 'udemy-reset-progress-page'],
]) {
  test(`view registration occurs once per visit: ${path}`, async ({
    page,
    api,
  }) => {
    await visit(page, path);
    const registrations = () =>
      api.requests.filter(
        (request) =>
          request.path === `/api/views/${slug}` && request.method === 'POST',
      );
    await expect.poll(() => registrations().length).toBe(1);
    await page.getByRole('button', { name: /Switch to .* mode/ }).click();
    await expect(page.locator('html')).toHaveClass('dark');
    expect(registrations()).toHaveLength(1);
    await page.reload();
    await expect.poll(() => registrations().length).toBe(2);
  });
}

for (const outcome of ['success', 'http-error', 'network-error'] as const) {
  test(`view counter handles registration ${outcome}`, async ({ page }) => {
    await page.route('**/api/views/npm-semantic-versioning', (route) => {
      if (route.request().method() !== 'POST') return route.fallback();
      if (outcome === 'http-error')
        return route.fulfill({ status: 500, json: { error: 'Unavailable' } });
      if (outcome === 'network-error') return route.abort('failed');
      return route.fulfill({ json: { total: 1235 } });
    });
    await visit(page, article);
    await expect(
      page.getByText(`${outcome === 'success' ? '1,235' : '1,234'} views`, {
        exact: true,
      }),
    ).toBeVisible();
  });
}
