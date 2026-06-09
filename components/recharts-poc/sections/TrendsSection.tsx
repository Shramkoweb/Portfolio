import { TrendingUp } from 'lucide-react';

import { FeatureRetentionCard } from '../charts/FeatureRetentionCard';
import { MonthlyActiveUsersCard } from '../charts/MonthlyActiveUsersCard';
import { NewUsersCohortCard } from '../charts/NewUsersCohortCard';
import { ProgramUtilizationCard } from '../charts/ProgramUtilizationCard';
import { ChartLegend } from '../primitives/ChartLegend';
import { SectionFrame } from '../primitives/SectionFrame';
import { theme } from '../primitives/theme';

const ALL_USERS_LEGEND = [{ label: 'All users', color: theme.line }];
const NEW_USERS_LEGEND = [{ label: 'New users', color: theme.line }];
const UTILIZATION_LEGEND = [
  { label: 'Utilization %', color: theme.line },
  { label: 'Target 40%', color: theme.reference },
];

interface TrendsSectionProps {
  perfMode: boolean;
}

export function TrendsSection(props: TrendsSectionProps) {
  const { perfMode } = props;
  return (
    <SectionFrame>
      <div className="flex items-start gap-2 pb-4">
        <span
          className="mt-0.5 text-[var(--rcp-text-subtle)]"
          aria-hidden="true"
        >
          <TrendingUp className="h-4 w-4" />
        </span>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-[var(--rcp-text)]">
            Trends
          </h2>
          <p className="text-xs text-[var(--rcp-text-muted)]">
            Shows how active users and retention change over time.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-4">
        <MonthlyActiveUsersCard perfMode={perfMode} />
        <ChartLegend items={ALL_USERS_LEGEND} />
      </div>
      <div className="flex flex-col gap-3 py-4">
        <FeatureRetentionCard perfMode={perfMode} />
        <ChartLegend items={ALL_USERS_LEGEND} />
      </div>
      <div className="flex flex-col gap-3 py-4">
        <NewUsersCohortCard perfMode={perfMode} />
        <ChartLegend items={NEW_USERS_LEGEND} />
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <ProgramUtilizationCard perfMode={perfMode} />
        <ChartLegend items={UTILIZATION_LEGEND} />
      </div>
    </SectionFrame>
  );
}
