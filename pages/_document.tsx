import {
  Head, Html, Main, NextScript,
} from 'next/document';
import getConfig from 'next/config';

export default function Document() {
  const { serverRuntimeConfig } = getConfig();

  return (
    <Html lang="en" data-relese={serverRuntimeConfig.appReleaseVersion}>
      <Head>
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
        <link
          href="/static/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/static/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/static/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          color="#4a9885"
          href="/static/favicons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta
          content="#f9fafb"
          name="theme-color"
          media="(prefers-color-scheme: light)"
        />
        <meta
          content="#111111"
          name="theme-color"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          content="/static/favicons/browserconfig.xml"
          name="msapplication-config"
        />
      </Head>
      <body className="bg-white dark:bg-black text-white dark:text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
