'use client';

import * as Sentry from '@sentry/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function NotFoundReporter() {
  const pathname = usePathname();

  useEffect(() => {
    Sentry.captureMessage(`404: ${pathname}`, {
      level: 'info',
      tags: { referrer: document.referrer || 'direct' },
    });
  }, [pathname]);

  return null;
}
