import type { AppProps } from 'next/app';

import { Layout } from '@/components/layout';
import { GoogleAnalytics } from '@/components/google-analytics';

import 'styles/globals.css';

const isProduction = process.env.NODE_ENV === 'production';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {isProduction && <GoogleAnalytics />}
      <Layout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
