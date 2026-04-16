import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { MoonStar, Sun } from 'lucide-react';

enum Theme {
  light = 'light',
  dark = 'dark',
}
export function ThemeChanger() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(resolvedTheme === Theme.dark ? Theme.light : Theme.dark);
  };

  return (
    <button
      aria-label={`Switch to ${resolvedTheme === Theme.dark ? Theme.light : Theme.dark} mode`}
      aria-pressed={resolvedTheme === Theme.dark}
      type="button"
      className="ml-4 inline-flex h-11 w-11 items-center justify-center rounded-lg hover:scale-105 text-gray-800 dark:text-gray-200 transition-transform duration-200 ease-out-expo active:scale-[0.97]"
      onClick={handleClick}
    >
      {mounted &&
        (resolvedTheme === Theme.dark ? (
          <MoonStar size={24} aria-hidden="true" />
        ) : (
          <Sun size={24} aria-hidden="true" />
        ))}
    </button>
  );
}
