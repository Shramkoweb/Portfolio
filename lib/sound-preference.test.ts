import { getSoundEnabled, setSoundEnabled } from '@/lib/sound-preference';

describe('sound preference', () => {
  beforeEach(() => localStorage.clear());

  it('is off by default', () => {
    expect(getSoundEnabled()).toBe(false);
  });

  it('persists the on state and clears it when turned off', () => {
    setSoundEnabled(true);
    expect(getSoundEnabled()).toBe(true);
    expect(localStorage.getItem('sound')).toBe('on');

    setSoundEnabled(false);
    expect(getSoundEnabled()).toBe(false);
    expect(localStorage.getItem('sound')).toBeNull();
  });

  it('stays off when storage is unavailable', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(getSoundEnabled()).toBe(false);
    jest.restoreAllMocks();
  });
});
