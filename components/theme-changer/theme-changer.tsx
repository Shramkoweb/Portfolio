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
      className="ml-4 inline-flex h-11 w-11 items-center justify-center rounded-lg ring-gray-300 hover:ring-2 text-gray-800 dark:text-gray-200"
      onClick={handleClick}
    >
      {mounted && (
        <span
          role="presentation"
        >
          {resolvedTheme === Theme.dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </span>
      )}
    </button>
  );
}
