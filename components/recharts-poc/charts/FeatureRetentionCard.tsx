import { useState } from 'react';

import {
  FEATURE_RETENTION,
  FEATURES,
  type FeatureKey,
} from '../data/engagement';
import { FeatureDropdown } from '../primitives/FeatureDropdown';
import { SimpleLineCard } from './SimpleLineCard';

interface FeatureRetentionCardProps {
  perfMode: boolean;
}

export function FeatureRetentionCard(props: FeatureRetentionCardProps) {
  const { perfMode } = props;
  const [feature, setFeature] = useState<FeatureKey>('workout');

  return (
    <SimpleLineCard
      title="Feature Retention"
      description="Shows the share of active users each month, based on calendar-month data."
      data={FEATURE_RETENTION[feature]}
      seriesLabel="All users"
      yTicks={[0, 25, 50, 75, 100]}
      yDomain={[0, 100]}
      yFormatter={(v) => `${v}%`}
      perfMode={perfMode}
      actions={
        <FeatureDropdown
          options={FEATURES}
          value={feature}
          onChange={setFeature}
        />
      }
    />
  );
}
