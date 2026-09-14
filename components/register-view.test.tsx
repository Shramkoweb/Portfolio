import { render } from '@testing-library/react';

import { RegisterView } from '@/components/register-view';

describe('RegisterView', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
  });

  test('posts one view for the slug on mount', () => {
    render(<RegisterView slug="quizlet-page" />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/views/quizlet-page', {
      method: 'POST',
    });
  });

  test('swallows network failures', () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('offline'));

    expect(() => render(<RegisterView slug="quizlet-page" />)).not.toThrow();
  });

  test('renders nothing', () => {
    const { container } = render(<RegisterView slug="x" />);

    expect(container).toBeEmptyDOMElement();
  });
});
