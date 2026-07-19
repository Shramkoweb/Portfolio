import { useEffect, useState } from 'react';

import { DashboardCard } from '@/components/dashboard-card/dashboard-card';
import { calendarDurationBetween } from '@/lib/calendar';

const CAREER_START_DATE = new Date('2018-08-01');

export function TimeAsSoftwareEngineer() {
  const [formattedDuration, setFormattedDuration] = useState<string>();

  // Computed after mount: the page is statically prerendered, so a
  // day-precise value baked at build time would mismatch on hydration.
  useEffect(() => {
    const { years, months, days } = calendarDurationBetween(
      CAREER_START_DATE,
      new Date(),
    );
    setFormattedDuration(`${years}y, ${months}m, ${days}d`);
  }, []);

  return (
    <DashboardCard
      header="Time as Software Engineer"
      metric={formattedDuration}
    />
  );
}
