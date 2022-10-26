import { render, screen } from '@testing-library/react';

import { Categories } from '@/components/categories';

describe('Categories component', () => {
  test('Render correct with initial state', () => {
    const CATEGORIES = ['JS', 'TS'];
    render(<Categories categories={CATEGORIES} />);

    const links = screen.getAllByRole('link');

    // Add 1 default link "All"
    expect(links).toHaveLength(CATEGORIES.length + 1);
  });
});
