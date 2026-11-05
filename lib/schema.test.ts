import {
  generateAggregateRatingSchema,
  generateBlogPostingSchema,
  generateBlogPostingSummary,
  generateTechArticleSchema,
  generateTechArticleSummary,
  generateBreadcrumbSchema,
  generateGuideSchema,
  generateHomePageSchema,
  person,
  serializeJsonLd,
} from '@/lib/schema';

const validPost = {
  slug: 'test-post',
  title: 'Test Title',
  heading: 'Test Heading',
  description: 'Test description',
  createDate: new Date('2024-01-15').getTime(),
  updateDate: null,
  keywords: ['test', 'jest'],
  categories: ['JS', 'React'],
};

describe('person', () => {
  it('describes the author fully, without private contact details', () => {
    expect(person).toEqual(
      expect.objectContaining({
        '@type': 'Person',
        '@id': 'https://shramko.dev/#person',
        url: 'https://shramko.dev/about',
        jobTitle: 'Senior Software Engineer',
      }),
    );
    expect(person.image.url).toBe(
      'https://shramko.dev/static/images/about.jpeg',
    );
    expect(person.worksFor.name).toBe('BetterMe');
    expect(person.sameAs).toContain('https://github.com/shramkoweb');
    expect(person).not.toHaveProperty('email');
    expect(person).not.toHaveProperty('workLocation');
  });
});

describe('generateBlogPostingSchema', () => {
  it('should generate valid BlogPosting schema', () => {
    const schema = generateBlogPostingSchema(validPost);

    expect(schema['@type']).toBe('BlogPosting');
    expect(schema['@id']).toBe('https://shramko.dev/blog/test-post/#article');
    expect(schema.headline).toBe('Test Heading');
    expect(schema.datePublished).toBe('2024-01-15T00:00:00.000Z');
    expect(schema.url).toBe('https://shramko.dev/blog/test-post');
    expect(schema.keywords).toEqual(['test', 'jest']);
    expect(schema.articleSection).toBe('JavaScript');
    expect(schema.image).toEqual({
      '@type': 'ImageObject',
      url: 'https://shramko.dev/og?title=Test%20Heading',
      width: 1200,
      height: 630,
    });
  });

  it('uses the full shared Person as author and publisher', () => {
    const schema = generateBlogPostingSchema(validPost);

    expect(schema.author).toBe(person);
    expect(schema.publisher).toBe(person);
  });

  it('names multi-word categories for humans', () => {
    const schema = generateBlogPostingSchema({
      ...validPost,
      categories: ['Advanced-React', 'JS'],
    });

    expect(schema.articleSection).toBe('Advanced React');
  });

  it('should include dateModified when updateDate provided', () => {
    const post = {
      ...validPost,
      updateDate: new Date('2024-06-01').getTime(),
    };
    const schema = generateBlogPostingSchema(post);

    expect(schema.dateModified).toBe('2024-06-01T00:00:00.000Z');
  });

  it('should not include dateModified when updateDate is null', () => {
    const schema = generateBlogPostingSchema(validPost);

    expect(schema).not.toHaveProperty('dateModified');
  });

  it('should throw on invalid createDate', () => {
    const post = { ...validPost, createDate: NaN };

    expect(() => generateBlogPostingSchema(post)).toThrow(
      'Invalid createDate for blog post "test-post"',
    );
  });

  it('should default articleSection to "Technology" when no categories', () => {
    const post = { ...validPost, categories: undefined };
    const schema = generateBlogPostingSchema(post);

    expect(schema.articleSection).toBe('Technology');
  });
});

describe('generateBlogPostingSummary', () => {
  it('shares the detail page @id and references the Person', () => {
    const summary = generateBlogPostingSummary(validPost);

    expect(summary['@id']).toBe(generateBlogPostingSchema(validPost)['@id']);
    expect(summary.datePublished).toBe('2024-01-15T00:00:00.000Z');
    expect(summary.articleSection).toBe('JavaScript');
    expect(summary.author).toEqual({ '@id': 'https://shramko.dev/#person' });
    expect(summary).not.toHaveProperty('@context');
  });
});

describe('generateTechArticleSchema', () => {
  const validSnippet = {
    slug: 'test-snippet',
    title: 'Snippet Title',
    heading: 'Snippet Heading',
    description: 'Snippet desc',
    createDate: new Date('2024-03-01').getTime(),
    updateDate: null,
    keywords: ['snippet'],
  };

  it('should generate valid TechArticle schema', () => {
    const schema = generateTechArticleSchema(validSnippet);

    expect(schema['@type']).toBe('TechArticle');
    expect(schema['@id']).toBe(
      'https://shramko.dev/snippets/test-snippet/#article',
    );
    expect(schema.url).toBe('https://shramko.dev/snippets/test-snippet');
    expect(schema.author).toBe(person);
    expect(schema.publisher).toBe(person);
    expect(schema.image.url).toBe(
      'https://shramko.dev/og?title=Snippet%20Heading',
    );
  });

  it('omits fields the frontmatter cannot back', () => {
    const schema = generateTechArticleSchema(validSnippet);

    expect(schema).not.toHaveProperty('proficiencyLevel');
    expect(schema).not.toHaveProperty('about');
  });

  it('summary shares the detail page @id and datePublished', () => {
    const summary = generateTechArticleSummary(validSnippet);

    expect(summary['@id']).toBe(generateTechArticleSchema(validSnippet)['@id']);
    expect(summary.datePublished).toBe('2024-03-01T00:00:00.000Z');
    expect(summary.author).toEqual({ '@id': 'https://shramko.dev/#person' });
  });

  it('should include dateModified when updateDate provided', () => {
    const snippet = {
      ...validSnippet,
      updateDate: new Date('2024-05-10').getTime(),
    };
    const schema = generateTechArticleSchema(snippet);

    expect(schema.dateModified).toBe('2024-05-10T00:00:00.000Z');
  });

  it('should not include dateModified when updateDate is null', () => {
    const schema = generateTechArticleSchema(validSnippet);

    expect(schema).not.toHaveProperty('dateModified');
  });

  it('should throw on invalid createDate', () => {
    const snippet = { ...validSnippet, createDate: NaN };

    expect(() => generateTechArticleSchema(snippet)).toThrow(
      'Invalid createDate for snippet "test-snippet"',
    );
  });
});

