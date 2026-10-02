import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { SWRConfig } from 'swr';

import { Layout } from '@/components/layout';

import '../styles/globals.css';

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => m.Analytics),
  { ssr: false },
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
          }}
        >
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
