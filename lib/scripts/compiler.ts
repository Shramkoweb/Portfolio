import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import { transformerStyleToClass } from '@shikijs/transformers';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';

const highlighterPromise = getSingletonHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: Object.keys(bundledLanguages),
});

const highlightCache = new Map();

export async function compileMDX(content: string) {
  const transformer = transformerStyleToClass();
  const highlighter = await highlighterPromise;

  const mdx = await serialize(content, {
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
  });

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
