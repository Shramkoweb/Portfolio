import { Post, PostCategory, PostMetadata, Snippet } from '@/lib/types';
import {
  addYearSeparators,
  filterByAdvanceReact,
  filterByFeatured,
  filterByHeading,
  filterByNotFeatured,
  getYearFromPost,
  isYearSeparator,
  sortByBirthtime,
} from '@/lib/posts/utils';

describe('Post Utils', () => {
  const mockPost1: Post = {
    data: {
      createDate: 1625097600000, // 2021-07-01
      updateDate: null,
      featured: true,
      categories: [PostCategory.React],
      heading: 'Test Post 1',
      slug: 'test-1',
      description: '',
      title: '',
      readTime: '',
      keywords: [],
    },
    content: '',
  };

  const mockPost2: Post = {
    data: {
      createDate: 1627776000000, // 2021-08-01
      updateDate: null,
      featured: false,
      categories: [PostCategory.AdvancedReact],
      heading: 'Test Post 2',
      slug: 'test-2',
      description: '',
      title: '',
      readTime: '',
      keywords: [],
    },
    content: '',
  };

  const mockSnippet: Snippet = {
    data: {
      createDate: 1630454400000, // 2021-09-01
      updateDate: null,
      heading: 'Test Snippet',
      slug: 'test-snippet',
      description: '',
      title: '',
      keywords: [],
    },
    content: '',
  };

  describe('sortByBirthtime', () => {
    it('should sort posts by create date in descending order', () => {
      const result = [mockPost1, mockPost2].sort(sortByBirthtime);
      expect(result[0]).toBe(mockPost2);
      expect(result[1]).toBe(mockPost1);
    });

    it('should work with snippets and posts mixed', () => {
      const result = [mockPost1, mockSnippet, mockPost2].sort(sortByBirthtime);
      expect(result[0]).toBe(mockSnippet);
      expect(result[1]).toBe(mockPost2);
      expect(result[2]).toBe(mockPost1);
    });
  });

  describe('filterByFeatured', () => {
    it('should return true for featured posts', () => {
      expect(filterByFeatured(mockPost1)).toBe(true);
    });

    it('should return false for non-featured posts', () => {
      expect(filterByFeatured(mockPost2)).toBe(false);
    });
  });

  describe('filterByNotFeatured', () => {
    it('should return false for featured posts', () => {
      expect(filterByNotFeatured(mockPost1)).toBe(false);
    });

    it('should return false for Advanced-React posts', () => {
      expect(filterByNotFeatured(mockPost2)).toBe(false);
    });

    it('should return true for non-featured and non-Advanced-React posts', () => {
      const regularPost: Post = {
        data: {
          createDate: 1625097600000,
          updateDate: null,
          featured: false,
          categories: [PostCategory.JS],
          heading: 'Regular Post',
          slug: 'regular-post',
          description: '',
          title: '',
          readTime: '',
          keywords: [],
        },
        content: '',
      };
      expect(filterByNotFeatured(regularPost)).toBe(true);
    });
  });

  describe('filterByAdvanceReact', () => {
    it('should return true for Advanced-React posts', () => {
      expect(filterByAdvanceReact(mockPost2)).toBe(true);
    });

    it('should return false for non-Advanced-React posts', () => {
      expect(filterByAdvanceReact(mockPost1)).toBe(false);
    });

    it('should be case insensitive', () => {
      const post: Post = {
        data: {
          createDate: 1625097600000,
          updateDate: null,
          featured: false,
          categories: [PostCategory.AdvancedReact],
          heading: 'Test',
          slug: 'test',
          description: '',
          title: '',
          readTime: '',
          keywords: [],
        },
        content: '',
      };
      expect(filterByAdvanceReact(post)).toBe(true);
    });
  });

  describe('filterByHeading', () => {
    it('should return true when heading includes search term', () => {
      expect(filterByHeading(mockPost1, 'Test')).toBe(true);
    });

    it('should return false when heading does not include search term', () => {
      expect(filterByHeading(mockPost1, 'NonExistent')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(filterByHeading(mockPost1, 'test')).toBe(true);
      expect(filterByHeading(mockPost1, 'TEST')).toBe(true);
    });

    it('should work with partial matches', () => {
      expect(filterByHeading(mockPost1, 'st Po')).toBe(true);
    });
  });

  describe('getYearFromPost', () => {
    it('should extract year from post createDate', () => {
      expect(getYearFromPost(mockPost1)).toBe(2021);
    });

    it('should handle different years', () => {
      const post2025: PostMetadata = {
        data: {
          createDate: new Date('2025-03-15').getTime(),
          updateDate: null,
          featured: false,
          categories: [PostCategory.JS],
          heading: 'Post 2025',
          slug: 'post-2025',
          description: '',
          title: '',
          readTime: '',
          keywords: [],
        },
      };
      expect(getYearFromPost(post2025)).toBe(2025);
    });
  });

  describe('isYearSeparator', () => {
    it('should return true for year separator objects', () => {
      expect(isYearSeparator({ type: 'year-separator', year: 2021 })).toBe(true);
    });

    it('should return false for post metadata', () => {
      expect(isYearSeparator(mockPost1.data as unknown as PostMetadata)).toBe(false);
    });
  });

  describe('addYearSeparators', () => {
    const makePostMeta = (year: number, slug: string): PostMetadata => ({
      data: {
        createDate: new Date(`${year}-06-15`).getTime(),
        updateDate: null,
        featured: false,
        categories: [PostCategory.JS],
        heading: slug,
        slug,
        description: '',
        title: '',
        readTime: '',
        keywords: [],
      },
    });

    it('should return empty array for empty input', () => {
      expect(addYearSeparators([])).toEqual([]);
    });

    it('should add separator before single post', () => {
      const posts = [makePostMeta(2024, 'only-post')];
      const result = addYearSeparators(posts);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ type: 'year-separator', year: 2024 });
      expect(result[1]).toBe(posts[0]);
    });

    it('should add separators between posts of different years', () => {
      const posts = [
        makePostMeta(2024, 'post-a'),
        makePostMeta(2024, 'post-b'),
        makePostMeta(2023, 'post-c'),
        makePostMeta(2022, 'post-d'),
      ];
      const result = addYearSeparators(posts);

      expect(result).toEqual([
        { type: 'year-separator', year: 2024 },
        posts[0],
        posts[1],
        { type: 'year-separator', year: 2023 },
        posts[2],
        { type: 'year-separator', year: 2022 },
        posts[3],
      ]);
    });

    it('should not add extra separators for same-year posts', () => {
      const posts = [
        makePostMeta(2024, 'post-a'),
        makePostMeta(2024, 'post-b'),
        makePostMeta(2024, 'post-c'),
      ];
      const result = addYearSeparators(posts);

      expect(result).toHaveLength(4); // 1 separator + 3 posts
      expect(result[0]).toEqual({ type: 'year-separator', year: 2024 });
    });
  });
});
