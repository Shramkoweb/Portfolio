import { getCopyrightYearString } from '@/components/footer/get-copyright';

describe('getCopyrightYearString', () => {
  test('Return current year if now is 2022', () => {
    const currentYear = 2022;
    const createYear = 2022;

    const result = getCopyrightYearString(createYear, currentYear);

    expect(result).toStrictEqual('2022');
  });

  test('Return string range between create and current', () => {
    const currentYear = 2022;
    const createYear = 2020;

    const result = getCopyrightYearString(createYear, currentYear);

    expect(result).toStrictEqual(`${createYear} - ${currentYear}`);
  });
});
