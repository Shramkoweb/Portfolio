import { render, screen } from '@testing-library/react';

import { NoResults } from '@/components/no-results';

describe('NoResults', () => {
  it('echoes the searched term so the user can correct it', () => {
    render(<NoResults searchValue="reactt" />);

    expect(
      screen.getByText(/We couldn't find any articles matching/),
    ).toBeInTheDocument();
    expect(screen.getByText('"reactt"')).toBeInTheDocument();
  });

  it('falls back to a generic message when the search term is empty', () => {
    render(<NoResults searchValue="" />);

    expect(
      screen.getByText('No articles available at the moment.'),
    ).toBeInTheDocument();
  });
});
