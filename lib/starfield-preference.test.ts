import {
  getStarfieldEnabled,
  setStarfieldEnabled,
} from '@/lib/starfield-preference';

describe('starfield preference', () => {
  beforeEach(() => localStorage.clear());

  it('is on by default', () => {
    expect(getStarfieldEnabled()).toBe(true);
  });

  it('persists the off state', () => {
    setStarfieldEnabled(false);
    expect(getStarfieldEnabled()).toBe(false);
    setStarfieldEnabled(true);
    expect(getStarfieldEnabled()).toBe(true);
  });

  it('stays on when storage is unavailable', () => {
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('blocked');
      });
    expect(getStarfieldEnabled()).toBe(true);
    spy.mockRestore();
  });
});
