import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FLASHCARD_APP_SLUGS, isFlashcardAppSlug } from '@/lib/flashcard-apps';
import FlashcardImportPage, {
  getStaticPaths,
  getStaticProps,
} from '@/pages/quizlet-list/to/[app]';

describe('flashcard import pages', () => {
  test('builds one page per app', async () => {
    const { paths } = await getStaticPaths();

    expect(paths).toEqual(
      FLASHCARD_APP_SLUGS.map((app) => ({ params: { app } })),
    );
  });

  test('returns 404 for an app without a page', async () => {
    await expect(getStaticProps({ params: { app: 'cram' } })).resolves.toEqual({
      notFound: true,
    });
    expect(isFlashcardAppSlug('toString')).toBe(false);
  });

  test('formats pasted words into an Anki file', async () => {
    const user = userEvent.setup();
    render(<FlashcardImportPage slug="anki" />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Import a Word List into Anki',
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: 'Ready for Anki' }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('textbox', { name: 'Your words, one per line' }),
    );
    await user.paste('apple - la manzana\nbanana');

    expect(screen.getByRole('textbox', { name: 'Ready for Anki' })).toHaveValue(
      '#separator:Tab\n#html:false\napple\tla manzana\nbanana\t',
    );
    expect(
      screen.getByText('1 word has no meaning yet.', { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download .txt' }),
    ).toBeInTheDocument();
  });

  test('copies the Quizlet format and offers no file', async () => {
    const user = userEvent.setup();
    render(<FlashcardImportPage slug="quizlet" />);

    await user.click(
      screen.getByRole('textbox', { name: 'Your words, one per line' }),
    );
    await user.paste('apple\tla manzana');
    await user.click(screen.getByRole('button', { name: 'Copy' }));

    await expect(navigator.clipboard.readText()).resolves.toBe(
      'apple\tla manzana',
    );
    expect(screen.getByText('Copied to clipboard')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Download .txt' }),
    ).not.toBeInTheDocument();
  });

  test('warns about RemNote card syntax inside a word', async () => {
    const user = userEvent.setup();
    render(<FlashcardImportPage slug="remnote" />);

    await user.click(
      screen.getByRole('textbox', { name: 'Your words, one per line' }),
    );
    await user.paste('a == b - meaning');

    expect(
      screen.getByText('1 line contains RemNote card syntax', { exact: false }),
    ).toBeInTheDocument();
  });

  test('tags store links with the guide campaign', () => {
    render(<FlashcardImportPage slug="remnote" />);

    const chrome = new URL(
      screen
        .getByRole('link', { name: 'Install Quizlet QuickList for Chrome' })
        .getAttribute('href')!,
    );

    expect(chrome.searchParams.get('utm_medium')).toBe('guide');
    expect(chrome.searchParams.get('utm_campaign')).toBe('to-remnote');
  });
});
