import {
  filterPostsByCategory,
  getPostBySlug,
  getPostsCategories,
  getPostSlugs,
} from '@/lib/posts/api';
import { Post, PostCategory } from '@/lib/types';
import { readdir, readFile } from 'node:fs/promises';

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
      updateData: 1234567890000,
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
      updateData: 1234567890000,
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

jest.mock('gray-matter', () => jest.fn((fileContents) => ({
  data: {
    heading: 'Test Heading',
    title: 'Test Title',
    description: 'Test Description',
    categories: [PostCategory.JS],
    featured: false,
    keywords: ['test'],
    createDate: '2024-01-01',
    updateData: '2024-01-01',
  },
  content: fileContents,
})));

jest.mock('reading-time', () => ({
  __esModule: true,
  default: jest.fn(() => ({ text: '2 min read' })),
}));

describe('Posts API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
        .mockResolvedValueOnce(JSON.stringify(mockPosts[0]))
        .mockResolvedValueOnce(JSON.stringify(mockPosts[1]));

      const categories = await getPostsCategories();
      expect(Array.isArray(categories)).toBe(true);
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
});
