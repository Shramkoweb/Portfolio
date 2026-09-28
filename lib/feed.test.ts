import {
  escapeCData,
  escapeXml,
  generateRss,
  generateRssItem,
} from '@/lib/feed';
import { PostCategory, PostMetadata } from '@/lib/types';

const mockPost: PostMetadata = {
  data: {
    heading: 'Test Post',
    slug: 'test-post',
    title: 'Test Post Title',
    description: 'A test post description',
    createDate: 1625097600000, // 2021-07-01
    updateDate: null,
    featured: false,
    categories: [PostCategory.JS, PostCategory.React],
    readTime: '5 min read',
    keywords: ['test', 'post'],
  },
};

const mockPostWithUpdate: PostMetadata = {
  data: {
    heading: 'Updated Post',
    slug: 'updated-post',
    title: 'Updated Post Title',
    description: 'An updated post',
    createDate: 1625097600000, // 2021-07-01
    updateDate: 1630454400000, // 2021-09-01
    featured: false,
    categories: [PostCategory.TS],
    readTime: '3 min read',
    keywords: ['updated'],
  },
};

describe('Feed Utils', () => {
  describe('escapeXml', () => {
    it('should escape ampersands', () => {
      expect(escapeXml('foo & bar')).toBe('foo &amp; bar');
    });

    it('should escape angle brackets', () => {
      expect(escapeXml('<div>')).toBe('&lt;div&gt;');
    });

    it('should escape quotes and apostrophes', () => {
      expect(escapeXml('"hello" \'world\'')).toBe(
        '&quot;hello&quot; &apos;world&apos;',
      );
    });

    it('should escape all special chars in one string', () => {
      expect(escapeXml('<a href="url">&\'test\'')).toBe(
        '&lt;a href=&quot;url&quot;&gt;&amp;&apos;test&apos;',
      );
    });

    it('should return empty string unchanged', () => {
      expect(escapeXml('')).toBe('');
    });

    it('should return string with no special chars unchanged', () => {
      expect(escapeXml('hello world')).toBe('hello world');
    });
  });

  describe('escapeCData', () => {
    it('should pass through normal text unchanged', () => {
      expect(escapeCData('hello world')).toBe('hello world');
    });

    it('should escape ]]> sequence', () => {
      expect(escapeCData('foo]]>bar')).toBe('foo]]]]><![CDATA[>bar');
    });

    it('should handle multiple ]]> sequences', () => {
      expect(escapeCData('a]]>b]]>c')).toBe(
        'a]]]]><![CDATA[>b]]]]><![CDATA[>c',
      );
    });

    it('should return empty string unchanged', () => {
      expect(escapeCData('')).toBe('');
    });
  });

  describe('generateRssItem', () => {
    it('should include title in CDATA', () => {
      const item = generateRssItem(mockPost);
      expect(item).toContain('<title><![CDATA[Test Post]]></title>');
    });

    it('should include correct link and guid', () => {
      const item = generateRssItem(mockPost);
      expect(item).toContain('<link>https://shramko.dev/blog/test-post</link>');
      expect(item).toContain(
        '<guid isPermaLink="true">https://shramko.dev/blog/test-post</guid>',
      );
    });

    it('should include description in CDATA', () => {
      const item = generateRssItem(mockPost);
      expect(item).toContain(
        '<description><![CDATA[A test post description]]></description>',
      );
    });

    it('should use createDate as pubDate when updateDate is null', () => {
      const item = generateRssItem(mockPost);
      const expectedDate = new Date(1625097600000).toUTCString();
      expect(item).toContain(`<pubDate>${expectedDate}</pubDate>`);
    });

    it('keeps the original publication date when a post is updated', () => {
      const item = generateRssItem(mockPostWithUpdate);
      const expectedDate = new Date(
        mockPostWithUpdate.data.createDate,
      ).toUTCString();
      expect(item).toContain(`<pubDate>${expectedDate}</pubDate>`);
    });

    it('should include category elements for each post category', () => {
      const item = generateRssItem(mockPost);
      expect(item).toContain('<category>js</category>');
      expect(item).toContain('<category>react</category>');
    });

    it('should escape special chars in slug', () => {
      const post: PostMetadata = {
        data: {
          ...mockPost.data,
          slug: 'test&post',
        },
      };
      const item = generateRssItem(post);
      expect(item).toContain('https://shramko.dev/blog/test&amp;post');
    });

    it('should escape CDATA in title and description', () => {
      const post: PostMetadata = {
        data: {
          ...mockPost.data,
          heading: 'Test]]>Post',
          description: 'Desc]]>ription',
        },
      };
      const item = generateRssItem(post);
      expect(item).toContain(
        '<title><![CDATA[Test]]]]><![CDATA[>Post]]></title>',
      );
      expect(item).toContain(
        '<description><![CDATA[Desc]]]]><![CDATA[>ription]]></description>',
      );
    });
  });

  describe('generateRss', () => {
    const lastBuildDate = 'Thu, 01 Jul 2021 00:00:00 GMT';

    it('should produce valid XML declaration', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    });

    it('should include rss tag with atom namespace', () => {
      const rss = generateRss([], lastBuildDate);
      const xml = new DOMParser().parseFromString(rss, 'application/xml');
      expect(xml.querySelector('parsererror')).toBeNull();
      expect(xml.documentElement.lookupNamespaceURI('atom')).toBe(
        'http://www.w3.org/2005/Atom',
      );
    });

    it('should include channel metadata', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toContain("<title>Serhii Shramko's Blog</title>");
      expect(rss).toContain('<link>https://shramko.dev/blog</link>');
      expect(rss).toContain('<language>en</language>');
    });

    it('should include lastBuildDate', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toContain(`<lastBuildDate>${lastBuildDate}</lastBuildDate>`);
    });

    it('should include generator element', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toContain('<generator>Next.js</generator>');
    });

    it('should include docs element', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toContain(
        '<docs>https://www.rssboard.org/rss-specification</docs>',
      );
    });

    it('should include ttl element', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toContain('<ttl>60</ttl>');
    });

    it('should include atom:link self reference', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toContain(
        '<atom:link href="https://shramko.dev/feed.xml" rel="self" type="application/rss+xml"/>',
      );
    });

    it('should include all post items', () => {
      const rss = generateRss([mockPost, mockPostWithUpdate], lastBuildDate);
      expect(rss).toContain('<title><![CDATA[Test Post]]></title>');
      expect(rss).toContain('<title><![CDATA[Updated Post]]></title>');
    });

    it('should handle empty posts array', () => {
      const rss = generateRss([], lastBuildDate);
      expect(rss).toContain('<channel>');
      expect(rss).toContain('</channel>');
      expect(rss).not.toContain('<item>');
    });

    it('exposes a feed logo and matching thumbnails in valid XML and HTML', () => {
      const post = {
        data: {
          ...mockPost.data,
          heading: 'React & TypeScript: "refs" <state> ]]>',
          description:
            'Read <script>alert("hello")</script> & compare a > b. ]]>',
        },
      };
      const xml = new DOMParser().parseFromString(
        generateRss([post], lastBuildDate),
        'application/xml',
      );
      expect(xml.querySelector('parsererror')).toBeNull();
      expect(xml.querySelector('channel > image > url')?.textContent).toBe(
        'https://shramko.dev/static/favicons/favicon-32x32.png',
      );
      const media = xml.getElementsByTagNameNS(
        'http://search.yahoo.com/mrss/',
        'content',
      )[0];
      const thumbnail = xml.getElementsByTagNameNS(
        'http://search.yahoo.com/mrss/',
        'thumbnail',
      )[0];
      const imageUrl = new URL(media.getAttribute('url')!);
      expect(imageUrl.origin).toBe('https://shramko.dev');
      expect(imageUrl.pathname).toBe('/og');
      expect(imageUrl.searchParams.get('title')).toBe(post.data.heading);
      expect(media.getAttribute('type')).toBe('image/png');
      expect(media.getAttribute('medium')).toBe('image');
      expect(thumbnail.getAttribute('url')).toBe(imageUrl.href);

      const content = xml.getElementsByTagNameNS(
        'http://purl.org/rss/1.0/modules/content/',
        'encoded',
      )[0].textContent!;
      const html = new DOMParser().parseFromString(content, 'text/html');
      expect(html.querySelector('img')?.getAttribute('src')).toBe(
        imageUrl.href,
      );
      expect(html.querySelector('img')?.getAttribute('alt')).toBe(
        post.data.heading,
      );
      expect(html.querySelector('img')?.getAttribute('width')).toBe('1200');
      expect(html.querySelector('img')?.getAttribute('height')).toBe('630');
      expect(html.querySelector('script')).toBeNull();
      expect(html.body.textContent).toBe(post.data.description);
    });
  });
});
