import type { LucideIcon } from 'lucide-react';

import { periodOverPeriod } from '@/components/recharts-poc/primitives/periodOverPeriod';

import { DeltaBadge } from './DeltaBadge';

interface KpiCardProps {
  label: string;
  current: number;
  previous: number;
  format: 'count' | 'percent';
  icon: LucideIcon;
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function KpiCard(props: KpiCardProps) {
  const { label, current, previous, format, icon: Icon } = props;
  const result = periodOverPeriod(current, previous);
  const formatted =
    format === 'percent'
      ? `${current.toFixed(1)}%`
      : NUMBER_FMT.format(current);

  return (
    <div className="flex w-full items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {formatted}
        </span>
        <DeltaBadge result={result} format={format} />
      </div>
    </div>
  );
}
