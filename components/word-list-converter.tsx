import { Check, Copy, Download } from 'lucide-react';
import { useId, useMemo, useState } from 'react';

import {
  countMissingDefinitions,
  countRemNoteConflicts,
  formatWordList,
  ImportFormat,
  parseWordList,
} from '@/lib/word-list';

interface WordListConverterProps {
  format: ImportFormat;
  appName: string;
  download?: string;
}

const PLACEHOLDER = 'apple - la manzana\nbanana\tel plátano\ncherry';

const fieldClasses =
  'mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 font-mono text-sm text-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-100';

const buttonClasses =
  'inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-bold text-black transition-[background-color,transform] duration-200 ease-out-expo hover:bg-gray-300 active:scale-[0.97] dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700';

function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

export function WordListConverter(props: WordListConverterProps) {
  const { format, appName, download } = props;
  const inputId = useId();
  const hintId = useId();
  const outputId = useId();
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const cards = useMemo(() => parseWordList(input), [input]);
  const output = useMemo(() => formatWordList(cards, format), [cards, format]);
  const missing = countMissingDefinitions(cards);
  const conflicts = format === 'remnote' ? countRemNoteConflicts(cards) : 0;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  function handleDownload() {
    if (!download) {
      return;
    }

    const url = URL.createObjectURL(
      new Blob([output], { type: 'text/plain;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = download;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url));
  }

  return (
    <div className="not-prose my-8 w-full rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-gray-900 dark:text-gray-100"
      >
        Your words, one per line
      </label>
      <p id={hintId} className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        Paste the list Quizlet QuickList copies, or any list. To add a meaning,
        put it after a tab or a dash: <code>apple - la manzana</code>.
      </p>
      <textarea
        id={inputId}
        aria-describedby={hintId}
        rows={6}
        spellCheck={false}
        placeholder={PLACEHOLDER}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className={fieldClasses}
      />

      {cards.length > 0 && (
        <>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <label
              htmlFor={outputId}
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              Ready for {appName}
            </label>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {plural(cards.length, 'card')}
            </span>
          </div>
          <textarea
            id={outputId}
            readOnly
            rows={Math.min(output.split('\n').length, 8)}
            spellCheck={false}
            value={output}
            className={fieldClasses}
          />

          {(missing > 0 || conflicts > 0) && (
            <ul className="mt-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">
              {missing > 0 && (
                <li>
                  {plural(missing, 'word')} {missing === 1 ? 'has' : 'have'} no
                  meaning yet. Add it after a tab or a dash, or fill it in after
                  the import.
                </li>
              )}
              {conflicts > 0 && (
                <li>
                  {plural(conflicts, 'line')}{' '}
                  {conflicts === 1 ? 'contains' : 'contain'} RemNote card syntax
                  (<code>&gt;&gt;</code>, <code>==</code>, <code>::</code> or{' '}
                  <code>;;</code>) and may split in the wrong place.
                </li>
              )}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className={buttonClasses}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              Copy
            </button>
            {download && (
              <button
                type="button"
                onClick={handleDownload}
                className={buttonClasses}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download .txt
              </button>
            )}
            <output aria-live="polite" className="sr-only">
              {copied ? 'Copied to clipboard' : ''}
            </output>
          </div>
        </>
      )}
    </div>
  );
}
