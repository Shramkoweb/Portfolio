import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const MAX_TITLE_LENGTH = 100;

export function clampOgTitle(title: string): string {
  return title.length > MAX_TITLE_LENGTH
    ? `${title.slice(0, MAX_TITLE_LENGTH)}…`
    : title;
}

export function renderOgImage(
  title: string,
  init: { headers?: Record<string, string> } = {},
) {
  return new ImageResponse(
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
        {clampOgTitle(title)}
      </div>
      <div style={{ fontSize: 28, color: '#9ca3af', marginTop: 24 }}>
        shramko.dev
      </div>
    </div>,
    { ...OG_SIZE, ...init },
  );
}
