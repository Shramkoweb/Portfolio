import { SITE_URL } from '@/lib/constants';

export type MarkdownSource = {
  title: string;
  description: string;
  url: string;
  createDate: number;
  updateDate: number | null;
  content: string;
};

const AUTHOR = 'Serhii Shramko';

const FENCED_CODE = /^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm;
const INLINE_CODE = /(`+)[^\n]*?[^`\n]\1(?!`)/g;
const TAG_BODY = `((?:[^>"']|"[^"]*"|'[^']*')*?)`;
const IMAGE = new RegExp(`<Image\\b${TAG_BODY}\\/>`, 'g');
const UPDATE = new RegExp(`<Update\\b${TAG_BODY}>([\\s\\S]*?)<\\/Update>`, 'g');
const VIDEO = new RegExp(
  `<video\\b${TAG_BODY}(?:\\/>|>[\\s\\S]*?<\\/video>)`,
  'g',
);
const ATTRIBUTE = /([\w-]+)=(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/g;
const COMPONENT = /<([A-Z][A-Za-z0-9]*)\b/;
const MASK = '\uE000';
const MASKED_SPAN = new RegExp(`${MASK}(\\d+)${MASK}`, 'g');

function parseAttributes(source: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  for (const [, name, double, single, expression] of source.matchAll(
    ATTRIBUTE,
  )) {
    attributes[name] = double ?? single ?? expression;
  }
  return attributes;
}

function toIsoDay(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function convertImage(source: string): string {
  const { src, alt = '' } = parseAttributes(source);
  if (!src) {
    throw new Error(`<Image> without src: <Image${source}/>`);
  }
  return `![${alt.replace(/[[\]]/g, '\\$&')}](${SITE_URL}/static/images/${src})`;
}

function convertUpdate(source: string, body: string): string {
  const { date } = parseAttributes(source);
  const label = date ? `**Update, ${date}**` : '**Update**';
  const quoted = body
    .trim()
    .split('\n')
    .map((line) => (line.trim() ? `> ${line}` : '>'));
  return [`> ${label}`, '>', ...quoted].join('\n');
}

function convertVideo(source: string): string {
  const {
    src,
    title,
    'aria-label': label = title ?? 'Video',
  } = parseAttributes(source);
  if (!src) {
    throw new Error(`<video> without src: <video${source}>`);
  }
  return `[Video: ${label.replace(/[[\]]/g, '\\$&')}](${src.startsWith('/') ? SITE_URL : ''}${src})`;
}

function convertProse(text: string, url: string): string {
  return text
    .replace(IMAGE, (_, attributes: string) => convertImage(attributes))
    .replace(VIDEO, (_, attributes: string) => convertVideo(attributes))
    .replace(UPDATE, (_, attributes: string, body: string) =>
      convertUpdate(attributes, body),
    )
    .replace(/\]\(\/(?!\/)/g, `](${SITE_URL}/`)
    .replace(/\]\(#/g, `](${url}#`)
    .replace(/\b(src|poster|href)="\/(?!\/)/g, `$1="${SITE_URL}/`);
}

function assertNoComponents(text: string, url: string): void {
  const match = COMPONENT.exec(text);
  if (match) {
    throw new Error(
      `${url}: <${match[1]}> has no Markdown conversion. Handle it in lib/markdown/to-markdown.ts or wrap it in backticks.`,
    );
  }
}

function mapOutsideFences(
  text: string,
  transform: (prose: string) => string,
): string {
  let result = '';
  let cursor = 0;
  for (const match of text.matchAll(FENCED_CODE)) {
    result += transform(text.slice(cursor, match.index)) + match[0];
    cursor = match.index + match[0].length;
  }
  return result + transform(text.slice(cursor));
}

// Masked rather than split out, so an <Update> body can still hold inline code.
function withInlineCodeMasked(
  text: string,
  transform: (masked: string) => string,
): string {
  const spans: string[] = [];
  const masked = text.replace(
    INLINE_CODE,
    (span) => `${MASK}${spans.push(span) - 1}${MASK}`,
  );
  return transform(masked).replace(
    MASKED_SPAN,
    (_, index: string) => spans[Number(index)],
  );
}

function convertBody(content: string, url: string): string {
  return mapOutsideFences(content, (block) =>
    withInlineCodeMasked(block, (prose) => {
      const converted = convertProse(prose, url);
      assertNoComponents(converted, url);
      return converted;
    }),
  );
}

export function toMarkdown(source: MarkdownSource): string {
  const { title, description, url, createDate, updateDate, content } = source;
  const byline = [
    `Source: ${url}`,
    `Author: ${AUTHOR}`,
    `Published: ${toIsoDay(createDate)}`,
    ...(updateDate ? [`Updated: ${toIsoDay(updateDate)}`] : []),
  ].join(' · ');

  return [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    byline,
    '',
    convertBody(content, url).trim(),
    '',
  ].join('\n');
}
