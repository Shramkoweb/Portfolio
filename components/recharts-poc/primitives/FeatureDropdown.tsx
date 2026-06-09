import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import type { FeatureKey, FeatureMeta } from '../data/engagement';

interface FeatureDropdownProps {
  options: FeatureMeta[];
  value: FeatureKey;
  onChange: (next: FeatureKey) => void;
  groupLabel?: string;
}

export function FeatureDropdown(props: FeatureDropdownProps) {
  const { options, value, onChange, groupLabel = 'Feature' } = props;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const current = options.find((o) => o.key === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-w-[160px] items-center justify-between gap-2 rounded-md border border-[var(--rcp-border-strong)] bg-[var(--rcp-surface)] px-3 py-1.5 text-sm text-[var(--rcp-text)] hover:bg-[var(--rcp-background)] focus:outline-none focus:ring-2 focus:ring-[var(--rcp-text)]/10"
      >
        <span>{current?.label}</span>
        <ChevronDown
          aria-hidden="true"
          className="h-4 w-4 text-[var(--rcp-text-muted)]"
        />
      </button>
      {open ? (
        <div
          role="menu"
          aria-labelledby={labelId}
          className="absolute right-0 z-10 mt-1 w-56 rounded-md border border-[var(--rcp-border-strong)] bg-[var(--rcp-surface)] py-1 shadow-lg"
        >
          <div
            id={labelId}
            className="px-3 pt-2 pb-1 text-xs font-medium text-[var(--rcp-text-muted)]"
          >
            {groupLabel}
          </div>
          {options.map((opt) => {
            const selected = opt.key === value;
            return (
              <button
                key={opt.key}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-[var(--rcp-text)] hover:bg-[var(--rcp-background)]"
              >
                <span className="flex h-4 w-4 items-center justify-center">
                  {selected ? (
                    <Check aria-hidden="true" className="h-4 w-4" />
                  ) : null}
                </span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
