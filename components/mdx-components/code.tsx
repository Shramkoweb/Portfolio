import { useEffect, useRef } from 'react';

export function Code({
  children,
  className
}: {
  children: string;
  className?: string;
}) {
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (codeRef.current) {
      const range = document.createRange();
      range.selectNode(codeRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const copyButton = codeRef.current?.querySelector('.copy-button');

    if (copyButton) {
      copyButton.addEventListener('click', handleCopy);
      return () => {
        copyButton?.removeEventListener('click', handleCopy);
      };
    }
  }, []);

  return (
    <pre ref={codeRef} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        className="copy-button absolute top-2 right-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label="Copy code"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-4 h-4"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </button>
      {children}
    </pre>
  );
}
