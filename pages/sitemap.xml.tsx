import { GetServerSidePropsContext } from 'next';

import { getPosts } from '@/lib/posts/api';

const createSitemap = (
  slugs: string[],
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
    .map(
      (slug) => `
                <url>
                    <loc>${`https://shramko.dev/${slug}`}</loc>
                </url>
            `,
    )
    .join('')
    .trim()}
    </urlset>
`;

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const allPosts = await getPosts();
  const allPages = [
    ...allPosts.map(({ data: { slug } }) => `blog/${slug}`),
    ...['', 'about', 'blog', 'dashboard', 'gear'],
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
