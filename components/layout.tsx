import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header';
import { PageMeta } from '@/components/page-meta';
import { SITE_IMAGE } from '@/lib/seo';
import { useStarfieldEnabled } from '@/lib/starfield-preference';
import { useMediaQuery } from '@/lib/use-media-query';

const Starfield = dynamic(
  () => import('@/components/starfield').then((m) => m.Starfield),
  { ssr: false },
);

const DESCRIPTION =
  'Senior Software Engineer sharing guides on JavaScript, TypeScript, React, and Next.js. Practical tutorials, code snippets, and tips for web developers.';
const TITLE = 'Serhii Shramko – Developer, writer, creator.';

export function Layout(props: PropsWithChildren) {
  const { children } = props;
  const router = useRouter();
  const currentPath = router.asPath.split(/[?#]/)[0];
  const starfieldEnabled = useStarfieldEnabled();
  // Separate queries: a browser without forced-colors would fail a combined one.
  const wide = useMediaQuery('(min-width: 1024px)');
  const forcedColors = useMediaQuery('(forced-colors: active)');
  const starfield = starfieldEnabled && wide && !forcedColors;

  return (
    <div>
      {starfield && <Starfield />}
      <PageMeta title={TITLE} description={DESCRIPTION} image={SITE_IMAGE} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width , initial-scale=1.0"
        />
        <meta name="robots" content="follow, index" key="robots" />
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
        <meta
          property="og:site_name"
          content="Serhii Shramko"
          key="og:site_name"
        />
        <meta property="og:locale" content="en_US" key="og:locale" />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        <meta
          name="twitter:creator"
          content="@shramkoweb"
          key="twitter:creator"
        />
        <meta name="twitter:site" content="@shramkoweb" key="twitter:site" />
      </Head>
      <Header />
      <main id="skip" className="flex flex-col justify-center px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
