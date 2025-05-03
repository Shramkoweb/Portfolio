import { Post, PostCategory, Snippet } from '@/lib/types';

export const sortByBirthtime = (
  first: Post | Snippet,
  second: Post | Snippet
) => second.data.createDate - first.data.createDate;

export const filterByFeatured = (post: Post) => post.data.featured;
export const filterByNotFeatured = (post: Post) => !post.data.featured && !post.data.categories
  .map((category) => category.toLowerCase())
  .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);

export const filterByAdvanceReact = (post: Post) => {
  return post.data.categories
    .map((category) => category.toLowerCase())
    .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);
};
