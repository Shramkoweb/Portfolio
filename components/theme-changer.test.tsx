import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';

const mockSetTheme = jest.fn();
let mockResolvedTheme: 'light' | 'dark' = 'dark';

jest.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

import { ThemeChanger } from '@/components/theme-changer';

describe('ThemeChanger', () => {
  it('toggles from dark to light on click', async () => {
    mockResolvedTheme = 'dark';
    const user = userEvent.setup();
    render(<ThemeChanger />);

    const button = screen.getByRole('button', {
      name: 'Switch to light mode',
    });
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('toggles from light to dark on click', async () => {
    mockResolvedTheme = 'light';
    const user = userEvent.setup();
    render(<ThemeChanger />);

    const button = screen.getByRole('button', {
      name: 'Switch to dark mode',
    });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('renders an icon-free placeholder on the server to avoid hydration mismatch', () => {
    mockResolvedTheme = 'dark';

    const html = renderToString(<ThemeChanger />);

    expect(html).toContain('<button');
    expect(html).not.toContain('svg');
  });
});
