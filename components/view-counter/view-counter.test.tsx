import { render } from '@testing-library/react';

import { ViewCounter } from '@/components/view-counter/view-counter';

describe('ViewCounter component', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Fetch views with SWC', () => {
    const slug = 'test-article-slug';
    render(<ViewCounter slug={slug} />);

    // undefined because its get fetch from SWC
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      `/api/views/${slug}`,
      undefined,
    );
    expect(global.fetch).toHaveBeenNthCalledWith(2, `/api/views/${slug}`, {
      method: 'POST',
    });
  });
});
