import { documentTitle } from '@/components/page-meta';

describe('documentTitle', () => {
  it('keeps the site name when the title fits in 60 characters', () => {
    expect(documentTitle('Gear | Serhii Shramko')).toBe(
      'Gear | Serhii Shramko',
    );
  });

  it('drops the site name when it pushes the title past 60 characters', () => {
    expect(
      documentTitle(
        'JavaScript, TypeScript, React & CSS Code Snippets | Serhii Shramko',
      ),
    ).toBe('JavaScript, TypeScript, React & CSS Code Snippets');
  });

  it('leaves long titles without the site name alone', () => {
    const title =
      'How to Sort an Array of Objects by Multiple Properties in JavaScript';

    expect(documentTitle(title)).toBe(title);
  });
});
