import { Post, PostCategory, PostMetadata, Snippet } from '@/lib/types';

export const sortByBirthtime = (
  first: Post | PostMetadata | Snippet,
  second: Post | PostMetadata | Snippet,
) => second.data.createDate - first.data.createDate;

export const filterByFeatured = (post: Post | PostMetadata) => post.data.featured;
export const filterByNotFeatured = (post: Post | PostMetadata) => !post.data.featured
  && !post.data.categories
    .map((category) => category.toLowerCase())
    .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);

export const filterByAdvanceReact = (post: Post | PostMetadata) => post.data.categories
  .map((category) => category.toLowerCase())
  .includes(PostCategory.AdvancedReact.toLowerCase() as PostCategory);

 
export const filterByHeading = (post: Post | PostMetadata, heading: string) => post.data.heading.toLowerCase().includes(heading.toLowerCase());
