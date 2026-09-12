import { generateRss } from '@/lib/feed';
import { getPostsMetadata } from '@/lib/posts/api';
import { sortByBirthtime } from '@/lib/posts/utils';

// Posts are files in the repo, so the feed can only change on deploy.
export const dynamic = 'force-static';

export async function GET() {
  const posts = await getPostsMetadata();
  const sortedPosts = posts.sort(sortByBirthtime);

  const latestDate = sortedPosts.reduce((max, post) => {
    const date = post.data.updateDate || post.data.createDate;
    return date > max ? date : max;
  }, sortedPosts[0]?.data.createDate ?? Date.now());

  const rss = generateRss(sortedPosts, new Date(latestDate).toUTCString());

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
