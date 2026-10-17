import { storedToggle } from '@/lib/stored-toggle';

const starfield = storedToggle('starfield', true);

export const getStarfieldEnabled = starfield.get;
export const setStarfieldEnabled = starfield.set;
export const useStarfieldEnabled = starfield.use;
