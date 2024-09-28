import matter from 'gray-matter';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

import { Snippet } from '@/lib/types';
import { getSlugFromMdFile } from '@/lib/utils';

const SNIPPETS_DIRECTORY = join(process.cwd(), '_snippets');

export async function getSnippetBySlug(slug?: string): Promise<Snippet> {
  if (!slug) {
    throw new Error('getPostBySlug: slug is required');
  }

  try {
    const fullPath = join(SNIPPETS_DIRECTORY, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');

    const {
      data: {
        title, heading, description, createDate, updateData, keywords,
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
        updateData: Date.parse(updateData),
      },
      content,
    };
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getSnippets(): Promise<Snippet[]> {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);

  return Promise.all(
    fileNames.map((fileName) => {
      const slug = getSlugFromMdFile(fileName);

      return getSnippetBySlug(slug);
    }),
  );
}

export async function getSnippetSlugs() {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);

  return Promise.all(fileNames.map((fileName) => getSlugFromMdFile(fileName)));
}
