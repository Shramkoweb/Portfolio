import { expect, ready, test, visit } from './fixtures';

test('theme follows the system and a saved preference survives reload', async ({
  page,
  colorScheme,
}) => {
  await visit(page, '/');
  const opposite = colorScheme === 'dark' ? 'light' : 'dark';
  await expect(page.locator('html')).toHaveClass(colorScheme!);
  await page
    .getByRole('button', { name: `Switch to ${opposite} mode` })
    .click();
  await expect(page.locator('html')).toHaveClass(opposite);
  await page.reload();
  await ready(page);
  await expect(page.locator('html')).toHaveClass(opposite);
});

test('system preference changes are followed until the user chooses a theme', async ({
  page,
  colorScheme,
}) => {
  await visit(page, '/');
  const opposite = colorScheme === 'dark' ? 'light' : 'dark';
  await page.emulateMedia({ colorScheme: opposite });
  await expect(page.locator('html')).toHaveClass(opposite);
  await page
    .getByRole('button', { name: `Switch to ${colorScheme} mode` })
    .click();
  await page.emulateMedia({ colorScheme: colorScheme! });
  await page.emulateMedia({ colorScheme: opposite });
  await expect(page.locator('html')).toHaveClass(colorScheme!);
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(
    colorScheme,
  );
});
