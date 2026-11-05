/**
 * @jest-environment node
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIRECTORIES = ['_posts', '_snippets'];

const OPENING_FENCE = /^[ \t]*(`{3,}(?=[^`]*$)|~{3,})/;
const CLOSING_FENCE = /^[ \t]*(`{3,}|~{3,})[ \t]*$/;
const INLINE_CODE = /(`+)[^\n]*?[^`\n]\1(?!`)/g;
const EXPRESSION_ATTRIBUTE =
  /<[A-Za-z][\w.:-]*(?:\s+[\w:.-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'))?)*\s+([\w:.-]+)\s*=\s*\{/g;

function blankCode(markdown: string): string {
  let fence = '';
  return markdown
    .split(/\r?\n/)
    .map((line) => {
      if (fence) {
        const closing = CLOSING_FENCE.exec(line)?.[1];
        if (closing?.[0] === fence[0] && closing.length >= fence.length) {
          fence = '';
        }
        return '';
      }
      const opening = OPENING_FENCE.exec(line)?.[1];
      if (opening) {
        fence = opening;
        return '';
      }
      return line.replace(INLINE_CODE, '');
    })
    .join('\n');
}

function findExpressionAttributes(markdown: string): string[] {
  const prose = blankCode(markdown);
  return [...prose.matchAll(EXPRESSION_ATTRIBUTE)].map((match) => {
    const line = prose.slice(0, match.index).split('\n').length;
    return `${line}: ${match[1]}`;
  });
}

function contentFiles(): string[] {
  return CONTENT_DIRECTORIES.flatMap((directory) =>
    readdirSync(directory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => join(directory, file)),
  );
}

describe('MDX attributes survive the blockJS filter of next-mdx-remote', () => {
  it('flags expression values, which serialize() drops silently', () => {
    expect(
      findExpressionAttributes(
        [
          '<Image src="cover.png" priority={true} inverted />',
          '',
          '<Image',
          '  src="meme.jpeg"',
          '  width={400}',
          '/>',
          '<video src="/static/videos/a.mp4" style={{ width: 100 }} />',
        ].join('\n'),
      ),
    ).toEqual(['1: priority', '3: width', '7: style']);
  });

  it('accepts bare and string attributes, and code samples', () => {
    expect(
      findExpressionAttributes(
        [
          '<Image src="cover.png" alt="a > b" priority inverted />',
          '<video src="/a.mp4" width="480" autoPlay muted />',
          'Pass `<Image priority={true} />` and it is ignored.',
          '```jsx',
          '<Image src={hero} />',
          '```',
          '  ~~~~',
          '  <GridRow columns={6} />',
          '  ~~~~',
        ].join('\n'),
      ),
    ).toEqual([]);
  });

  it('keeps scanning after CRLF fences and inline triple-backtick code', () => {
    expect(
      findExpressionAttributes(
        [
          '```js',
          'const a = 1;',
          '```',
          '<Image src="a.png" priority={true} />',
          '```inline``` is prose, not a fence',
          '<Image src="b.png" width={400} />',
        ].join('\r\n'),
      ),
    ).toEqual(['4: priority', '6: width']);
  });

  it('finds none in posts and snippets', () => {
    const offenders = contentFiles().flatMap((file) =>
      findExpressionAttributes(readFileSync(file, 'utf8')).map(
        (found) => `${file}:${found}`,
      ),
    );

    expect(offenders).toEqual([]);
  });
});
