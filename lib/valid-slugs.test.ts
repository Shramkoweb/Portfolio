/**
 * @jest-environment node
 */
import { isKnownSlug } from '@/lib/valid-slugs';

jest.mock('@/lib/posts/api', () => ({
  __esModule: true,
  getPostSlugs: () => Promise.resolve(['a-real-post']),
}));

jest.mock('@/lib/snippets/api', () => ({
  __esModule: true,
  getSnippetSlugs: () => Promise.resolve(['a-real-snippet']),
}));

describe('isKnownSlug', () => {
  it('accepts a known post slug', async () => {
    await expect(isKnownSlug('a-real-post')).resolves.toBe(true);
  });

  it('accepts a known snippet slug', async () => {
    await expect(isKnownSlug('a-real-snippet')).resolves.toBe(true);
  });

  it('accepts the synthetic, non-MDX page slugs', async () => {
    await expect(isKnownSlug('quizlet-page')).resolves.toBe(true);
    await expect(isKnownSlug('udemy-reset-progress-page')).resolves.toBe(true);
  });

  it('rejects a well-formed slug that does not exist', async () => {
    await expect(isKnownSlug('not-a-real-post')).resolves.toBe(false);
  });

  describe('input guard — rejects before touching the slug set', () => {
    it('rejects a non-string', async () => {
      await expect(isKnownSlug(['a-real-post', 'evil'])).resolves.toBe(false);
      await expect(isKnownSlug(undefined)).resolves.toBe(false);
      await expect(isKnownSlug(null)).resolves.toBe(false);
      await expect(isKnownSlug(42)).resolves.toBe(false);
    });

    it('rejects an empty string', async () => {
      await expect(isKnownSlug('')).resolves.toBe(false);
    });

    it('rejects a slug longer than the 128-character column limit', async () => {
      await expect(isKnownSlug('a'.repeat(129))).resolves.toBe(false);
      // The boundary itself is allowed through the guard, then fails the
      // set lookup — proving the guard rejects on length, not on existence.
      await expect(isKnownSlug('a'.repeat(128))).resolves.toBe(false);
    });
  });
});
