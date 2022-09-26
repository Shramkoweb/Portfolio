import matter from 'gray-matter';
import readingTime from 'reading-time';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

import { Post } from '@/lib/types';

const POSTS_DIRECTORY = join(process.cwd(), '_posts');

const getSlugFromMdFile = (fileName: string) => fileName.replace(/\.md$/, '');

export async function getPostBySlug(slug?: string): Promise<Post> {
  if (!slug) {
    throw new Error('getPostBySlug: slug is required');
  }

  try {
    const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');

    const {
      data: {
        title,
        description,
        categories,
        featured,
        keywords,
        createDate,
        updateData,
      },
      content,
    } = matter(fileContents);
    const { text } = readingTime(content);

    return {
      data: {
        slug,
        featured,
        keywords,
        title,
        categories,
        description,
        readTime: text,
        createDate: Date.parse(createDate),
        updateData: Date.parse(updateData),
      },
      content,
    };
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getPosts(): Promise<Post[]> {
  const fileNames = await readdir(POSTS_DIRECTORY);

  return Promise.all(
    fileNames.map((fileName) => {
      const slug = getSlugFromMdFile(fileName);

      return getPostBySlug(slug);
    }),
  );
}

export async function getPostSlugs() {
  const fileNames = await readdir(POSTS_DIRECTORY);

  return Promise.all(fileNames.map((fileName) => getSlugFromMdFile(fileName)));
}

export async function getPostsCategories() {
  const posts = await getPosts();
  const categories = posts.flatMap((post) => post.data.categories);

  return categories.filter(
    (value, index, array) => array.indexOf(value) === index,
  );
}

export async function getPostsByCategory(category: string) {
  const posts = await getPosts();

  return posts.filter((post) => post.data.categories.some(
    (element) => element.toLowerCase() === category.toLowerCase(),
  ));
}
