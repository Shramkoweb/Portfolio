import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.1,
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

