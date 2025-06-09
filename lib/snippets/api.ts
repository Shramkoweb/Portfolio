import matter from 'gray-matter';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

import { Snippet } from '@/lib/types';
import { extractMarkdownSlug } from '@/lib/utils';

const SNIPPETS_DIRECTORY = join(process.cwd(), '_snippets');

/**
 * Retrieves a markdown snippet and its metadata by slug.
 *
 * @param slug - The unique identifier for the snippet (without file extension).
 * @returns The snippet object containing metadata and content.
 *
 * @throws {Error} If {@link slug} is not provided or if the snippet file cannot be read or parsed.
 */
export async function getSnippetBySlug(slug?: string): Promise<Snippet> {
  if (!slug) {
    throw new Error('getPostBySlug: slug is required');
  }

  try {
    const fullPath = join(SNIPPETS_DIRECTORY, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');

    const {
      data: {
        title, heading, description, createDate, updateDate, keywords,
      },
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
        updateDate: Date.parse(updateDate),
      },
      content,
    };
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getSnippets(): Promise<Snippet[]> {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  const snippetPromises = markdownFiles
    .map(extractMarkdownSlug)
    .map(getSnippetBySlug);

  return Promise.all(snippetPromises);
}

export async function getSnippetSlugs(): Promise<string[]> {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  return markdownFiles.map(extractMarkdownSlug);
}
