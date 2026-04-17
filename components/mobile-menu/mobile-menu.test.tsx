import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

import { MobileMenu } from '@/components/mobile-menu/mobile-menu';

describe('MobileMenu', () => {
  it('disables page scroll when menu opens', async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores page scroll when menu closes', async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);
    const btn = screen.getByRole('button', { name: 'Toggle menu' });

    await user.click(btn); // open
    await user.click(btn); // close

    expect(document.body.style.overflow).toBe('');
  });
});
