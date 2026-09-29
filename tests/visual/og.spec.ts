import { expect, test } from '@playwright/test';

import { getPostsMetadata } from '../../lib/posts/api';

const snapshotTitles = {
  default: undefined,
  short: 'Gear | Serhii Shramko',
  multiline:
    'JavaScript, TypeScript, React & CSS Code Snippets | Serhii Shramko',
};

for (const [name, title] of Object.entries(snapshotTitles)) {
  test(`Open Graph image: ${name}`, async ({ request }) => {
    const query =
      title === undefined ? '' : `?title=${encodeURIComponent(title)}`;
    const response = await request.get(`/api/og${query}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    expect(await response.body()).toMatchSnapshot(`og-${name}.png`, {
      maxDiffPixels: 0,
    });
  });
}

test('renders published headings and site titles through both routes', async ({
  request,
}) => {
  const posts = await getPostsMetadata();
  const titles = [
    'About | Serhii Shramko',
    'Mastering React: Advanced Tips and Techniques',
    posts[0].data.heading,
    posts.reduce(
      (longest, post) =>
        post.data.heading.length > longest.length ? post.data.heading : longest,
      '',
    ),
  ];

  for (const path of ['/api/og', '/og']) {
    for (const title of titles) {
      const response = await request.get(
        `${path}?title=${encodeURIComponent(title)}`,
      );
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    }
  }
});

test('rejects arbitrary titles and cache-busting queries', async ({
  request,
}) => {
  for (const path of ['/api/og', '/og']) {
    for (const query of [
      '?title=untrusted',
      '?title=',
      `?title=${'a'.repeat(101)}`,
    ]) {
      const response = await request.get(`${path}${query}`);
      expect(response.status()).toBe(404);
      expect(response.headers()['cache-control']).toBe('no-store');
      expect(response.headers()['content-type']).not.toContain('image/png');
    }
    for (const query of [
      '?title=Serhii%20Shramko&title=untrusted',
      '?cacheBust=123',
    ]) {
      expect((await request.get(`${path}${query}`)).status()).toBe(400);
    }
  }
});
