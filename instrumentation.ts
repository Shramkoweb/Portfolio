import * as Sentry from '@sentry/nextjs';

export function register() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: process.env.APP_RELEASE_VERSION,
    sendDefaultPii: true,
    tracesSampleRate: 0.1,
    ignoreErrors: [
      'ECONNRESET',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'UND_ERR_CONNECT_TIMEOUT',
    ],
    beforeSend(event) {
      if (!event.exception?.values?.some((e) => e.stacktrace)) {
        return null;
      }
      return event;
    },
  });
}

export const onRequestError = Sentry.captureRequestError;
