import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
      className="ml-4 inline-flex h-11 w-11 items-center justify-center rounded-lg ring-gray-300 hover:ring-2"
      onClick={handleClick}
    >
      {mounted && (
        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-5 w-5 text-gray-800 dark:text-gray-200"
        >
          {resolvedTheme === Theme.dark ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
      )}
    </button>
  );
}
