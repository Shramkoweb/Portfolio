import { Post, PostCategory, Snippet } from '@/lib/types';

export const sortByBirthtime = (
  first: Post | Snippet,
  second: Post | Snippet,
) => second.data.createDate - first.data.createDate;

export const filterByFeatured = (post: Post) => post.data.featured;
export const filterByNotFeatured = (post: Post) => !post.data.featured
  && !post.data.categories
    .map((category) => category.toLowerCase())
    .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);

export const filterByAdvanceReact = (post: Post) => post.data.categories
  .map((category) => category.toLowerCase())
  .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);

// eslint-disable-next-line max-len
export const filterByHeading = (post: Post, heading: string) => post.data.heading.toLowerCase().includes(heading.toLowerCase());
