import { storedToggle } from '@/lib/stored-toggle';

const sound = storedToggle('sound', false);

export const getSoundEnabled = sound.get;
export const setSoundEnabled = sound.set;
export const useSoundEnabled = sound.use;
