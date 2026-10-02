import {
  Post,
  PostCategory,
  PostMetadata,
  Snippet,
  SnippetMetadata,
} from '@/lib/types';

export const sortByBirthtime = (
  first: Post | PostMetadata | Snippet | SnippetMetadata,
  second: Post | PostMetadata | Snippet | SnippetMetadata,
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

export type SeriesLink = { slug: string; heading: string };

export type SeriesPosition = {
  part: number;
  total: number;
  prev: SeriesLink | null;
  next: SeriesLink | null;
};

/** Reading order is publish order, so a new post joins the series without extra frontmatter. */
export const getAdvancedReactSeries = <T extends Post | PostMetadata>(
  posts: T[],
): T[] =>
  posts
    .filter(filterByAdvanceReact)
    .sort((first, second) => first.data.createDate - second.data.createDate);

export const getSeriesPosition = (
  posts: (Post | PostMetadata)[],
  slug: string,
): SeriesPosition | null => {
  const series = getAdvancedReactSeries(posts);
  const index = series.findIndex((post) => post.data.slug === slug);

  if (index === -1) {
    return null;
  }

  const toLink = (post?: Post | PostMetadata): SeriesLink | null =>
    post ? { slug: post.data.slug, heading: post.data.heading } : null;

  return {
    part: index + 1,
    total: series.length,
    prev: toLink(series[index - 1]),
    next: toLink(series[index + 1]),
  };
};

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
