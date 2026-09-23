import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../public/static/images/smile.webp', () => ({
  src: '/smile.webp',
  width: 512,
  height: 512,
}));
jest.mock('../public/static/images/tongue.webp', () => ({
  src: '/tongue.webp',
  width: 512,
  height: 512,
}));

import { Avatar } from '@/components/avatar';
import { SHOWER_EVENT } from '@/lib/starfield';

function clickAt(button: HTMLElement, times: number[]) {
  const now = jest.spyOn(performance, 'now');
  for (const time of times) {
    now.mockReturnValue(time);
    fireEvent.click(button);
  }
  now.mockRestore();
}

describe('Avatar', () => {
  const onShower = jest.fn();

  beforeEach(() => window.addEventListener(SHOWER_EVENT, onShower));
  afterEach(() => window.removeEventListener(SHOWER_EVENT, onShower));

  it('winks while the mouse is over it', async () => {
    const user = userEvent.setup();
    render(<Avatar />);
    const avatar = screen.getByRole('button', {
      name: "Serhii Shramko's Memoji avatar",
    });

    await user.hover(avatar);
    expect(avatar).toHaveAttribute('data-wink', 'true');

    await user.unhover(avatar);
    expect(avatar).toHaveAttribute('data-wink', 'false');
  });

  it('starts a star shower after five quick clicks', () => {
    render(<Avatar />);
    const avatar = screen.getByRole('button');

    clickAt(avatar, [0, 200, 400, 600]);
    expect(onShower).not.toHaveBeenCalled();

    clickAt(avatar, [800]);
    expect(onShower).toHaveBeenCalledTimes(1);
  });

  it('ignores clicks that are too far apart', () => {
    render(<Avatar />);

    clickAt(screen.getByRole('button'), [0, 700, 1400, 2100, 2800]);

    expect(onShower).not.toHaveBeenCalled();
  });
});
