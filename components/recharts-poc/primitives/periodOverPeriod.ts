export type Direction = 'up' | 'down' | 'flat';

export interface PoPResult {
  absDelta: number;
  pctDelta: number | null;
  direction: Direction;
}

export function periodOverPeriod(current: number, previous: number): PoPResult {
  const absDelta = current - previous;
  if (previous === 0) {
    return {
      absDelta,
      pctDelta: null,
      direction: current > 0 ? 'up' : 'flat',
    };
  }
  const pctDelta = (absDelta / previous) * 100;
  let direction: Direction = 'flat';
  if (absDelta > 0) direction = 'up';
  else if (absDelta < 0) direction = 'down';
  return { absDelta, pctDelta, direction };
}
