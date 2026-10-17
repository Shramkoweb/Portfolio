import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';

jest.mock('@/lib/sound');

import { StarfieldToggle } from '@/components/starfield-toggle';
import { playSound } from '@/lib/sound';

describe('StarfieldToggle', () => {
  beforeEach(() => localStorage.clear());

  it('turns the background off and remembers it', async () => {
    const user = userEvent.setup();
    render(<StarfieldToggle />);
    const button = screen.getByRole('button', { name: 'Starry background' });
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await user.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(localStorage.getItem('starfield')).toBe('off');
    expect(playSound).toHaveBeenCalledWith('stars-off');
  });

  it('turns it back on and clears the saved choice', async () => {
    localStorage.setItem('starfield', 'off');
    const user = userEvent.setup();
    render(<StarfieldToggle />);
    const button = screen.getByRole('button', { name: 'Starry background' });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('starfield')).toBeNull();
    expect(playSound).toHaveBeenCalledWith('stars-on');
  });

  it('renders an icon-free placeholder on the server', () => {
    const html = renderToString(<StarfieldToggle />);

    expect(html).not.toContain('svg');
    expect(html).toContain('aria-pressed="false"');
  });
});
