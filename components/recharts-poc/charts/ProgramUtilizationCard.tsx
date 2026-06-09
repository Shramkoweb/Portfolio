import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { PROGRAM_UTILIZATION, UTILIZATION_TARGET } from '../data/engagement';
import { ChartCard } from '../primitives/ChartCard';
import { theme } from '../primitives/theme';

interface ProgramUtilizationCardProps {
  perfMode: boolean;
}

export function ProgramUtilizationCard(props: ProgramUtilizationCardProps) {
  const { perfMode } = props;
  return (
    <ChartCard
      title="Program Utilization Over Time"
      description="Shows the percentage of users who actively use the program over time."
      height={260}
    >
      <AreaChart
        data={PROGRAM_UTILIZATION}
        margin={{ top: 16, right: 24, bottom: 8, left: 0 }}
      >
        <defs>
          <linearGradient id="rcp-util-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.area} stopOpacity={0.16} />
            <stop offset="100%" stopColor={theme.area} stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
          ticks={[0, 25, 50, 75]}
          domain={[0, 75]}
          tickFormatter={(v: number) => `${v}%`}
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
          formatter={(v) => [`${Number(v)}%`, 'Utilization']}
        />
        <ReferenceLine
          y={UTILIZATION_TARGET}
          stroke={theme.reference}
          strokeDasharray="3 3"
          ifOverflow="extendDomain"
        >
          <Label
            value={`Target ${UTILIZATION_TARGET}%`}
            position="insideTopRight"
            fill={theme.reference}
            fontSize={11}
            offset={8}
          />
        </ReferenceLine>
        <Area
          type="linear"
          dataKey="utilization"
          stroke={theme.line}
          strokeWidth={1.5}
          fill="url(#rcp-util-fill)"
          dot={{ r: 2.5, fill: theme.line, strokeWidth: 0 }}
          activeDot={{ r: 4, fill: theme.line, strokeWidth: 0 }}
          isAnimationActive={!perfMode}
          name="Utilization %"
        />
      </AreaChart>
    </ChartCard>
  );
}
