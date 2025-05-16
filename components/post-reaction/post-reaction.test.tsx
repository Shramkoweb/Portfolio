import { fireEvent, render, screen } from '@testing-library/react';

import { PostReaction } from '@/components/post-reaction';

describe('PostReaction component', () => {
  test('Render with initial state', () => {
    render(<PostReaction />);

    const title = screen.getByRole('heading', {
      name: 'Was this article helpful ?',
    });
    const description = screen.getByText('Help me improve my blog');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  describe('reactions click:', () => {
    test('worthless', () => {
      render(<PostReaction />);

      const worthlessReactionButton = screen.getByRole('button', {
        name: 'No',
      });
      fireEvent.click(worthlessReactionButton);
    });

    test('helpful', () => {
      render(<PostReaction />);

      const worthlessReactionButton = screen.getByRole('button', {
        name: 'Yes',
      });
      fireEvent.click(worthlessReactionButton);
    });
  });
});
