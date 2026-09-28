import Head from 'next/head';

import { PageMeta } from '@/components/page-meta';
import { getSocialImage } from '@/lib/seo';

interface ArticleMetaProps {
  title: string;
  heading: string;
  description: string;
  createDate: number;
  updateDate: number | null;
  keywords: string[];
}

export function ArticleMeta(props: ArticleMetaProps) {
  const { title, heading, description, createDate, updateDate, keywords } =
    props;

  return (
    <>
      <PageMeta
        title={title}
        description={description}
        type="article"
        image={getSocialImage(heading)}
      />
      <Head>
        <meta
          property="article:published_time"
          content={new Date(createDate).toISOString()}
          key="article:published_time"
        />
        {updateDate && (
          <meta
            property="article:modified_time"
            content={new Date(updateDate).toISOString()}
            key="article:modified_time"
          />
        )}
        <meta name="keywords" key="keywords" content={keywords.join(', ')} />
        <meta
          property="article:section"
          content="Technology"
          key="article:section"
        />
        <meta
          property="article:author"
          content="https://shramko.dev"
          key="article:author"
        />
      </Head>
    </>
  );
}
