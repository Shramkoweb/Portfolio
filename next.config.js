import { withSentryConfig } from '@sentry/nextjs';

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com/ https://vercel.live/;
    style-src 'self' 'unsafe-inline';
    worker-src 'self' blob: data:;
    img-src 'self';
    connect-src *;
    media-src 'self';
    font-src 'self';
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
    value: 'origin-when-cross-origin',
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
    value: '1; mode=block',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
    ];
  },
  env: {
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
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
  hideSourceMaps: true,
  webpack: {
    autoInstrumentServerFunctions: false,
    autoInstrumentMiddleware: false,
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
};

const nextConfigByEnv = {
  production: withSentryConfig(nextConfig, sentryBuildOptions),
  test: nextConfig,
  development: withSentryConfig(nextConfig, sentryBuildOptions),
};

export default nextConfigByEnv[process.env.NODE_ENV];
