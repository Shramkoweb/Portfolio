const { withSentryConfig } = require('@sentry/nextjs');

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com/ https://vercel.live/;
    style-src 'self' 'unsafe-inline';
    worker-src 'self' blob: data:;
    img-src 'self' media.licdn.com avatars.githubusercontent.com;
    connect-src *;
    media-src 'self';
    font-src 'self';
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/blog/category/clean%20code',
        destination: '/blog/category/clean-code',
        permanent: true
      },
      {
        source: '/snippets/bem-classes',
        destination: '/snippets/common-css-classes',
        permanent: true
      },
      {
        source: '/static/serhii-shramko-resume.pdf',
        destination: '/static/serhii_shramko_frontend.pdf',
        permanent: true
      }
    ];
  },
  serverRuntimeConfig: {
    appReleaseVersion: new Date().valueOf()
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};

const sentryBuildOptions = {
  silent: !process.env.CI,
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
  hideSourceMaps: true,
  autoInstrumentServerFunctions: false,
  autoInstrumentMiddleware: false,
  disableLogger: true,
  automaticVercelMonitors: true
};

const nextConfigByEnv = {
  production: withSentryConfig(nextConfig, sentryBuildOptions),
  test: nextConfig,
  development: withSentryConfig(nextConfig, sentryBuildOptions)
};

module.exports = nextConfigByEnv[process.env.NODE_ENV];
