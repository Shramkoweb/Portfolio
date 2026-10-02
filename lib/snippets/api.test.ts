import { readdir, readFile } from 'node:fs/promises';

import {
  getSnippetBySlug,
  getSnippets,
  getSnippetsMetadata,
  getSnippetSlugs,
} from '@/lib/snippets/api';

jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
  readdir: jest.fn(),
}));

const mockReadFile = readFile as jest.Mock;
const mockReaddir = readdir as jest.Mock;

function markdown(frontmatter: Record<string, string>, body = 'Body') {
  const lines = Object.entries(frontmatter).map(([k, v]) => `${k}: ${v}`);
  return `---\n${lines.join('\n')}\n---\n${body}`;
}

const FRONTMATTER = {
  title: 'Debounce',
  heading: 'Debounce in JS',
  description: 'Delay a call',
  createDate: '2024-01-01',
  updateDate: '2024-02-01',
  keywords: '[js, timing]',
};

describe('Snippets API', () => {
  describe('getSnippetBySlug', () => {
    it('rejects when the slug is missing', async () => {
      await expect(getSnippetBySlug()).rejects.toThrow(/slug is required/);
      expect(mockReadFile).not.toHaveBeenCalled();
    });

    it('reads _snippets/<slug>.md and parses the frontmatter', async () => {
      mockReadFile.mockResolvedValue(markdown(FRONTMATTER, 'Snippet body'));

      const snippet = await getSnippetBySlug('debounce');

      expect(mockReadFile).toHaveBeenCalledWith(
        expect.stringMatching(/_snippets[/\\]debounce\.md$/),
        'utf8',
      );
      expect(snippet).toEqual({
        data: {
          slug: 'debounce',
          title: 'Debounce',
          heading: 'Debounce in JS',
          description: 'Delay a call',
          keywords: ['js', 'timing'],
          createDate: Date.parse('2024-01-01'),
          updateDate: Date.parse('2024-02-01'),
        },
        content: expect.stringContaining('Snippet body'),
      });
    });

    it('sets updateDate to null when the frontmatter omits it', async () => {
      const { updateDate: _, ...withoutUpdate } = FRONTMATTER;
      mockReadFile.mockResolvedValue(markdown(withoutUpdate));

      const snippet = await getSnippetBySlug('debounce');

      expect(snippet.data.updateDate).toBeNull();
    });

    it('wraps read errors and keeps the original as cause', async () => {
      const original = new Error('ENOENT');
      mockReadFile.mockRejectedValue(original);

      await expect(getSnippetBySlug('missing')).rejects.toMatchObject({
        message: 'Error: ENOENT',
        cause: original,
      });
    });
  });

  describe('getSnippetSlugs', () => {
    it('returns markdown slugs only', async () => {
      mockReaddir.mockResolvedValue(['a.md', '.DS_Store', 'b.md', 'c.txt']);

      await expect(getSnippetSlugs()).resolves.toEqual(['a', 'b']);
    });

    it('keeps dots inside the slug', async () => {
      mockReaddir.mockResolvedValue(['node.js-tips.md']);

      await expect(getSnippetSlugs()).resolves.toEqual(['node.js-tips']);
    });
  });

  describe('getSnippets', () => {
    it('loads every markdown file', async () => {
      mockReaddir.mockResolvedValue(['a.md', 'notes.txt', 'b.md']);
      mockReadFile.mockResolvedValue(markdown(FRONTMATTER));

      const snippets = await getSnippets();

      expect(snippets.map((s) => s.data.slug)).toEqual(['a', 'b']);
      expect(mockReadFile).toHaveBeenCalledTimes(2);
    });

    it('rejects when any snippet fails to load', async () => {
      mockReaddir.mockResolvedValue(['a.md', 'b.md']);
      mockReadFile
        .mockResolvedValueOnce(markdown(FRONTMATTER))
        .mockRejectedValueOnce(new Error('EACCES'));

      await expect(getSnippets()).rejects.toThrow('EACCES');
    });
  });

  describe('getSnippetsMetadata', () => {
    it('returns frontmatter data without the markdown body', async () => {
      mockReaddir.mockResolvedValue(['debounce.md']);
      mockReadFile.mockResolvedValue(markdown(FRONTMATTER, 'Snippet body'));

      const [meta] = await getSnippetsMetadata();

      expect(meta).toEqual({
        data: {
          slug: 'debounce',
          title: 'Debounce',
          heading: 'Debounce in JS',
          description: 'Delay a call',
          keywords: ['js', 'timing'],
          createDate: Date.parse('2024-01-01'),
          updateDate: Date.parse('2024-02-01'),
        },
      });
      expect(meta).not.toHaveProperty('content');
    });

    it('loads markdown files only', async () => {
      mockReaddir.mockResolvedValue(['a.md', 'notes.txt', 'b.md']);
      mockReadFile.mockResolvedValue(markdown(FRONTMATTER));

      const metas = await getSnippetsMetadata();

      expect(metas.map((m) => m.data.slug)).toEqual(['a', 'b']);
      expect(mockReadFile).toHaveBeenCalledTimes(2);
    });

    it('rejects when any snippet fails to load', async () => {
      mockReaddir.mockResolvedValue(['a.md', 'b.md']);
      mockReadFile
        .mockResolvedValueOnce(markdown(FRONTMATTER))
        .mockRejectedValueOnce(new Error('EACCES'));

      await expect(getSnippetsMetadata()).rejects.toThrow('EACCES');
    });
  });
});
