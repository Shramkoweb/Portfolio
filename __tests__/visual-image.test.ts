/**
 * @jest-environment node
 */
import { readFileSync } from 'node:fs';

import { version } from '@playwright/test/package.json';

const IMAGE =
  /mcr\.microsoft\.com\/playwright:v([\d.]+)-noble@(sha256:[a-f0-9]{64})/;

function pinnedImage(path: string) {
  const match = readFileSync(path, 'utf8').match(IMAGE);
  if (!match) throw new Error(`No pinned Playwright image in ${path}`);
  return { version: match[1], digest: match[2] };
}

// The image ships the only browser build that runs the suite, and its fonts
// are what the baselines were rendered with: a Playwright bump must move both.
describe('pinned Playwright image', () => {
  const script = pinnedImage('tests/visual/docker.sh');
  const ci = pinnedImage('.github/workflows/ci.yml');

  it('matches the installed @playwright/test version', () => {
    expect(script.version).toBe(version);
    expect(ci.version).toBe(version);
  });

  it('is the same image locally and in CI', () => {
    expect(ci.digest).toBe(script.digest);
  });
});
