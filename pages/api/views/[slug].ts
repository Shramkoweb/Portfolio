import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');

  if (!slug) {
    console.warn('Missing slug parameter');
    return new NextResponse('Missing slug', { status: 400 });
  }

  try {
    if (req.method === 'POST') {
      const views = await kv.incr(slug);
      console.log(`POST: Incremented view count for slug: ${slug} to ${views}`);
      return NextResponse.json({
        total: views,
      });
    }

    if (req.method === 'GET') {
      const views = await kv.get(slug);
      console.log(`GET: Fetched view count for slug: ${slug}, count: ${views}`);
      return NextResponse.json({ total: Number(views ?? 0) });
    }
  } catch (error) {
    console.error(`Error processing slug: ${slug}`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
