import { expect, test } from '@playwright/test';

const titles = {
  default: undefined,
  empty: '',
  short: 'React',
  multiline:
    'Practical patterns for React, TypeScript and Next.js applications',
  unicode: 'Українська: JavaScript & TypeScript',
  limit: 'A'.repeat(100),
  truncated: 'A'.repeat(120),
};

for (const [name, title] of Object.entries(titles)) {
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
