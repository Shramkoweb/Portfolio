import { SITE_URL } from '@/lib/constants';
import {
  filterPostsByCategory,
  getPostsCategories,
  getPostsMetadata,
} from '@/lib/posts/api';
import {
  filterByAdvanceReact,
  filterByFeatured,
  filterByNotFeatured,
  sortByBirthtime,
} from '@/lib/posts/utils';
import { PostCategory, PostMetadata } from '@/lib/types';
import { categoryToSeoData } from '@/lib/utils';

const author = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Serhii Shramko',
};

export interface HomePageData {
  featuredPosts: PostMetadata[];
  otherPosts: PostMetadata[];
  advancedReactPosts: PostMetadata[];
}

export async function getHomePageData(): Promise<HomePageData> {
  const posts = await getPostsMetadata();
  const otherPosts = posts
    .filter(filterByNotFeatured)
    .sort(sortByBirthtime)
    .slice(0, 3);
  const featuredPosts = posts.filter(filterByFeatured).sort(sortByBirthtime);
  const advancedReactPosts = posts
    .filter(filterByAdvanceReact)
    .sort(sortByBirthtime)
    .reverse();

  return { featuredPosts, otherPosts, advancedReactPosts };
}

export interface BlogJsonLd {
  '@context': string;
  '@type': string;
  '@id': string;
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  publisher: typeof author & { url: string };
  blogPost: Array<{
    '@type': string;
    headline: string;
    description: string;
    url: string;
    author: typeof author;
  }>;
}

export interface BlogPageData {
  posts: PostMetadata[];
  categories: PostCategory[];
  jsonLd: BlogJsonLd;
}

export async function getBlogPageData(): Promise<BlogPageData> {
  const [posts, categories] = await Promise.all([
    getPostsMetadata(),
    getPostsCategories(),
  ]);
  const sortedPosts = posts.sort(sortByBirthtime);

  const jsonLd: BlogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog/#blog`,
    name: "Serhii Shramko's Blog",
    url: `${SITE_URL}/blog`,
    description:
      'A blog featuring articles on tech topics, including TypeScript, Astro.js, React, and more.',
    inLanguage: 'en',
    publisher: { ...author, url: `${SITE_URL}/about` },
    blogPost: sortedPosts.slice(0, 25).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.data.heading,
      description: post.data.description,
      url: `${SITE_URL}/blog/${post.data.slug}`,
      author,
    })),
  };

  return { posts: sortedPosts, categories, jsonLd };
}

export interface CategoryPageData {
  posts: PostMetadata[];
  categories: PostCategory[];
  category: PostCategory;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export async function getCategoryPageData(
  category: string,
): Promise<CategoryPageData | null> {
  const allPosts = await getPostsMetadata();
  const categories = [
    ...new Set(allPosts.flatMap((post) => post.data.categories)),
  ];
  const postCategory = categories.find(
    (item) => item.toLowerCase() === category.toLowerCase(),
  );
  const seo = postCategory
    ? categoryToSeoData[postCategory.toLowerCase() as PostCategory]
    : undefined;

  if (!postCategory || !seo) {
    return null;
  }

  const posts = (
    filterPostsByCategory(allPosts, category) as PostMetadata[]
  ).sort(sortByBirthtime);

  return {
    posts,
    categories,
    category: postCategory,
    seoTitle: seo.title,
    seoDescription: seo.description,
    seoKeywords: seo.keywords,
  };
}
