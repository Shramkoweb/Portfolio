'use client';

import { useEffect } from 'react';

interface RegisterViewProps {
  slug: string;
}

export function RegisterView({ slug }: RegisterViewProps) {
  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: 'POST' }).catch(() => {});
  }, [slug]);

  return null;
}
