import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/lib/sound');

import { SoundToggle } from '@/components/sound-toggle';
import { playSound } from '@/lib/sound';

describe('SoundToggle', () => {
  beforeEach(() => localStorage.clear());

  it('starts off, then turns on with a confirmation chime', async () => {
    const user = userEvent.setup();
    render(<SoundToggle />);
    const button = screen.getByRole('button', { name: 'Sound effects' });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('sound')).toBe('on');
    expect(playSound).toHaveBeenCalledWith('sound-on');
  });

  it('turns off silently and forgets the choice', async () => {
    localStorage.setItem('sound', 'on');
    const user = userEvent.setup();
    render(<SoundToggle />);
    const button = screen.getByRole('button', { name: 'Sound effects' });
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await user.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(localStorage.getItem('sound')).toBeNull();
    expect(playSound).not.toHaveBeenCalled();
  });
});
