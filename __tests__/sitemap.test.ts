import sitemap from '@/app/sitemap';
import { getPostsCategories, getPostsMetadata } from '@/lib/posts/api';
import { getSnippets } from '@/lib/snippets/api';

jest.mock('@/lib/posts/api');
jest.mock('@/lib/snippets/api');

describe('app/sitemap', () => {
  it('combines posts, snippets and categories from the data layer', async () => {
    (getPostsMetadata as jest.Mock).mockResolvedValue([
      { data: { slug: 'p', createDate: 1, updateDate: null } },
    ]);
    (getSnippets as jest.Mock).mockResolvedValue([
      { data: { slug: 's', createDate: 2, updateDate: null } },
    ]);
    (getPostsCategories as jest.Mock).mockResolvedValue(['JS']);

    const urls = (await sitemap()).map((e) => e.url);

    expect(urls).toEqual(
      expect.arrayContaining([
        'https://shramko.dev/',
        'https://shramko.dev/blog/p',
        'https://shramko.dev/snippets/s',
        'https://shramko.dev/blog/category/js',
      ]),
    );
  });
});
