jest.mock('next-mdx-remote/serialize', () => ({ serialize: jest.fn() }));
jest.mock('remark-gfm', () => jest.fn());
jest.mock('rehype-slug', () => jest.fn());
jest.mock('rehype-code-titles', () => jest.fn());
jest.mock('rehype-autolink-headings', () => jest.fn());
jest.mock('@shikijs/rehype/core', () => ({ default: jest.fn() }));
jest.mock('@shikijs/transformers', () => ({
  transformerStyleToClass: jest.fn(() => ({})),
}));
jest.mock('shiki', () => ({
  bundledLanguages: {},
  getSingletonHighlighter: jest.fn(() => Promise.resolve({})),
}));

import { extractHeadingsFromMarkdown } from '@/lib/scripts/compiler';

describe('extractHeadingsFromMarkdown', () => {
  it('should extract h1-h6 headings with correct levels', () => {
    const md = `# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6`;
    const result = extractHeadingsFromMarkdown(md);

    expect(result).toHaveLength(6);
    expect(result[0]).toEqual({ text: 'H1', level: 1, id: 'h1' });
    expect(result[2]).toEqual({ text: 'H3', level: 3, id: 'h3' });
    expect(result[5]).toEqual({ text: 'H6', level: 6, id: 'h6' });
  });

  it('should generate kebab-case IDs from heading text', () => {
    const md = `## My Cool Heading`;
    const [heading] = extractHeadingsFromMarkdown(md);

    expect(heading.id).toBe('my-cool-heading');
  });

  it('should strip markdown formatting characters from text', () => {
    const md = `## Using **bold** and _italic_ and \`code\``;
    const [heading] = extractHeadingsFromMarkdown(md);

    expect(heading.text).toBe('Using bold and italic and code');
  });

  it('should handle closing hashes', () => {
    const md = `## Heading ##`;
    const [heading] = extractHeadingsFromMarkdown(md);

    expect(heading.text).toBe('Heading');
  });

  it('should not match lines with 7+ hashes', () => {
    const md = `####### Not a heading`;
    const result = extractHeadingsFromMarkdown(md);

    expect(result).toHaveLength(0);
  });

  it('should return empty array for markdown without headings', () => {
    const md = `Just a paragraph.\n\nAnother one.`;
    const result = extractHeadingsFromMarkdown(md);

    expect(result).toEqual([]);
  });

  it('should handle special characters in IDs', () => {
    const md = `## What's new in ES2024?`;
    const [heading] = extractHeadingsFromMarkdown(md);

    expect(heading.id).toBe('what-s-new-in-es2024');
  });

  it('should strip leading/trailing dashes from IDs', () => {
    const md = `## !Important!`;
    const [heading] = extractHeadingsFromMarkdown(md);

    expect(heading.id).not.toMatch(/^-|-$/);
  });

  it('should extract multiple headings preserving order', () => {
    const md = [
      '# Introduction',
      'Some text here.',
      '## Getting Started',
      'More text.',
      '## Configuration',
      '### Advanced Options',
    ].join('\n');

    const result = extractHeadingsFromMarkdown(md);

    expect(result).toHaveLength(4);
    expect(result.map((h) => h.text)).toEqual([
      'Introduction',
      'Getting Started',
      'Configuration',
      'Advanced Options',
    ]);
  });
});
