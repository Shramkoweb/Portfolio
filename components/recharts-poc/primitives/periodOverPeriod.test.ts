import { periodOverPeriod } from './periodOverPeriod';

describe('periodOverPeriod', () => {
  it('returns up direction with positive abs and pct deltas when current > previous', () => {
    expect(periodOverPeriod(110, 100)).toEqual({
      absDelta: 10,
      pctDelta: 10,
      direction: 'up',
    });
  });

  it('returns down direction with negative abs and pct deltas when current < previous', () => {
    expect(periodOverPeriod(80, 100)).toEqual({
      absDelta: -20,
      pctDelta: -20,
      direction: 'down',
    });
  });

  it('returns flat direction with zero deltas when current === previous', () => {
    expect(periodOverPeriod(100, 100)).toEqual({
      absDelta: 0,
      pctDelta: 0,
      direction: 'flat',
    });
  });

  it('handles previous === 0 by returning null pctDelta and up direction when current > 0', () => {
    expect(periodOverPeriod(50, 0)).toEqual({
      absDelta: 50,
      pctDelta: null,
      direction: 'up',
    });
  });

  it('handles current === 0 and previous > 0 with -100% delta and down direction', () => {
    expect(periodOverPeriod(0, 100)).toEqual({
      absDelta: -100,
      pctDelta: -100,
      direction: 'down',
    });
  });

  it('handles both zero by returning flat with null pct', () => {
    expect(periodOverPeriod(0, 0)).toEqual({
      absDelta: 0,
      pctDelta: null,
      direction: 'flat',
    });
  });
});
