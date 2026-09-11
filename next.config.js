import { withSentryConfig } from '@sentry/nextjs';

// Production pins the one inline script we ship — the next-themes
// pre-hydration theme setter — by hash, which lets us drop 'unsafe-inline'.
// Re-pin it if next-themes is upgraded or the ThemeProvider props in
// pages/_app.tsx change; `pnpm csp:check` catches that.
//
// 'unsafe-eval' has to stay: MDXRemote evaluates every post and snippet on the
// client via `Reflect.construct(Function, ...)` (next-mdx-remote/dist/index.js:37).
// Removing it renders a blank page with an EvalError on every /blog/* and
// /snippets/* route. Dropping it needs a move off client-side MDX evaluation.
//
// Dev additionally keeps 'unsafe-inline' instead of the hash: the dev server
// injects its own inline HMR/error-overlay scripts, and under CSP3 a
// hash-source makes 'unsafe-inline' ignored, so the two cannot coexist.
const scriptSrc =
  process.env.NODE_ENV === 'production'
    ? `'self' 'unsafe-eval' 'sha256-cd+HpnSsLaEz1lKWBNn+k+xOe1m2p5ZgfjoyNvHy9eU=' https://va.vercel-scripts.com/ https://vercel.live/`
    : `'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com/ https://vercel.live/`;

const ContentSecurityPolicy = `
    default-src 'self';
    script-src ${scriptSrc};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    connect-src 'self' https://*.ingest.sentry.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live;
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'swr'],
  },
  rewrites: async () => {
    return [
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
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
    excludeReplayShadowDom: true,
    excludeReplayIframe: true,
    excludeReplayWorker: true,
  },
};

const nextConfigByEnv = {
  production: withSentryConfig(nextConfig, sentryBuildOptions),
  test: nextConfig,
  development: nextConfig,
};

export default nextConfigByEnv[process.env.NODE_ENV];
