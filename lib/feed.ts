import { SITE_URL } from '@/lib/constants';
import { getSocialImage } from '@/lib/seo';
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
  const pubDate = new Date(post.data.createDate).toUTCString();
  const image = getSocialImage(post.data.heading);
  const content = `<p><img src="${escapeXml(image.url)}" alt="${escapeXml(image.alt)}" width="${image.width}" height="${image.height}" /></p><p>${escapeXml(post.data.description)}</p>`;

  const categories = post.data.categories
    .map((category) => `      <category>${escapeXml(category)}</category>`)
    .join('\n');

  return `    <item>
      <title><![CDATA[${escapeCData(post.data.heading)}]]></title>
      <link>${SITE_URL}/blog/${escapeXml(post.data.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(post.data.slug)}</guid>
      <description><![CDATA[${escapeCData(post.data.description)}]]></description>
      <content:encoded><![CDATA[${escapeCData(content)}]]></content:encoded>
      <media:content url="${escapeXml(image.url)}" medium="image" type="${image.type}" width="${image.width}" height="${image.height}" />
      <media:thumbnail url="${escapeXml(image.url)}" width="${image.width}" height="${image.height}" />
      <pubDate>${pubDate}</pubDate>
${categories}
    </item>`;
}

export function generateRss(posts: PostMetadata[], lastBuildDate: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Serhii Shramko's Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js.</description>
    <language>en</language>
    <image>
      <url>${SITE_URL}/static/favicons/favicon-32x32.png</url>
      <title>Serhii Shramko's Blog</title>
      <link>${SITE_URL}/blog</link>
      <width>32</width>
      <height>32</height>
    </image>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Next.js</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(generateRssItem).join('\n')}
  </channel>
</rss>`;
}
