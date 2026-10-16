import {
  countMissingDefinitions,
  countRemNoteConflicts,
  formatWordList,
  parseWordList,
} from './word-list';

describe('parseWordList', () => {
  it('reads one word per line, as Quizlet QuickList copies it', () => {
    expect(parseWordList('Apple\nBanana')).toEqual([
      { term: 'Apple', definition: '' },
      { term: 'Banana', definition: '' },
    ]);
  });

  it('splits a meaning off after a tab, a spaced dash or an equals sign', () => {
    expect(
      parseWordList(
        'apple\tla manzana\nbanana - el plátano\ncherry — la cereza\npear = la pera',
      ),
    ).toEqual([
      { term: 'apple', definition: 'la manzana' },
      { term: 'banana', definition: 'el plátano' },
      { term: 'cherry', definition: 'la cereza' },
      { term: 'pear', definition: 'la pera' },
    ]);
  });

  it('keeps hyphenated words whole', () => {
    expect(parseWordList('well-being - el bienestar')).toEqual([
      { term: 'well-being', definition: 'el bienestar' },
    ]);
  });

  it('prefers a tab when the meaning itself contains a dash', () => {
    expect(parseWordList('run\tto move fast - on foot')).toEqual([
      { term: 'run', definition: 'to move fast - on foot' },
    ]);
  });

  it('reads the TSV file the extension exports', () => {
    expect(parseWordList('Alpha\t\r\nBeta\t')).toEqual([
      { term: 'Alpha', definition: '' },
      { term: 'Beta', definition: '' },
    ]);
  });

  it('drops blank lines and collapses inner whitespace', () => {
    expect(parseWordList('\n  force   majeure  \n\n')).toEqual([
      { term: 'force majeure', definition: '' },
    ]);
  });
});

describe('formatWordList', () => {
  const cards = [
    { term: 'apple', definition: 'la manzana' },
    { term: 'banana', definition: '' },
  ];

  it('writes Quizlet rows with a tab between term and definition', () => {
    expect(formatWordList(cards, 'quizlet')).toBe(
      'apple\tla manzana\nbanana\t',
    );
  });

  it('writes an Anki file that names its separator up front', () => {
    expect(formatWordList(cards, 'anki')).toBe(
      '#separator:Tab\n#html:false\napple\tla manzana\nbanana\t',
    );
  });

  it('quotes Anki fields that contain double quotes', () => {
    expect(
      formatWordList([{ term: 'say "hi"', definition: 'greet' }], 'anki'),
    ).toBe('#separator:Tab\n#html:false\n"say ""hi"""\tgreet');
  });

  it('writes RemNote forward cards', () => {
    expect(formatWordList(cards, 'remnote')).toBe(
      'apple >> la manzana\nbanana >>',
    );
  });
});

describe('countMissingDefinitions', () => {
  it('counts words that have no meaning yet', () => {
    expect(
      countMissingDefinitions([
        { term: 'apple', definition: 'la manzana' },
        { term: 'banana', definition: '' },
      ]),
    ).toBe(1);
  });
});

describe('countRemNoteConflicts', () => {
  it('counts cards that already contain RemNote card syntax', () => {
    expect(
      countRemNoteConflicts([
        { term: 'a >> b', definition: '' },
        { term: 'x', definition: 'y == z' },
        { term: 'plain', definition: 'text' },
      ]),
    ).toBe(2);
  });
});
