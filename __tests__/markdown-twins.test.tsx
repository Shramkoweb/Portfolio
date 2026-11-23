/**
 * The Markdown twins in _markdown/ are written by hand, so nothing else stops
 * them drifting from the TSX pages. They must keep the page's outline and dates.
 */
import { render } from '@testing-library/react';
import type { ComponentType } from 'react';

import {
  getProjectPageMarkdown,
  getProjectPagePaths,
} from '@/lib/markdown/project-pages';
import QuizletPage from '@/pages/quizlet-list/index';
import QuizletChromeExtensionPage from '@/pages/quizlet-list/quizlet-chrome-extension';
import QuizletImportCsvPage from '@/pages/quizlet-list/quizlet-import-csv';
import FlashcardImportPage from '@/pages/quizlet-list/to/[app]';
import UdemyResetProgressPage from '@/pages/udemy-reset-progress/index';
import UdemyProgressNotUpdatingPage from '@/pages/udemy-reset-progress/progress-not-updating';
import UdemyTroubleshootingPage from '@/pages/udemy-reset-progress/troubleshooting';

jest.mock('@/lib/views', () => ({
  registerView: jest.fn(),
  whenVisible: jest.fn(() => () => {}),
}));

const PAGES: Record<string, ComponentType> = {
  'quizlet-list': QuizletPage,
  'quizlet-list/quizlet-chrome-extension': QuizletChromeExtensionPage,
  'quizlet-list/quizlet-import-csv': QuizletImportCsvPage,
  'quizlet-list/to/anki': () => <FlashcardImportPage slug="anki" />,
  'quizlet-list/to/quizlet': () => <FlashcardImportPage slug="quizlet" />,
  'quizlet-list/to/remnote': () => <FlashcardImportPage slug="remnote" />,
  'udemy-reset-progress': UdemyResetProgressPage,
  'udemy-reset-progress/progress-not-updating': UdemyProgressNotUpdatingPage,
  'udemy-reset-progress/troubleshooting': UdemyTroubleshootingPage,
};

function pageOutline(Page: ComponentType) {
  const { container } = render(<Page />);
  const headings = [...container.querySelectorAll('h1, h2, h3')].map(
    (heading) =>
      `${'#'.repeat(Number(heading.tagName[1]))} ${heading.textContent}`,
  );
  const dates = [...container.querySelectorAll('time')].map((time) =>
    time.getAttribute('dateTime')?.slice(0, 10),
  );
  return { headings, dates };
}

function markdownOutline(markdown: string) {
  const headings = markdown.split('\n').filter((line) => /^#{1,3} /.test(line));
  const dates = [
    ...markdown.matchAll(/(?:Published|Updated): (\d{4}-\d{2}-\d{2})/g),
  ].map((match) => match[1]);
  return { headings, dates };
}

describe('Markdown twins', () => {
  test('every twin has a page in this test', async () => {
    expect(await getProjectPagePaths()).toEqual(Object.keys(PAGES).sort());
  });

  test.each(Object.keys(PAGES))(
    '%s matches the headings and dates of its page',
    async (path) => {
      const markdown = await getProjectPageMarkdown(path);

      expect(markdownOutline(markdown ?? '')).toEqual(pageOutline(PAGES[path]));
    },
  );
});
