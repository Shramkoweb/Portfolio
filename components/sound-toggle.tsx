import clsx from 'clsx';
import { Volume2, VolumeOff } from 'lucide-react';

import { playSound, stopSounds } from '@/lib/sound';
import { setSoundEnabled, useSoundEnabled } from '@/lib/sound-preference';

export function SoundToggle() {
  const enabled = useSoundEnabled();
  const Icon = enabled ? Volume2 : VolumeOff;

  const handleClick = () => {
    setSoundEnabled(!enabled);
    if (enabled) stopSounds();
    else playSound('sound-on');
  };

  return (
    <button
      aria-label="Sound effects"
      aria-pressed={enabled}
      type="button"
      className={clsx(
        'inline-flex h-11 w-11 items-center justify-center rounded-lg transition-[color,transform] duration-200 ease-out-expo hover:scale-105 active:scale-[0.97]',
        enabled
          ? 'text-gray-800 dark:text-gray-200'
          : 'text-gray-400 dark:text-gray-500',
      )}
      onClick={handleClick}
    >
      <Icon size={22} aria-hidden="true" />
    </button>
  );
}
