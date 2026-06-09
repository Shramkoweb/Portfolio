import { LIGHT_PALETTE, DARK_PALETTE, resolvePalette } from './colors';

describe('palettes', () => {
  it('light and dark palettes contain the same keys', () => {
    expect(Object.keys(LIGHT_PALETTE).sort()).toEqual(
      Object.keys(DARK_PALETTE).sort(),
    );
  });

  it('light and dark palettes are not identical', () => {
    expect(LIGHT_PALETTE).not.toEqual(DARK_PALETTE);
  });

  it('every palette value is a hex color string', () => {
    for (const value of Object.values(LIGHT_PALETTE)) {
      expect(value).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
    for (const value of Object.values(DARK_PALETTE)) {
      expect(value).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe('resolvePalette', () => {
  it('returns the light palette for "light"', () => {
    expect(resolvePalette('light')).toBe(LIGHT_PALETTE);
  });

  it('returns the dark palette for "dark"', () => {
    expect(resolvePalette('dark')).toBe(DARK_PALETTE);
  });

  it('returns the light palette for undefined (pre-mount)', () => {
    expect(resolvePalette(undefined)).toBe(LIGHT_PALETTE);
  });

  it('returns the light palette for unknown values', () => {
    expect(resolvePalette('system')).toBe(LIGHT_PALETTE);
  });
});
