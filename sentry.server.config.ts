import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://1ad03fa14d1246158c4d6ff94792c907@o1092394.ingest.sentry.io/6547506',
  tracesSampleRate: 1.0,
});
