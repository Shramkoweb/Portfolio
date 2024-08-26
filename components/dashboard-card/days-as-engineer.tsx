import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

const DATE_OF_CREATION = new Date('2018-08-01');
export function DaysAsSoftwareEngineer() {
  const currentDate = new Date();
  const daysFromInit = Math.floor(
    (currentDate.getTime() - DATE_OF_CREATION.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <DashboardCard
      header="Days as Software Engineer"
      metric={daysFromInit}
    />
  );
}
