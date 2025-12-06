import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonStar, Sun } from 'lucide-react';

enum Theme {
  light = 'light',
  dark = 'dark',
}
export function ThemeChanger() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleClick = () => {
    setTheme(resolvedTheme === Theme.dark ? Theme.light : Theme.dark);
  };

  return (
    <button
      aria-label={`Switch to ${resolvedTheme === Theme.dark ? Theme.light : Theme.dark} mode`}
      aria-pressed={resolvedTheme === Theme.dark}
      type="button"
      className="ml-4 inline-flex h-11 w-11 items-center justify-center rounded-lg ring-gray-300 hover:ring-2 text-gray-800 dark:text-gray-200"
      onClick={handleClick}
    >
      {mounted && (
        <span
          role="presentation"
        >
          {resolvedTheme === Theme.dark ? (
            <MoonStar size={24} />
          ) : (
            <Sun size={24} />
          )}
        </span>
      )}
    </button>
  );
}
