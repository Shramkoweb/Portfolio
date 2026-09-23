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

function avatar() {
  return screen.getByRole('img', { name: /smiling face/ }).parentElement!;
}

function tapAt(element: HTMLElement, times: number[]) {
  const now = jest.spyOn(performance, 'now');
  for (const time of times) {
    now.mockReturnValue(time);
    fireEvent.pointerUp(element);
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

    await user.hover(avatar());
    expect(avatar()).toHaveAttribute('data-wink', 'true');

    await user.unhover(avatar());
    expect(avatar()).toHaveAttribute('data-wink', 'false');
  });

  it('stays out of the tab order', () => {
    render(<Avatar />);

    expect(screen.queryByRole('button')).toBeNull();
    expect(avatar()).not.toHaveAttribute('tabindex');
  });

  it('gives each instance its own SVG ids', () => {
    const { container } = render(
      <>
        <Avatar />
        <Avatar />
      </>,
    );
    const ids = [...container.querySelectorAll('[id]')].map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('starts a star shower after five quick taps', () => {
    render(<Avatar />);

    tapAt(avatar(), [0, 200, 400, 600]);
    expect(onShower).not.toHaveBeenCalled();

    tapAt(avatar(), [800]);
    expect(onShower).toHaveBeenCalledTimes(1);
  });

  it('ignores taps that are too far apart', () => {
    render(<Avatar />);

    tapAt(avatar(), [0, 700, 1400, 2100, 2800]);

    expect(onShower).not.toHaveBeenCalled();
  });
});
