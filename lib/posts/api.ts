import matter from 'gray-matter';
import readingTime from 'reading-time';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'path';

const POSTS_DIRECTORY = join(process.cwd(), '_posts');

export async function getPostBySlug(slug?: string) {
  if (!slug) {
    throw new Error('getPostBySlug: slug is required');
  }

  try {
    const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');
    const { birthtimeMs, mtimeMs } = await stat(fullPath);

    const { data: { title, description, tags }, content } = matter(fileContents);
    const { text } = readingTime(content);

    return {
      data: {
        title,
        description,
        tags,
        readTime: text,
        birthtimeMs,
        mtimeMs,
      },
      content,
    };
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getPostSlugs() {
  const fileNames = await readdir(POSTS_DIRECTORY);

  return Promise.all(fileNames.map((fileName) => fileName.replace(/\.md$/, '')));
}
