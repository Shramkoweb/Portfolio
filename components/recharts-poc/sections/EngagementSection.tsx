import { LineChart, Users } from 'lucide-react';

import { FeatureAdoptionCard } from '../charts/FeatureAdoptionCard';
import { UserActivitySegmentsCard } from '../charts/UserActivitySegmentsCard';
import { ACTIVITY_SEGMENTS, KPIS } from '../data/engagement';
import { EngagementKpiCard } from '../kpi/EngagementKpiCard';
import { ChartLegend } from '../primitives/ChartLegend';
import { SectionFrame } from '../primitives/SectionFrame';
import { SEGMENT_COLORS } from '../primitives/theme';

const KPI_ICONS = [LineChart, Users] as const;

const ACTIVITY_LEGEND_ITEMS = ACTIVITY_SEGMENTS.map((segment) => ({
  label: segment.label,
  color: SEGMENT_COLORS[segment.key],
}));

interface EngagementSectionProps {
  perfMode: boolean;
}

export function EngagementSection(props: EngagementSectionProps) {
  const { perfMode } = props;
  return (
    <SectionFrame>
      <div className="grid grid-cols-1 gap-3 pb-4 sm:grid-cols-2">
        {KPIS.map((kpi, idx) => (
          <EngagementKpiCard
            key={kpi.label}
            {...kpi}
            icon={KPI_ICONS[idx] ?? Users}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 py-4">
        <UserActivitySegmentsCard perfMode={perfMode} />
        <ChartLegend items={ACTIVITY_LEGEND_ITEMS} />
      </div>
      <div className="pt-4">
        <FeatureAdoptionCard perfMode={perfMode} />
      </div>
    </SectionFrame>
  );
}
