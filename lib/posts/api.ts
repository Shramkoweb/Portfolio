import matter from 'gray-matter';
import readingTime from 'reading-time';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

import { Post } from '@/lib/types';
import { extractMarkdownSlug } from '@/lib/utils';

const POSTS_DIRECTORY = join(process.cwd(), '_posts');

export async function getPostBySlug(slug?: string): Promise<Post> {
  if (!slug) {
    throw new Error('getPostBySlug: slug is required');
  }

  try {
    const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');

    const {
      data: {
        heading,
        title,
        description,
        categories,
        featured,
        keywords,
        createDate,
        updateDate,
      },
      content,
    } = matter(fileContents);
    const { text } = readingTime(content);

    return {
      data: {
        heading,
        slug,
        featured,
        keywords,
        title,
        categories,
        description,
        readTime: text,
        createDate: Date.parse(createDate),
        updateDate: Date.parse(updateDate),
      },
      content,
    };
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getPosts(): Promise<Post[]> {
  const fileNames = await readdir(POSTS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  const postPromises = markdownFiles
    .map(extractMarkdownSlug)
    .map(getPostBySlug);

  return Promise.all(postPromises);
}

export async function getPostSlugs() {
  const fileNames = await readdir(POSTS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  return markdownFiles.map(extractMarkdownSlug);
}

export async function getPostsCategories() {
  const posts = await getPosts();

  const uniqueCategories = posts.reduce((acc, post) => {
    post.data.categories.forEach((category) => {
      acc.add(category.trim().toLowerCase());
    });
    return acc;
  }, new Set());

  return [...uniqueCategories];
}

export function filterPostsByCategory(posts: Post[], category: string): Post[] {
  return posts.filter((post) => post.data.categories.some(
    (element) => element.toLowerCase() === category.toLowerCase(),
  ));
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getPosts();
  return filterPostsByCategory(posts, category);
}
