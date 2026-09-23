import { test as base, expect, type Page } from '@playwright/test';

import { posts, snippets } from './routes';

type ApiState = 'ready' | 'loading' | 'error' | 'empty';
type Options = { apiState: ApiState };
type MockApi = {
  state: ApiState;
  requests: { path: string; method: string; body: unknown }[];
};

export const test = base.extend<Options & { api: MockApi }>({
  apiState: ['ready', { option: true }],
  api: async ({ apiState }, use) => {
    await use({ state: apiState, requests: [] });
  },
  page: async ({ page, baseURL, api }, use) => {
    const pageErrors: string[] = [];
    const unknownApis: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.origin === baseURL && url.pathname.startsWith('/api/')) {
        api.requests.push({
          path: url.pathname,
          method: request.method(),
          body: request.postData() ? request.postDataJSON() : null,
        });
      }
    });
    await page.clock.setFixedTime(new Date('2026-09-19T12:00:00.000Z'));
    const reactions =
      api.state === 'empty'
        ? { heart: 0, beer: 0, trophy: 0 }
        : { heart: 12, beer: 1, trophy: 123 };
    const views = Object.fromEntries(
      [...posts, ...snippets].map(({ slug }) => [slug, 1234]),
    );

    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== baseURL) return route.abort();
      if (url.pathname.startsWith('/_vercel/'))
        return route.fulfill({ status: 204 });
      if (!url.pathname.startsWith('/api/')) return route.continue();
      const apiState = api.state;

      if (
        !/^\/api\/(views(?:\/[^/]+)?|dashboard|github|reactions\/[^/]+)$/.test(
          url.pathname,
        )
      ) {
        unknownApis.push(url.pathname);
        return route.abort();
      }
      if (apiState === 'loading') return;
      if (apiState === 'error')
        return route.fulfill({
          status: 503,
          json: { error: { message: 'Unavailable' } },
        });
      if (url.pathname.startsWith('/api/reactions/')) {
        if (route.request().method() === 'POST') {
          const { type } = route.request().postDataJSON() as {
            type: keyof typeof reactions;
          };
          reactions[type] += 1;
        }
        return route.fulfill({ json: { reactions } });
      }
      if (url.pathname === '/api/views')
        return route.fulfill({
          json: {
            views:
              apiState === 'empty'
                ? Object.fromEntries(
                    Object.keys(views).map((slug) => [slug, 0]),
                  )
                : views,
          },
        });
      if (url.pathname.startsWith('/api/views/'))
        return route.fulfill({
          json: { total: apiState === 'empty' ? 0 : 1234 },
        });
      return route.fulfill({
        json:
          apiState === 'empty'
            ? { totalViews: 0, stars: 0, followers: 0 }
            : { totalViews: 123456, stars: 2345, followers: 6789 },
      });
    });

    await use(page);
    expect(unknownApis, 'Every API must have an explicit fixture').toEqual([]);
    expect(pageErrors, 'Pages must hydrate without runtime errors').toEqual([]);
  },
});

export { expect };

export async function ready(page: Page) {
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Switch to .* mode/ }).locator('svg'),
  ).toBeVisible();
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    await expect(page.locator('canvas[data-drawn]')).toHaveCount(1);
  }
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}

export async function visit(page: Page, path: string, status = 200) {
  const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(status);
  await ready(page);
}
