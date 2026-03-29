import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const MAX_TITLE_LENGTH = 100;

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawTitle = searchParams.get('title') ?? 'Serhii Shramko';
  const title = rawTitle.length > MAX_TITLE_LENGTH
    ? `${rawTitle.slice(0, MAX_TITLE_LENGTH)}…`
    : rawTitle;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#111',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            maxWidth: '80%',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#9ca3af',
            marginTop: 24,
          }}
        >
          shramko.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
