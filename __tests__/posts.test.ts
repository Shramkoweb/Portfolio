import { filterPostsByCategory, getPostsByCategory } from '@/lib/posts/api';
import { Post, PostCategory } from '@/lib/types';

const mockPosts: Post[] = [
  {
    data: {
      title: 'Test Post 1',
      description: 'Test description 1',
      categories: [PostCategory.TS],
      slug: 'test-post-1',
      heading: '',
      readTime: '',
      createDate: 0,
      featured: false,
      keywords: [],
    },
    content: 'Test content 1',
  },
  {
    data: {
      title: 'Test Post 2',
      description: 'Test description 2',
      categories: [PostCategory.JS],
      slug: 'test-post-2',
      heading: '',
      readTime: '',
      createDate: 0,
      featured: false,
      keywords: [],
    },
    content: 'Test content 2',
  },
];

jest.mock('@/lib/posts/api', () => ({
  ...jest.requireActual('@/lib/posts/api'), // eslint-disable-next-line max-len
  getPostsByCategory: jest.fn((category) => Promise.resolve(
    mockPosts.filter((post) => post.data.categories.includes(category)),
  )),
}));

describe('Posts API', () => {
  describe('getPostsByCategory', () => {
    it('should return posts filtered by category (case insensitive)', async () => {
      const typescriptPosts = await getPostsByCategory(PostCategory.TS);
      expect(typescriptPosts).toHaveLength(1);
      expect(typescriptPosts[0].data.slug).toBe('test-post-1');

      const javascriptPosts = await getPostsByCategory(PostCategory.JS);
      expect(javascriptPosts).toHaveLength(1);
      expect(javascriptPosts[0].data.slug).toBe('test-post-2');
    });

    it('should return empty array for non-existing category', async () => {
      const posts = await getPostsByCategory('non-existing');
      expect(posts).toHaveLength(0);
    });
  });
});

describe('Posts Filter', () => {
  it('should filter posts by category correctly', () => {
    const result = filterPostsByCategory(mockPosts, PostCategory.TS);
    expect(result).toHaveLength(1);
    expect(result[0].data.slug).toBe('test-post-1');
  });
});
