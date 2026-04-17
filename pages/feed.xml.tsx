import { GetServerSidePropsContext } from 'next';

import { generateRss } from '@/lib/feed';
import { getPostsMetadata } from '@/lib/posts/api';
import { sortByBirthtime } from '@/lib/posts/utils';

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
