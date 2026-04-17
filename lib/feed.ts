import { SITE_URL } from '@/lib/constants';
import { PostMetadata } from '@/lib/types';

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function escapeCData(str: string): string {
  return str.replace(/\]\]>/g, ']]]]><![CDATA[>');
}

export function generateRssItem(post: PostMetadata) {
  const pubDate = new Date(
    post.data.updateDate ?? post.data.createDate,
  ).toUTCString();

  const categories = post.data.categories
    .map((category) => `      <category>${escapeXml(category)}</category>`)
    .join('\n');

  return `    <item>
      <title><![CDATA[${escapeCData(post.data.heading)}]]></title>
      <link>${SITE_URL}/blog/${escapeXml(post.data.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(post.data.slug)}</guid>
      <description><![CDATA[${escapeCData(post.data.description)}]]></description>
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
}

export function generateRss(
  posts: PostMetadata[],
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
    <generator>Next.js</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(generateRssItem).join('\n')}
  </channel>
</rss>`;
}
