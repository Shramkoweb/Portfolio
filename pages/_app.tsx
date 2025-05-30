import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { isProduction } from '@/lib/utils';

import { Layout } from '@/components/layout';
import { GoogleAnalytics } from '@/components/google-analytics';

import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {isProduction() && <GoogleAnalytics />}

      <ThemeProvider attribute="class">
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <SpeedInsights />
          <Analytics />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
