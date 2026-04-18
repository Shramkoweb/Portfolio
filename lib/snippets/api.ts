import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

import matter from 'gray-matter';

import { Snippet } from '@/lib/types';
import { extractMarkdownSlug } from '@/lib/utils';

const SNIPPETS_DIRECTORY = join(process.cwd(), '_snippets');

export async function getSnippetBySlug(slug?: string): Promise<Snippet> {
  if (!slug) {
    throw new Error('getPostBySlug: slug is required');
  }

  try {
    const fullPath = join(SNIPPETS_DIRECTORY, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');

    const {
      data: { title, heading, description, createDate, updateDate, keywords },
      content,
    } = matter(fileContents);

    return {
      data: {
        slug,
        title,
        heading,
        description,
        keywords,
        createDate: Date.parse(createDate),
        updateDate: updateDate ? Date.parse(updateDate) : null,
      },
      content,
    };
  } catch (err) {
    throw new Error(String(err), { cause: err });
  }
}

export async function getSnippets(): Promise<Snippet[]> {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md'),
  );

  const snippetPromises = markdownFiles
    .map(extractMarkdownSlug)
    .map(getSnippetBySlug);

  return Promise.all(snippetPromises);
}

export async function getSnippetSlugs(): Promise<string[]> {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md'),
  );

  return markdownFiles.map(extractMarkdownSlug);
}
