import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SearchInput } from '@/components/search-input';

describe('SearchInput', () => {
  const defaultProps = {
    onChange: jest.fn(),
    placeholder: 'Search articles',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default placeholder', () => {
    render(<SearchInput onChange={defaultProps.onChange} />);

    const input = screen.getByRole('textbox', { name: 'Search articles' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search articles');
  });

  it('renders with custom placeholder', () => {
    const customPlaceholder = 'Custom search';
    render(
      <SearchInput
        onChange={defaultProps.onChange}
        placeholder={customPlaceholder}
      />,
    );

    const input = screen.getByRole('textbox', { name: customPlaceholder });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  it('calls onChange handler when user types', () => {
    render(<SearchInput onChange={defaultProps.onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith('test');
  });
});
