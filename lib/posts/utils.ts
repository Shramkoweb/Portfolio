import { Post } from '@/lib/types';

export const sortByBirthtime = (first: Post, second: Post) => second.data.createDate - first.data.createDate;
export const filterByFeatured = (post: Post) => post.data.featured;
