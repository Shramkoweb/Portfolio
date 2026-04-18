import { isValidReactionType } from '@/lib/types';

describe('isValidReactionType', () => {
  it.each(['heart', 'beer', 'trophy'])(
    'should return true for "%s"',
    (type) => {
      expect(isValidReactionType(type)).toBe(true);
    },
  );

  it.each(['', 'like', 'thumbsup', 'Heart', 'BEER', '🍺'])(
    'should return false for "%s"',
    (type) => {
      expect(isValidReactionType(type)).toBe(false);
    },
  );
});
