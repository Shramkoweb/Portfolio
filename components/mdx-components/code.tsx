import { useCallback, useRef, useState } from 'react';

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-gray-600 dark:text-gray-400"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-green-500"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface CodeProps {
  children: string;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>(
    'idle',
  );

  const handleCopy = useCallback(async () => {
    if (!codeRef.current?.textContent) return;

    try {
      await navigator.clipboard.writeText(codeRef.current.textContent);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 1500);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
      // TODO: Implement manual copy method & Error handling
      // eslint-disable-next-line no-console
      console.error('Failed to copy:', err);
    }
  }, []);

  return (
    <pre ref={codeRef} className={`relative ${className ?? ''}`}>
      <button
        onClick={handleCopy}
        type="button"
        className="copy-button absolute top-2 right-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label="Copy code"
      >
        {copyStatus === 'success' ? <CheckIcon /> : <CopyIcon />}
      </button>
      {children}
    </pre>
  );
}
