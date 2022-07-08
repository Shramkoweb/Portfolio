const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import("next").NextConfig} */
const moduleExports = {
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  reactStrictMode: true,
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
