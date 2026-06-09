import { useState } from 'react';
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { SALES_ASP } from '@/components/recharts-poc/mocks/salesAsp';
import { ChartCard } from '@/components/recharts-poc/primitives/ChartCard';
import { usePalette } from '@/components/recharts-poc/primitives/colors';

interface DualAxisChartCardProps {
  perfMode: boolean;
}

export function DualAxisChartCard(props: DualAxisChartCardProps) {
  const { perfMode } = props;
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const palette = usePalette();

  const toggleSeries = (key: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <ChartCard title="Average Selling Price vs Sales" height={320}>
      <ComposedChart
        data={SALES_ASP}
        margin={{ top: 24, right: 24, bottom: 8, left: 8 }}
      >
        <CartesianGrid
          stroke={palette.grid}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis dataKey="month" stroke={palette.axis} tickLine={false} />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke={palette.up}
          tickLine={false}
          tickFormatter={(v: number) => `$${v}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={palette.primaryStrong}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: palette.background,
            border: `1px solid ${palette.grid}`,
          }}
        />
        <Legend
          onClick={(entry: { dataKey?: unknown }) => {
            if (entry && typeof entry.dataKey === 'string')
              toggleSeries(entry.dataKey);
          }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="asp"
          name="Average Selling Price ($)"
          stroke={palette.up}
          strokeWidth={2}
          dot={{ r: 4, fill: palette.up }}
          isAnimationActive={!perfMode}
          hide={hidden.has('asp')}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="sales"
          name="Number of Sales"
          stroke={palette.primaryStrong}
          strokeWidth={2}
          dot={{
            r: 4,
            fill: palette.background,
            stroke: palette.primaryStrong,
            strokeWidth: 2,
          }}
          isAnimationActive={!perfMode}
          hide={hidden.has('sales')}
        />
      </ComposedChart>
    </ChartCard>
  );
}
