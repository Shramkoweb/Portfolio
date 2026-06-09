import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { KEYWORD_LENGTH } from '@/components/recharts-poc/mocks/keywordLength';
import { ChartCard } from '@/components/recharts-poc/primitives/ChartCard';
import { usePalette } from '@/components/recharts-poc/primitives/colors';
import { LabelsToggle } from '@/components/recharts-poc/primitives/LabelsToggle';

interface HistogramCardProps {
  perfMode: boolean;
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function HistogramCard(props: HistogramCardProps) {
  const { perfMode } = props;
  const [labelsOn, setLabelsOn] = useState(false);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const palette = usePalette();

  const toggle = (key: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <ChartCard
      title="Histogram: Current vs Previous Period"
      height={320}
      actions={<LabelsToggle value={labelsOn} onChange={setLabelsOn} />}
    >
      <BarChart
        data={KEYWORD_LENGTH}
        margin={{ top: 24, right: 16, bottom: 8, left: 8 }}
      >
        <CartesianGrid
          stroke={palette.grid}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="length"
          stroke={palette.axis}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke={palette.axis} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: palette.background,
            border: `1px solid ${palette.grid}`,
          }}
          formatter={(v: unknown) => NUMBER_FMT.format(Number(v))}
        />
        <Legend
          onClick={(entry: { dataKey?: unknown }) => {
            if (entry && typeof entry.dataKey === 'string')
              toggle(entry.dataKey);
          }}
        />
        <Bar
          dataKey="previousPeriod"
          name="Previous"
          fill={palette.secondary}
          radius={[4, 4, 0, 0]}
          isAnimationActive={!perfMode}
          hide={hidden.has('previousPeriod')}
        >
          {labelsOn ? (
            <LabelList
              dataKey="previousPeriod"
              position="top"
              formatter={(v: unknown) => NUMBER_FMT.format(Number(v))}
              fill={palette.textLabel}
              fontSize={10}
            />
          ) : null}
        </Bar>
        <Bar
          dataKey="currentPeriod"
          name="Current"
          fill={palette.primaryStrong}
          radius={[4, 4, 0, 0]}
          isAnimationActive={!perfMode}
          hide={hidden.has('currentPeriod')}
        >
          {labelsOn ? (
            <LabelList
              dataKey="currentPeriod"
              position="top"
              formatter={(v: unknown) => NUMBER_FMT.format(Number(v))}
              fill={palette.textLabel}
              fontSize={10}
            />
          ) : null}
        </Bar>
      </BarChart>
    </ChartCard>
  );
}
