import { expect, test, visit } from './fixtures';

for (const width of [360, 639, 640, 767, 768, 1023, 1024]) {
  test(`navigation, grid and share controls at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await visit(page, '/snippets');
    const nav = page.getByRole('navigation', { name: 'Main', exact: true });
    await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible(
      { visible: width < 768 },
    );
    await expect(
      nav.getByRole('link', { name: 'Home', exact: true }),
    ).toBeVisible({ visible: width >= 768 });
    const cards = page.locator('main ul > li');
    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    expect(first && second).toBeTruthy();
    if (width >= 640) expect(second!.y).toBe(first!.y);
    else expect(second!.y).toBeGreaterThan(first!.y);
    await visit(page, '/blog/npm-semantic-versioning');
    await expect(page.getByRole('button', { name: /^Love it/ })).toBeVisible({
      visible: width >= 1024,
    });
    await expect(
      page
        .getByRole('button', { name: 'Share this post on Twitter' })
        .filter({ visible: true }),
    ).toHaveCount(1);
  });
}
