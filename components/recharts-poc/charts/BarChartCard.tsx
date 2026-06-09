import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { KEYWORD_LENGTH } from '@/components/recharts-poc/mocks/keywordLength';
import { ChartCard } from '@/components/recharts-poc/primitives/ChartCard';
import { usePalette } from '@/components/recharts-poc/primitives/colors';
import { LabelsToggle } from '@/components/recharts-poc/primitives/LabelsToggle';

const POSITIONS = ['top', 'inside', 'center', 'insideTop'] as const;
type Position = (typeof POSITIONS)[number];

interface BarChartCardProps {
  perfMode: boolean;
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function BarChartCard(props: BarChartCardProps) {
  const { perfMode } = props;
  const [labelsOn, setLabelsOn] = useState(true);
  const [position, setPosition] = useState<Position>('top');
  const palette = usePalette();

  const colors = [
    palette.primary,
    palette.primary,
    palette.primaryStrong,
    palette.primaryStrong,
    palette.primaryStrong,
    palette.primary,
    palette.primary,
    palette.primary,
    palette.primary,
    palette.primary,
  ];

  return (
    <ChartCard
      title="Keyword Length Distribution"
      height={320}
      actions={
        <>
          <LabelPositionPicker value={position} onChange={setPosition} />
          <LabelsToggle value={labelsOn} onChange={setLabelsOn} />
        </>
      }
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
        <Bar
          dataKey="currentPeriod"
          radius={[8, 8, 0, 0]}
          isAnimationActive={!perfMode}
          name="Keywords"
        >
          {KEYWORD_LENGTH.map((_, idx) => (
            <Cell key={idx} fill={colors[idx % colors.length]} />
          ))}
          {labelsOn ? (
            <LabelList
              dataKey="currentPeriod"
              position={position}
              formatter={(v: unknown) => NUMBER_FMT.format(Number(v))}
              fill={palette.textLabel}
              fontSize={12}
            />
          ) : null}
        </Bar>
      </BarChart>
    </ChartCard>
  );
}

function LabelPositionPicker(props: {
  value: Position;
  onChange: (next: Position) => void;
}) {
  const { value, onChange } = props;
  return (
    <div className="inline-flex rounded-md border border-gray-200 dark:border-gray-700">
      {POSITIONS.map((p) => (
        <button
          key={p}
          type="button"
          aria-pressed={p === value}
          onClick={() => onChange(p)}
          className={`px-2 py-1 text-xs ${
            p === value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
