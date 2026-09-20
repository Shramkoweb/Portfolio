import { expect, test, visit } from './fixtures';
import { categories, posts } from './routes';

for (const category of [null, 'react']) {
  const path = category ? `/blog/category/${category}` : '/blog';
  const available = posts.filter(
    (post) => !category || post.categories.includes(category),
  );
  const post = available[0];

  test(`search ${path}: case-insensitive match, no results, clear`, async ({
    page,
  }) => {
    await visit(page, path);
    const input = page.getByRole('textbox', { name: 'Search articles' });
    await input.fill(post.heading.toUpperCase());
    await expect(page.locator('main a h3')).toHaveCount(1);
    await expect(
      page.locator(`main a[href="/blog/${post.slug}"]`),
    ).toBeVisible();
    await input.fill('no-such-article');
    await expect(
      page.getByRole('heading', { name: 'No articles found' }),
    ).toBeVisible();
    await input.clear();
    await expect(
      page.getByRole('heading', { name: 'No articles found' }),
    ).toHaveCount(0);
    await expect(page.locator('main a h3')).toHaveCount(available.length);
  });
}

test('rapid search changes settle on the latest query', async ({ page }) => {
  await visit(page, '/blog');
  const input = page.getByRole('textbox', { name: 'Search articles' });
  await input.fill(posts[0].heading);
  await input.fill('no-such-article');
  await input.fill(posts[1].heading);
  await expect(page.locator('main a h3')).toHaveCount(1);
  await expect(
    page.locator(`main a[href="/blog/${posts[1].slug}"]`),
  ).toBeVisible();
});

test('category search excludes matches from other categories', async ({
  page,
}) => {
  await visit(page, '/blog/category/react');
  await page
    .getByRole('textbox')
    .fill(posts.find((post) => !post.categories.includes('react'))!.heading);
  await expect(
    page.getByRole('heading', { name: 'No articles found' }),
  ).toBeVisible();
});

test('each category filters the collection and All restores it', async ({
  page,
}) => {
  await visit(page, '/blog');
  const nav = page.getByRole('navigation', { name: 'Post categories' });
  for (const category of categories) {
    await nav.locator(`a[href="/blog/category/${category}"]`).click();
    await expect(page).toHaveURL(`/blog/category/${category}`);
    const expected = posts
      .filter((post) => post.categories.includes(category))
      .map((post) => `/blog/${post.slug}`)
      .sort();
    await expect
      .poll(async () =>
        (
          await page
            .locator('main a:has(h3)')
            .evaluateAll((links) =>
              links.map((link) => link.getAttribute('href')),
            )
        ).sort(),
      )
      .toEqual(expected);
  }
  await nav.getByRole('link', { name: 'All', exact: true }).click();
  await expect(page).toHaveURL('/blog');
  await expect(page.locator('main a h3')).toHaveCount(posts.length);
});
