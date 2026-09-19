import { useSyncExternalStore } from 'react';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';
import { calendarDurationBetween } from '@/lib/calendar';

const CAREER_START_DATE = new Date('2018-08-01');

function subscribeToClock() {
  return function unsubscribe() {}; // the value only changes at midnight
}

function getFormattedDuration() {
  const { years, months, days } = calendarDurationBetween(
    CAREER_START_DATE,
    new Date(),
  );

  return `${years}y, ${months}m, ${days}d`;
}

// The page is statically prerendered, so a day-precise value baked into the
// HTML would mismatch on hydration.
function getServerSnapshot() {
  return undefined;
}

export function TimeAsSoftwareEngineer() {
  const formattedDuration = useSyncExternalStore<string | undefined>(
    subscribeToClock,
    getFormattedDuration,
    getServerSnapshot,
  );

  return (
    <DashboardCard
      header="Time as Software Engineer"
      metric={formattedDuration}
    />
  );
}
