import { useCallback, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeProps {
  children: string;
  className?: string;
}

export function Code(props: CodeProps) {
  const { children, className } = props;
  const codeRef = useRef<HTMLPreElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>(
    'idle',
  );

  const handleCopy = useCallback(async () => {
    if (!codeRef.current?.textContent) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeRef.current.textContent);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 1500);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
      console.error('Failed to copy:', err);
    }
  }, []);

  return (
    <pre ref={codeRef} className={`relative ${className ?? ''}`}>
      <button
        onClick={handleCopy}
        type="button"
        className="copy-button absolute top-2 right-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label={copyStatus === 'success' ? 'Copied!' : 'Copy code'}
      >
        {copyStatus === 'success' ? (
          <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
        ) : (
          <Copy
            className="w-4 h-4 text-gray-600 dark:text-gray-400"
            aria-hidden="true"
          />
        )}
        <span role="status" aria-live="polite" className="sr-only">
          {copyStatus === 'success' ? 'Code copied to clipboard' : ''}
        </span>
      </button>
      <div className="overflow-x-scroll">{children}</div>
    </pre>
  );
}
