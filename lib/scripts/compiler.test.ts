jest.mock('next-mdx-remote/serialize', () => ({ serialize: jest.fn() }));
jest.mock('remark-gfm', () => jest.fn());
jest.mock('rehype-slug', () => jest.fn());
jest.mock('rehype-code-titles', () => jest.fn());
jest.mock('rehype-autolink-headings', () => jest.fn());
jest.mock('@/lib/scripts/rehype-image-size', () => ({
  rehypeImageSize: jest.fn(),
}));
jest.mock('@shikijs/rehype/core', () => ({ default: jest.fn() }));
jest.mock('@shikijs/transformers', () => {
  const mockTransformer = { getCSS: jest.fn() };
  return {
    mockTransformer,
    transformerStyleToClass: jest.fn(() => mockTransformer),
  };
});
jest.mock('shiki', () => ({
  bundledLanguages: {},
  getSingletonHighlighter: jest.fn(() => Promise.resolve({})),
}));

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';

import { extractHeadingsFromMarkdown } from '@/lib/scripts/compiler';

// Real serialize output for a heading, inline code and an indented code block
// whose content holds a backtick inside a string literal.
const COMPILED_SOURCE = [
  '"use strict";',
  'const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];',
  'const {useMDXComponents: _provideComponents} = arguments[0];',
  'function _createMdxContent(props) {',
  '  const _components = {',
  '    code: "code",',
  '    h1: "h1",',
  '    p: "p",',
  '    pre: "pre",',
  '    ..._provideComponents(),',
  '    ...props.components',
  '  };',
  '  return _jsxs(_Fragment, {',
  '    children: [_jsx(_components.h1, {',
  '      children: "Title"',
  '    }), "\\n", _jsxs(_components.p, {',
  '      children: ["Some ", _jsx(_components.code, {',
  '        children: "inline"',
  '      }), " code."]',
  '    }), "\\n", _jsx(_components.pre, {',
  '      children: _jsx(_components.code, {',
  '        className: "language-js",',
  '        children: "function greet(name) {\\n  return `Hello, ${name}`;\\n}\\n"',
  '      })',
  '    })]',
  '  });',
  '}',
  'function MDXContent(props = {}) {',
  '  const {wrapper: MDXLayout} = {',
  '    ..._provideComponents(),',
  '    ...props.components',
  '  };',
  '  return MDXLayout ? _jsx(MDXLayout, {',
  '    ...props,',
  '    children: _jsx(_createMdxContent, {',
  '      ...props',
  '    })',
  '  }) : _createMdxContent(props);',
  '}',
  'return {',
  '  default: MDXContent',
  '};',
].join('\n');

function renderCompiled(compiledSource: string) {
  const run = new Function(compiledSource);
  const { default: Content } = run({
    ...runtime,
    useMDXComponents: () => ({}),
  });
  return renderToStaticMarkup(createElement(Content));
}

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

describe('compileMDX', () => {
  const { serialize } = jest.requireMock('next-mdx-remote/serialize');
  const { mockTransformer } = jest.requireMock('@shikijs/transformers');

  function rehypeOptions(call: number) {
    const { rehypePlugins } = serialize.mock.calls[call][1].mdxOptions;
    const [, highlighter, shiki] = rehypePlugins.find(
      (plugin: unknown) => Array.isArray(plugin) && plugin.length === 3,
    );
    return { highlighter, shiki, rehypePlugins };
  }

  beforeEach(() => {
    serialize.mockResolvedValue({ compiledSource: 'compiled' });
  });

  it('returns the serialized MDX with the Shiki CSS', async () => {
    const { compileMDX } = await import('@/lib/scripts/compiler');
    mockTransformer.getCSS.mockReturnValue('.__shiki_1{color:red}');

    const result = await compileMDX('# Title');

    expect(serialize).toHaveBeenCalledWith(
      '# Title',
      expect.objectContaining({
        mdxOptions: expect.objectContaining({ format: 'mdx' }),
      }),
    );
    expect(result).toEqual({
      mdx: { compiledSource: 'compiled' },
      shikiCSS: '.__shiki_1{color:red}',
    });
  });

  it('strips indentation without changing the rendered HTML', async () => {
    const { compileMDX } = await import('@/lib/scripts/compiler');
    serialize.mockResolvedValue({ compiledSource: COMPILED_SOURCE });

    const { mdx } = await compileMDX('');

    expect(mdx.compiledSource.length).toBeLessThan(COMPILED_SOURCE.length);
    expect(mdx.compiledSource).not.toMatch(/\n[ \t]/);
    expect(renderCompiled(mdx.compiledSource)).toBe(
      renderCompiled(COMPILED_SOURCE),
    );
    expect(renderCompiled(mdx.compiledSource)).toContain(
      'function greet(name) {\n  return `Hello, ${name}`;\n}',
    );
  });

  it('keeps indentation when a template literal could span lines', async () => {
    const { compileMDX } = await import('@/lib/scripts/compiler');
    const compiledSource = 'return {\n  text: `a\n  b`\n};';
    serialize.mockResolvedValue({ compiledSource });

    const { mdx } = await compileMDX('');

    expect(mdx.compiledSource).toBe(compiledSource);
  });

  it('shortens the Shiki class prefix', () => {
    const { transformerStyleToClass } = jest.requireMock(
      '@shikijs/transformers',
    );

    jest.isolateModules(() => require('@/lib/scripts/compiler'));

    expect(transformerStyleToClass).toHaveBeenCalledWith({ classPrefix: '_' });
  });

  it('sizes images before any other rehype plugin runs', async () => {
    const { compileMDX } = await import('@/lib/scripts/compiler');
    const { rehypeImageSize } = jest.requireMock(
      '@/lib/scripts/rehype-image-size',
    );

    await compileMDX('');

    expect(rehypeOptions(0).rehypePlugins[0]).toBe(rehypeImageSize);
  });

  it('reuses one transformer and cache so cached blocks keep their CSS', async () => {
    const { compileMDX } = await import('@/lib/scripts/compiler');

    await compileMDX('a');
    await compileMDX('b');

    const first = rehypeOptions(0);
    const second = rehypeOptions(1);
    expect(first.shiki.transformers).toEqual([mockTransformer]);
    expect(second.shiki.transformers).toEqual([mockTransformer]);
    expect(first.shiki.cache).toBeInstanceOf(Map);
    expect(second.shiki.cache).toBe(first.shiki.cache);
    expect(second.highlighter).toBe(first.highlighter);
  });
});
