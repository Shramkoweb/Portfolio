import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';

import matter from 'gray-matter';
import readingTime from 'reading-time';

import { Post, PostCategory, PostMetadata } from '@/lib/types';
import { extractMarkdownSlug } from '@/lib/utils';

const POSTS_DIRECTORY = join(process.cwd(), '_posts');

async function getPostMetadataBySlug(slug: string): Promise<PostMetadata> {
  const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  if (!matterResult || !matterResult.data) {
    throw new Error(`Invalid markdown format for slug: ${slug}`);
  }

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
  } = matterResult;

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
      updateDate: updateDate ? Date.parse(updateDate) : null,
    },
  };
}

export async function getPostBySlug(slug?: string): Promise<Post> {
  if (!slug) {
    throw new Error('getPostBySlug: slug is required');
  }

  try {
    const fullPath = join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    if (!matterResult || !matterResult.data) {
      throw new Error(`Invalid markdown format for slug: ${slug}`);
    }

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
    } = matterResult;

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
        updateDate: updateDate ? Date.parse(updateDate) : null,
      },
      content,
    };
  } catch (err) {
    throw new Error(String(err), { cause: err });
  }
}

export async function getPosts(): Promise<Post[]> {
  const fileNames = await readdir(POSTS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md'),
  );

  const postPromises = markdownFiles
    .map(extractMarkdownSlug)
    .map(getPostBySlug);

  return Promise.all(postPromises);
}

export async function getPostsMetadata(): Promise<PostMetadata[]> {
  const fileNames = await readdir(POSTS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md'),
  );

  const metadataPromises = markdownFiles
    .map(extractMarkdownSlug)
    .map(getPostMetadataBySlug);

  return Promise.all(metadataPromises);
}

export async function getPostSlugs() {
  const fileNames = await readdir(POSTS_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md'),
  );

  return markdownFiles.map(extractMarkdownSlug);
}

export async function getPostsCategories(): Promise<PostCategory[]> {
  const posts = await getPostsMetadata();

  const uniqueCategories = posts.reduce(
    (acc: Set<PostCategory>, post: PostMetadata) => {
      post.data.categories.forEach((category: PostCategory) => {
        acc.add(category);
      });
      return acc;
    },
    new Set<PostCategory>(),
  );

  return [...uniqueCategories];
}

export function filterPostsByCategory(
  posts: Post[] | PostMetadata[],
  category: string,
): Post[] | PostMetadata[] {
  return posts.filter((post) =>
    post.data.categories.some(
      (element) => element.toLowerCase() === category.toLowerCase(),
    ),
  );
}

export async function getPostsByCategory(
  category: string,
): Promise<PostMetadata[]> {
  const posts = await getPostsMetadata();
  return filterPostsByCategory(posts, category) as PostMetadata[];
}
