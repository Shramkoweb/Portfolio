import { GetServerSidePropsContext } from 'next';

import { getPostsMetadata } from '@/lib/posts/api';
import { sortByBirthtime } from '@/lib/posts/utils';

const SITE_URL = 'https://shramko.dev';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeCData(str: string): string {
  return str.replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function generateRssItem(post: {
  data: {
    slug: string;
    heading: string;
    description: string;
    createDate: number;
  };
}) {
  return `    <item>
      <title><![CDATA[${escapeCData(post.data.heading)}]]></title>
      <link>${SITE_URL}/blog/${escapeXml(post.data.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(post.data.slug)}</guid>
      <description><![CDATA[${escapeCData(post.data.description)}]]></description>
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
  lastBuildDate: string,
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Serhii Shramko's Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(generateRssItem).join('\n')}
  </channel>
</rss>`;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = await getPostsMetadata();
  const sortedPosts = posts.sort(sortByBirthtime);

  const latestDate = sortedPosts.reduce((max, post) => {
    const date = post.data.updateDate || post.data.createDate;
    return date > max ? date : max;
  }, sortedPosts[0]?.data.createDate ?? Date.now());

  const rss = generateRss(sortedPosts, new Date(latestDate).toUTCString());

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
