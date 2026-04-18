import { Post, PostCategory, PostMetadata, Snippet } from '@/lib/types';

export const sortByBirthtime = (
  first: Post | PostMetadata | Snippet,
  second: Post | PostMetadata | Snippet,
) => second.data.createDate - first.data.createDate;

export const filterByFeatured = (post: Post | PostMetadata) =>
  post.data.featured;
export const filterByNotFeatured = (post: Post | PostMetadata) =>
  !post.data.featured &&
  !post.data.categories
    .map((category) => category.toLowerCase())
    .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);

export const filterByAdvanceReact = (post: Post | PostMetadata) =>
  post.data.categories
    .map((category) => category.toLowerCase())
    .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);

export const filterByHeading = (post: Post | PostMetadata, heading: string) =>
  post.data.heading.toLowerCase().includes(heading.toLowerCase());

export const getYearFromPost = (post: Post | PostMetadata): number => {
  const date = new Date(post.data.createDate);
  return date.getFullYear();
};

export type YearSeparator = {
  type: 'year-separator';
  year: number;
};

export type PostWithSeparator = PostMetadata | YearSeparator;

export const isYearSeparator = (
  item: PostWithSeparator,
): item is YearSeparator => {
  return 'type' in item && item.type === 'year-separator';
};

export const addYearSeparators = (
  posts: PostMetadata[],
): PostWithSeparator[] => {
  if (posts.length === 0) return [];

  const result: PostWithSeparator[] = [];
  let currentYear: number | null = null;

  posts.forEach((post) => {
    const postYear = getYearFromPost(post);

    if (currentYear !== postYear) {
      result.push({
        type: 'year-separator',
        year: postYear,
      });
      currentYear = postYear;
    }

    result.push(post);
  });

  return result;
};
