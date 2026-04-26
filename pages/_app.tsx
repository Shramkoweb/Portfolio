import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { Layout } from '@/components/layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // 1 minute
          }}
        >
          <Layout>
            <Component {...pageProps} />
            <SpeedInsights />
            <Analytics />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
