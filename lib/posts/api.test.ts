import { readdir, readFile } from 'node:fs/promises';

import matter from 'gray-matter';

import {
  filterPostsByCategory,
  getPostBySlug,
  getPosts,
  getPostsCategories,
  getPostsMetadata,
  getPostSlugs,
} from '@/lib/posts/api';
import { Post, PostCategory } from '@/lib/types';

const mockPosts: Post[] = [
  {
    data: {
      title: 'Test Post 1',
      description: 'Test description 1',
      categories: [PostCategory.TS, PostCategory.JS],
      slug: 'test-post-1',
      heading: 'Test Heading 1',
      readTime: '3 min read',
      createDate: 1234567890000,
      updateDate: 1234567890000,
      featured: true,
      keywords: ['typescript', 'javascript'],
    },
    content: 'Test content 1',
  },
  {
    data: {
      title: 'Test Post 2',
      description: 'Test description 2',
      categories: [PostCategory.JS],
      slug: 'test-post-2',
      heading: 'Test Heading 2',
      readTime: '2 min read',
      createDate: 1234567890000,
      updateDate: 1234567890000,
      featured: false,
      keywords: ['javascript'],
    },
    content: 'Test content 2',
  },
];

jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
  readdir: jest.fn(),
}));

const DEFAULT_MATTER_RESULT = {
  data: {
    heading: 'Test Heading',
    title: 'Test Title',
    description: 'Test Description',
    categories: ['JS'],
    featured: false,
    keywords: ['test'],
    createDate: '2024-01-01',
    updateDate: '2024-01-01',
  },
  content: 'Test content',
};

// Configurable mock — tests can override return value via matter.mockReturnValue
jest.mock('gray-matter', () => {
  const fn = jest.fn(() => DEFAULT_MATTER_RESULT);
  return { __esModule: true, default: fn };
});

// Fix reading-time mock
jest.mock('reading-time', () => {
  return function mockReadingTime() {
    return { text: '2 min read' };
  };
});

describe('Posts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (matter as unknown as jest.Mock).mockReturnValue(DEFAULT_MATTER_RESULT);
  });

  describe('getPostBySlug', () => {
    it('should throw error if slug is not provided', async () => {
      await expect(getPostBySlug()).rejects.toThrow(
        'getPostBySlug: slug is required',
      );
    });

    it('should return post data for valid slug', async () => {
      (readFile as jest.Mock).mockResolvedValueOnce('Test content');

      const post = await getPostBySlug('test-post');

      expect(post).toHaveProperty('data');
      expect(post).toHaveProperty('content');
      expect(post.data).toHaveProperty('slug', 'test-post');
      expect(post.data).toHaveProperty('readTime', '2 min read');
    });

    it('should throw error for invalid file read', async () => {
      (readFile as jest.Mock).mockRejectedValueOnce(
        new Error('File not found'),
      );

      await expect(getPostBySlug('invalid-post')).rejects.toThrow();
    });
  });

  describe('getPostSlugs', () => {
    it('should return array of slugs', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce(['post-1.md', 'post-2.md']);

      const slugs = await getPostSlugs();

      expect(slugs).toEqual(['post-1', 'post-2']);
    });
  });

  describe('getPostsCategories', () => {
    it('should return unique categories from all posts', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce(['post-1.md', 'post-2.md']);
      (readFile as jest.Mock)
        .mockResolvedValueOnce('Test content 1')
        .mockResolvedValueOnce('Test content 2');

      const categories = await getPostsCategories();

      expect(Array.isArray(categories)).toBe(true);
      // gray-matter mock returns categories: ['JS'] for each post
      // so we expect deduplicated result
      expect(categories).toContain('JS');
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should return empty array when no posts exist', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce([]);

      const categories = await getPostsCategories();

      expect(categories).toEqual([]);
    });
  });

  describe('filterPostsByCategory', () => {
    it('should handle empty posts array', () => {
      const result = filterPostsByCategory([], PostCategory.JS);
      expect(result).toHaveLength(0);
    });

    it('should handle case insensitive category matching', () => {
      const result = filterPostsByCategory(
        mockPosts,
        PostCategory.JS.toLowerCase(),
      );
      expect(result).toHaveLength(2);
    });
  });

  describe('getPostBySlug — buildPostMetadata edge cases', () => {
    it('should set updateDate to null when frontmatter omits it', async () => {
      (matter as unknown as jest.Mock).mockReturnValueOnce({
        ...DEFAULT_MATTER_RESULT,
        data: { ...DEFAULT_MATTER_RESULT.data, updateDate: undefined },
      });
      (readFile as jest.Mock).mockResolvedValueOnce('content');

      const post = await getPostBySlug('no-update');

      expect(post.data.updateDate).toBeNull();
    });

    it('should parse createDate string into a numeric timestamp', async () => {
      (readFile as jest.Mock).mockResolvedValueOnce('content');

      const post = await getPostBySlug('with-dates');

      expect(typeof post.data.createDate).toBe('number');
      expect(post.data.createDate).toBe(Date.parse('2024-01-01'));
    });

    it('should wrap underlying read errors with a cause', async () => {
      const original = new Error('ENOENT');
      (readFile as jest.Mock).mockRejectedValueOnce(original);

      await expect(getPostBySlug('missing')).rejects.toMatchObject({
        cause: original,
      });
    });

    it('should throw when matter returns no data', async () => {
      (readFile as jest.Mock).mockResolvedValueOnce('garbage');
      (matter as unknown as jest.Mock).mockReturnValueOnce({ data: null });

      await expect(getPostBySlug('broken')).rejects.toThrow(
        /Invalid markdown format/,
      );
    });
  });

  describe('getPosts', () => {
    it('should ignore non-markdown files in the posts directory', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce([
        'a.md',
        '.DS_Store',
        'README.txt',
        'b.md',
      ]);
      (readFile as jest.Mock).mockResolvedValue('content');

      const posts = await getPosts();

      expect(posts).toHaveLength(2);
      expect(posts.map((p) => p.data.slug)).toEqual(['a', 'b']);
    });

    it('should return both data and content for each post', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce(['only.md']);
      (readFile as jest.Mock).mockResolvedValueOnce('raw markdown');

      const [post] = await getPosts();

      expect(post).toEqual(
        expect.objectContaining({
          data: expect.objectContaining({ slug: 'only' }),
          content: 'Test content',
        }),
      );
    });

    it('should return empty array when directory is empty', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce([]);

      await expect(getPosts()).resolves.toEqual([]);
    });
  });

  describe('getPostsMetadata', () => {
    it('should return metadata-only entries (no content field)', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce(['a.md', 'b.md']);
      (readFile as jest.Mock).mockResolvedValue('content');

      const metas = await getPostsMetadata();

      expect(metas).toHaveLength(2);
      metas.forEach((meta) => {
        expect(meta).not.toHaveProperty('content');
        expect(meta.data).toHaveProperty('slug');
      });
    });

    it('should ignore non-markdown files', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce([
        'post.md',
        'image.png',
        'notes.txt',
      ]);
      (readFile as jest.Mock).mockResolvedValueOnce('content');

      const metas = await getPostsMetadata();

      expect(metas).toHaveLength(1);
      expect(metas[0].data.slug).toBe('post');
    });
  });

  describe('getPostSlugs', () => {
    it('should ignore non-markdown files', async () => {
      (readdir as jest.Mock).mockResolvedValueOnce([
        'one.md',
        '.DS_Store',
        'image.png',
        'two.md',
      ]);

      const slugs = await getPostSlugs();

      expect(slugs).toEqual(['one', 'two']);
    });
  });
});
