import { type ReactNode } from 'react';

interface SectionFrameProps {
  children: ReactNode;
}

export function SectionFrame(props: SectionFrameProps) {
  const { children } = props;
  return (
    <div className="rounded-2xl border border-dashed border-[var(--rcp-border-strong)] bg-[var(--rcp-background)] p-4 sm:p-6">
      <div className="flex flex-col divide-y divide-[var(--rcp-border)]">
        {children}
      </div>
    </div>
  );
}
