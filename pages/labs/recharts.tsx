import Head from 'next/head';

import { RechartsPocPage } from '@/components/recharts-poc';

export default function RechartsLabPage() {
  return (
    <>
      <Head>
        <title>Recharts POC | Serhii Shramko</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="description"
          content="Internal sandbox: Recharts validation POC. Not intended for public consumption."
        />
      </Head>
      <RechartsPocPage />
    </>
  );
}
