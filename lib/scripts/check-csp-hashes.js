// Verifies that every executable inline <script> in the production build is
// covered by a hash in the script-src directive of next.config.js.
//
// The CSP pins the bytes of the one inline script we ship (the next-themes
// pre-hydration theme setter). A next-themes upgrade, a ThemeProvider prop
// change, or a newly introduced inline script all break that pin — and they
// break it silently at runtime, not at build time. This check turns that into
// a CI failure instead of a theme flash in production.

import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// next.config.js picks its script-src by NODE_ENV; we always check production.
process.env.NODE_ENV = 'production';

const PAGES_DIR = join(process.cwd(), '.next', 'server', 'pages');

// A <script> runs unless its type says otherwise (ld+json, json, importmap…).
const EXECUTABLE_TYPES = new Set([
  'module',
  'text/javascript',
  'application/javascript',
]);

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
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
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attributes, body] = match;
    if (!body.trim()) continue;

    const type = attributes.match(/type\s*=\s*["']([^"']+)["']/)?.[1];
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
