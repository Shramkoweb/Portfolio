import { calendarDurationBetween } from '@/lib/calendar';

describe('calendarDurationBetween', () => {
  const start = new Date('2018-08-01');

  it('should count full years, months and days since start', () => {
    expect(
      calendarDurationBetween(start, new Date('2026-07-19T12:00:00Z')),
    ).toEqual({ years: 7, months: 11, days: 18 });
  });

  it('should roll over to a new year on the anniversary date', () => {
    expect(
      calendarDurationBetween(start, new Date('2026-08-01T00:00:00Z')),
    ).toEqual({ years: 8, months: 0, days: 0 });
  });

  it('should stay at the previous year until the anniversary', () => {
    expect(
      calendarDurationBetween(start, new Date('2026-07-31T23:59:59Z')),
    ).toEqual({ years: 7, months: 11, days: 30 });
  });

  it('should borrow days from the previous month when end day is smaller', () => {
    expect(
      calendarDurationBetween(
        new Date('2018-08-15'),
        new Date('2026-07-10T00:00:00Z'),
      ),
    ).toEqual({ years: 7, months: 10, days: 25 });
  });

  it('should compute in UTC regardless of local timezone offset', () => {
    // 23:30 in New York (UTC-4) is already July 20 in UTC
    expect(
      calendarDurationBetween(start, new Date('2026-07-19T23:30:00-04:00')),
    ).toEqual({ years: 7, months: 11, days: 19 });
  });

  it('should cap month-end anchors to shorter months', () => {
    expect(
      calendarDurationBetween(new Date('2020-01-31'), new Date('2020-03-01')),
    ).toEqual({ years: 0, months: 1, days: 1 });
  });

  it('should treat a capped february as a full month', () => {
    expect(
      calendarDurationBetween(new Date('2020-01-31'), new Date('2021-02-28')),
    ).toEqual({ years: 1, months: 1, days: 0 });
  });

  it('should return zeros for the same instant', () => {
    expect(calendarDurationBetween(start, new Date('2018-08-01'))).toEqual({
      years: 0,
      months: 0,
      days: 0,
    });
  });
});
