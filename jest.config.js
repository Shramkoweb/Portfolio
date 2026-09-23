/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  // Scope coverage to the logic layer. Without an explicit list Jest reports
  // only the files a test happens to import, so untested files vanish from
  // the report and the percentages read far higher than they are.
  // Presentational pages and components are deliberately out of scope: this
  // number is about logic, and folding untested JSX into it would say more
  // about rendering than about the code the tests actually exercise.
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'pages/api/**/*.{ts,tsx}',
    'middleware.ts',
    '!**/*.d.ts',
    '!**/*.test.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 75,
      functions: 80,
      lines: 85,
    },
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^lib/prisma$': '<rootDir>/lib/prisma',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/.next-visual/',
    '/__tests__/helpers/',
    '/tests/visual/',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          [
            'next/babel',
            {
              'preset-react': {
                runtime: 'automatic',
              },
            },
          ],
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default config;
