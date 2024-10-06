import Head from 'next/head';
import { useState } from 'react';

import { getPosts, getPostsCategories } from '@/lib/posts/api';
import { BlogPostPreview } from '@/components/blog-post-preview';
import { sortByBirthtime } from '@/lib/posts/utils';
import { Post } from '@/lib/types';
import { Categories } from '@/components/categories';

interface BlogPageProps {
  posts: Post[];
  categories: string[];
}

function BlogPage(props: BlogPageProps) {
  const { posts, categories } = props;
  const postsLength = posts.length;

  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = posts.filter((post) => post.data.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      <Head>
        <title>
          What’s New at Software Engineering? | The Serhii Shramko&apos;s Blog
        </title>
        <meta
          content="Join me on a journey through the world of software engineering. Learn about TypeScript, JavaScript, and Next.js, and discover new ways to improve your code."
          name="description"
          key="description"
        />
        <meta
          content="
          JavaScript blog,
          Tech Blog, Code snippets,
          Software blog,
          web dev blog"
          name="keywords"
          key="keywords"
        />
        <meta
          property="og:site_name"
          content="Serhii Shramko Blog"
          key="og:site_name"
        />
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"Blog","name":"Serhii Shramko\'s Blog","description":"A blog featuring articles on tech topics, including TypeScript, Astro.js, React, and more.","blogPost":[{"@type":"BlogPosting","headline":"Discriminated Unions in TypeScript","description":"Discover how discriminated unions in TypeScript can help you write cleaner, safer, and more expressive code.","url":"https://shramko.dev/blog/discriminated-unions"},{"@type":"BlogPosting","headline":"How to Build an Astro.js Image Component on Vercel","description":"Learn how to create an image component in Astro.js and deploy it on Vercel correctly.","url":"https://shramko.dev/blog/astro-image-on-vercel"},{"@type":"BlogPosting","headline":"My Personal Linktree with Astro.js and Vercel","description":"Learn how to build a fast, efficient link tree website using Astro.js and Vercel.","url":"https://shramko.dev/blog/linktree"},{"@type":"BlogPosting","headline":"Conventional Commits","description":"Discover how Conventional Commits can enhance your work and project\'s readability.","url":"https://shramko.dev/blog/conventional-commits"},{"@type":"BlogPosting","headline":"How to Decrease Deployment Time by 44% with pnpm","description":"Learn how to efficiently migrate your project from npm to pnpm with this guide.","url":"https://shramko.dev/blog/pnpm"},{"@type":"BlogPosting","headline":"Unsubscribe from Email Newsletters Immediately","description":"Save time by unsubscribing from email newsletters promptly.","url":"https://shramko.dev/blog/unsubscribe-immediately"},{"@type":"BlogPosting","headline":"How to Add SSH Keys to Your GitHub Account","description":"Learn how to add SSH keys to your GitHub account for enhanced security.","url":"https://shramko.dev/blog/how-to-create-ssh-keys"},{"@type":"BlogPosting","headline":"Mastering HTML Class Naming: Boosting CSS Efficiency","description":"Discover the art of crafting clean and organized HTML class names to enhance CSS efficiency.","url":"https://shramko.dev/blog/class-naming-conventions"},{"@type":"BlogPosting","headline":"What is Astro Framework?","description":"Learn what makes the Astro.js framework special and its core features.","url":"https://shramko.dev/blog/astro"},{"@type":"BlogPosting","headline":"Node Version Manager","description":"Discover why you should use Node Version Manager (NVM) and how to use it.","url":"https://shramko.dev/blog/nvm"},{"@type":"BlogPosting","headline":"Cross-browser Testing","description":"Learn how to perform cross-browser testing and use Browserstack effectively.","url":"https://shramko.dev/blog/cross-browser-testing"},{"@type":"BlogPosting","headline":"Postgres Connect to Database with URL","description":"Learn how to connect to a Postgres database using a URL.","url":"https://shramko.dev/blog/postgres-connect-url"},{"@type":"BlogPosting","headline":"JavaScript 101: Arrays","description":"A comprehensive guide to JavaScript array methods.","url":"https://shramko.dev/blog/js-arrays"},{"@type":"BlogPosting","headline":"PHPStorm Allow Network Connections on Startup","description":"Learn how to fix PHPStorm network connection errors on startup.","url":"https://shramko.dev/blog/phpstorm-allow-network"},{"@type":"BlogPosting","headline":"Difference Between Absolute and Relative URL in HTML","description":"Everything you need to know about link addresses: absolute vs relative.","url":"https://shramko.dev/blog/difference-between-absolute-and-relative-url"},{"@type":"BlogPosting","headline":"How to Create a Grid with Flexbox in React","description":"Create a Flexbox-based Grid component using BEM and clsx in React.","url":"https://shramko.dev/blog/react-flexbox-grid"},{"@type":"BlogPosting","headline":"Essential Tools and Guides Every Developer Should Utilize","description":"A list of the best resources and blogs for developers in 2024.","url":"https://shramko.dev/blog/useful-articles"},{"@type":"BlogPosting","headline":"Dispatch Table in JavaScript","description":"Learn about polymorphism and dispatch tables in JavaScript.","url":"https://shramko.dev/blog/dispatch-tables"},{"@type":"BlogPosting","headline":"for...in vs for...of Loops","description":"Understand the difference between \'for...in\' and \'for...of\' loops in JavaScript.","url":"https://shramko.dev/blog/for-in-vs-for-of"},{"@type":"BlogPosting","headline":"Introducing the New Shramko.dev","description":"Learn how I built my modern portfolio and the technologies used.","url":"https://shramko.dev/blog/introducing-the-new-shramko.dev"},{"@type":"BlogPosting","headline":"How to Use ESLint with TypeScript","description":"A guide to setting up ESLint in your TypeScript project for better linting.","url":"https://shramko.dev/blog/eslint-with-typescript"},{"@type":"BlogPosting","headline":"Expressions vs Statements","description":"Understand the important differences between expressions and statements in JavaScript.","url":"https://shramko.dev/blog/expressions-statements"},{"@type":"BlogPosting","headline":"How to Fix \'__dirname is Not Defined in ES Module Scope\'","description":"Learn how to resolve the \'__dirname is not defined\' error in ES module scope.","url":"https://shramko.dev/blog/dirname-error"}]}' }} />
      </Head>
      <div className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16 w-full">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white flex self-center w-full items-center">
          Blog
          <span className="ml-auto inline-block text-sm">
            {postsLength}
            {' '}
            {postsLength === 1 ? 'article' : 'articles'}
          </span>
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          In recent years, I&apos;ve poured a lot of time into writing,
          mostly on tech but occasionally venturing into other areas.
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            placeholder="Search articles"
            onChange={(e) => setSearchValue(e.target.value)}
            className="pr-10 block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Categories categories={categories} />
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Articles
        </h2>
        <ul>
          {filteredBlogPosts.map(({
            data: {
              title, slug, heading, description,
            },
          }) => (
            <li key={title}>
              <BlogPostPreview
                slug={slug}
                heading={heading}
                excerpt={description}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  const categories = await getPostsCategories();
  const sortedPosts = posts.sort(sortByBirthtime);

  return {
    props: {
      posts: sortedPosts,
      categories,
    },
  };
}

export default BlogPage;