describe('generateGuideSchema', () => {
  const guide = {
    path: '/quizlet-list/to/anki',
    heading: 'Import a Word List into Anki',
    description: 'Guide desc',
    createDate: new Date('2026-10-16').getTime(),
    keywords: ['anki import'],
  };

  it('describes the guide as a TechArticle at its own URL', () => {
    const schema = generateGuideSchema(guide);

    expect(schema['@type']).toBe('TechArticle');
    expect(schema['@id']).toBe(
      'https://shramko.dev/quizlet-list/to/anki/#article',
    );
    expect(schema.url).toBe('https://shramko.dev/quizlet-list/to/anki');
    expect(schema.mainEntityOfPage['@id']).toBe(schema.url);
    expect(schema.datePublished).toBe('2026-10-16T00:00:00.000Z');
    expect(schema.keywords).toEqual(['anki import']);
    expect(schema.image.url).toBe(
      'https://shramko.dev/og?title=Import%20a%20Word%20List%20into%20Anki',
    );
    expect(schema.author).toBe(person);
  });

  it('throws on an invalid createDate', () => {
    expect(() => generateGuideSchema({ ...guide, createDate: NaN })).toThrow(
      'Invalid createDate for guide "/quizlet-list/to/anki"',
    );
  });
});

describe('generateBreadcrumbSchema', () => {
  it('should generate indexed list items starting at 1', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://shramko.dev' },
      { name: 'Blog', url: 'https://shramko.dev/blog' },
    ]);

    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[0].name).toBe('Home');
  });

  it('should handle single item', () => {
    const schema = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://shramko.dev' },
    ]);

    expect(schema.itemListElement).toHaveLength(1);
  });
});

describe('generateHomePageSchema', () => {
  it('puts the full Person and a WebSite published by it in one graph', () => {
    const schema = generateHomePageSchema();
    const [author, website] = schema['@graph'];

    expect(author).toBe(person);
    expect(website['@type']).toBe('WebSite');
    expect(website.url).toBe('https://shramko.dev');
    expect(website).toHaveProperty('publisher', {
      '@id': 'https://shramko.dev/#person',
    });
  });
});

describe('generateAggregateRatingSchema', () => {
  it("meets Google's required AggregateRating fields on a 1-5 scale", () => {
    const schema = generateAggregateRatingSchema({
      ratingValue: 4.7,
      ratingCount: 6,
      users: '184',
      storeUrl: 'https://chromewebstore.google.com/detail/example',
    });

    expect(schema).toEqual({
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: 6,
      bestRating: '5',
      worstRating: '1',
    });
  });

  it('keeps one decimal so it matches the visible score', () => {
    const schema = generateAggregateRatingSchema({
      ratingValue: 5,
      ratingCount: 13,
      users: '1,000',
      storeUrl: 'https://chromewebstore.google.com/detail/example',
    });

    expect(schema.ratingValue).toBe('5.0');
  });
});

describe('serializeJsonLd', () => {
  it('should escape "<" so a "</script>" payload cannot break out', () => {
    const output = serializeJsonLd({
      headline: '</script><img src=x onerror=alert(1)>',
    });

    expect(output).not.toContain('<');
    expect(output).toContain('\\u003c');
  });

  it('should escape "<" in the "<!--" breakout sequence too', () => {
    const output = serializeJsonLd({ description: '<!--' });

    expect(output).not.toContain('<');
  });

  it('should round-trip back to the original object', () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Comparing a < b in <script> tags',
      keywords: ['a<b', 'c>d', 'e&f'],
      nested: { deep: { value: '</script>' } },
      count: 42,
      flag: true,
      empty: null,
    };

    expect(JSON.parse(serializeJsonLd(schema))).toEqual(schema);
  });

  it('should decode the escape back to a literal "<"', () => {
    const headline = '</script><img>';

    expect(JSON.parse(serializeJsonLd({ headline })).headline).toBe(headline);
  });

  it('should not throw on undefined', () => {
    expect(() => serializeJsonLd(undefined)).not.toThrow();
    expect(serializeJsonLd(undefined)).toBe('null');
  });

  it('should not throw on values JSON.stringify drops', () => {
    expect(() => serializeJsonLd(() => {})).not.toThrow();
    expect(() => serializeJsonLd(Symbol('x'))).not.toThrow();
  });

  it('should serialize real schema output without a literal "<"', () => {
    expect(serializeJsonLd(generateHomePageSchema())).not.toContain('<');
  });
});
