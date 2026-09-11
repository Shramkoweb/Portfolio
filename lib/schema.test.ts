import {
  generateBlogPostingSchema,
  generateTechArticleSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
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
  categories: ['js', 'react'],
};

describe('generateBlogPostingSchema', () => {
  it('should generate valid BlogPosting schema', () => {
    const schema = generateBlogPostingSchema(validPost);

    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe('Test Heading');
    expect(schema.datePublished).toBe('2024-01-15T00:00:00.000Z');
    expect(schema.url).toBe('https://shramko.dev/blog/test-post');
    expect(schema.keywords).toEqual(['test', 'jest']);
    expect(schema.articleSection).toBe('js');
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
    expect(schema.url).toBe('https://shramko.dev/snippets/test-snippet');
    expect(schema.proficiencyLevel).toBe('Beginner');
    expect(schema.about.programmingLanguage).toBe('JavaScript');
  });

  it('should use provided proficiencyLevel', () => {
    const schema = generateTechArticleSchema(validSnippet, 'Expert');

    expect(schema.proficiencyLevel).toBe('Expert');
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

  it('should use provided programmingLanguage', () => {
    const snippet = { ...validSnippet, programmingLanguage: 'TypeScript' };
    const schema = generateTechArticleSchema(snippet);

    expect(schema.about.programmingLanguage).toBe('TypeScript');
  });

  it('should throw on invalid createDate', () => {
    const snippet = { ...validSnippet, createDate: NaN };

    expect(() => generateTechArticleSchema(snippet)).toThrow(
      'Invalid createDate for snippet "test-snippet"',
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

describe('generateWebSiteSchema', () => {
  it('should return static website schema', () => {
    const schema = generateWebSiteSchema();

    expect(schema['@type']).toBe('WebSite');
    expect(schema.url).toBe('https://shramko.dev');
    expect(schema.author.name).toBe('Serhii Shramko');
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
    expect(serializeJsonLd(generateWebSiteSchema())).not.toContain('<');
  });
});
