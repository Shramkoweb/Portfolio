import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { DEVICE_PERFORMANCE } from '@/components/recharts-poc/mocks/devicePerformance';
import { ChartCard } from '@/components/recharts-poc/primitives/ChartCard';
import { usePalette } from '@/components/recharts-poc/primitives/colors';

interface DonutCardProps {
  perfMode: boolean;
}

interface PercentLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderPercentLabel = (props: PercentLabelProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 1.25;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
      fill="currentColor"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export function DonutCard(props: DonutCardProps) {
  const { perfMode } = props;
  const palette = usePalette();

  return (
    <ChartCard title="Device Performance" height={320}>
      <PieChart>
        <Tooltip
          contentStyle={{
            background: palette.background,
            border: `1px solid ${palette.grid}`,
          }}
        />
        <Legend />
        <Pie
          data={DEVICE_PERFORMANCE}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={110}
          dataKey="value"
          nameKey="name"
          label={(p) => renderPercentLabel(p as PercentLabelProps)}
          labelLine={false}
          isAnimationActive={!perfMode}
          activeShape={
            { outerRadius: 120 } as unknown as React.SVGProps<SVGElement>
          }
        >
          {DEVICE_PERFORMANCE.map((entry, idx) => (
            <Cell
              key={entry.name}
              fill={idx === 0 ? palette.primary : palette.primaryStrong}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartCard>
  );
}
