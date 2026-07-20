import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

import matter from 'gray-matter';

import { Snippet, SnippetMetadata } from '@/lib/types';
import { extractMarkdownSlug } from '@/lib/utils';

const SNIPPETS_DIRECTORY = join(process.cwd(), '_snippets');

async function readSnippetFile(slug: string) {
  const fullPath = join(SNIPPETS_DIRECTORY, `${slug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');

  return matter(fileContents);
}

function buildSnippetData(
  slug: string,
  matterResult: matter.GrayMatterFile<string>,
): Snippet['data'] {
  const {
    data: { title, heading, description, createDate, updateDate, keywords },
  } = matterResult;

  return {
    slug,
    title,
    heading,
    description,
    keywords,
    createDate: Date.parse(createDate),
    updateDate: updateDate ? Date.parse(updateDate) : null,
  };
}

export async function getSnippetBySlug(slug?: string): Promise<Snippet> {
  if (!slug) {
    throw new Error('getSnippetBySlug: slug is required');
  }

  try {
    const matterResult = await readSnippetFile(slug);

    return {
      data: buildSnippetData(slug, matterResult),
      content: matterResult.content,
    };
  } catch (err) {
    throw new Error(String(err), { cause: err });
  }
}

async function getSnippetMetadataBySlug(
  slug: string,
): Promise<SnippetMetadata> {
  const matterResult = await readSnippetFile(slug);

  return { data: buildSnippetData(slug, matterResult) };
}

export async function getSnippetsMetadata(): Promise<SnippetMetadata[]> {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md'),
  );

  return Promise.all(
    markdownFiles.map(extractMarkdownSlug).map(getSnippetMetadataBySlug),
  );
}

export async function getSnippetSlugs(): Promise<string[]> {
  const fileNames = await readdir(SNIPPETS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md'),
  );

  return markdownFiles.map(extractMarkdownSlug);
}
