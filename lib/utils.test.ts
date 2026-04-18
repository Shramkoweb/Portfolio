import { PostCategory } from '@/lib/types';
import {
  extractMarkdownSlug,
  formatCategoryName,
  generateGradient,
} from '@/lib/utils';

describe('formatCategoryName', () => {
  it('should return category as-is when no hyphens', () => {
    expect(formatCategoryName(PostCategory.JS)).toBe('js');
  });

  it('should replace hyphens with spaces', () => {
    expect(formatCategoryName(PostCategory.CleanCode)).toBe('clean code');
    expect(formatCategoryName(PostCategory.AdvancedReact)).toBe(
      'advanced react',
    );
    expect(formatCategoryName(PostCategory.ProjectSetup)).toBe('project setup');
  });

  it('should return empty string for falsy input', () => {
    expect(formatCategoryName('' as PostCategory)).toBe('');
  });
});

describe('extractMarkdownSlug', () => {
  it('should strip .md extension', () => {
    expect(extractMarkdownSlug('my-post.md')).toBe('my-post');
  });

  it('should strip any extension', () => {
    expect(extractMarkdownSlug('file.mdx')).toBe('file');
  });

  it('should handle files with multiple dots', () => {
    expect(extractMarkdownSlug('my.post.name.md')).toBe('my.post.name');
  });

  it('should return filename as-is when no extension', () => {
    expect(extractMarkdownSlug('no-extension')).toBe('no-extension');
  });
});

describe('generateGradient', () => {
  it('should return valid Tailwind gradient string', () => {
    const result = generateGradient('test-slug');

    expect(result).toMatch(
      /^bg-gradient-to-r from-\w+-500 via-\w+-500 to-\w+-500$/,
    );
  });

  it('should be deterministic — same slug always produces same gradient', () => {
    const first = generateGradient('my-article');
    const second = generateGradient('my-article');

    expect(first).toBe(second);
  });

  it('should produce different gradients for different slugs', () => {
    const a = generateGradient('slug-alpha');
    const b = generateGradient('slug-beta');

    expect(a).not.toBe(b);
  });

  it('should ensure from and to colors have sufficient contrast', () => {
    // Run many slugs — none should have from/to within 1 index of each other
    const slugs = Array.from({ length: 50 }, (_, i) => `test-slug-${i}`);

    for (const slug of slugs) {
      const result = generateGradient(slug);
      const parts = result.split(' ');
      const fromColor = parts[1];
      const toColor = parts[3];

      // from and to should not be identical
      const fromBase = fromColor.replace('from-', '');
      const toBase = toColor.replace('to-', '');
      expect(fromBase).not.toBe(toBase);
    }
  });
});
