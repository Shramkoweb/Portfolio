import { fireEvent, render, screen } from '@testing-library/react';

import { PostReaction } from '@/components/post-reaction';

describe('PostReaction component', () => {
  test('renders initial state with question and buttons', () => {
    render(<PostReaction />);

    expect(
      screen.getByRole('heading', { name: 'Was this article helpful ?' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Help me improve my blog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
  });

  test('clicking "Yes" shows thank you and hides buttons', () => {
    render(<PostReaction />);

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));

    expect(
      screen.getByRole('heading', { name: 'Thanks for the feedback!' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Yes' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'No' })).not.toBeInTheDocument();
  });

  test('clicking "No" shows sorry message and hides buttons', () => {
    render(<PostReaction />);

    fireEvent.click(screen.getByRole('button', { name: 'No' }));

    expect(
      screen.getByRole('heading', { name: 'Sorry to hear that.' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/let me know/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Yes' })).not.toBeInTheDocument();
  });
});
