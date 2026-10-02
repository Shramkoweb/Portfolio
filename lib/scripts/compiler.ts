import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { transformerStyleToClass } from '@shikijs/transformers';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';

import { rehypeImageSize } from '@/lib/scripts/rehype-image-size';

const highlighterPromise = getSingletonHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: Object.keys(bundledLanguages),
});

// Singleton: highlightCache skips the transformer for cached blocks,
// so a per-call transformer would return empty CSS on subsequent runs.
// Module-level instance accumulates all class→variable mappings across calls.
// The default `__shiki_` prefix repeats on every highlighted token and bloats
// the page data. Nothing else on the site uses classes starting with `_`.
const transformer = transformerStyleToClass({ classPrefix: '_' });
const highlightCache = new Map();
const STRING_LITERAL = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g;

export async function compileMDX(content: string) {
  const highlighter = await highlighterPromise;

  const mdx = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeImageSize,
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeShikiFromHighlighter,
          highlighter,
          {
            themes: {
              light: 'github-light',
              dark: 'github-dark',
            },
            defaultColor: false,
            transformers: [transformer],
            cache: highlightCache,
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
  });

  // Indentation is about a quarter of the page data. Dropping it is safe because
  // serialize blocks JS by default, so the output is generated code whose string
  // literals escape their newlines; only a template literal could span lines.
  // Backticks inside strings are common (code blocks), so only one outside a
  // string literal skips the strip. Don't pass `blockJS: false` without
  // revisiting this: user JS could bring regex literals the scanner can't see.
  const code = mdx.compiledSource.replace(STRING_LITERAL, '');
  if (!code.includes('`')) {
    mdx.compiledSource = mdx.compiledSource.replace(/\n[ \t]+/g, '\n');
  }

  const shikiCSS = transformer.getCSS();

  return { mdx, shikiCSS };
}

export function extractHeadingsFromMarkdown(markdown: string) {
  const headingRegex = /^ {0,3}(#{1,6})[ \t]+(.+?)[ \t]*#*\s*$/gm;
  const headings: { text: string; level: number; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`~]/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    headings.push({ text, level, id });
  }
  return headings;
}
