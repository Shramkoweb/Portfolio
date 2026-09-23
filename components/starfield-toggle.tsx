import clsx from 'clsx';
import { Sparkle, Sparkles } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import {
  setStarfieldEnabled,
  useStarfieldEnabled,
} from '@/lib/starfield-preference';

export function StarfieldToggle() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const enabled = useStarfieldEnabled();
  const Icon = enabled ? Sparkles : Sparkle;

  return (
    <button
      aria-label="Starry background"
      aria-pressed={mounted && enabled}
      type="button"
      className={clsx(
        'ml-4 hidden h-11 w-11 items-center justify-center rounded-lg transition-[color,transform] duration-200 ease-out-expo hover:scale-105 active:scale-[0.97] lg:inline-flex forced-colors:hidden',
        mounted && !enabled
          ? 'text-gray-400 dark:text-gray-500'
          : 'text-gray-800 dark:text-gray-200',
      )}
      onClick={() => setStarfieldEnabled(!enabled)}
    >
      {mounted ? (
        <Icon size={22} aria-hidden="true" />
      ) : (
        <span className="inline-block h-[22px] w-[22px]" />
      )}
    </button>
  );
}
