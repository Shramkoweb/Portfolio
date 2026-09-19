import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockRouteChangeHandlers = new Set<() => void>();

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    events: {
      on: (_event: string, handler: () => void) => {
        mockRouteChangeHandlers.add(handler);
      },
      off: (_event: string, handler: () => void) => {
        mockRouteChangeHandlers.delete(handler);
      },
    },
  }),
}));

import { MobileMenu } from '@/components/mobile-menu/mobile-menu';

function completeRouteChange() {
  act(() => {
    for (const handler of mockRouteChangeHandlers) handler();
  });
}

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

  it('closes the menu and restores page scroll on navigation', async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();

    completeRouteChange();

    expect(
      screen.queryByRole('link', { name: 'Home' }),
    ).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
