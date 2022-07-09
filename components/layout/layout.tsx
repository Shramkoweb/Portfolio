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
        <meta name="robots" content="follow, index" />
        <meta content={DESCRIPTION} name="description" />
        <meta property="og:url" content={`https://shramko.dev${ROUTER_PATH}`} />
        <link rel="canonical" href={`https://shramko.dev${ROUTER_PATH}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Serhii Shramko" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:image" content={IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* TODO check twitter:site */}
        <meta name="twitter:site" content="@shramkoweb" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE} />
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
