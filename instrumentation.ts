import * as Sentry from '@sentry/nextjs';

export function register() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      sendDefaultPii: true,
      tracesSampleRate: 0.1, // 10% of transactions
    });
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      sendDefaultPii: true,
      tracesSampleRate: 0.1, // 10% of transactions
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
