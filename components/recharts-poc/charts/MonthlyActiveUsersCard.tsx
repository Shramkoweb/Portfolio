import { MONTHLY_ACTIVE_USERS } from '../data/engagement';
import { SimpleLineCard } from './SimpleLineCard';

interface MonthlyActiveUsersCardProps {
  perfMode: boolean;
}

export function MonthlyActiveUsersCard(props: MonthlyActiveUsersCardProps) {
  const { perfMode } = props;
  return (
    <SimpleLineCard
      title="Monthly Active Users"
      description="Shows the number of active users each month, based on calendar-month data."
      data={MONTHLY_ACTIVE_USERS}
      seriesLabel="All users"
      yTicks={[0, 250, 500, 750, 1_000]}
      yDomain={[0, 1_000]}
      perfMode={perfMode}
    />
  );
}
