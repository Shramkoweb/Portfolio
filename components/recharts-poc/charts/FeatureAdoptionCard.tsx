import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { FEATURE_ADOPTION } from '../data/engagement';
import { ChartCard } from '../primitives/ChartCard';
import { theme } from '../primitives/theme';

interface FeatureAdoptionCardProps {
  perfMode: boolean;
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function FeatureAdoptionCard(props: FeatureAdoptionCardProps) {
  const { perfMode } = props;
  return (
    <ChartCard
      title="Feature Adoption"
      description="Shows the number of active users who used each feature during the selected period."
      height={300}
    >
      <BarChart
        data={FEATURE_ADOPTION}
        layout="vertical"
        margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
        barCategoryGap="32%"
      >
        <CartesianGrid
          stroke={theme.grid}
          strokeDasharray="3 3"
          horizontal={false}
        />
        <XAxis
          type="number"
          domain={[0, 10_000]}
          ticks={[0, 2_500, 5_000, 7_500, 10_000]}
          stroke={theme.axis}
          tickLine={false}
          axisLine={false}
          tick={{ fill: theme.textMuted, fontSize: 12 }}
          tickFormatter={(v: number) => NUMBER_FMT.format(v).replace(/,/g, ' ')}
        />
        <YAxis
          type="category"
          dataKey="label"
          stroke={theme.axis}
          tickLine={false}
          axisLine={false}
          tick={{ fill: theme.textMuted, fontSize: 12 }}
          width={110}
        />
        <Tooltip
          cursor={{ fill: theme.border, opacity: 0.4 }}
          contentStyle={{
            background: theme.tooltipBackground,
            border: 'none',
            borderRadius: 6,
            color: theme.tooltipText,
            fontSize: 12,
          }}
          labelStyle={{ color: theme.tooltipText }}
          itemStyle={{ color: theme.tooltipText }}
          formatter={(v) => [NUMBER_FMT.format(Number(v)), 'Users']}
        />
        <Bar
          dataKey="users"
          fill={theme.bar}
          isAnimationActive={!perfMode}
          radius={[0, 6, 6, 0]}
          name="Users"
        />
      </BarChart>
    </ChartCard>
  );
}
