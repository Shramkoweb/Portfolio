import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ShareButton } from '@/components/share-button/share-button';

describe('ShareButton', () => {
  it('calls onClick handler exactly once per click', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <ShareButton onClick={handleClick} ariaLabel="Share">
        Share
      </ShareButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Share' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
