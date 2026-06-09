import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import {
  ACTIVITY_SEGMENTS,
  type WeeklyActivity,
  WEEKLY_ACTIVITY,
} from '../data/engagement';
import { ChartCard } from '../primitives/ChartCard';
import { SEGMENT_COLORS, theme } from '../primitives/theme';

interface UserActivitySegmentsCardProps {
  perfMode: boolean;
}

const NUMBER_FMT = new Intl.NumberFormat('en-US');

export function UserActivitySegmentsCard(props: UserActivitySegmentsCardProps) {
  const { perfMode } = props;
  return (
    <ChartCard
      title="User Activity Segments"
      description="Users are grouped based on how frequently they engage with the product during the selected period."
      height={300}
    >
      <BarChart
        data={WEEKLY_ACTIVITY}
        margin={{ top: 24, right: 16, bottom: 8, left: 0 }}
        barCategoryGap="40%"
      >
        <CartesianGrid
          stroke={theme.grid}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="week"
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
          ticks={[0, 25, 50, 75, 100]}
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
        />
        <Tooltip
          cursor={{ fill: theme.border, opacity: 0.4 }}
          content={<StackTooltip />}
        />
        <Bar
          dataKey="high"
          stackId="activity"
          fill={SEGMENT_COLORS.high}
          isAnimationActive={!perfMode}
          name="High activity"
        />
        <Bar
          dataKey="moderate"
          stackId="activity"
          fill={SEGMENT_COLORS.moderate}
          isAnimationActive={!perfMode}
          name="Moderate activity"
        />
        <Bar
          dataKey="low"
          stackId="activity"
          fill={SEGMENT_COLORS.low}
          isAnimationActive={!perfMode}
          name="Low activity"
        />
        <Bar
          dataKey="inactive"
          stackId="activity"
          fill={SEGMENT_COLORS.inactive}
          isAnimationActive={!perfMode}
          name="Inactive"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ChartCard>
  );
}

interface StackTooltipProps {
  active?: boolean;
  payload?: Array<{ payload?: WeeklyActivity }>;
}

function StackTooltip(props: StackTooltipProps) {
  const { active, payload } = props;
  if (!active || !payload?.length) return null;
  const data = payload[0]?.payload;
  if (!data) return null;
  return (
    <div className="rounded-md bg-[var(--rcp-tooltip-bg)] px-3 py-2 text-xs text-[var(--rcp-tooltip-text)] shadow-lg">
      <div className="font-semibold">100%</div>
      <div className="text-[var(--rcp-tooltip-text)]/80">
        {NUMBER_FMT.format(data.total)}
      </div>
    </div>
  );
}

export const ACTIVITY_LEGEND = ACTIVITY_SEGMENTS;
