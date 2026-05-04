type ArticleMetaProps = {
  title: string;
  description: string;
  createDate: number;
  updateDate: number | null;
  keywords: string[];
};

export function ArticleMeta(props: ArticleMetaProps) {
  const { title, description, createDate, updateDate, keywords } = props;
  const ogImage = `https://shramko.dev/api/og?title=${encodeURIComponent(title)}`;

  return (
    <>
      <meta content={description} name="description" key="description" />
      <meta property="og:type" content="article" key="og:type" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:site_name"
        content="Serhii Shramko"
        key="og:site_name"
      />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:image" content={ogImage} key="og:image" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta name="twitter:image" content={ogImage} key="twitter:image" />
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
    </>
  );
}
