'use client';

import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          dedupingInterval: 60000, // 1 minute
        }}
      >
        {children}
      </SWRConfig>
    </ThemeProvider>
  );
}
