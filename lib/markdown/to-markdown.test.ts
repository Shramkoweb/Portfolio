import { toMarkdown, type MarkdownSource } from './to-markdown';

const url = 'https://shramko.dev/blog/sample';

function convert(content: string, overrides: Partial<MarkdownSource> = {}) {
  return toMarkdown({
    title: 'Sample Post',
    description: 'A sample description.',
    url,
    createDate: Date.parse('2026-09-26T12:00:00.000Z'),
    updateDate: null,
    content,
    ...overrides,
  });
}

function body(content: string) {
  return convert(content).split('\n').slice(6).join('\n').trim();
}

describe('toMarkdown', () => {
  it('starts with the title, description and a byline', () => {
    expect(convert('Hello.')).toBe(
      [
        '# Sample Post',
        '',
        '> A sample description.',
        '',
        `Source: ${url} · Author: Serhii Shramko · Published: 2026-09-26`,
        '',
        'Hello.',
        '',
      ].join('\n'),
    );
  });

  it('adds the update date when there is one', () => {
    expect(
      convert('x', { updateDate: Date.parse('2026-10-01') }).split('\n')[4],
    ).toBe(
      `Source: ${url} · Author: Serhii Shramko · Published: 2026-09-26 · Updated: 2026-10-01`,
    );
  });

  it.each([
    ['<Image src="a.png" alt="A diagram" inverted />'],
    ['<Image alt="A diagram" src="a.png" priority={true} />'],
    ['<Image\n  src="a.png"\n  alt="A diagram"\n  inverted\n/>'],
  ])('turns %j into a Markdown image', (image) => {
    expect(body(image)).toBe(
      '![A diagram](https://shramko.dev/static/images/a.png)',
    );
  });

  it('escapes brackets and keeps > inside image alt text', () => {
    expect(body('<Image src="a.png" alt="x => [y]" />')).toBe(
      '![x => \\[y\\]](https://shramko.dev/static/images/a.png)',
    );
  });

  it('rejects an image without src', () => {
    expect(() => body('<Image alt="lost" />')).toThrow('without src');
  });

  it('turns an update note into a dated blockquote, keeping inline code', () => {
    expect(
      body(
        '<Update date="2026-09-26">\nFixed `useRef`.\n\nSee [below](#fix).\n</Update>',
      ),
    ).toBe(
      [
        '> **Update, 2026-09-26**',
        '>',
        '> Fixed `useRef`.',
        '>',
        `> See [below](${url}#fix).`,
      ].join('\n'),
    );
  });

  it('makes root-relative links, anchors and media sources absolute', () => {
    expect(
      body(
        '[a](/blog/x) [b](#part) [c](https://x.dev/) [d](//cdn.dev/y)\n<img src="/static/images/p.gif" alt="Demo"/>',
      ),
    ).toBe(
      `[a](https://shramko.dev/blog/x) [b](${url}#part) [c](https://x.dev/) [d](//cdn.dev/y)\n<img src="https://shramko.dev/static/images/p.gif" alt="Demo"/>`,
    );
  });

  it.each([
    [
      '<video\n  src="/static/videos/v.mp4"\n  autoPlay\n  aria-label="Graph [view] drawing itself"\n  className="w-full"\n></video>',
      '[Video: Graph \\[view\\] drawing itself](https://shramko.dev/static/videos/v.mp4)',
    ],
    [
      '<video src="https://cdn.dev/v.mp4" title="Clip" />',
      '[Video: Clip](https://cdn.dev/v.mp4)',
    ],
    [
      '<video src="/v.mp4"></video>',
      '[Video: Video](https://shramko.dev/v.mp4)',
    ],
  ])('turns a video into a labelled link', (video, link) => {
    expect(body(video)).toBe(link);
  });

  it('rejects a video without src', () => {
    expect(() => body('<video autoPlay></video>')).toThrow('without src');
  });

  it('leaves fenced and inline code untouched', () => {
    const code = [
      '```tsx',
      '<Image src="a.png" alt="code" />',
      '<Dashboard>[link](/x)</Dashboard>',
      '```',
      '',
      '~~~html',
      '<!-- comment -->',
      '~~~',
      '',
      '- item',
      '',
      '  ```ts',
      '  type Box<T> = { value: T };',
      '  ```',
      '',
      'Use `<Image src="b.png" />` or `Array<T>`.',
    ].join('\n');

    expect(body(code)).toBe(code);
  });

  it('fails on a component it cannot convert, naming the page', () => {
    expect(() => body('Text\n\n<Callout>Hi</Callout>')).toThrow(
      `${url}: <Callout> has no Markdown conversion`,
    );
  });
});
