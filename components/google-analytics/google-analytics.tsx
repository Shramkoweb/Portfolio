import Script from 'next/script';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-D29TK8JDQC"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D29TK8JDQC', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
