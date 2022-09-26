import { fireEvent, render, screen } from '@testing-library/react';

import { PostReaction } from '@/components/post-reaction/post-reaction';

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
      window.gtag = jest.fn();
      render(<PostReaction />);

      const worthlessReactionButton = screen.getByRole('button', {
        name: 'No',
      });
      fireEvent.click(worthlessReactionButton);

      expect(window.gtag).toHaveBeenCalledWith('event', 'Reaction click', {
        event_category: 'Blog - article',
        event_label: 'No',
        value: undefined,
      });
    });

    test('helpful', () => {
      window.gtag = jest.fn();
      render(<PostReaction />);

      const worthlessReactionButton = screen.getByRole('button', {
        name: 'Yes',
      });
      fireEvent.click(worthlessReactionButton);

      expect(window.gtag).toHaveBeenCalledWith('event', 'Reaction click', {
        event_category: 'Blog - article',
        event_label: 'Yes',
        value: undefined,
      });
    });
  });
});
