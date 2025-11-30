import { render } from '@testing-library/react';

import { ViewCounter } from '@/components/view-counter';

describe('ViewCounter component', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ total: 100 }),
      });
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Fetch views with SWR', () => {
    const slug = 'test-article-slug';
    render(<ViewCounter slug={slug} />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`/api/views/${slug}`, {
      method: 'POST',
    });
  });
});
