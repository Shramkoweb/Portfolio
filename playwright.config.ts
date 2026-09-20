import { defineConfig } from '@playwright/test';

const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
};

export default defineConfig({
  testDir: './tests/visual',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 3,
  timeout: 60_000,
  updateSnapshots: 'none',
  snapshotPathTemplate:
    '{testDir}/__screenshots__/{platform}/{projectName}/{testFilePath}/{arg}{ext}',
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixels: 0,
      threshold: 0.2,
    },
  },
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:3100',
    locale: 'en-US',
    timezoneId: 'UTC',
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: Object.entries(viewports).flatMap(([device, viewport]) =>
    (['light', 'dark'] as const).map((colorScheme) => ({
      name: `chromium-${device}-${colorScheme}`,
      testMatch:
        device === 'desktop' && colorScheme === 'light'
          ? '**/*.spec.ts'
          : colorScheme === 'light'
            ? [
                '**/visual.spec.ts',
                '**/navigation.spec.ts',
                '**/content.spec.ts',
              ]
            : ['**/visual.spec.ts', '**/theme.spec.ts'],
      use: {
        viewport,
        colorScheme,
        isMobile: device === 'mobile',
        hasTouch: device === 'mobile',
      },
    })),
  ),
  webServer: {
    command: 'node tests/visual/server.mjs',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 180_000,
    gracefulShutdown: { signal: 'SIGTERM', timeout: 5_000 },
  },
});
