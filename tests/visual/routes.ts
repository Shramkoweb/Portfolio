import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';

function content(directory: string) {
  return readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const { data } = matter(readFileSync(join(directory, file), 'utf8'));
      return {
        slug: file.replace(/\.md$/, ''),
        heading: data.heading as string,
        categories: ((data.categories ?? []) as string[]).map((category) =>
          category.toLowerCase(),
        ),
      };
    });
}

export const posts = content('_posts');
export const snippets = content('_snippets');
export const categories = [
  ...new Set(posts.flatMap((post) => post.categories as string[])),
].sort();
