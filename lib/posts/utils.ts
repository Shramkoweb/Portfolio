import { Post, PostCategory, PostMetadata, Snippet } from '@/lib/types';

export const sortByBirthtime = (
  first: Post | PostMetadata | Snippet,
  second: Post | PostMetadata | Snippet,
) => second.data.createDate - first.data.createDate;

export const filterByFeatured = (post: Post | PostMetadata) =>
  post.data.featured;

const NEW_POST_WINDOW_DAYS = 14;

/** Future dates count as new, so a scheduled post is marked before it is due. */
export const isNewPost = (
  post: Post | PostMetadata,
  now: Date = new Date(),
): boolean => {
  const { createDate } = post.data;

  if (!Number.isFinite(createDate)) {
    return false;
  }

  const ageInDays = (now.getTime() - createDate) / 86_400_000;

  return ageInDays < NEW_POST_WINDOW_DAYS;
};
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

export const parsePostDate = (
  value: string | null | undefined,
): number | null => {
  if (!value) {
    return null;
  }

  const timestamp = Date.parse(value);

  return Number.isNaN(timestamp) ? null : timestamp;
};

/** UTC: the prerendered day must not shift with the reader's timezone. */
export const formatPostDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleDateString('en-us', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  });

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
