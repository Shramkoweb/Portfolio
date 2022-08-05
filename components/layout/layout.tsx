import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const DESCRIPTION = 'Front-end developer, JavaScript enthusiast and mentor.';
const TITLE = 'Serhii Shramko – Developer, writer, creator.';
const IMAGE = 'https://shramko.dev/static/images/twittersite.png';

export function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const ROUTER_PATH = router.asPath;

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{TITLE}</title>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="robots" content="follow, index" />
        <meta content={DESCRIPTION} name="description" key="description" />
        <meta property="og:url" content={`https://shramko.dev${ROUTER_PATH}`} key="og:url" />
        <link rel="canonical" href={`https://shramko.dev${ROUTER_PATH}`} />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:site_name" content="Serhii Shramko" key="og:site_name" />
        <meta property="og:description" content={DESCRIPTION} key="og:description" />
        <meta property="og:title" content={TITLE} key="og:title" />
        <meta property="og:image" content={IMAGE} key="og:image" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@shramkoweb" key="twitter:creator" />
        <meta name="twitter:site" content="@shramkoweb" key="twitter:site" />
        <meta name="twitter:title" content={TITLE} key="twitter:title" />
        <meta name="twitter:description" content={DESCRIPTION} key="twitter:description" />
        <meta name="twitter:image" content={IMAGE} key="twitter:image" />
      </Head>
      <Header />
      <main
        id="skip"
        className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
