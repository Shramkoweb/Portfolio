// The SDK's excludeTracing option also removes the server's sampled traces.
module.exports = function sentryClientLoader(source) {
  return source.replace(/\b__SENTRY_TRACING__\b/g, 'false');
};
