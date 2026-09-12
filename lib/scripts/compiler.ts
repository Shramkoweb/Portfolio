import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { transformerStyleToClass } from '@shikijs/transformers';
import {
  compileMDX as compileMdxRsc,
  type MDXRemoteProps,
} from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';

export type MDXComponentsMap = NonNullable<MDXRemoteProps['components']>;

const highlighterPromise = getSingletonHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: Object.keys(bundledLanguages),
});

// Singleton: highlightCache skips the transformer for cached blocks,
// so a per-call transformer would return empty CSS on subsequent runs.
// Module-level instance accumulates all class→variable mappings across calls.
const transformer = transformerStyleToClass();
const highlightCache = new Map();

export async function compileMDX(
  source: string,
  components: MDXComponentsMap,
): Promise<{ content: ReactElement; shikiCSS: string }> {
  const highlighter = await highlighterPromise;

  const { content } = await compileMdxRsc({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
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
    },
  });

  return { content, shikiCSS: transformer.getCSS() };
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
