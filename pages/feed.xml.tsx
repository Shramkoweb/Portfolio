import { GetServerSidePropsContext } from 'next';

import { getPostsMetadata } from '@/lib/posts/api';
import { sortByBirthtime } from '@/lib/posts/utils';

const SITE_URL = 'https://shramko.dev';

function generateRssItem(post: {
  data: {
    slug: string;
    heading: string;
    description: string;
    createDate: number;
  };
}) {
  return `    <item>
      <title><![CDATA[${post.data.heading}]]></title>
      <link>${SITE_URL}/blog/${post.data.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.data.slug}</guid>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${new Date(post.data.createDate).toUTCString()}</pubDate>
    </item>`;
}

function generateRss(
  posts: Array<{
    data: {
      slug: string;
      heading: string;
      description: string;
      createDate: number;
    };
  }>,
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Serhii Shramko's Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(generateRssItem).join('\n')}
  </channel>
</rss>`;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = await getPostsMetadata();
  const sortedPosts = posts.sort(sortByBirthtime);

  const rss = generateRss(sortedPosts);

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  );
  res.write(rss);
  res.end();

  return { props: {} };
}

export default function FeedPage() {
  return null;
}
