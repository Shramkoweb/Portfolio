import type { LucideIcon } from 'lucide-react';

import { InfoTooltip } from '../primitives/InfoTooltip';

interface EngagementKpiCardProps {
  label: string;
  value: number;
  format: 'count' | 'percent';
  info: string;
  icon: LucideIcon;
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function EngagementKpiCard(props: EngagementKpiCardProps) {
  const { label, value, format, info, icon: Icon } = props;
  const formatted =
    format === 'percent' ? String(value) : NUMBER_FMT.format(value);

  return (
    <div className="flex items-start justify-between rounded-xl border border-[var(--rcp-border)] bg-[var(--rcp-surface)] px-5 py-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-[var(--rcp-text-muted)]">
          <Icon aria-hidden="true" className="h-3.5 w-3.5" />
          <span>{label}</span>
        </div>
        <span className="text-3xl font-semibold leading-none text-[var(--rcp-text)]">
          {formatted}
        </span>
      </div>
      <InfoTooltip label={info} />
    </div>
  );
}
