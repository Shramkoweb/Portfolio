/**
 * @jest-environment node
 */
import { getProjectPagePaths } from '@/lib/markdown/project-pages';
import handler from '@/pages/api/markdown/page';

import { createMockReqRes } from '../helpers/api-mocks';

async function request(
  query: Record<string, string | string[]>,
  method = 'GET',
) {
  const mocks = createMockReqRes({ method, query });
  await handler(mocks.req, mocks.res);
  const headers = Object.fromEntries(mocks.setHeader.mock.calls);
  return {
    status: mocks.status.mock.calls[0][0],
    headers,
    body: mocks.send.mock.calls[0][0] as string,
  };
}

describe('API /api/markdown/page', () => {
  it('serves a hand-written twin with store links from the constants', async () => {
    const { status, headers, body } = await request({ path: 'quizlet-list' });

    expect(status).toBe(200);
    expect(headers).toEqual({
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: '<https://shramko.dev/quizlet-list>; rel="canonical"',
      Vary: 'Accept',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    });
    expect(body).toMatch(
      /^# Save Words from Any Page for Quizlet and Anki\n\n> /,
    );
    expect(body).toContain('Source: https://shramko.dev/quizlet-list ·');
    expect(body).not.toContain('Published:');
    expect(body).toContain(
      '- [Quizlet QuickList on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/quizlet-quicklist/?utm_source=shramko.dev&utm_medium=markdown&utm_campaign=quizlet-list)',
    );
    expect(body).toMatch(
      /Rated \d\.\d out of 5 from \d+ ratings, with [\d,]+ users/,
    );
    expect(body).toContain(
      '[paste a CSV into Quizlet](https://shramko.dev/quizlet-list/quizlet-import-csv)',
    );
  });

  it('renders the speed table and dates of a guide', async () => {
    const { body } = await request({
      path: 'udemy-reset-progress/troubleshooting',
    });

    expect(body).toContain('Published: 2026-10-16 · Updated: 2026-11-05');
    expect(body).toContain('| Safe | 400 ms | Every 20 clicks | 3 s |');
    expect(body).toContain(
      "[Udemy's new course experience](https://shramko.dev/udemy-reset-progress/troubleshooting#no-checkboxes)",
    );
  });

  it('generates the formatter guides from the app data', async () => {
    const { status, headers, body } = await request({
      path: 'quizlet-list/to/anki',
    });

    expect(status).toBe(200);
    expect(headers.Link).toBe(
      '<https://shramko.dev/quizlet-list/to/anki>; rel="canonical"',
    );
    expect(body).toMatch(/^# Import a Word List into Anki\n/);
    expect(body).toContain('Published: 2026-10-16');
    expect(body).toContain('1. Paste your words on this page');
    expect(body).toContain('### Header lines need Anki 2.1.54 or newer');
    expect(body).toContain('utm_campaign=to-anki');
    expect(body).toContain(
      '- [Import a Word List into Quizlet](https://shramko.dev/quizlet-list/to/quizlet)',
    );
  });

  it.each([
    'missing',
    'quizlet-list.md',
    'quizlet-list/to/cram',
    'quizlet-list/to/toString',
    'quizlet-list/privacy-policy',
    '../package',
    '../_posts/react-useref',
    '/quizlet-list',
  ])('returns 404 for %s', async (path) => {
    const { status, headers, body } = await request({ path });

    expect(status).toBe(404);
    expect(headers['Content-Type']).toBe('text/plain; charset=utf-8');
    expect(body).toBe('Not found\n');
  });

  it('returns 404 without a single path', async () => {
    expect((await request({})).status).toBe(404);
    expect(
      (await request({ path: ['quizlet-list', 'udemy-reset-progress'] }))
        .status,
    ).toBe(404);
  });

  it('rejects other methods', async () => {
    const { status, headers } = await request({ path: 'quizlet-list' }, 'POST');

    expect(status).toBe(405);
    expect(headers.Allow).toBe('GET, HEAD');
  });

  it('converts every twin', async () => {
    const paths = await getProjectPagePaths();

    expect(paths).toEqual([
      'quizlet-list',
      'quizlet-list/quizlet-chrome-extension',
      'quizlet-list/quizlet-import-csv',
      'quizlet-list/to/anki',
      'quizlet-list/to/quizlet',
      'quizlet-list/to/remnote',
      'udemy-reset-progress',
      'udemy-reset-progress/progress-not-updating',
      'udemy-reset-progress/troubleshooting',
    ]);
    for (const path of paths) {
      const { status, body } = await request({ path });
      expect([path, status]).toEqual([path, 200]);
      expect(body).not.toMatch(/<[A-Z]/);
    }
  });
});
