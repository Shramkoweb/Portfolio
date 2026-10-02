import { readdirSync, readFileSync } from 'node:fs';

import { withSentryConfig } from '@sentry/nextjs/config';
import matter from 'gray-matter';

// The hash covers the next-themes inline theme setter. 'unsafe-eval' must
// stay: MDXRemote evaluates every post via `Reflect.construct(Function, ...)`,
// so dropping it renders /blog/* blank. Dev cannot have both — under CSP3 a
// hash makes 'unsafe-inline' ignored, which would block HMR.
const scriptSrc =
  process.env.NODE_ENV === 'production'
    ? `'self' 'unsafe-eval' 'sha256-cd+HpnSsLaEz1lKWBNn+k+xOe1m2p5ZgfjoyNvHy9eU=' https://va.vercel-scripts.com/`
    : `'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com/`;

const ContentSecurityPolicy = `
    default-src 'self';
    script-src ${scriptSrc};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    connect-src 'self' https://*.ingest.sentry.io https://va.vercel-scripts.com;
    font-src 'self';
    worker-src 'self' blob:;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '0',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

// Bundle published headings into the OG function; the MDX files aren't traced into it.
const ogContentTitles = ['_posts', '_snippets'].flatMap((directory) =>
  readdirSync(new URL(`./${directory}/`, import.meta.url))
    .filter((file) => file.endsWith('.md'))
    .map(
      (file) =>
        matter(
          readFileSync(
            new URL(`./${directory}/${file}`, import.meta.url),
            'utf8',
          ),
        ).data.heading,
    ),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.VISUAL_TEST === '1' ? '.next-visual' : '.next',
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'swr'],
  },
  rewrites: async () => {
    return [
      {
        source: '/og',
        destination: '/api/og',
      },
      {
        source: '/favicon.ico',
        destination: '/static/favicons/favicon.ico',
      },
      {
        source: '/feed.xml',
        destination: '/api/feed',
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: '/blog/category/clean%20code',
        destination: '/blog/category/clean-code',
        permanent: true,
      },
      {
        source: '/snippets/bem-classes',
        destination: '/snippets/common-css-classes',
        permanent: true,
      },
      {
        source: '/static/serhii-shramko-resume.pdf',
        destination: '/static/serhii_shramko_frontend.pdf',
        permanent: true,
      },
      {
        source: '/blog/category/habits',
        destination: '/blog/category/productivity',
        permanent: true,
      },
      {
        source: '/blog/category/certifications',
        destination: '/blog/category/tutorial',
        permanent: true,
      },
      {
        source: '/blog/category/useful-resources',
        destination: '/blog/category/tools',
        permanent: true,
      },
      {
        source: '/blog/category/jamstack',
        destination: '/blog/category/astro',
        permanent: true,
      },
      {
        source: '/rebookmark',
        destination: '/',
        permanent: true,
      },
    ];
  },
  env: {
    OG_CONTENT_TITLES: JSON.stringify(ogContentTitles),
    APP_RELEASE_VERSION: new Date().valueOf().toString(),
  },
  images: {
    qualities: [75, 100],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

const sentryBuildOptions = {
  silent: !process.env.CI,
  telemetry: false,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
      excludeReplayShadowDOM: true,
      excludeReplayIframe: true,
      excludeReplayCompressionWorker: true,
    },
  },
};

const nextConfigByEnv = {
  production: withSentryConfig(nextConfig, sentryBuildOptions),
  test: nextConfig,
  development: nextConfig,
};

export default nextConfigByEnv[process.env.NODE_ENV];
