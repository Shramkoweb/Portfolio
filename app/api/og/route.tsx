import { renderOgImage } from '@/lib/og-image';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Serhii Shramko';

  return renderOgImage(title, {
    // @vercel/og's default omits s-maxage, which the CDN needs to cache this.
    // The CDN cache key includes the deployment, so a template change lands
    // on the next deploy; the short max-age bounds browser staleness.
    headers: {
      'cache-control': 'public, no-transform, max-age=3600, s-maxage=31536000',
    },
  });
}
