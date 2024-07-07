import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

const DATE_OF_CREATION = new Date('2021-05-10');
export function DaysFromInit() {
  const currentDate = new Date();
  const daysFromInit = Math.floor(
    (currentDate.getTime() - DATE_OF_CREATION.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <DashboardCard
      header="Days from first commit"
      metric={daysFromInit}
    />
  );
}
