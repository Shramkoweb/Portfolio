// Learn more: https://github.com/teimport '@testing-library/jest-dom'sting-library/jest-dom
import '@testing-library/jest-dom';

// Setup fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ total: 100 }),
  }),
);

// Reset mocks between tests
beforeEach(() => {
  jest.resetAllMocks();
});
