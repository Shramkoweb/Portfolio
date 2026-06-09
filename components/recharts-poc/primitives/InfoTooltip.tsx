import { Info } from 'lucide-react';

interface InfoTooltipProps {
  label: string;
}

export function InfoTooltip(props: InfoTooltipProps) {
  const { label } = props;
  return (
    <span
      title={label}
      aria-label={label}
      className="inline-flex h-4 w-4 cursor-help items-center justify-center text-[var(--rcp-text-subtle)] hover:text-[var(--rcp-text-muted)]"
    >
      <Info aria-hidden="true" className="h-4 w-4" />
    </span>
  );
}
