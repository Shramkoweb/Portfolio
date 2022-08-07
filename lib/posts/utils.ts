import { Post } from '@/lib/posts/api';

export const sortByBirthtime = (first: Post, second: Post) => second.data.birthtimeMs - first.data.birthtimeMs;
export const filterByFeatured = (post: Post) => post.data.featured;
