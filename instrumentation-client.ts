import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.APP_RELEASE_VERSION,
  tracesSampleRate: 0,
  debug: false,
  sendDefaultPii: true,
  ignoreErrors: [
    // iOS Safari WebKit errors
    'undefined is not an object (evaluating \'window.webkit.messageHandlers\')',
    /webkit\.messageHandlers/,

    // Browser extension errors
    'ResizeObserver loop limit exceeded',
  ],

  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^moz-extension:\/\//i,
    /^safari-extension:\/\//i,
    // Google Translate proxy
    /translate\.goog/i,
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

