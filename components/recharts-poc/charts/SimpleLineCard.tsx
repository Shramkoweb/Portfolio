import { type ReactNode } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { SeriesPoint } from '../data/engagement';
import { ChartCard } from '../primitives/ChartCard';
import { theme } from '../primitives/theme';

interface SimpleLineCardProps {
  title: string;
  description: string;
  data: SeriesPoint[];
  seriesLabel: string;
  yTicks: number[];
  yDomain: [number, number];
  yFormatter?: (v: number) => string;
  perfMode: boolean;
  actions?: ReactNode;
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function SimpleLineCard(props: SimpleLineCardProps) {
  const {
    title,
    description,
    data,
    seriesLabel,
    yTicks,
    yDomain,
    yFormatter,
    perfMode,
    actions,
  } = props;

  return (
    <ChartCard
      title={title}
      description={description}
      height={260}
      actions={actions}
    >
      <LineChart
        data={data}
        margin={{ top: 16, right: 24, bottom: 8, left: 0 }}
      >
        <CartesianGrid
          stroke={theme.grid}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          stroke={theme.axis}
          tickLine={false}
          axisLine={false}
          tick={{ fill: theme.textMuted, fontSize: 12 }}
        />
        <YAxis
          stroke={theme.axis}
          tickLine={false}
          axisLine={false}
          tick={{ fill: theme.textMuted, fontSize: 12 }}
          ticks={yTicks}
          domain={yDomain}
          tickFormatter={yFormatter ?? ((v: number) => NUMBER_FMT.format(v))}
        />
        <Tooltip
          cursor={{ stroke: theme.borderStrong, strokeDasharray: '3 3' }}
          contentStyle={{
            background: theme.tooltipBackground,
            border: 'none',
            borderRadius: 6,
            color: theme.tooltipText,
            fontSize: 12,
          }}
          labelStyle={{ color: theme.tooltipText }}
          itemStyle={{ color: theme.tooltipText }}
          formatter={(v) => {
            const n = Number(v);
            return [
              yFormatter ? yFormatter(n) : NUMBER_FMT.format(n),
              seriesLabel,
            ];
          }}
        />
        <Line
          type="linear"
          dataKey="actual"
          stroke={theme.line}
          strokeWidth={1.5}
          dot={{ r: 2.5, fill: theme.line, strokeWidth: 0 }}
          activeDot={{ r: 4, fill: theme.line, strokeWidth: 0 }}
          isAnimationActive={!perfMode}
          connectNulls={false}
          name={seriesLabel}
        />
        <Line
          type="linear"
          dataKey="projected"
          stroke={theme.lineDashed}
          strokeWidth={1.5}
          strokeDasharray="5 4"
          dot={false}
          activeDot={{ r: 4, fill: theme.lineDashed, strokeWidth: 0 }}
          isAnimationActive={!perfMode}
          connectNulls={false}
          legendType="none"
          name={seriesLabel}
        />
      </LineChart>
    </ChartCard>
  );
}
