import matter from 'gray-matter';
import readingTime from 'reading-time';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'path';

const POSTS_DIRECTORY = join(process.cwd(), '_posts');

export async function getPostBySlug(slug: string) {
  const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { birthtimeMs, mtimeMs } = await stat(fullPath);

  const { data, content } = matter(fileContents);
  const { text } = readingTime(content);

  return {
    data: {
      ...data,
      readTime: text,
      birthtimeMs,
      mtimeMs,
    },
    content,
  };
}

export async function getPostSlugs() {
  const fileNames = await readdir(POSTS_DIRECTORY);

  return Promise.all(fileNames.map((fileName) => fileName.replace(/\.md$/, '')));
}
