export interface WordCard {
  term: string;
  definition: string;
}

export type ImportFormat = 'quizlet' | 'anki' | 'remnote';

const SEPARATORS = ['\t', ' - ', ' – ', ' — ', ' = '];

const REMNOTE_DELIMITERS = ['>>', '==', '::', ';;'];

function clean(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function parseWordList(input: string): WordCard[] {
  return input
    .split(/\r?\n/)
    .map((line) => {
      const separator = SEPARATORS.find((candidate) =>
        line.includes(candidate),
      );

      if (!separator) {
        return { term: clean(line), definition: '' };
      }

      const index = line.indexOf(separator);

      return {
        term: clean(line.slice(0, index)),
        definition: clean(line.slice(index + separator.length)),
      };
    })
    .filter((card) => card.term !== '');
}

function quoteForAnki(field: string): string {
  return field.includes('"') ? `"${field.replace(/"/g, '""')}"` : field;
}

export function formatWordList(
  cards: WordCard[],
  format: ImportFormat,
): string {
  switch (format) {
    case 'quizlet':
      return cards.map((card) => `${card.term}\t${card.definition}`).join('\n');
    case 'anki':
      return [
        '#separator:Tab',
        '#html:false',
        ...cards.map(
          (card) =>
            `${quoteForAnki(card.term)}\t${quoteForAnki(card.definition)}`,
        ),
      ].join('\n');
    case 'remnote':
      return cards
        .map((card) => `${card.term} >> ${card.definition}`.trimEnd())
        .join('\n');
  }
}

export function countMissingDefinitions(cards: WordCard[]): number {
  return cards.filter((card) => card.definition === '').length;
}

export function countRemNoteConflicts(cards: WordCard[]): number {
  return cards.filter((card) =>
    REMNOTE_DELIMITERS.some(
      (delimiter) =>
        card.term.includes(delimiter) || card.definition.includes(delimiter),
    ),
  ).length;
}
