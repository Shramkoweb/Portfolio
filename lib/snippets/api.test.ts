import {
  getSnippetBySlug,
  getSnippetSlugs,
  getSnippetsMetadata,
} from '@/lib/snippets/api';

describe('Snippets API', () => {
  describe('getSnippetsMetadata', () => {
    it('returns one metadata entry per snippet file, without content', async () => {
      const slugs = await getSnippetSlugs();
      const snippets = await getSnippetsMetadata();

      expect(snippets).toHaveLength(slugs.length);
      expect(snippets.length).toBeGreaterThan(0);

      for (const snippet of snippets) {
        expect(snippet).not.toHaveProperty('content');
        expect(snippet.data.slug).toEqual(expect.any(String));
        expect(snippet.data.heading).toEqual(expect.any(String));
        expect(snippet.data.createDate).toEqual(expect.any(Number));
      }
    });
  });

  describe('getSnippetBySlug', () => {
    it('returns both data and content for a real snippet', async () => {
      const [slug] = await getSnippetSlugs();
      const snippet = await getSnippetBySlug(slug);

      expect(snippet.data.slug).toBe(slug);
      expect(snippet.content).toEqual(expect.any(String));
      expect(snippet.content.length).toBeGreaterThan(0);
    });

    it('throws when slug is missing', async () => {
      await expect(getSnippetBySlug()).rejects.toThrow(
        'getSnippetBySlug: slug is required',
      );
    });

    it('throws a wrapped error for a nonexistent slug', async () => {
      await expect(
        getSnippetBySlug('definitely-not-a-real-snippet'),
      ).rejects.toThrow('ENOENT');
    });
  });
});
