import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header';
import { SITE_URL } from '@/lib/constants';
import {
  RSS_FEED_ALTERNATE,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE,
  TWITTER_HANDLE,
} from '@/lib/metadata';

import { Providers } from './providers';

import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { types: RSS_FEED_ALTERNATE },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      {
        url: '/static/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/static/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: '/static/favicons/favicon.ico',
    apple: [{ url: '/static/favicons/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/static/favicons/safari-pinned-tab.svg',
        color: '#4a9885',
      },
    ],
  },
  manifest: '/static/favicons/site.webmanifest',
  other: { 'msapplication-config': '/static/favicons/browserconfig.xml' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-release={process.env.APP_RELEASE_VERSION}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <Providers>
          <div className="bg-gray-50 dark:bg-gray-900">
            <Header />
            <main
              id="skip"
              className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-900"
            >
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
