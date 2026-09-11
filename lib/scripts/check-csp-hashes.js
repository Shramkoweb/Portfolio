// Inline scripts only — this says nothing about runtime eval.

import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

process.env.NODE_ENV = 'production';

const PAGES_DIR = join(process.cwd(), '.next', 'server', 'pages');

const EXECUTABLE_TYPES = new Set([
  'module',
  'text/javascript',
  'application/javascript',
]);

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return files.flat();
}

function sha256(body) {
  return `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`;
}

function inlineScriptHashes(html) {
  const hashes = new Map();
  for (const match of html.matchAll(
    // HTML parses (and ignores) attributes on an end tag, so `</script foo>`
    // still closes the element.
    /<script([^>]*)>([\s\S]*?)<\/script(?:\s[^>]*)?>/gi,
  )) {
    const [, attributes, body] = match;
    if (!body.trim()) continue;

    const type = attributes.match(/type\s*=\s*["']([^"']+)["']/i)?.[1];
    if (type && !EXECUTABLE_TYPES.has(type.toLowerCase())) continue;

    hashes.set(sha256(body), body.length);
  }
  return hashes;
}

async function allowedHashes() {
  const config = (await import('../../next.config.js')).default;
  const headers = (await config.headers())[0].headers;
  const csp = headers.find((h) => h.key === 'Content-Security-Policy').value;
  const scriptSrc = csp.match(/script-src([^;]*)/)?.[1] ?? '';
  return new Set(
    scriptSrc.match(/'sha256-[^']+'/g)?.map((s) => s.slice(1, -1)),
  );
}

const [allowed, files] = await Promise.all([
  allowedHashes(),
  htmlFiles(PAGES_DIR),
]);

if (files.length === 0) {
  console.error('No prerendered HTML found — run `pnpm build` first.');
  process.exit(1);
}

const found = new Map();
for (const file of files) {
  for (const [hash, length] of inlineScriptHashes(
    await readFile(file, 'utf8'),
  )) {
    found.set(hash, { length, file });
  }
}

const missing = [...found].filter(([hash]) => !allowed.has(hash));

if (missing.length > 0) {
  console.error(
    `CSP script-src does not cover ${missing.length} inline script(s) across ${files.length} pages:\n`,
  );
  for (const [hash, { length, file }] of missing) {
    console.error(`  ${hash}  (${length} bytes, e.g. ${file})`);
  }
  console.error(
    '\nUpdate script-src in next.config.js, or drop the inline script.',
  );
  process.exit(1);
}

console.log(
  `CSP script-src covers all ${found.size} inline script(s) across ${files.length} pages.`,
);
