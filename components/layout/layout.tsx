import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const DESCRIPTION =
  'Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js. Practical tutorials, code snippets, and tips for web developers.';
const TITLE = 'Serhii Shramko – Developer, writer, creator.';
const IMAGE = 'https://shramko.dev/static/images/twittersite.png';

export function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const currentPath = router.asPath.split('?')[0];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{TITLE}</title>
        <meta
          name="viewport"
          content="width=device-width , initial-scale=1.0"
        />
        <meta name="robots" content="follow, index" />
        <meta content={DESCRIPTION} name="description" key="description" />
        <meta
          property="og:url"
          content={`https://shramko.dev${currentPath}`}
          key="og:url"
        />
        <link
          rel="canonical"
          key="canonical"
          href={`https://shramko.dev${currentPath}`}
        />
        <meta property="og:type" content="website" key="og:type" />
        <meta
          property="og:site_name"
          content="Serhii Shramko"
          key="og:site_name"
        />
        <meta
          property="og:description"
          content={DESCRIPTION}
          key="og:description"
        />
        <meta property="og:title" content={TITLE} key="og:title" />
        <meta property="og:image" content={IMAGE} key="og:image" />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="630" key="og:image:height" />
        <meta property="og:locale" content="en_US" key="og:locale" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content="@shramkoweb"
          key="twitter:creator"
        />
        <meta name="twitter:site" content="@shramkoweb" key="twitter:site" />
        <meta name="twitter:title" content={TITLE} key="twitter:title" />
        <meta
          name="twitter:description"
          content={DESCRIPTION}
          key="twitter:description"
        />
        <meta name="twitter:image" content={IMAGE} key="twitter:image" />
      </Head>
      <Header />
      <main
        id="skip"
        className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-900"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
