import { useState } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { KEYWORDS } from '@/components/recharts-poc/mocks/keywords';
import { ChartCard } from '@/components/recharts-poc/primitives/ChartCard';
import { usePalette } from '@/components/recharts-poc/primitives/colors';
import { LabelsToggle } from '@/components/recharts-poc/primitives/LabelsToggle';

interface LineChartCardProps {
  perfMode: boolean;
}

export function LineChartCard(props: LineChartCardProps) {
  const { perfMode } = props;
  const [labelsOn, setLabelsOn] = useState(false);
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
    <ChartCard
      title="Short-Tail vs Long-Tail Keywords"
      height={320}
      actions={<LabelsToggle value={labelsOn} onChange={setLabelsOn} />}
    >
      <ComposedChart
        data={KEYWORDS}
        margin={{ top: 24, right: 16, bottom: 8, left: 8 }}
      >
        <CartesianGrid
          stroke={palette.grid}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis dataKey="date" stroke={palette.axis} tickLine={false} />
        <YAxis stroke={palette.axis} tickLine={false} />
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
        <Area
          type="monotone"
          dataKey="longTail"
          name="Long Tail Keyword"
          stroke={palette.primary}
          fill={palette.primary}
          fillOpacity={0.3}
          isAnimationActive={!perfMode}
          hide={hidden.has('longTail')}
        />
        <Line
          type="monotone"
          dataKey="shortTail"
          name="Short Tail Keyword"
          stroke={palette.primaryStrong}
          strokeWidth={2}
          dot={{ r: 3, fill: palette.primaryStrong }}
          isAnimationActive={!perfMode}
          hide={hidden.has('shortTail')}
          label={
            labelsOn
              ? { position: 'top', fill: palette.textLabel, fontSize: 11 }
              : false
          }
        />
      </ComposedChart>
    </ChartCard>
  );
}
