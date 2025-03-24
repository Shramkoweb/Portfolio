import { DashboardCard } from '@/components/dashboard-card/dashboard-card';

const DATE_OF_CREATION = new Date('2018-08-01');
export function DaysAsSoftwareEngineer() {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - DATE_OF_CREATION.getFullYear();
  let months = currentDate.getMonth() - DATE_OF_CREATION.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const timeString = `${years}y, ${months}m`;

  return (
    <DashboardCard
      header="Time as Software Engineer"
      metric={timeString}
    />
  );
}
