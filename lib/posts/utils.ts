import { Post, Snippet } from '@/lib/types';

export const sortByBirthtime = (
  first: Post | Snippet,
  second: Post | Snippet,
) => second.data.createDate - first.data.createDate;
export const filterByFeatured = (post: Post) => post.data.featured;
