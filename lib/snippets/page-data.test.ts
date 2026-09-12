import { getSnippets } from '@/lib/snippets/api';
import { getSnippetsPageData } from '@/lib/snippets/page-data';
import { Snippet } from '@/lib/types';

jest.mock('@/lib/snippets/api');

const makeSnippet = (slug: string, createDate: number): Snippet => ({
  data: {
    slug,
    title: `${slug} title`,
    heading: `${slug} heading`,
    description: `${slug} description`,
    keywords: [],
    createDate,
    updateDate: null,
  },
  content: '',
});

describe('getSnippetsPageData', () => {
  test('sorts snippets newest-first', async () => {
    (getSnippets as jest.Mock).mockResolvedValue([
      makeSnippet('old', 1),
      makeSnippet('new', 2),
    ]);

    const { snippets } = await getSnippetsPageData();

    expect(snippets.map((s) => s.data.slug)).toEqual(['new', 'old']);
  });

  test('caps JSON-LD hasPart at 25 TechArticle entries with ISO dates', async () => {
    (getSnippets as jest.Mock).mockResolvedValue(
      Array.from({ length: 30 }, (_, i) =>
        makeSnippet(`s${i}`, Date.UTC(2024, 0, 1 + i)),
      ),
    );

    const { jsonLd } = await getSnippetsPageData();

    expect(jsonLd.hasPart).toHaveLength(25);
    expect(jsonLd.hasPart[0]).toEqual(
      expect.objectContaining({
        '@type': 'TechArticle',
        url: 'https://shramko.dev/snippets/s29',
        datePublished: '2024-01-30',
      }),
    );
  });
});
