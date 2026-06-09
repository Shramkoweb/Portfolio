import { NEW_USERS_COHORT } from '../data/engagement';
import { SimpleLineCard } from './SimpleLineCard';

interface NewUsersCohortCardProps {
  perfMode: boolean;
}

export function NewUsersCohortCard(props: NewUsersCohortCardProps) {
  const { perfMode } = props;
  return (
    <SimpleLineCard
      title="New users cohort"
      description="Shows the number of new users over time, helping to identify changes in the user cohort. An increase may indicate user replacement or previously inactive users becoming active."
      data={NEW_USERS_COHORT}
      seriesLabel="New users"
      yTicks={[0, 250, 500, 750, 1_000]}
      yDomain={[0, 1_000]}
      perfMode={perfMode}
    />
  );
}
