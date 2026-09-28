const mockGetPostSlugs = jest.fn();
const mockGetSnippetSlugs = jest.fn();

jest.mock('@/lib/posts/api', () => ({
  getPostSlugs: () => mockGetPostSlugs(),
}));
jest.mock('@/lib/snippets/api', () => ({
  getSnippetSlugs: () => mockGetSnippetSlugs(),
}));

function loadIsKnownSlug(): typeof import('@/lib/valid-slugs').isKnownSlug {
  let isKnownSlug!: typeof import('@/lib/valid-slugs').isKnownSlug;
  jest.isolateModules(() => {
    ({ isKnownSlug } = require('@/lib/valid-slugs'));
  });
  return isKnownSlug;
}

describe('isKnownSlug', () => {
  beforeEach(() => {
    mockGetPostSlugs.mockResolvedValue(['introducing-the-new-shramko.dev']);
    mockGetSnippetSlugs.mockResolvedValue(['debounce']);
  });

  it('accepts post, snippet and synthetic page slugs', async () => {
    const isKnownSlug = loadIsKnownSlug();

    await expect(isKnownSlug('introducing-the-new-shramko.dev')).resolves.toBe(
      true,
    );
    await expect(isKnownSlug('debounce')).resolves.toBe(true);
    await expect(isKnownSlug('quizlet-page')).resolves.toBe(true);
    await expect(isKnownSlug('udemy-reset-progress-page')).resolves.toBe(true);
  });

  it('rejects slugs that are not on disk', async () => {
    const isKnownSlug = loadIsKnownSlug();

    await expect(isKnownSlug('introducing-the-new-shramko')).resolves.toBe(
      false,
    );
  });

  it.each([
    ['an array', ['debounce']],
    ['undefined', undefined],
    ['an empty string', ''],
    ['a number', 1],
    ['an over-long string', 'a'.repeat(129)],
  ])('rejects %s without touching the filesystem', async (_, slug) => {
    const isKnownSlug = loadIsKnownSlug();

    await expect(isKnownSlug(slug)).resolves.toBe(false);
    expect(mockGetPostSlugs).not.toHaveBeenCalled();
  });

  it('reads the directories once and reuses the result', async () => {
    const isKnownSlug = loadIsKnownSlug();

    await Promise.all([isKnownSlug('debounce'), isKnownSlug('debounce')]);
    await isKnownSlug('quizlet-page');

    expect(mockGetPostSlugs).toHaveBeenCalledTimes(1);
    expect(mockGetSnippetSlugs).toHaveBeenCalledTimes(1);
  });

  it('does not cache a failed read, so the next call retries', async () => {
    const isKnownSlug = loadIsKnownSlug();
    mockGetPostSlugs.mockRejectedValueOnce(new Error('EMFILE'));

    await expect(isKnownSlug('debounce')).rejects.toThrow('EMFILE');
    await expect(isKnownSlug('debounce')).resolves.toBe(true);
    expect(mockGetPostSlugs).toHaveBeenCalledTimes(2);
  });
});

describe('slug namespace on disk', () => {
  it('gives every post, snippet and synthetic page its own counter', async () => {
    const { getPostSlugs } = jest.requireActual('@/lib/posts/api');
    const { getSnippetSlugs } = jest.requireActual('@/lib/snippets/api');
    const { SYNTHETIC_SLUGS } = jest.requireActual('@/lib/valid-slugs');
    const slugs: string[] = [
      ...(await getPostSlugs()),
      ...(await getSnippetSlugs()),
      ...SYNTHETIC_SLUGS,
    ];

    const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);

    expect(duplicates).toEqual([]);
  });
});
