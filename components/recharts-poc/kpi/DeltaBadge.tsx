import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

import type { PoPResult } from '@/components/recharts-poc/primitives/periodOverPeriod';

interface DeltaBadgeProps {
  result: PoPResult;
  format?: 'count' | 'percent';
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function DeltaBadge(props: DeltaBadgeProps) {
  const { result, format = 'count' } = props;
  const { absDelta, pctDelta, direction } = result;

  if (direction === 'flat') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <Minus aria-hidden="true" className="h-3 w-3" />
        <span>0%</span>
      </span>
    );
  }

  const isUp = direction === 'up';
  const Icon = isUp ? ArrowUp : ArrowDown;
  const color = isUp
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400';
  const sign = isUp ? '+' : '';
  const baseline = pctDelta === null ? ' (no baseline)' : '';
  const numeric =
    pctDelta === null
      ? `${sign}${NUMBER_FMT.format(absDelta)}${format === 'percent' ? '%' : ''}`
      : `${sign}${pctDelta.toFixed(1)}%`;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs ${color}`}
      title={pctDelta === null ? 'No prior-period baseline' : undefined}
    >
      <Icon aria-hidden="true" className="h-3 w-3" />
      <span>
        {numeric}
        {baseline}
      </span>
    </span>
  );
}
