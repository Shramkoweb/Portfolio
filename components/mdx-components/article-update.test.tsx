import { render, screen } from '@testing-library/react';

import { ArticleUpdate } from '@/components/mdx-components/article-update';

const BODY = 'I reached my goal and read 24 books!';

describe('ArticleUpdate', () => {
  it('announces itself as ancillary content and keeps the body readable', () => {
    render(<ArticleUpdate date="2024-07-07">{BODY}</ArticleUpdate>);

    expect(screen.getByRole('note')).toHaveTextContent(BODY);
  });

  it('labels the block so a scanning reader sees why the text is there', () => {
    render(<ArticleUpdate date="2024-07-07">{BODY}</ArticleUpdate>);

    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  it('keeps the header out of a paragraph, where prose margins would pad it', () => {
    render(<ArticleUpdate date="2024-07-07">{BODY}</ArticleUpdate>);

    expect(screen.getByText('Update').closest('p')).toBeNull();
  });

  it('shows the update date in the same format as the article header', () => {
    render(<ArticleUpdate date="2024-07-07">{BODY}</ArticleUpdate>);

    expect(screen.getByText('Jul 7, 2024')).toBeInTheDocument();
  });

  it('exposes a machine-readable datetime next to the human one', () => {
    render(<ArticleUpdate date="2024-07-07">{BODY}</ArticleUpdate>);

    expect(screen.getByText('Jul 7, 2024').tagName).toBe('TIME');
    expect(screen.getByText('Jul 7, 2024')).toHaveAttribute(
      'datetime',
      '2024-07-07T00:00:00.000Z',
    );
  });

  it('renders without a date, since an update is still an update', () => {
    render(<ArticleUpdate>{BODY}</ArticleUpdate>);

    const note = screen.getByRole('note');

    expect(note).toHaveTextContent(BODY);
    expect(note.querySelector('time')).toBeNull();
  });

  it('drops an unparsable date instead of printing "Invalid Date"', () => {
    render(<ArticleUpdate date="not a date">{BODY}</ArticleUpdate>);

    const note = screen.getByRole('note');

    expect(note.querySelector('time')).toBeNull();
    expect(note).not.toHaveTextContent('Invalid Date');
  });

  it('renders rich MDX children, not only plain text', () => {
    render(
      <ArticleUpdate date="2024-07-07">
        <p>
          See the <a href="#books">book list</a>.
        </p>
      </ArticleUpdate>,
    );

    expect(screen.getByRole('link', { name: 'book list' })).toBeInTheDocument();
  });

  it.each([
    ['border-gray-200', 'dark:border-gray-700'],
    ['bg-white', 'dark:bg-gray-800'],
  ])('pairs the %s surface token with %s', (light, dark) => {
    render(<ArticleUpdate date="2024-07-07">{BODY}</ArticleUpdate>);

    const classes = screen.getByRole('note').className.split(' ');

    expect(classes).toContain(light);
    expect(classes).toContain(dark);
  });

  it('keeps the date above the AA contrast ratio in both themes', () => {
    render(<ArticleUpdate date="2024-07-07">{BODY}</ArticleUpdate>);

    const classes = screen.getByText('Jul 7, 2024').className.split(' ');

    expect(classes).toContain('text-gray-500');
    expect(classes).toContain('dark:text-gray-300');
  });
});
