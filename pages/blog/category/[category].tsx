import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { BlogPostPreview } from '@/components/blog-post-preview';
import { Categories } from '@/components/categories';
import { NoResults } from '@/components/no-results';
import { PageMeta } from '@/components/page-meta';
import { SearchInput } from '@/components/search-input';
import {
  filterPostsByCategory,
  getPostsCategories,
  getPostsMetadata,
} from '@/lib/posts/api';
import { filterByHeading, sortByBirthtime } from '@/lib/posts/utils';
import { generateBreadcrumbSchema, serializeJsonLd } from '@/lib/schema';
import { PostCategory, PostMetadata } from '@/lib/types';
import { categoryToSeoData, formatCategoryName } from '@/lib/utils';
import { useViewCounts } from '@/lib/views';

const CATEGORY_INTROS: Record<PostCategory, string> = {
  [PostCategory.JS]:
    'Everyday JavaScript: array methods, for...in versus for...of, expressions versus statements, dispatch tables, early returns and naming. It also covers the tooling around a project, from npm versioning and nvm to pnpm.',
  [PostCategory.TS]:
    'TypeScript in practice: discriminated unions, naming generic type parameters and setting up ESLint for a TypeScript codebase. The Astro guide and the early return pattern also show their examples in TypeScript.',
  [PostCategory.Astro]:
    'Working with the Astro framework: a guide to islands, content collections, view transitions and client directives, a link tree built with Astro and deployed on Vercel, and a fix for the MissingSharp image error.',
  [PostCategory.CSS]:
    'Keeping CSS maintainable: naming classes with the BEM methodology and building a reusable flexbox grid component in React.',
  [PostCategory.HTML]:
    'HTML fundamentals: how absolute and relative URLs resolve, and how to name classes in your markup with BEM so the CSS stays easy to change.',
  [PostCategory.Vercel]:
    'Building and deploying on Vercel: a link tree with Astro, the Astro MissingSharp image fix, faster deploys after moving to pnpm, reading Next.js build times correctly, and how this site is built.',
  [PostCategory.CleanCode]:
    'Patterns that make code easier to read: early returns, dispatch tables instead of switch statements, discriminated unions, clear names for generic type parameters and BEM class names.',
  [PostCategory.Tutorial]:
    'Step-by-step guides with working code, from React re-renders and useRef to TypeScript patterns, JavaScript arrays, Astro on Vercel, SSH keys for GitHub and PostgreSQL connection URLs.',
  [PostCategory.ProjectSetup]:
    'Setting up and maintaining a project: ESLint with TypeScript, Conventional Commits, semantic versioning in npm, pnpm, SSH keys for GitHub, local Git ignore rules, PostgreSQL connection URLs and cross-browser testing.',
  [PostCategory.Node]:
    'Node.js in practice: fixing __dirname in ES modules, switching versions with nvm, semantic versioning in npm and migrating to pnpm. It also covers Next.js build performance and moving Shiki themes into CSS classes.',
  [PostCategory.Opinion]:
    'Personal takes from my own work: why independent blogs need human readers, why naming conventions and Conventional Commits matter, and why I unsubscribe from newsletters right away.',
  [PostCategory.React]:
    'How React behaves under the hood: what triggers re-renders, how elements and children props avoid them, the pitfalls of custom hooks and when to reach for useRef. It also includes a flexbox grid component and the build notes for this Next.js site.',
  [PostCategory.Productivity]:
    'Workflows that save time: auditing a whole blog for SEO with AI in an afternoon, turning a video course into Obsidian notes with local Whisper transcription, and keeping the inbox clear.',
  [PostCategory.Tools]:
    'Developer tools I use: Cursor for SEO audits, Whisper and Obsidian for notes, BrowserStack for cross-browser testing, local Git ignore rules and Conventional Commits, plus the resources every programmer should know.',
  [PostCategory.AdvancedReact]:
    'A series on React performance and internals: what causes re-renders, how elements and children props prevent them, the pitfalls of custom hooks, and useRef with the changes in React 19.',
  [PostCategory.SEO]:
    'SEO from the developer side: how I used Cursor AI to audit the meta descriptions, broken links and image alt text of every post on this blog in one afternoon.',
  [PostCategory.AI]:
    'How I use AI in day-to-day work and what it costs independent writers: auditing SEO with Cursor, transcribing video courses locally with Whisper, and blocking AI training crawlers on this blog.',
};

