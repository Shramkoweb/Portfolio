import { PostCategory } from '@/lib/types';
import {
  extractMarkdownSlug,
  formatCategoryName,
  generateGradient,
  getCalendarDuration,
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

describe('getCalendarDuration', () => {
  const start = new Date('2018-08-01');

  it('should count full years, months and days since start', () => {
    expect(
      getCalendarDuration(start, new Date('2026-07-19T12:00:00Z')),
    ).toEqual({ years: 7, months: 11, days: 18 });
  });

  it('should roll over to a new year on the anniversary date', () => {
    expect(
      getCalendarDuration(start, new Date('2026-08-01T00:00:00Z')),
    ).toEqual({ years: 8, months: 0, days: 0 });
  });

  it('should stay at the previous year until the anniversary', () => {
    expect(
      getCalendarDuration(start, new Date('2026-07-31T23:59:59Z')),
    ).toEqual({ years: 7, months: 11, days: 30 });
  });

  it('should borrow days from the previous month when end day is smaller', () => {
    expect(
      getCalendarDuration(
        new Date('2018-08-15'),
        new Date('2026-07-10T00:00:00Z'),
      ),
    ).toEqual({ years: 7, months: 10, days: 25 });
  });

  it('should compute in UTC regardless of local timezone offset', () => {
    // 23:30 in New York (UTC-4) is already July 20 in UTC
    expect(
      getCalendarDuration(start, new Date('2026-07-19T23:30:00-04:00')),
    ).toEqual({ years: 7, months: 11, days: 19 });
  });

  it('should cap month-end anchors to shorter months', () => {
    expect(
      getCalendarDuration(new Date('2020-01-31'), new Date('2020-03-01')),
    ).toEqual({ years: 0, months: 1, days: 1 });
  });

  it('should treat a capped february as a full month', () => {
    expect(
      getCalendarDuration(new Date('2020-01-31'), new Date('2021-02-28')),
    ).toEqual({ years: 1, months: 1, days: 0 });
  });

  it('should return zeros for the same instant', () => {
    expect(getCalendarDuration(start, new Date('2018-08-01'))).toEqual({
      years: 0,
      months: 0,
      days: 0,
    });
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
