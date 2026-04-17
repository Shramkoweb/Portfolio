import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockSetTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'dark',
    setTheme: mockSetTheme,
  }),
}));

import { ThemeChanger } from '@/components/theme-changer';

describe('ThemeChanger', () => {
  it('toggles from dark to light on click', async () => {
    const user = userEvent.setup();
    render(<ThemeChanger />);

    await user.click(screen.getByRole('button'));

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
