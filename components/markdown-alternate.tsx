import Head from 'next/head';

import { SITE_URL } from '@/lib/constants';

interface MarkdownAlternateProps {
  path: string;
}

export function MarkdownAlternate(props: MarkdownAlternateProps) {
  return (
    <Head>
      <link
        rel="alternate"
        type="text/markdown"
        href={`${SITE_URL}${props.path}.md`}
      />
    </Head>
  );
}
