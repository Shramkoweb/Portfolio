import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const env = {
  ...process.env,
  TZ: 'UTC',
  VISUAL_TEST: '1',
  NEXT_TELEMETRY_DISABLED: '1',
  NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --require ${JSON.stringify(resolve('tests/visual/fixed-date.cjs'))}`,
};

let child;
let stopping = false;
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    stopping = true;
    child?.kill(signal);
  });
}

function next(args) {
  return new Promise((done, reject) => {
    child = spawn(
      process.execPath,
      ['node_modules/next/dist/bin/next', ...args],
      {
        env,
        stdio: 'inherit',
      },
    );
    child.once('error', reject);
    child.once('exit', (code) =>
      code === 0 || stopping
        ? done()
        : reject(new Error(`Next.js exited (${code})`)),
    );
  });
}

const declarations = readFileSync('next-env.d.ts', 'utf8');
try {
  await next(['build']);
} finally {
  // Next rewrites this shared declaration even with a separate distDir.
  if (readFileSync('next-env.d.ts', 'utf8').includes('.next-visual/')) {
    writeFileSync('next-env.d.ts', declarations);
  }
}
if (!stopping)
  await next(['start', '--hostname', '127.0.0.1', '--port', '3100']);
