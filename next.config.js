const { withSentryConfig } = require('@sentry/nextjs');

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com/v1/script.debug.js;
    style-src 'self' 'unsafe-inline';
    img-src 'self';
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

/** @type {import("next").NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    appReleaseVersion: new Date().valueOf()
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
  },
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#extend-nextjs-configuration
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    hideSourceMaps: true,
    autoInstrumentServerFunctions: false,
    autoInstrumentMiddleware: false,
    disableLogger: true,
    automaticVercelMonitors: true,
  }
};

const nextConfigByEnv = {
  production: withSentryConfig(nextConfig, {
    silent: true
  }),
  test: nextConfig,
  development: withSentryConfig(nextConfig)
};

module.exports = nextConfigByEnv[process.env.NODE_ENV];