interface CategoryPageProps {
  posts: PostMetadata[];
  categories: PostCategory[];
  category: PostCategory;
  seoDescription: string;
  seoKeywords: string;
  seoTitle: string;
}

function CategoryPage(props: CategoryPageProps) {
  const { posts, categories, category, seoDescription, seoKeywords, seoTitle } =
    props;
  const postsLength = posts.length;
  const displayCategory = formatCategoryName(category);
  const { getViews } = useViewCounts();

  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    filterByHeading(post, searchValue),
  );

  return (
    <>
      <PageMeta
        title={`${seoTitle} | Serhii Shramko`}
        description={seoDescription}
        socialTitle={seoTitle}
      />
      <Head>
        <meta content={seoKeywords} name="keywords" key="keywords" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              generateBreadcrumbSchema([
                { name: 'Home', url: 'https://shramko.dev/' },
                { name: 'Blog', url: 'https://shramko.dev/blog' },
                {
                  name: displayCategory,
                  url: `https://shramko.dev/blog/category/${category.toLowerCase()}`,
                },
              ]),
            ),
          }}
        />
      </Head>
      <div className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16 w-full">
        <div className="mb-4 flex w-full items-center self-center tracking-tight text-black dark:text-white">
          <h1 className="text-3xl font-bold md:text-5xl">{displayCategory}</h1>
          <p className="ml-auto text-sm">
            {postsLength} {postsLength === 1 ? 'article' : 'articles'}
          </p>
        </div>
        <div className="mb-4 space-y-2 text-gray-600 dark:text-gray-400">
          <p>{CATEGORY_INTROS[category.toLowerCase() as PostCategory]}</p>
          <p>{seoDescription}</p>
        </div>
        <SearchInput placeholder="Search articles" onChange={setSearchValue} />
        <Categories categories={categories} />
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Articles
        </h2>
        {!filteredBlogPosts.length ? (
          <NoResults searchValue={searchValue} />
        ) : (
          <ul className="w-full">
            {filteredBlogPosts.map(({ data }) => (
              <li key={data.title} className="mb-8 last:mb-0">
                <BlogPostPreview
                  slug={data.slug}
                  heading={data.heading}
                  excerpt={data.description}
                  views={getViews(data.slug)}
                  createDate={data.createDate}
                  readTime={data.readTime}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const categories = await getPostsCategories();

  return {
    paths: categories.map((category: string) => ({
      params: {
        category: category.toLowerCase(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<CategoryPageProps>> {
  const allPosts = await getPostsMetadata();
  const categories = [
    ...new Set(allPosts.flatMap((p) => p.data.categories)),
  ] as PostCategory[];
  const posts = filterPostsByCategory(
    allPosts,
    context.params?.category as string,
  ) as PostMetadata[];
  const sortedPosts = posts.sort(sortByBirthtime);
  const postCategory = categories.find(
    (item) => item.toLowerCase() === context.params?.category,
  );
  const seoDescription =
    categoryToSeoData[postCategory?.toLowerCase() as PostCategory].description;
  const seoKeywords =
    categoryToSeoData[postCategory?.toLowerCase() as PostCategory].keywords;
  const seoTitle =
    categoryToSeoData[postCategory?.toLowerCase() as PostCategory].title;

  return {
    props: {
      posts: sortedPosts,
      category: postCategory!,
      categories,
      seoDescription,
      seoTitle,
      seoKeywords,
    },
  };
}

export default CategoryPage;
