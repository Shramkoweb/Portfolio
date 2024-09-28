import Head from 'next/head';

import { BlogViewsCard } from '@/components/dashboard-card/blog-views';
import { GithubFollowers } from '@/components/dashboard-card/github-followers';
import { GitHubStars } from '@/components/dashboard-card/github-stars';
import { DaysAsSoftwareEngineer } from '@/components/dashboard-card/days-as-engineer';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Serhii Shramko</title>
        <meta
          content="My dashboard is built using Next.js API routes as serverless functions. It's personalized and easy to access."
          name="description"
          key="description"
        />
        <meta
          content="
          github stars
          Serhii,
          Serhii Shramko,
          shramko,
          personal dashboard,
          next js api,
          github followers"
          name="keywords"
          key="keywords"
        />
      </Head>
      <section className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Dashboard
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is my personal dashboard, built with
            {' '}
            <a
              className="text-[#60a5fa] underline"
              href="https://nextjs.org/docs/pages/building-your-application/routing/api-routes"
              rel="noopener"
              target="_blank"
            >
              Next.js API
            </a>
            {' '}
            routes deployed as serverless functions. I use this dashboard to
            track various metrics across platforms like GitHub, and more in the
            near future.
          </p>
        </div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Statistics
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <GithubFollowers />
          <GitHubStars />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <BlogViewsCard />
          <DaysAsSoftwareEngineer />
        </div>
      </section>
    </>
  );
}
