// Learn more: https://github.com/testing-library/jest-dom
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@testing-library/jest-dom');

// Setup fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ total: 100 }),
  })
);

// Reset mocks between tests
beforeEach(() => {
  jest.resetAllMocks();
});
